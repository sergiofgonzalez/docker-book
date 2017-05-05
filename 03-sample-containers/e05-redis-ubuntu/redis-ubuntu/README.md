# Docker Container for a Redis backend
> Redis key-value store custom built on top of the Ubuntu image.

This is the working directory for a container running Redis key-value store, built on top of Ubuntu 16.04 official image. 

## Build Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined).
Then type:
```bash
$ sudo docker build -t="sergiofgonzalez/redis-ubuntu" .
```

## Run Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined). Otherwise, you will need to adapt the paths of the mapped volumes.
```bash
$ sudo docker run -d -p 6379:6379 --name redis-ubuntu-container
```

Note that:
+ We're mapping port 6379 on the container to TCP port 6379 on the host because applications will expect to find a Redis connection on that port.
+ Note that it is not necessary to start the redis-server with the option `--protected-mode no`. In fact, that option is no longer recognized and an error is raised if you use it.

To open an interactive session within the container (for inspection):
```bash
$ sudo docker exec -i -t redis-ubuntu-container /bin/bash
```