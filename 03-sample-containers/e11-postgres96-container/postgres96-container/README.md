# Docker Container for PostgreSQL Database Server
> containerized PostgreSQL 9.6 with volume mapping to enable interacting with data from outside the container

This is the working directory for a container running **PostgreSQL 9.6** database server official image. It is intended for general purpose development and does not include any predefined database/schema.

The host directory `./pgdata` is intended to be mapped to the `/var/lib/postgresql/data` so that the container is completely stateless.

## Hints and Tips
+ If you want to create the container with an empty database run:
```bash
$ rm -rf ./pgdata/*
```

## Build Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined).
Then type:
```bash
$ sudo docker build -t="sergiofgonzalez/postgres96:v1" .
```

## Run Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined). Otherwise, you will need to adapt the paths of the mapped volumes.
```bash
$ sudo docker run -d -p 5432:5432 -v $PWD/pgdata:/var/lib/postgresql/data --name postgres96-container sergiofgonzalez/postgres96:v1
```

To open an interactive session within the container (for inspection):
```bash
$ sudo docker exec -i -t postgres96-container /bin/bash
```