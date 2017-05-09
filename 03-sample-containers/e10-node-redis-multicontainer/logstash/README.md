# Docker Container for a Logstash Node
> Logstash node custom built on top of the Ubuntu image.

This is the build environment for a container running Logstash, built on top of Ubuntu 16.04 official image. 

## Build Instructions

First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined). Make sure that the file `logstash.conf` exists and it is not ignored as it will be added to the image at build time.
Then type:
```bash
$ sudo docker build -t sergiofgonzalez/logstash .
```

## Run Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined). 
There are no network components in the node, and therefore, it is not necessary to add this container to the *Express* network.


```bash
$ sudo docker run -d --name logstash \
--volumes-from redis-primary --volumes-from express-app \
sergiofgonzalez/logstash
```

Errors read from Redis and the Express app are shown on stdout so you can run:
```bash
$ sudo docker logs logstash
```

to obtain information about both containers.

**NOTE**
+ See that it's not necessary to use `-p` to expose the port, as we will be using it inside the `app` network.

After successfully running the container you should be able to check that `app` lists `redis-db` as a container.

To open an interactive session within the container (for inspection):
```bash
$ sudo docker exec -i -t redis-ubuntu-container /bin/bash
```