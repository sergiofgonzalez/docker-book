# Docker Container for MySQL Database Server
> containerized MySQL 8.0 with volume mapping to enable interacting with configuration and data from outside the container

This is the working directory for a container running **MySQL 8.0** database server official image. It is intended for general purpose development and does not include any predefined database/schema.

The specific server configuration can be included in the files found in `./mysql-custom-configuration`. In order for the container to pick up the configuration you will have to build the image mapping that directory to `/etc/mysql/conf.d` in the container.

Additionally, the directory `./mysql-data` is intended to be mapped to the `/var/lib/mysql` so that the container is completely stateless.


| NOTE: |
| :---- |
| The document assumes that you have followed the instructions from https://docs.docker.com/engine/install/linux-postinstall/ to be able to run Docker commands without `sudo`. |

## Hints and Tips
+ MySQL log files are stored in the `/var/lib/mysql/mysql.log` directory, which is mapped to `mysql80-container/mysqldata/mysql.log` in the host file system.
+ If you want to create the container with an empty database run:
```bash
$ rm -rf ./mysql-data/*
```
+ If you want to tailor the configuration, edit `./mysql-custom-config/mysql.cnf` file

## Build Instructions

First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined).
Then type:
```bash
docker build -t="sergiofgonzalez/mysql80" .
```

## Run Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined). Otherwise, you will need to adapt the paths of the mapped volumes.

Then type:

```bash
docker run -d -p 3306:3306 -v $PWD/mysql-data:/var/lib/mysql -v $PWD/mysql-custom-config:/etc/mysql/conf.d --name mysql80-container sergiofgonzalez/mysql80
```

To open an interactive session within the container (for inspection):
```bash
docker exec -i -t mysql80-container /bin/bash
```
