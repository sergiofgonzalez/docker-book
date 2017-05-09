# Docker Container for a Redis Primary Node
> Redis primary node built on top of redis-base

This is the build environment for the Redis primary node, based on `redis-base` image.

## Build Instructions

First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined).
Then type:
```bash
$ sudo docker build -t sergiofgonzalez/redis-primary .
```

## Run Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined). 
Then, check that the `express` network is available by using `docker network inspect express`.

```bash
# -h names the host
$ sudo docker run -d -h redis-primary --network express --name redis-primary sergiofgonzalez/redis-primary
```

As the image is configured to send the logs to file rather than stdout, to view the logs you have to use a container:
```bash
$ sudo docker run -it --rm --volumes-from redis-primary ubuntu cat /var/log/redis/redis-server.log
```
