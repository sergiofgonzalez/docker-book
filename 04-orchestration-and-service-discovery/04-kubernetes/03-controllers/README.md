# 03 &mdash; Controllers
> tbd

## Description
This document collects some concepts on Kubernetes replication and other controllers.

### Liveness Probes
A liveness probe is a mechanism that Kubernetes use to check if a container is still alive. The followin options are available:

+ HTTP GET probe &mdash; an HTTP request sent to the container's IP  on the configured address/port/path. If the probe responds with an HTTP error code or doesn't respond the container will be restarted.
+ A TCP Socket probe &mdash; a TCP connection to the specified port of the container. If the connection cannot be established successfully the container will be restarted.
+ An Exec probe &mdash; executes an arbitrary command inside the container and checks the command's exit status code. Any non-zero return code will trigger a container restart.

#### HTTP Liveness Probe
The example in [01-liveness-probe-descriptor](./liveness-probe-descriptor/unhealthy-webapp-http-probe.yml) demonstrates how to include an HTTP liveness probe:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: unhealthy-webapp
spec:
  containers:
    - image: sergiofgonzalez/nodejs-unhealthy-webapp
      name: nodejs-unhealthy-webapp
      livenessProbe:
        httpGet:
          path: /
          port: 8080
```

The application is a simple web app that returns an HTTP status 500 from the 5th request onwards.

You can test how it works by deploying the pod, and checking its status:
```bash
# create the pod
$ kubectl create -f 01-liveness-probe-descriptor/unhealthy-webapp-http-probe.yml
pod "unhealthy-webapp" created

# Check the logs
$ kubectl logs unhealthy-webapp -f
2018-01-29T18:38:19.488Z |- DEBUG  : HTTP server listening on 8080
2018-01-29T18:38:19.491Z |- INFO   : The application will return an HTTP status code 500 every 5th request!!!
2018-01-29T18:38:24.977Z |- DEBUG  : Received request from ::ffff:172.17.0.1: request # 1
2018-01-29T18:38:34.974Z |- DEBUG  : Received request from ::ffff:172.17.0.1: request # 2
2018-01-29T18:38:44.970Z |- DEBUG  : Received request from ::ffff:172.17.0.1: request # 3
2018-01-29T18:38:54.970Z |- DEBUG  : Received request from ::ffff:172.17.0.1: request # 4
2018-01-29T18:39:04.977Z |- DEBUG  : Received request from ::ffff:172.17.0.1: request # 5
2018-01-29T18:39:04.977Z |- DEBUG  : Sending HTTP status code 500 as a response: request # 6
2018-01-29T18:39:14.971Z |- DEBUG  : Received request from ::ffff:172.17.0.1: request # 7
2018-01-29T18:39:14.971Z |- DEBUG  : Sending HTTP status code 500 as a response: request # 8
...

# Check the status
$ kubectl get pods
NAME               READY     STATUS    RESTARTS   AGE
unhealthy-webapp   1/1       Running   3          5m
```

Note that the container is not restarted immediately &mdash; it takes a few back-to-back error requests to trigger the restart of the container.

You can check why the container was restarted by using `kubectl describe pod`:
```bash
$ kubectl describe pod unhealthy-webapp
Name:         unhealthy-webapp
...
Containers:
  nodejs-unhealthy-webapp:
...
    State:          Running
      Started:      Mon, 29 Jan 2018 19:48:17 +0100
    Last State:     Terminated
      Reason:       Error
      Exit Code:    137
      Started:      Mon, 29 Jan 2018 19:46:37 +0100
      Finished:     Mon, 29 Jan 2018 19:48:15 +0100
    Ready:          True
    Restart Count:  6
    Liveness:       http-get http://:8080/ delay=0s timeout=1s period=10s #success=1 #failure=3
...
Events:
  Type     Reason                 Age               From               Message
  ----     ------                 ----              ----               -------
  Normal   Scheduled              11m               default-scheduler  Successfully assigned unhealthy-webappto minikube
  Normal   SuccessfulMountVolume  11m               kubelet, minikube  MountVolume.SetUp succeeded for volume"default-token-sg6kd"
  Normal   Pulled                 8m (x3 over 11m)  kubelet, minikube  Successfully pulled image "sergiofgonzalez/nodejs-unhealthy-webapp"
  Normal   Created                8m (x3 over 11m)  kubelet, minikube  Created container
  Normal   Started                8m (x3 over 11m)  kubelet, minikube  Started container
  Warning  Unhealthy              6m (x9 over 10m)  kubelet, minikube  Liveness probe failed: HTTP probe failed with statuscode: 500
  Normal   Pulling                6m (x4 over 11m)  kubelet, minikube  pulling image "sergiofgonzalez/nodejs-unhealthy-webapp"
  Normal   Killing                1m (x6 over 9m)   kubelet, minikube  Killing container with id docker://nodejs-unhealthy-webapp:Container failed liveness probe.. Container will be killed and recreated.
```

Note that the same parameters that you're getting from describe can configured in the liveness probe (delay, time, period...). The failure value means the container will be restarted when it fails after three consecutive times.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: unhealthy-webapp
...
      livenessProbe:
        httpGet:
          path: /
          port: 8080
        initialDelaySeconds: 30
```

**NOTE**
Exit code 137 means that the process was terminated by a 128+9 (SIGKILL) while exit code 143 means the process was terminated by a 128+15 (SIGTERM).