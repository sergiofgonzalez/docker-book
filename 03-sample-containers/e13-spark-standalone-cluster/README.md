# Apache Spark Standalone Cluster Stack
> Specification for an Apache Spark standalone cluster with a *Master* and *Worker* nodes.

This directory contains the following artifacts:
+ `./spark-master` &mdash; the specification for a Spark Master container
+ `./spark-worker` &mdash; the specification for a Spark Worker container
+ `./shared-volume` &mdash; directory shared between the host, Spark Master and Spark Worker(s).
+ `./docker-compose.yml` &mdash; the Docker Compose/Swarm *stack* for the Apache Spark Cluster

For detailed information about the [Spark Master](./spark-master) and [Spark Worker](./spark-worker) containers, please review their specific documentation. For information about the *stack*, please keep reading :)

## Apache Spark Cluster Stack
The file `docker-compose.yml` is the specification of a simple stack to bootstrap an Apache Standalone Cluster with a *Master* and one or several *Workers*.

### Using Docker Compose to Bootstrap the Cluster
*Docker Compose* allows you to bootstrap the *Spark Cluster* featuring a *Master* and a single *Worker* within a single host machine, which is great for testing Spark applications.

*Docker Compose* do not come bundled with the Docker distribution, so you will have to follow the information from https://docs.docker.com/compose/install/ in order to install the latest version (v1.16.1 or later is required).

In order to bootstrap the cluster, type:
```bash
$ sudo docker-compose up -d
```

You can check whether everything went well by typing:
```bash
$ sudo docker-compose logs
```

or alternatively, you can also use the `docker compose up` which starts the stack in the foreground showing the logs of the different services.

### Executing a Spark Application in the Cluster
There are several alternative ways to execute an application in the cluster:

1. Using `docker-compose exec`:
```bash
$ sudo docker-compose exec spark-master /bin/bash -c "./bin/spark-submit --master spark://w.x.y.z:7077 --class <main-class-for-spark-app> /media/shared-spark/<jar-name-for-spark-app> <additional-args>"
```

2. Using `docker exec`:
```bash
$ sudo docker exec spark-master-container /bin/bash -c "./bin/spark-submit --master spark://w.x.y.z:7077 --class <main-class-for-spark-app> /media/shared-spark/<jar-name-for-spark-app> <additional-args>"
```

### Bringing Down a Running Spark Cluster
If you used `docker-compose up -d` you will be able to bring down the cluster by typing:

```bash
$ sudo docker-compose down
```

### Using Docker Swarm to Bootstrap the Cluster
*Docker Swarm* allows you to bootstrap the *Spark Cluster* featuring a *Master* and one or several *Workers* across multiple hosts, which allows for better performance and reliability.

Assuming you have a *Docker Swarm* in place, the stack can be deployed using:
```bash
$ sudo docker stack deploy --compose-file docker-compose.yml spark-cluster-stack
```
