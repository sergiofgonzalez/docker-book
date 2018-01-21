# 04 &mdash; Setting up *Minikube* on Linux host
> how-to setup *Minikube* on a Linux machine (native, non-virtualized Linux)

## Description
This document describes the steps to install and validate *Minikube* &mdash; a tool that sets up a single-node cluster for testing and developing *Kubernetes* applications &mdash; on a **non-virtualized Linux machine**. 

For more detailed information on *Minikube* please see the [official](https://kubernetes.io/docs/getting-started-guides/minikube/) documentation.

**Note** 
the installation steps will be different if you want to install *Minikube* on a Linux VM running on top of VirtualBox.

### Step 0: Pre-requisites
*Minikube* requires installing a *hypervisor* in your machine. The example assumes you install [VirtualBox](https://www.virtualbox.org/wiki/Downloads).

### Step 1: Installing *Minikube*
The installation command for installing *Minikube* on Linux can be found on the [Minikube](https://github.com/kubernetes/minikube/releases) web page.

At the time of testing, the latest available version was 0.24.1:
```bash
$ curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.24.1/minikube-linux-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/
```

### Step 2: Starting the *Minikube* cluster
To start the cluster type:
```bash
$ minikube start
Starting local Kubernetes v1.8.0 cluster...
Starting VM...
Downloading Minikube ISO
 140.01 MB / 140.01 MB [============================================] 100.00% 0s
Getting VM IP address...
Moving files into cluster...
Downloading localkube binary
 148.25 MB / 148.25 MB [============================================] 100.00% 0s
 65 B / 65 B [======================================================] 100.00% 0s
Setting up certs...
Connecting to cluster...
Setting up kubeconfig...
Starting cluster components...
Kubectl is now configured to use the cluster.
Loading cached images from config file.
```

Note that `sudo` is not needed to run `minikube` commands.

### Step 3: Installing the Kubernetes command-line tool (`kubectl`)
The *Kubernetes command line tool* is used to deploy and manage applications on *Kubernetes*. The following command can be used to download and install the latest stable version:
```bash
$ curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl && chmod +x kubectl && sudo mv kubectl /usr/local/bin
```

### Step 4: Initial Validation
Next step consists in verifying that the *Kubernetes* cluster is up and that `kubectl` can communicate with it.
```bash
$ kubectl cluster-info
Kubernetes master is running at https://192.168.99.100:8443
```

**NOTE**
If the previous command does not return almost immediately and instead it gets stuck until you get the error `Unable to connect to the server: dial tcp 192.168.99.100:8443: i/o timeout` try to start the *vboxnet0* interface:
```bash
$ sudo ifconfig vboxnet0 up
```

Then, stop the *Minikube* cluster and restart it again:
```bash
$ minikube stop
$ minikube start
```

After the restart, you can run th validation step again:
```bash
$ kubectl cluster-info
Kubernetes master is running at https://192.168.99.100:8443

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

### Step 5: Listing *Minikube* Nodes and their details
*Minikube* is a single-node cluster, so the `kubectl get nodes` should return a single node:
```bash
$ kubectl get nodes
NAME       STATUS    ROLES     AGE       VERSION
minikube   Ready     <none>    1h        v1.8.0
```

You can obtain further information about a node typing:
```bash
$ kubectl describe node minikube
Name:               minikube
Roles:              <none>
Labels:             beta.kubernetes.io/arch=amd64
                    beta.kubernetes.io/os=linux
                    kubernetes.io/hostname=minikube
Annotations:        alpha.kubernetes.io/provided-node-ip=192.168.99.100
                    node.alpha.kubernetes.io/ttl=0
                    volumes.kubernetes.io/controller-managed-attach-detach=true
Taints:             <none>
CreationTimestamp:  Fri, 19 Jan 2018 21:55:06 +0100
...
```

### Step 6: Configuring auto-completion for `kubectl`
All the interaction with *Minikube* happens through the `kubectl` command. Therefore, it is recommended to enable *bash auto-completion* by running:
```bash
$ kubectl completion bash >> ~/.bashrc
```

### Step 7: Deploying a simple application to *Minikube*
You can use the following command to deploy a simple application such as [Node.js sysdata webapp](../../03-sample-containers/e15-nodejs-sysdata-webapp/README.md), assuming the image is available on Docker Hub:
```bash
$ kubectl run nodejs-sysdata-webapp \
--image=sergiofgonzalez/nodejs-sysdata-webapp:v1 \
--port=8080 --generator=run/v1
replicationcontroller "nodejs-sysdata-webapp" created
```

The command above will run the image given by the `--image` parameter, creating *pod(s)* prefixed by the string `nodejs-sysdata-webapp` exposing the port given by the `--port` command and associating a replication controller to it.

For reviewing the concepts, please see the section [below](##concepts).

### Step 8: Obtaining information about the deployed application
*Minikube* does not deal with individual containers, but instead defines a new concept *pod* that is a group of multiple co-located containers, that will always run together on the same worker node and the same Linux namespace.

Another way to rationalize a pod is as a group of one or more tightly related containers that appear to be running on the same logical machine. Containers running on different pods will appear to be running on different machines, even when are running on the same node.

To list the pods running in the *Minikube* type:
```bash
$ kubectl get pods
NAME                          READY     STATUS              RESTARTS   AGE
nodejs-sysdata-webapp-jqsng   0/1       ContainerCreating   0          10s
```

After a few seconds, the status will change to `Running` if everything goes well:
```bash
$ kubectl get pods
NAME                          READY     STATUS    RESTARTS   AGE
nodejs-sysdata-webapp-jqsng   1/1       Running   0          40s
```

You can also type the following information to obtain very detailed information about the pod:
```bash
$ kubectl describe pod nodejs-sysdata-webapp-jqsng
```

### Step 9: Interacting with the deployed application
Each pod get its own IP address which is internal to the cluster, and therefore, not visible from the outside. In order to make the pod (i.e. your application) accesible you have to create a *Service* object of type `LoadBalancer`.

To create the service object, you have to expose the ReplicationController created for the pod:
```bash
$ kubectl get rc
NAME                    DESIRED   CURRENT   READY     AGE
nodejs-sysdata-webapp   1         1         1         10h
```

Once we have the name for the replication controller, we can use the following command which creates a load balancer service for our application.
```bash
$ kubectl expose rc nodejs-sysdata-webapp --type=LoadBalancer --name nodejs-sysdata-webapp-http
service "nodejs-sysdata-webapp-http" exposed
```

Now you can list the services:
```bash
$ kubectl get services
NAME                         TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
kubernetes                   ClusterIP      10.96.0.1       <none>        443/TCP          11h
nodejs-sysdata-webapp-http   LoadBalancer   10.101.133.45   <pending>     8080:32570/TCP   1m
```

Note that `EXTERNAL-IP` is still in `<pending>` status. This is because *Minikube* does not support *LoadBalancer* services. However, you will still be able to access the application through the external port:

```bash
$ minikube service nodejs-sysdata-webapp-http
```

This will open a browser window pointing at http://192.168.99.100:32570, which is the *Minikube* master IP address and the port listed by the `kubetctl get services` command.

Note that even if you do:
```bash
$ kubectl describe service nodejs-sysdata-webapp-http
Name:                     nodejs-sysdata-webapp-http
Namespace:                default
Labels:                   run=nodejs-sysdata-webapp
Annotations:              <none>
Selector:                 run=nodejs-sysdata-webapp
Type:                     LoadBalancer
IP:                       10.101.133.45
Port:                     <unset>  8080/TCP
TargetPort:               8080/TCP
NodePort:                 <unset>  32570/TCP
Endpoints:                172.17.0.2:8080
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>
```

you will never be able to see the IP address that you have to interact with the service. In *Minikube*, you need to use the *Minikube* master IP address to do that:
```bash
$ curl 192.168.99.100:32570
{"hostname":"nodejs-sysdata-webapp-jqsng","architecture":{"arch":"x64","platform":"linux","release":"4.9.13","type":"Linux"},"resources":{"cpus":[{"model":"Intel(R) Core(TM) i5-3427U CPU @ 1.80GHz","speed":2294,"times":{"user":1015600,"nice":5600,"sys":660500,"idle":15358400,"irq":0}},{"model":"Intel(R) Core(TM) i5-3427U CPU @ 1.80GHz","speed":2294,"times":{"user":718400,"nice":7800,"sys":436700,"idle":15704900,"irq":0}}],"totalmem":2097229824,"freemem":713629696}}
```

Note that the application is reporting the name of the pod as its hostname, meaning that each pod behaves like a separate independent machine.

### Step 10: Scaling the application
The replication controller can be used to scale in/out the number of pods:
```bash
$ kubectl get rc
NAME                    DESIRED   CURRENT   READY     AGE
nodejs-sysdata-webapp   1         1         1         11h
```

So to scale out, you use the following command:
```bash
$ kubectl scale rc nodejs-sysdata-webapp --replicas=3
replicationcontroller "nodejs-sysdata-webapp" scaled
```

Now, you can check the replication controller:
```bash
$ kubectl get rc
NAME                    DESIRED   CURRENT   READY     AGE
nodejs-sysdata-webapp   3         3         3         11h
```

The pods:
```bash
$ kubectl get pods
NAME                          READY     STATUS    RESTARTS   AGE
nodejs-sysdata-webapp-46szq   1/1       Running   0          2m
nodejs-sysdata-webapp-jqsng   1/1       Running   1          11h
nodejs-sysdata-webapp-tr8vr   1/1       Running   0          2m
```

And what happens when you hit the service URL is really interesting:
```bash
$ curl 192.168.99.100:32570
{"hostname":"nodejs-sysdata-webapp-46szq","architecture":{"arch":"x64","platform":"linux","release":"4.9.13","type":"Linux"},"resources":{"cpus":[{"model":"Intel(R) Core(TM) i5-3427U CPU @ 1.80GHz","speed":2294,"times":{"user":1773600,"nice":10400,"sys":1031600,"idle":26373400,"irq":0}},{"model":"Intel(R) Core(TM) i5-3427U CPU @ 1.80GHz","speed":2294,"times":{"user":1221700,"nice":14900,"sys":636100,"idle":27028400,"irq":0}}],"totalmem":2097229824,"freemem":601309184}}

$ curl 192.168.99.100:32570
{"hostname":"nodejs-sysdata-webapp-jqsng","architecture":{"arch":"x64","platform":"linux","release":"4.9.13","type":"Linux"},"resources":{"cpus":[{"model":"Intel(R) Core(TM) i5-3427U CPU @ 1.80GHz","speed":2294,"times":{"user":1777700,"nice":10400,"sys":1034100,"idle":26462800,"irq":0}},{"model":"Intel(R) Core(TM) i5-3427U CPU @ 1.80GHz","speed":2294,"times":{"user":1224200,"nice":14900,"sys":637600,"idle":27118900,"irq":0}}],"totalmem":2097229824,"freemem":600928256}}

$ curl 192.168.99.100:32570
{"hostname":"nodejs-sysdata-webapp-tr8vr","architecture":{"arch":"x64","platform":"linux","release":"4.9.13","type":"Linux"},"resources":{"cpus":[{"model":"Intel(R) Core(TM) i5-3427U CPU @ 1.80GHz","speed":2294,"times":{"user":1780000,"nice":10500,"sys":1035900,"idle":26490900,"irq":0}},{"model":"Intel(R) Core(TM) i5-3427U CPU @ 1.80GHz","speed":2294,"times":{"user":1224700,"nice":14900,"sys":637800,"idle":27153100,"irq":0}}],"totalmem":2097229824,"freemem":601055232}}

$ curl 192.168.99.100:32570
{"hostname":"nodejs-sysdata-webapp-jqsng","architecture":{"arch":"x64","platform":"linux","release":"4.9.13","type":"Linux"},"resources":{"cpus":[{"model":"Intel(R) Core(TM) i5-3427U CPU @ 1.80GHz","speed":2294,"times":{"user":1793900,"nice":10600,"sys":1040700,"idle":26563200,"irq":0}},{"model":"Intel(R) Core(TM) i5-3427U CPU @ 1.80GHz","speed":2294,"times":{"user":1234600,"nice":15100,"sys":640000,"idle":27235700,"irq":0}}],"totalmem":2097229824,"freemem":600604672}}
```

Note how the service (*load balancer*) is distributing the incoming requests among the different available pods. 

### Step 11: Checking where the pods are actually running
You can obtain further information about a pod by using the `-o wide` option:
```bash
$ kubectl get pods -o wide
NAME                          READY     STATUS    RESTARTS   AGE       IP           NODE
nodejs-sysdata-webapp-46szq   1/1       Running   0          15m       172.17.0.5   minikube
nodejs-sysdata-webapp-jqsng   1/1       Running   1          11h       172.17.0.2   minikube
nodejs-sysdata-webapp-tr8vr   1/1       Running   0          15m       172.17.0.6   minikube
```

As *Minikube* is a single-node cluster, the three pods are hosted on the same node.

### Step 12: Obtaining a graphical view of the system with the dashboard
When using *Minikube* the *Kubernetes* dashboard is not immediately available, as you can see when using the command:
```bash
$ kubectl cluster-info
Kubernetes master is running at https://192.168.99.100:8443
```

However, you can still spin up the dashboard by typing the following command:
```bash
$ minikube dashboard
Opening kubernetes dashboard in default browser...
```

### Additional topics

#### How to restart *Minikube* after a reboot
If you run the command: `kubectl cluster-info` after rebooting you will see:
```bash
$ kubectl cluster-info
Kubernetes master is running at https://192.168.99.100:8443
```
However, if you do:
```bash
$ minikube status
minikube: Stopped
cluster:
kubectl:
```

Therefore, you will need to run the following command to start *Minikube* again:
```bash
$ minikube start
Starting local Kubernetes v1.8.0 cluster...
Starting VM...
Getting VM IP address...
Moving files into cluster...
Setting up certs...
Connecting to cluster...
Setting up kubeconfig...
Starting cluster components...
Kubectl is now configured to use the cluster.
Loading cached images from config file.
```

And then will correctly report that the cluster is up and running:
```bash
$ minikube status
minikube: Running
cluster: Running
kubectl: Correctly Configured: pointing to minikube-vm at 192.168.99.100
```

Note however, that the cluster will remember the components that were defined before the restart. Effectively, the pods, replication controllers and services will be there:
```bash
$ kubectl get pods
NAME                          READY     STATUS    RESTARTS   AGE
nodejs-sysdata-webapp-jqsng   1/1       Running   1          10h
```

#### Removing the application
To remove the deployed application, you will have to delete the associated *Kubernetes* components (pods, replication controllers, services)

```bash
# Delete the service
$ kubectl delete service nodejs-sysdata-webapp-http
service "nodejs-sysdata-webapp-http" deleted

# Delete the replication controller
$ kubectl delete rc nodejs-sysdata-webapp
replicationcontroller "nodejs-sysdata-webapp" deleted

# Check status of the pods
$ kubectl get pods
NAME                          READY     STATUS        RESTARTS   AGE
nodejs-sysdata-webapp-46szq   1/1       Terminating   0          1h
nodejs-sysdata-webapp-jqsng   1/1       Terminating   1          12h
nodejs-sysdata-webapp-tr8vr   1/1       Terminating   0          1h
$ kubectl delete pod nodejs-sysdata-webapp-p5n9r
$ kubectl delete rc nodejs-sysdata-webapp
$ kubectl delete service nodejs-sysdata-webapp
```

After a few seconds, the pods will no longer be there:
```bash
$ kubectl get pods
No resources found.
```

#### Uninstalling *Minikube*
To uninstall *Minikube* run the following commands:
```bash
# stop the minikube single-node cluster
$ minikube stop
Stopping local Kubernetes cluster...
Machine stopped.

# destroy the cluster
$ minikube delete
Deleting local Kubernetes cluster...
Machine deleted.

# Remove the CLI tools
$ sudo rm /usr/local/bin/kubectl /usr/local/bin/minikube

# Clean the cached resources
$ sudo rm -rf ~/.kube/ ~/.minikube/
```

You might also want to uninstall VirtualBox.

## Concepts

### Kubernetes
A production-grade open source platform that orchestrates the placement and execution of application containers within and across computer clusters.
For more information on the basics of *Kubernetes*, please visit https://kubernetes.io/docs/tutorials/kubernetes-basics/.

### Minikube
A tool that makes it easy to run *Kubernetes* locally. *Minikube* runs a single-node *Kubernetes* clsuter inside a VM on your laptop for users looking to try out *Kubernetes* or develop with it day-to-day.
For more information on *Minikube*, please visit (https://kubernetes.io/docs/getting-started-guides/minikube/).

### Pods
*Kubernetes* does not deal with individual containers, but instead defines a new concept *pod* that is a group of multiple co-located containers, that will always run together on the same worker node and the same Linux namespace. As a consequence, when a pod contains several containers, those will never span across multiple worker nodes.

A pod is the basic building block in *Kubernetes*. A pod can contain one or more containers that are closely related, and each one will have its own unique private IP address and hostname. As containers are designed to run only a single process per container, the concept of *pod* allows for interconnecting containers using locally-stored files or Inter-Process  Communication, instead of having to deal with more complicated synchronization between containers.

It is important to note that *pods* are considered ephemeral &mdash; they can be moved from node to node, they might stop because of infrastructure issues or application failures, etc.


**NOTE**
A useful way to rationalize a pod is to think of it as a group of one or more tightly related containers that appear to be running on the same logical machine. 
Containers running on different pods will appear to be running on different machines, even when are running on the same node.


### Replication Controllers
The component in charge of ensuring that there's always running the specified number of instances of a pod. If a pod fails for any reason, the Replication Controller would create a new one to replace the missing one.

### Services
Services represent a static location for a group of one or more pods that all provide the same service.
As pods are ephemeral, services are used to maintain the fact that a pod ip address might change with the time. They can also be used to expose multiple pods at a single constant IP and port pair.
Therefore, when a service is created, it gets a static IP which will never change during the lifetime of the service. As a consequence, you must ensure that instead of connecting to the pods directly you contact with the service through its constant IP address.