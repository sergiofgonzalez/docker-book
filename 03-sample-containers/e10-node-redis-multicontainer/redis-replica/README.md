# Docker Container for a Redis Replica Node
> Redis replica node built on top of redis-base

This is the build environment for Redis replica nodes, based on `redis-base` image.

## Build Instructions

First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined).
Then type:
```bash
$ sudo docker build -t sergiofgonzalez/redis-replica .
```

## Run Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined). 
Then, check that the `express` network is available by using `docker network inspect express`.

```bash
# start a couple of replica nodes
$ sudo docker run -d -h redis-replica1 --name redis-replica1 --network express sergiofgonzalez/redis-replica
$ sudo docker run -d -h redis-replica2 --name redis-replica2 --network express sergiofgonzalez/redis-replica
```

As the images are configured to send the log information to file, you have to use a container to view the logs:

```bash
# --rm remove container as soon as it exits
$ sudo docker run -it --rm --volumes-from redis-replica1 ubuntu cat /var/log/redis/redis-replica.log
$ sudo docker run -it --rm --volumes-from redis-replica2 ubuntu cat /var/log/redis/redis-replica.log
```