# Docker Container for REDIS key-value store
> containerized REDIS 3.2 with volume mapping to enable interacting with the data file from outside the container

This is the working directory for a container running **REDIS 3.2** database server official image. It is intended for general purpose development and does not include any predefined database/schema.

The directory `./redis-data` is mapped to the `/data` so that REDIS is started with persistent storage.

## Hints and Tips
+ If you want to create the container with an empty database run:
```bash
$ rm -rf ./redis-data/*
```

## Build Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined).
Then type:
```bash
$ sudo docker build -t="sergiofgonzalez/redis32:v1" .
```

## Run Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined). Otherwise, you will need to adapt the paths of the mapped volumes.
```bash
$ sudo docker run -d -p 6379:6379 -v $PWD/redis-data:/data --name redis32-container sergiofgonzalez/redis32:v1
```

To open an interactive session within the container (for inspection):
```bash
$ sudo docker exec -i -t redis32-container /bin/bash
```