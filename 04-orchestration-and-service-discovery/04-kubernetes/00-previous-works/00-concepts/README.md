# 00 &mdash; Kubernetes Concepts
> Kubernetes concepts sorted alphabetically

## Concepts

### Index
+ [Daemon Sets](,/#daemon-sets)
+ [Kubernetes](./#kubernetes)
+ [Minikube](./#minikube)
+ [Namespaces](./#namespaces)
+ [Pods](./#pods)
+ [Replication Controllers](./#replication-controllers)
+ [Replica Sets](./#replica-sets)
+ [Services](./services)

### Daemon Sets
A type of *ReplicaSet* used to run exactly one pod instance on each and every node of the cluster matching the given expression. It is typically used to run applications such as resource monitors, log collectors, etc.


### Kubernetes
A production-grade open source platform that orchestrates the placement and execution of application containers within and across computer clusters.
For more information on the basics of *Kubernetes*, please visit https://kubernetes.io/docs/tutorials/kubernetes-basics/.

### Minikube
A tool that makes it easy to run *Kubernetes* locally. *Minikube* runs a single-node *Kubernetes* clsuter inside a VM on your laptop for users looking to try out *Kubernetes* or develop with it day-to-day.
For more information on *Minikube*, please visit (https://kubernetes.io/docs/getting-started-guides/minikube/).

### Namespaces
A *Kubernetes* concept that lets you group objects into separate, non-overlapping groups for organizational purposes.

### Pods
*Kubernetes* does not deal with individual containers, but instead defines a new concept *pod* that is a group of multiple co-located containers, that will always run together on the same worker node and the same Linux namespace. As a consequence, when a pod contains several containers, those will never span across multiple worker nodes.

A pod is the basic building block in *Kubernetes*. A pod can contain one or more containers that are closely related, and each one will have its own unique private IP address and hostname. As containers are designed to run only a single process per container, the concept of *pod* allows for interconnecting containers using locally-stored files or Inter-Process  Communication, instead of having to deal with more complicated synchronization between containers.

It is important to note that *pods* are considered ephemeral &mdash; they can be moved from node to node, they might stop because of infrastructure issues or application failures, etc.


**NOTE**
A useful way to rationalize a pod is to think of it as a group of one or more tightly related containers that appear to be running on the same logical machine. 
Containers running on different pods will appear to be running on different machines, even when are running on the same node.


### Replication Controllers
A Kubernetes resource in charge of ensuring that there's always running the specified number of instances of a pod. If a pod fails for any reason, the *Replication Controller* would create a new one to replace the missing one.

A *Replication Controller* makes sure that an exact number of pods always matches its label selector. If it doesn't, the *Replication Controller* takes the appropriate action to reconcile the actual with the desired number. As a consequence, it can not only spin up new pods, but it only can delete excess pods.

### Replication Sets
A new generation of *replication controller* that allows for more expressive pod selectors. Plays the same role as a *ReplicationController*, but supports an advanced syntax for matching the pods it manages (through `matchExpressions`).

### Services
Services represent a static location for a group of one or more pods that all provide the same service.
As pods are ephemeral, services are used to maintain the fact that a pod ip address might change with the time. They can also be used to expose multiple pods at a single constant IP and port pair.
Therefore, when a service is created, it gets a static IP which will never change during the lifetime of the service. As a consequence, you must ensure that instead of connecting to the pods directly you contact with the service through its constant IP address.