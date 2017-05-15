# 03 &mdash; Advanced Service Orchestration with Swarm
> 

## Description

In this example, we illustrate how to create a *Swarm* cluster that spans across three EC2 VMs. There will be one manager, that will also handle tasks (i.e. will also act as a worker), so we will have three workers.

We'll name the machines as: larry, curly and moe:

| Name tag | IP Address   | hostname        | Role           |
|----------|--------------|-----------------|----------------|
| larry    | 172.31.28.44 | ip-172-31-28-44 | Manager+Worker |
| curly    | 172.31.31.13 | ip-172-31-31-13 | Worker         |
| moe      | 172.31.31.75 | ip-172-31-31-75 | Worker         |

**Note**
In AWS there are multiple ways to obtain private IP address, but a in a regular Linux machine you can use:
```bash
PRIVATE_IP="$(ifconfig eth0 | awk -F ' *|:' '/inet addr/{print $4}')"
```
where `eth0` is the name assumed for the main interface.

We've configured the security groups for those machines so that we can ssh into them, while also allowing the required *Docker Swarm* ports:

| Port | Protocols | Purpose            |
|------|-----------|--------------------|
| 2377 | TCP       | Cluster Management |
| 7946 | TCP+UDP   | Node Communication |
| 4789 | TCP+UDP   | Overlay Network    |



The first step is to register the *Swarm* manager:
On larry type:
```bash
$ sudo docker swarm init --advertise-addr $PRIVATE_IP
Swarm initialized: current node (y4kwrew98bo99n2fo5v8a5vhi) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join \
    --token SWMTKN-1-64g6zzq2iqml7zm8tia7rul4890syddwx5dy1tw4bt8qod36zd-a5iq17zafmew5bcjk54w9ca82 \
    172.31.28.44:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```

You don't have to take note of the token! You can retrieve it at any given time using:
```bash
$ sudo docker swarm join-token worker
```

To obtain information about the state of the swarm, you can type on the manager:
```bash
$ sudo docker info
Containers: 0
 Running: 0
 Paused: 0
 Stopped: 0
Images: 0
Server Version: 17.03.1-ce
Storage Driver: aufs
 Root Dir: /var/lib/docker/aufs
 Backing Filesystem: extfs
 Dirs: 0
 Dirperm1 Supported: true
Logging Driver: json-file
Cgroup Driver: cgroupfs
Plugins:
 Volume: local
 Network: bridge host macvlan null overlay
Swarm: active
 NodeID: y4kwrew98bo99n2fo5v8a5vhi
 Is Manager: true
 ClusterID: zdqpo4r2wh3lzr4i8r2j116b4
 Managers: 1
 Nodes: 1
 Orchestration:
  Task History Retention Limit: 5
 Raft:
  Snapshot Interval: 10000
  Number of Old Snapshots to Retain: 0
  Heartbeat Tick: 1
  Election Tick: 3
 Dispatcher:
  Heartbeat Period: 5 seconds
 CA Configuration:
  Expiry Duration: 3 months
 Node Address: 172.31.28.44
 Manager Addresses:
  172.31.28.44:2377
...
```

You can list the nodes in the *swarm* and their status by typing:
```bash
$ sudo docker node ls
ID                           HOSTNAME         STATUS  AVAILABILITY  MANAGER STATUS
y4kwrew98bo99n2fo5v8a5vhi *  ip-172-31-28-44  Ready   Active        Leader
```

Now, we'll add *curly* and *moe* as workers in the *swarm* by using the manager IP address (172.31.28.44) and the port in which the manager listens to workers connection:


```bash
$ sudo docker swarm join \
--token SWMTKN-1-64g6zzq2iqml7zm8tia7rul4890syddwx5dy1tw4bt8qod36zd-a5iq17zafmew5bcjk54w9ca82 \
172.31.28.44:2377
```


Now, we can run `docker node ls` again to check the status of the *swarm*:
On larry:
```bash
$ sudo docker node ls
ID                           HOSTNAME         STATUS  AVAILABILITY  MANAGER STATUS
aigx9998d7i60qtweu0x6bsg8    ip-172-31-31-13  Ready   Active
arxleei5a7cnvnoykpcjl11yh    ip-172-31-31-75  Ready   Active
y4kwrew98bo99n2fo5v8a5vhi *  ip-172-31-28-44  Ready   Active        Leader
```

Now, let's add some tasks for the workers to accomplish. In a swarm, workers run *services*, which are nothing more that a container image and commands that will be executed.

There are two types of services:
+ **replicas or replicated services** &mdash; a swarm manager sends the task to a particular worker. You can specify a `scale` to create a number of identical services of that type.
+ **global services** &mdash; a swarm manager sends the task to each of the workers.


Let's create a *replicated service* with a scale of 2. To do that, type the following command on *larry*, the *swarm manager*:
```bash
$ sudo docker service create --replicas 2 \
--name helloworld \
ubuntu /bin/sh -c "while true; do echo hello, world; sleep 1; done"
```

Then, you can use `docker service ls` to obtain information about the status of the *swarm services*:
On *larry* type:
```bash
$ sudo docker service ls
ID            NAME        MODE        REPLICAS  IMAGE
op84xmntxlet  helloworld  replicated  2/2       ubuntu:latest
```

You can also use `docker service ps <service-name>` on the manager:
```bash
$ sudo docker service ps helloworld
ID            NAME          IMAGE          NODE             DESIRED STATE  CURRENT STATE          ERROR  PORTS
jogq8w4jktnu  helloworld.1  ubuntu:latest  ip-172-31-31-75  Running        Running 2 minutes ago
w20izbbf7uku  helloworld.2  ubuntu:latest  ip-172-31-28-44  Running        Running 2 minutes ago
```


Although the service scale was initially set to 2, you can re-scale using `docker service scale`:
```bash
$ sudo docker service scale helloworld=3
helloworld scaled to 3
```

So that wehen you ask for the status of the service again, you'd get:
```bash
$ sudo docker service ps helloworld
ID            NAME          IMAGE          NODE             DESIRED STATE  CURRENT STATE           ERROR  PORTS
jogq8w4jktnu  helloworld.1  ubuntu:latest  ip-172-31-31-75  Running        Running 5 minutes ago
w20izbbf7uku  helloworld.2  ubuntu:latest  ip-172-31-28-44  Running        Running 5 minutes ago
23xfb3pu9m0q  helloworld.3  ubuntu:latest  ip-172-31-31-13  Running        Running 37 seconds ago
```

Now, let's create a *global service*. Remember that this type of task is sent to each and every worker:
On *larry* (our swarm manager) type:
```bash
$ sudo docker service create \
--name helloworld_global --mode global \
ubuntu /bin/sh -c "while true; do echo hello, world global; sleep 1; done"
```

Now, if we check for the status of the recently created service using `docker service ps` we'd get:
```bash
$ sudo docker service ps helloworld_global
ID            NAME                                         IMAGE          NODE             DESIRED STATE  CURRENT STATE               ERROR  PORTS
1qzw6jo4tk43  helloworld_global.aigx9998d7i60qtweu0x6bsg8  ubuntu:latest  ip-172-31-31-13  Running        Running about a minute ago
s4qfb4fxpq4t  helloworld_global.y4kwrew98bo99n2fo5v8a5vhi  ubuntu:latest  ip-172-31-28-44  Running        Running about a minute ago
bkx4ye18n0ib  helloworld_global.arxleei5a7cnvnoykpcjl11yh  ubuntu:latest  ip-172-31-31-75  Running        Running about a minute ago
```


To stop a service, use `docker service rm` on the *swarm manager*:
```bash
$ sudo docker service rm helloworld
helloworld
```


Then we can check that only the `helloworld_global` keeps running by typing:
```bash
$ sudo docker service ls
```
