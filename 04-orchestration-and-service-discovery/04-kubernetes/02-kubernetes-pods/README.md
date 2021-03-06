# 02 &mdash; Concepts on Kubernetes Pods
> additional concepts on Kubernetes pods

## Description
This document collects some concepts on Kubernetes pods.

### Isolation concepts
All containers of a pod share the same hostname and network interfaces. They also run under the same IPC namespace and can communicate through IPC. 
Containers in pod also share the same loopback network interface (they can communicate through localhost).
It is also possible to configure them to share the same PID namespace.

**NOTE**
As a consequence, containers in a pod should not bind to the same port, or they'll run into conflicts. Containers of different pods can bind to the same port without running into conflicts.

All pods in Kubernetes cluster reside in a single flat, shared network address space (every pod can access every other pod through its IP address), much like computers on a LAN.

### Pod design guidelines
You should group several containers in a pod when:
+ They need to run together in the same host
+ They represent the a single application component
+ They must be scaled together

### Pod Descriptors
Pods (and other resources) are usually created by posting YAML or JSON manifest to the Kubernetes REST API endpoint.

You can obtain the YAML descriptor of an existing pod by using the command:
```bash
$ kubectl get pod nodejs-sysdata-webapp-pcqc2 -o yaml
apiVersion: v1
kind: Pod
metadata:
  annotations:
    kubernetes.io/created-by: |
      {"kind":"SerializedReference","apiVersion":"v1","reference":{"kind":"ReplicationController","namespace":"default","name":"nodejs-sysdata-webapp","uid":"344180a8-fe95-11e7-8a9c-080027a56a33","apiVersion":"v1","resourceVersion":"16315"}}
  creationTimestamp: 2018-01-21T10:24:03Z
  generateName: nodejs-sysdata-webapp-
  labels:
    run: nodejs-sysdata-webapp
  name: nodejs-sysdata-webapp-pcqc2
  namespace: default
  ownerReferences:
  - apiVersion: v1
    blockOwnerDeletion: true
    controller: true
    kind: ReplicationController
    name: nodejs-sysdata-webapp
    uid: 344180a8-fe95-11e7-8a9c-080027a56a33
  resourceVersion: "16330"
  selfLink: /api/v1/namespaces/default/pods/nodejs-sysdata-webapp-pcqc2
  uid: 34455612-fe95-11e7-8a9c-080027a56a33
spec:
  containers:
  - image: sergiofgonzalez/nodejs-sysdata-webapp:v1
    imagePullPolicy: IfNotPresent
    name: nodejs-sysdata-webapp
    ports:
    - containerPort: 8080
      protocol: TCP
    resources: {}
    terminationMessagePath: /dev/termination-log
    terminationMessagePolicy: File
    volumeMounts:
    - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
      name: default-token-mxmsh
      readOnly: true
  dnsPolicy: ClusterFirst
  nodeName: minikube
  restartPolicy: Always
  schedulerName: default-scheduler
  securityContext: {}
  serviceAccount: default
  serviceAccountName: default
  terminationGracePeriodSeconds: 30
  volumes:
  - name: default-token-mxmsh
    secret:
      defaultMode: 420
      secretName: default-token-mxmsh
status:
  conditions:
  - lastProbeTime: null
    lastTransitionTime: 2018-01-21T10:24:04Z
    status: "True"
    type: Initialized
  - lastProbeTime: null
    lastTransitionTime: 2018-01-21T10:24:06Z
    status: "True"
    type: Ready
  - lastProbeTime: null
    lastTransitionTime: 2018-01-21T10:24:03Z
    status: "True"
    type: PodScheduled
  containerStatuses:
  - containerID: docker://6f9d7c50ed46cc18e306bc2b8a9f0464d2749194cf9d3c274be214be2617753d
    image: sergiofgonzalez/nodejs-sysdata-webapp:v1
    imageID: docker-pullable://sergiofgonzalez/nodejs-sysdata-webapp@sha256:f50580192928dee30aad23c1d9644ba937e64eb4b06ae36e004e0a73b32f9730
    lastState: {}
    name: nodejs-sysdata-webapp
    ready: true
    restartCount: 0
    state:
      running:
        startedAt: 2018-01-21T10:24:05Z
  hostIP: 192.168.99.100
  phase: Running
  podIP: 172.17.0.4
  qosClass: BestEffort
  startTime: 2018-01-21T10:24:04Z
```

The pod resource descriptor consists of the following parts:
+ *Metadata* &mdash; where the name, namespace, labels and other information about the pod is given.
+ *Spec* &mdash; where the contents of the pod are described (containers, volumes, ...).
+ *Status* &mdash; where the current information about the running pod is given (runtime data). This information is not given when creating yourself a pod descriptor.

When manually defining a pod, the descriptor can be greatly simplified as can be seen in the specification found for the [Node.js sysdata webapp](./nodejs-sysdata-webapp.yml).

**NOTE**
You can use the command `kubectl explain pod[.section.[section]]` (e.g. `kubectl explain pod` or `kubectl explain pod.spec.containers`) to obtain detailed information about how to create the resource descriptor for a pod resource.

Once the descriptor has been defined, you can spin up a new pod from it typing:
```bash
$ kubectl create -f nodejs-sysdata-webapp.yml
pod "nodejs-sysdata-webapp-yml" created
$ kubectl get pods
NAME                          READY     STATUS    RESTARTS   AGE
nodejs-sysdata-webapp-pcqc2   1/1       Running   0          24m
nodejs-sysdata-webapp-yml     1/1       Running   0          1s
```

### Retrieving a Pod's log
Type:
```bash
$ kubectl logs nodejs-sysdata-webapp-yml
```

to browse the logs of a pod.

If a pod includes multiple containers, you must specify the container name when using that command:
```bash
$ kubectl logs nodejs-sysdata-webapp-yml -c nodejs-sysdata-webapp
```

**NOTE**
+ `kubectl logs` can only be used for running containers. When a pod is deleted, its logs are also deleted. To make the logs available after the pod is deleted you must set up a centralized logging.
+ `kubectl logs` return the contents of the last rotation of a container's log (10 MB).

### Connecting to a pod through port forwarding
For debugging purposes, it is possible to connect to a pod without going through a service using the following command:
```bash
$ kubectl port-forward nodejs-sysdata-webapp-yml 8888:8080
Forwarding from 127.0.0.1:8888 -> 8080
```

This command will block the terminal and will forward all connections from `localhost:8888` to the pod's 8080 port.

Therefore, in a different terminal, you can do:
```bash
$ curl localhost:8888
{"hostname":"nodejs-sysdata-webapp-yml","architecture":{"arch":"x64","platform":"linux","release":"4.9.13","type":"Linux"},"resources":{"cpus":[{"model":"Intel(R) Core(TM) i5-3427U CPU @ 1.80GHz","speed":2294,"times":{"user":1358100,"nice":9100,"sys":791400,"idle":21402200,"irq":0}},{"model":"Intel(R) Core(TM) i5-3427U CPU @ 1.80GHz","speed":2294,"times":{"user":1005800,"nice":11900,"sys":518300,"idle":21696400,"irq":0}}],"totalmem":2097229824,"freemem":630480896}}
```

### Organizing pods with labels
In Kubernetes, a label is an arbitrary key-value pair you attach to a Kubernetes resource. Then you can select resources based on their labels.
A resource can have more than one label, as long as the keys of those labels are unique within that resource.

The label is typically included in the YML descriptor:
```yml
apiVersion: v1
kind: Pod
metadata:
  name: nodejs-sysdata-webapp-yml
  labels:
    creation_method: manual
    env: prod
spec:
  containers:
    - image: sergiofgonzalez/nodejs-sysdata-webapp:v1
      name: nodejs-sysdata-webapp
      ports:
        - containerPort: 8080  
          protocol: TCP
```

Once created, you can check the labels of a pod using:
```bash
$ kubectl get pods --show-labels
NAME                          READY     STATUS    RESTARTS   AGE       LABELS
nodejs-sysdata-webapp-pcqc2   1/1       Running   0          4h        run=nodejs-sysdata-webapp
nodejs-sysdata-webapp-yml     1/1       Running   0          20s       creation_method=manual,env=prod
```

But you can also list only certain labels using `-L label_key1,label_key2,...`. Those keys will then be printed on the output as columns:
```bash
$ kubectl get pods -L creation_method,env
NAME                          READY     STATUS    RESTARTS   AGE       CREATION_METHOD   ENV
nodejs-sysdata-webapp-pcqc2   1/1       Running   0          4h
nodejs-sysdata-webapp-yml     1/1       Running   0          3m        manual            prod
```

You can add labels to a running pod using the following `kubectl` commands:
```bash
$ kubectl label pod nodejs-sysdata-webapp-pcqc2 creation_method=manual
pod "nodejs-sysdata-webapp-pcqc2" labeled
```

To modify an existing label of a pod you have to use the `--overwrite` flag:
```bash
$ kubectl label pod nodejs-sysdata-webapp-yml env=development --overwrite
pod "nodejs-sysdata-webapp-yml" labeled
```

Obviously, things start getting interesting when you can use them as filters to act on resources. For example, to list all the pods labeled with `creation_method=manual` you'd do:
```bash
$ kubectl get pods -l creation_method=manual
```

The following command lists the pods for which `env` label is defined:
```bash
$ kubectl get pods -l env
```

The following command lists the pods for which `env` label is not defined:
```bash
$ kubectl get pods -l '!env'
```

The following command lists the pods whose `creation_method` is not `manual`:
```bash
$ kubectl get pods -l 'creation_method!=manual'
```

The following command lists the pods whose `env` label is either `production` or `development`:
```bash
$ kubectl get pods -l 'env in (production,development)'
```

And the following command lists the pods whose `env` label is neither `production` nor `development`:
```bash
$ kubectl get pods -l 'env notin (production,development)'
```

And you can also use several conditions in the label selector:
```bash
$ kubectl get pods -l env=development,creation_method=manual
```

### Constraining pod scheduling
When your infrastructure isn't homogenous (i.e. you might have some of your machines with GPU) you might want to say specifically where a pod should be scheduled.
Specifically identifying the node on which a pod should be deployed would debunk the purpose of *Kubernetes*, but you might want to tell *Kubernetes* to use a node with some characteristics. This can be done with label selectors (i.e. labels).

The following command adds a label to a node:
```bash
$ kubectl label nodel minikube gpu=true
node "minikube" labeled
```

Then, when specifying the *resource descriptor* for a pod you can do:
```yml
apiVersion: v1
kind: Pod
metadata:
  name: nodejs-sysdata-webapp-yml
  labels:
    creation_method: manual
    env: prod
spec:
  nodeSelector:
    gpu: "true"
  containers:
    - image: sergiofgonzalez/nodejs-sysdata-webapp:v1
      name: nodejs-sysdata-webapp
      ports:
        - containerPort: 8080
          protocol: TCP
```
and it will force the scheduling of the pod only to nodes containing the label `gpu=true`

### Annotating Pods
Annotations are like labels, but there's no functionality built into annotations to perform filters and selections &mdash; they are purely informational.

```bash
$ kubectl annotate pod nodejs-sysdata-webapp-yml \
com.github.sergiofgonzalez/description="Testing annotations"
```

You can review annotations using `kubectl describe`:
```bash
$ kubectl describe pod nodejs-sysdata-webapp-yml
Name:         nodejs-sysdata-webapp-yml
Namespace:    default
Node:         minikube/192.168.99.100
Start Time:   Sun, 21 Jan 2018 15:36:48 +0100
Labels:       creation_method=manual
              env=development
Annotations:  com.github.sergiofgonzalez/description=Testing annotations
Status:       Running
IP:           172.17.0.3
...
```

and also `kubectl get pod`.

Obviously, annotations can also be added at creation time.

### Namespace
*Namespaces* lets you group objects into separate, non-overlapping groups.
Use cases:
  + split complex systems into smaller groups
  + multi-tenancy
  + environments (dev, qa, production...) in a single cluster
  + assign separate set of resources to different groups of users, so that each group manage their own distinct set of resources, without needing to take care (of even be aware) of other pods running in the system. This can also be used for authorization purposes.



**NOTE**
Kubernetes *namespaces* are not *Linux namespaces*.

To obtain the namespaces of a cluster type:
```bash
$ kubectl get namespaces
NAME          STATUS    AGE
default       Active    20m
kube-public   Active    20m
kube-system   Active    20m
```

*Kubectl* assumes the `default` namespace when you don't specify a namespace.

To list the pods in a non-default namespace use:
```bash
$ kubectl get pods --namespace=kube-system
NAME                                    READY     STATUS    RESTARTS   AGE
kube-addon-manager-minikube             1/1       Running   0          24m
kube-dns-54cccfbdf8-ntzg2               3/3       Running   0          24m
kubernetes-dashboard-77d8b98585-s62xm   1/1       Running   0          24m
storage-provisioner                     1/1       Running   0          24m
```

This simple yaml can be used to create a namespace:
```yaml
apiVersion: v1
kind: Namespace
metadata:

  name: custom-namespace
```

Alternatively, you can do:
```bash
$ kubectl create namespace custom-namespace
```

To create a resource in a specific namespace you can either add the `namespace` key in the resource descriptor
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nodejs-sysdata-webapp-yml-ns
  namespace: custom-namespace
  labels:
...
```
or run the `create` command with the --namespace option:
```bash
$ kubectl create -f nodejs-sysdata-webapp.yml --namespace custom-namespace
pod "nodejs-sysdata-webapp-yml-labels" created
```

#### Changing the current namespace in *kubectl*
To avoid having to type `--namespace custom-namespace` you have to change the *current context's namespace* using `kubectl`:

```bash
$ kubectl config set-context $(kubectl config current-context) --namespace custom-namespace
Context "minikube" modified.
```

You can revert back to the default using:
```bash
$ kubectl config set-context $(kubectl config current-context) --namespace default
Context "minikube" modified.
```

#### Caveats

+ Not all resources are namespace aware &mdash; for example, *nodes* cannot be defined in namespaces.
+ Namespace don't provide any kind of isolation between resources &mdash; a pod in a given namespace can interact with a pod in a completely different namespace of the cluster. However, you can lay out a networking solution on top of Kubernetes to provide network isolation per namespace.

### Stopping and Removing Pods
To delete a pod by name type:
```bash
$ kubectl delete pod nodejs-sysdata-webapp-mcvvb
pod "nodejs-sysdata-webapp-mcvvb" deleted
```

You can delete several pods with a single command:
```bash
$ kubectl delete pod nodejs-sysdata-webapp-mcvvb nodejs-sysdata-webapp-yml nodejs-sysdata-webapp-yml-labels-annotations
pod "nodejs-sysdata-webapp-mcvvb" deleted
pod "nodejs-sysdata-webapp-yml" deleted
```

You can delete pods using label selectors:
```bash
kubectl delete pods -l creation_method=manual
```

You can delete pods by deleted the whole namespace:
```bash
$ kubectl delete namespace custom-namespace
namespace "custom-namespace" deleted
```

You can delete all the pods in the current namespace using:
```bash
$ kubectl delete pods --all
```

You can delete the *replication controller*, *pods* and *services* with the following command:
```bash
$ kubectl delete all --all
pod "nodejs-sysdata-webapp-nvhzx" deleted
replicationcontroller "nodejs-sysdata-webapp" deleted
service "kubernetes" deleted
```

Note that the previous command also deletes the *kubernetes service*, but it should be automatically recreated:
```bash
$ kubectl get service
NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   3m
```
