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
Then, check that the `app` network is available by using `docket network inspect app`.

```bash
$ sudo docker run -d --network=app --name redis-db sergiofgonzalez/redis-ubuntu
```
**NOTE**
+ See that we're not using `-p` to expose the port, as we will be using it inside the `app` network.

After successfully running the container you should be able to check that `app` lists `redis-db` as a container.

To open an interactive session within the container (for inspection):
```bash
$ sudo docker exec -i -t redis-ubuntu-container /bin/bash
```