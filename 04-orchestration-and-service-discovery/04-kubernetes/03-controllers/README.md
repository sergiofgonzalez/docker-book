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

### Replication Controllers
A *Replication Controller* makes sure that an exact number of pods always matches its label selector. If it doesn't, the *Replication Controller* takes the appropriate action to reconcile the *actual* with the *desired number*. As a consequence, it can not only spin up new pods, but it also can delete excess pods.

The specification of a *Replication Controller* requires:
+ a *label selector* &mdash; determines what pods are in the *Replication Controller's scope*
+ a *replica count* &mdash; identifying the desired number of pods that should be running.
+ a *pod template* &mdash; the pod resource description

A *Replication Controller* specification can be changed at any time, but only changes on the *replication count* have an effect on existing pods. If the *label selector* or *pod template* is changed, it just changes the existing *scope* of the *Replication Controller* leaving the previous pods managed by the *Replication Controller* unchanged.

To create a *Replication Controller* use the following definition:
```yaml
# Resource Descriptor for a Replication Controller
# in charge of nodejs-sysdata pods

apiVersion: v1
kind: ReplicationController

metadata:
  name: nodejs-sysdata-webapp-rc

spec:
  replicas: 3

  template:
    metadata:
      labels:
        app: nodejs-sysdata-webapp
    spec:
      containers:
        - name: nodejs-sysdata-webapp
          image: sergiofgonzalez/nodejs-sysdata-webapp:v1
          ports:
            - containerPort: 8080
```

Then, you can use `kubectl create -f` to create the *replication controller*.

*Note*
+ The *replication controller* checks the instance count by verifying that the query for the label selector `app=nodejs-sysdata-webapp` is equal to the desired count.
+ The label specification for the label selector at the *replication controller* level must match the label selector for the pod, otherwise the *replication controller* would keep spinning pods without ever reaching the desired count.
+ When using a replication controller, the pods managed by it will be named after the name given in the *replication controller*.
+ A replication controller will respond to both pod failure (by creating a new pod in the same node) and to node failure (by maintaining the replica count in a new node).

You can verify the labels of your pods running:
```bash
$ kubectl get pods --show-labels
NAME                             READY     STATUS    RESTARTS   AGE       LABELS
nodejs-sysdata-webapp-rc-69mj6   1/1       Running   0          3m        app=nodejs-sysdata-webapp
nodejs-sysdata-webapp-rc-8vtnm   1/1       Running   0          3m        app=nodejs-sysdata-webapp
nodejs-sysdata-webapp-rc-96nv8   1/1       Running   0          3m        app=nodejs-sysdata-webapp
```

To obtain information about a *replication controller* type:
```bash
$ kubectl get replicationcontroller
NAME                       DESIRED   CURRENT   READY     AGE
nodejs-sysdata-webapp-rc   3         3         3         7m
```

For more detailed information you can use `describe`:
```bash
$ kubectl describe replicationcontroller nodejs-sysdata-webapp-rc
Name:         nodejs-sysdata-webapp-rc
Namespace:    default
Selector:     app=nodejs-sysdata-webapp
Labels:       app=nodejs-sysdata-webapp
Annotations:  <none>
Replicas:     3 current / 3 desired
Pods Status:  3 Running / 0 Waiting / 0 Succeeded / 0 Failed
Pod Template:
  Labels:  app=nodejs-sysdata-webapp
  Containers:
   nodejs-sysdata-webapp:
    Image:        sergiofgonzalez/nodejs-sysdata-webapp:v1
    Port:         8080/TCP
    Environment:  <none>
    Mounts:       <none>
  Volumes:        <none>
Events:
  Type    Reason            Age   From                    Message
  ----    ------            ----  ----                    -------
  Normal  SuccessfulCreate  9m    replication-controller  Created pod: nodejs-sysdata-webapp-rc-96nv8
  Normal  SuccessfulCreate  9m    replication-controller  Created pod: nodejs-sysdata-webapp-rc-8vtnm
  Normal  SuccessfulCreate  9m    replication-controller  Created pod: nodejs-sysdata-webapp-rc-69mj6
  Normal  SuccessfulCreate  3m    replication-controller  Created pod: nodejs-sysdata-webapp-rc-kbrlr
```

You can move a pod out of the scope of a given replication controller by changing its label selector, so that it no longer matches the one given in the replication controller.

```bash
# Adding new labels to existing pod has no effect
$ kubectl label pod nodejs-sysdata-webapp-rc-8vtnm type=special
pod "nodejs-sysdata-webapp-rc-8vtnm" labeled
$ kubectl get pods --show-labels 
NAME                             READY     STATUS    RESTARTS   AGE       LABELS
nodejs-sysdata-webapp-rc-8vtnm   1/1       Running   0          17m       app=nodejs-sysdata-webapp,type=special
nodejs-sysdata-webapp-rc-96nv8   1/1       Running   0          17m       app=nodejs-sysdata-webapp
nodejs-sysdata-webapp-rc-kbrlr   1/1       Running   0          10m       app=nodejs-sysdata-webapp

# Changing the label selector used for the rc will cause a new pod being created
$ kubectl label pod nodejs-sysdata-webapp-rc-8vtnm app=foo --overwrite 
pod "nodejs-sysdata-webapp-rc-8vtnm" labeled

$ kubectl get pods --show-labels 
NAME                             READY     STATUS    RESTARTS   AGE       LABELS
nodejs-sysdata-webapp-rc-8vtnm   1/1       Running   0          20m       app=foo,type=special
nodejs-sysdata-webapp-rc-96nv8   1/1       Running   0          20m       app=nodejs-sysdata-webapp
nodejs-sysdata-webapp-rc-jkrnj   1/1       Running   0          2m        app=nodejs-sysdata-webapp
nodejs-sysdata-webapp-rc-kbrlr   1/1       Running   0          13m       app=nodejs-sysdata-webapp
```

You can also change the label selector for a *replication controller*, thus causing the existing pods to fall out out of scope, and would make the *replication controller* create three new pods.

#### Changing the Replication Controller Definition

You can use the command:
```bash
kubectl edit replicationcontroller nodejs-sysdata-webapp-rc
```

to edit the yaml of the given replication controller.

#### Scaling Pods Horizontally

Use:
```bash
kubectl scale replicationcontroller nodejs-sysdata-webapp-rc --replicas=2
```

Although you can also use `kubectl edit rc nodejs-sysdata-webapp-rc` and change the `replicas` value.

#### Deleting a Replication Controller

You can delete a replication controller and terminate its associated pods:
```bash
kubectl delete rc nodejs-sysdata-webapp-rc
```

or you can just delete the replication controller without terminating the pods controlled by the pod (this will leave the pods running):
```bash
kubectl delete rc nodejs-sysdata-webapp-rc --cascade=false
```

### Replica Sets

A *ReplicaSet* is new generation of *ReplicationController*. A *replica set* behaves exactly like a *replication controller* but it has more expressive pod selectors (for instance to match pods lacking a certain label or pods having a certain label key regardless of its value).

You can create a *replica set* with a YAML similar to the following one:
```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: nodejs-sysdata-webapp-rs

spec:
  replicas: 3
  selector:
    matchLabels:
      app: nodejs-sysdata-webapp
  
  template:
    metadata:
      labels:
        app: nodejs-sysdata-webapp
    spec:
      containers:
      - name: nodejs-sysdata-webapp
        image: sergiofgonzalez/nodejs-sysdata-webapp:v1
```

And you can create the *replica set* from it using `kubectl create -f` command.

Note that:
+ This time, the `apiVersion` key specifies both an API group (apps) and a version (v1). This is common on the newly created resource types.

You can query the *replica set status using*:
```bash
$ kubectl get replicasets
NAME                       DESIRED   CURRENT   READY     AGE
nodejs-sysdata-webapp-rs   3         3         3         6h
```

or obtain detailed info about a particular replicaset doing:
```bash
$ kubectl describe replicaset nodejs-sysdata-webapp-rs
Name:         nodejs-sysdata-webapp-rs
Namespace:    default
Selector:     app=nodejs-sysdata-webapp
Labels:       app=nodejs-sysdata-webapp
Annotations:  <none>
Replicas:     3 current / 3 desired
Pods Status:  3 Running / 0 Waiting / 0 Succeeded / 0 Failed
Pod Template:
  Labels:  app=nodejs-sysdata-webapp
  Containers:
   nodejs-sysdata-webapp:
    Image:        sergiofgonzalez/nodejs-sysdata-webapp:v1
    Port:         <none>
    Environment:  <none>
    Mounts:       <none>
  Volumes:        <none>
Events:           <none>
```

#### Advanced Label Selectors in ReplicaSets

The section:
```yaml
...
  selector:
    matchLabels:
      app: nodejs-sysdata-webapp
...
```

does the same thing the *replication controller* does. However, *replica sets* allows for an advanced variety of selectors not supported by the *replication controller*.

For example, you can use the following syntax:
```yaml
...
  selector:
    matchExpressions:
      - key: app
        operator: In
        values:
          - nodejs-sysdata-webapp
...
```

There are four valid operators:
+ *In* &mdash; label's value must match one of the specified values
+ *NotIn* &mdash; label's value must not match any of the specified values
+ *Exists* &mdash; pod must include a label with the specified key (value is not important). You shouldn't specify the `values` field when using this option.
+ *DoesNotExist* &mdash; pod must not include a label with the specified key. You shouldn't specify the `values` field when using this option.

And you can specify multiple expressions and even use both `matchLabels` and `matchExpressions`. All the given conditions must evaluate to true for the *ReplicaSet* to match a pod.

You can delete a *ReplicaSet* using:
```bash
kubectl delete replicaset nodejs-sysdata-webapp-rs
```

### DaemonSets

A *DaemonSet* allows you to run a pod on each and every node in the cluster, and have exactly one instance running. This can be useful for infrastructure related tasks such as log collectors, resource monitors, etc.

Note that you can also configure the *DaemonSet* to run only on a subset of all the nodes by specifying the `nodeSelector` property in the pod template.

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: ssd-monitor

spec:
  selector:
    matchLabels:
      - app: ssd-monitor
  
  template:
    metadata:
      labels:
        app: ssd-monitor
    spec:
      nodeSelector:
        disk: ssd    # pod will only be deployed when the node features disk=ssd

    containers:
      - name: nodejs-sysdata-webapp
        image: sergiofgonzalez/ssd-monitor  # just an example, image does not exist
```

Note that for that pod to be scheduled, you should label the desired nodes using:
```bash
kubectl label node minikube disk=ssd
```

You can obtain information about a daemon set using `kubectl get daemonsets` and `kubectl describe daemonset`.

### Job Resource

