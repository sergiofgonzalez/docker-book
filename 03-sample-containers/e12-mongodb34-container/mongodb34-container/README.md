# Docker Container for MongoDB Server
> containerized MongoDB 3.4 single instance with volume mapping for the data directory.

This is the working directory for a container running **MongoDB 3.4** database server official image. It is intended for general purpose development and does not include any predefined database or authentication.

The host directory `./datadir` is intended to be mapped to the `/data/db` so that the container is completely stateless.

## Hints and Tips
+ If you want to create the container with an empty database run:
```bash
$ rm -rf ./datadir/*
```

## Build Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined).
Then type:
```bash
$ sudo docker build -t="sergiofgonzalez/mongodb34" .
```

## Run Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined). Otherwise, you will need to adapt the paths of the mapped volumes.
```bash
$ sudo docker run -d -p 27017:27017 -v $PWD/datadir:/data/db --name mongodb34-container sergiofgonzalez/mongodb34
```

To open an interactive session within the container (for inspection):
```bash
$ sudo docker exec -i -t mongodb34-container /bin/bash
```