# 06 &mdash; Basic Docker Orchestration
> introducing Docker orchestration options

## Description

This section will discuss three tools that help build and orchestrate containers:
+ **Docker Compose** &mdash; for simple container orchestration
+ **Consul** &mdash; distributed, highly available service discovery that can be applied to Docker
+ **Swarm** &mdash; for orchestration and clustering of Docker containers

Prior to Docker 1.9, linking Docker containers consisted on inspecting the IP addresses assigned to containers and carefully orchestrate container binding. This worked perfectly well for small installations, but did not scale for clusters, autoscaling, etc. 

### Docker Compose
+ `docker-compose up` &mdash; starts the services interactively (i.e. the console will display the logs, pressing CTRL+C will stop the services) specified in the `docker-compose.yml` from where the command is launched.
+ `docker-compose up -d` &mdash; starts the services in a daemonized way.
+ `docker-compose ps` &mdash; lists all of the currently running services from the local `docker-compose.yml` file.
+ `docker-compose logs` &mdash; shows the logs from the currently running services from the local `docker-compose.yml` file.
+ `docker-compose logs -f` &mdash; shows and follows the logs from the currently running services from the local `docker-compose.yml` file.
+ `docker-compose help <command>` &mdash; shows the help page for a particular command
+ `docker-compose stop` &mdash; sends the stop signal to the currently running services.
+ `docker-compose kill` &mdash; sends the kill signal to forcefully stop the currently running services
+ `docker-compose start` &mdash; restart the services found in the local `docker-compose.yml` file
+ `docker-compose rm` &mdash; removes the services found in the local `docker-compose.yml` file

### Consul for Service Discovery
Service Discovery allows components providing or consuming services to find each other when they want to interact. Docker containers can register its running services with the Service Discovery tool (such as IP address and port) to allow interaction between services.

*Consul* is a service discovery tool that uses the [Raft](https://en.wikipedia.org/wiki/Raft_(computer_science)) consensus algorithm to require a quorum for writes. It features an HA, fault-tolerant key-value store and service catalog.

Services can register themselves with Consul and share that registration information in an highly available and distributed manner.

### Docker Swarm

*Docker Swarm* is a native clustering for Docker. It turns a pool of Docker hosts into a single virtual Docker host. This simple strategy allows for an easy integration of tools that already support Docker, including the Docker client. To a Docker client, a Swarm cluster is just another Docker host.

From Docker v1.12, it comes shipped integrated into Docker.

### The Swarm concept
A swarm is a cluster of Docker hosts onto which you can deploy services. A swarm is made up of a manager and worker nodes:
+ Manager nodes do the dispatching and organizing of work on the swarm. Each unit of work is called a task. Managers also handle all the cluster management functions that keep the swarm healthy and active. If there is more than one manager, the manager node will conduct an election for a leader.
+ Worker nodes run the tasks dispatched from manager nodes. Out of the box, every node (either manager or worker), will run tasks, but you can configure a swarm manager node to only perform management activities and not run tasks.

Docker swarm also defines the concept of service as a bigger abtraction on top of tasks. Services define which tasks are executed on your nodes. Each service consists of a container image and a series of commands to execute inside one or more containers on the nodes.

The services can run in the following two modes:
+ *Replicated services* &mdash; a swarm manager distributes replica tasks amongts workers according to a scale you specify.
+ *Global services* &mdash; a swarm manager distributes one task for the service on every available worker.

The swarm also manages load balancing and DNS much like the Docker host. Each swarm can expose ports, much like Docker container publish ports. The swarm handles internal DSN much like a Docker host allowing services and workers to be discoverable inside the swarm.

### Setting up shop for a Docker Swarm cluster
To exemplify *Docker Swarm* concepts and commands, we will setup a three separate EC2 virtual machines, in the same VPC, all of them with latest Ubuntu distribution and Docker installed:

| Name Tag    | IP Address   | hostname        |
|-------------|--------------|-----------------|
| swarm-larry | 172.31.28.44 | ip-172-31-28-44 |
| swarm-curly | 172.31.31.13 | ip-172-31-31-13 |
| swarm-moe   | 172.31.31.75 | ip-172-31-31-75 |

We will then set up the security groups to allow *sshing* into the machine on one side, and allowing the swarm to communicate in the other:

+ Security Group 1 (swarm-nodes-ssh)
| Type | Protocol | Port Range | Source      |
|------|----------|------------|-------------|
| SSH  | TCP      | 22         | 0.0.0.0     |

+ Security Group 2 (swarm-nodes-additional)
| Protocol | Port Range | Source          | Purpose              |
|----------|------------|-----------------|----------------------|
| TCP      | 2377       | swarm-nodes-ssh | Cluster Management   |
| TCP      | 4789       | swarm-nodes-ssh | Overlay network      |
| UDP      | 4789       | swarm-nodes-ssh | Overlay network      |
| TCP      | 7946       | swarm-nodes-ssh | Node communication   |
| UDP      | 7946       | swarm-nodes-ssh | Node communication   |

The first thing that you have to do is initialize the swarm, we will select `swarm-larry` as our swarm master:

**Note**
In AWS there are multiple ways to obtain private IP address, but a in a regular Linux machine you can use:
```bash
PRIVATE_IP="$(ifconfig eth0 | awk -F ' *|:' '/inet addr/{print $4}')"
```
where we assume `eth0` is the name of the main network interface.

### A simple but complete Docker Swarm lifecycle example

Let's run a complete cycle of the things you can do in the *swarm*:
1. Initialize the *swarm* selecting a manager
2. Add workers to the *swarm*
3. Add replicated and global services to the *swarm*
4. Obtain information about the nodes and services in the *swarm*

The first step is to register the *Swarm* manager:
On swarm-larry type:
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

Now, we'll add *swarm-curly* and *swarm-moe* as workers in the *swarm* by using the manager IP address (172.31.28.44) and the port in which the manager listens to workers connection:


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
On *swarm-larry* type:
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



### Docker Swarm Commands Cheatsheet (wip)

docker swarm init --advertise-addr $PRIVATE_IP
sudo docker info
sudo docker node ls
sudo docker swarm join \
--token SWMTKN-1-64g6zzq2iqml7zm8tia7rul4890syddwx5dy1tw4bt8qod36zd-a5iq17zafmew5bcjk54w9ca82 \
172.31.28.44:2377
sudo docker service create --replicas 2 \
--name helloworld \
ubuntu /bin/sh -c "while true; do echo hello, world; sleep 1; done"
sudo docker service ls
sudo docker service ps helloworld
sudo docker service scale helloworld=3
sudo docker service create \
--name helloworld_global --mode global \
ubuntu /bin/sh -c "while true; do echo hello, world global; sleep 1; done"
sudo docker service rm helloworld