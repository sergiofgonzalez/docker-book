# Docker Container for Spark Worker Node
> Specification for the Worker node in an Apache Spark standalone cluster

This is the working directory for a container playing the role of the *Worker* node in an Apache Spark Standalone Cluster.

The worker tries to register itself with the master using the environment variable `SPARK_MASTER_CONTAINER_IP_PORT` (long name to prevent clashes with variables used by Spark), which should point to an already started *Spark Master*. 

A environment variable `$SPARK_HOME` is defined as a convenience to identify where Spark is installed within the container. 

The `WORKDIR` of the container is also set to `$SPARK_HOME`, although you will not typically need to interact with the *Spark utilities* in a worker node.

A volume is defined to be able to share data between the host and the application running in the container, and also between the *Master* and the *Worker* nodes when running the cluster as a stack. The volume is defined in the `/media/shared-spark` mount point.

## Build Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined).
Then type:
```bash
$ sudo docker build -t="sergiofgonzalez/spark-worker:2.2.0" .
```

## Run Instructions
The container is intended to be run as a part of a stack (either using *Docker Compose* for testing purposes on a single host, or *Docker Swarm* when deploying across several hosts).

However, if you need to start this container on its own (i.e. for debugging purposes or exploration), you can use the following command:
```bash
$ sudo docker run -d \
-v ${PWD}/shared-volume:/media/shared-spark --name spark-worker sergiofgonzalez/spark-worker:2.2.0
```

To open an interactive session in the running container, type:
```bash
$ sudo docker exec -i -t spark-worker /bin/bash
```
## Additional Info

### Getting the Spark Logs from the Container
To obtain the logs from the container, type:
```bash
$ sudo docker logs spark-worker
```

### Manually Connecting the Worker with a Running Master
As stated before, the container has been designed to be run as a service within a stack with a *Master*. However, it is also possible (mostly for debugging/exploration/validation) to perform the registration manually.

First, you will need to start the *Spark Master* container as specified in the [docs](../spark-master/README.md).
Then, obtain the private IP address of the master by typing:
```bash
$ sudo docker exec -i -t spark-master \
/bin/bash -c "hostname -I"
172.17.0.2
```

Obviously, you can use many other ways such as:
```bash
$ sudo docker inspect --format="{{ .NetworkSettings.IPAddress }}" spark-master
172.17.0.2
```

If the IP address matches 172.17.0.2 (which is the IP address defined in the [Dockerfile](./Dockerfile)) you're good to go. Otherwise, you will need to run the container overridding the value for the `SPARK_MASTER_CONTAINER_IP_PORT` environment variable:
```bash
$ sudo docker run -d \
-v ${PWD}/shared-volume:/media/shared-spark \
-e "SPARK_MASTER_CONTAINER_IP_PORT=w.x.y.z:7077" \
--name spark-worker sergiofgonzalez/spark-worker:2.2.0
```
If everything goes well you will get the following log output from the worker and master:
```bash
$ sudo docker logs spark-worker
...
17/09/16 19:11:00 INFO Worker: Successfully registered with master spark://<master-container-id>:7077

$ sudo docker logs spark-master
...
17/09/16 18:58:10 INFO Master: I have been elected leader! New state: ALIVE
17/09/16 19:11:00 INFO Master: Registering worker 172.17.0.3:32932 with 4 cores, 2.9 GB RAM
```

Once the connection is established, you will have a simplest *Spark Standalone Cluster* with a master and a single worker node, and you will be able to submit applications to execution using:
```bash
$ sudo docker exec spark-master /bin/bash -c "./bin/spark-submit --master spark://w.x.y.z:7077 --class <main-class-for-spark-app> /media/shared-spark/<jar-name-for-spark-app> <additional-args>"
```

where `w.x.y.z` is the private IP address of the Spark Master container.

### Pushing the image to a Docker Registry
Publishing the image to a Docker Registry is useful when using *Docker Swarm*, as the image might be referenced by multiple machines within the *Swarm cluster* and without it you would be forced to manually build the images for the stack components in each and every machine of the cluster.

Pushing the images to the official *Docker Hub* is really simple:
1. Login:
```bash
$ sudo docker login
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username (sergiofgonzalez):
Password:
Login Succeeded
```
2. Push the Spark Master:
```bash
$ sudo docker push sergiofgonzalez/spark-master:2.2.0
The push refers to a repository [docker.io/sergiofgonzalez/spark-master]
e3f492eb4cda: Pushed
d33e28bb0099: Pushed
fa9c8f9abc06: Pushed
960fb0e95453: Pushed
5343c24f01ad: Pushed
b5c3d96a019f: Pushed
...
2.2.0: digest: sha256:b3aca4cb7f9edb6c683cb153f4ad21bb41a7b6a6605348fa45079f2a7abf13f6 size: 2628
```

3. Push the Spark Worker:
```bash
$ sudo docker push sergiofgonzalez/spark-worker
The push refers to a repository [docker.io/sergiofgonzalez/spark-worker]
e3f492eb4cda: Mounted from sergiofgonzalez/spark-master
d33e28bb0099: Mounted from sergiofgonzalez/spark-master
...
2.2.0: digest: sha256:be44fb97b01f636e5f9347ada0636a39fd4dcf7bbeeae56db026af0d080ee8aa size: 2628
```

In some private registries, you might need to *tag* the image before pushing it. Let's assume that you have to push the *Spark Master* image to a registry named `dockerhub.mycompany.com` in which you have a *user namespace* that is different from the one you use locally (e.g. sergio.f.gonzalez for sergiofgonzalez).

In that case, it is enough to tag the image:
```bash
# login to the private registry
$ sudo docker login dockerhub.mycompany.com

# tag the local image
$ sudo docker tag sergiofgonzalez/spark-master:2.2.0 dockerhub.mycompany.com/sergio.f.gonzalez/spark-master:2.2.0

# push using the recently created tag
$ sudo docker push dockerhub.mycompany.com/sergio.f.gonzalez/spark-master:2.2.0
```