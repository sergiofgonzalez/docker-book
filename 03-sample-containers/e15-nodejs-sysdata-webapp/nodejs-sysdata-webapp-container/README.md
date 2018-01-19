# Docker Container for Hostname Node.js web app

> simple Node.js web app that responds with some system data about the machine it is running in.

This is the working directory for a container running **Node.js Alpine 8.9.4** official image which also includes a simple Node.js application that responds with a JSON document with system data about the machine it is running in.

The application can be found in `./sysdata_webapp` and the default port is 8080, therefore, once running you can obtain the system information running:

```bash
$ curl http://localhost:8080
```

## Build Instructions

First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined).
Then type:

```bash
$ sudo docker build -t="sergiofgonzalez/nodejs-sysdata-webapp:v1" .
```

## Run Instructions

First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined). Otherwise, you will need to adapt the paths of the mapped volumes.

```bash
$ sudo docker run -d -p 8080:8080 --name sysdata-webapp sergiofgonzalez/nodejs-sysdata-webapp:v1
```

To open an interactive session within the container (for inspection):

```bash
$ sudo docker exec -i -t sysdata-webapp /bin/bash
```

If you want to override the default port on which the HTTP server listens for request type:
```bash
$ sudo docker run -d \
--env SERVER__PORT=5000 -p 5000:5000 \
--name sysdata-webapp sergiofgonzalez/nodejs-sysdata-webapp:v1
```

## Tagging and Pushing to Docker Hub
First, make sure that your recently created image is tagged in accordance with Docker Hub requirements:
```bash
$ sudo docker images
REPOSITORY                                 TAG                 IMAGE ID            CREATED             SIZE
sergiofgonzalez/nodejs-sysdata-webapp      v1                  395d20620d12        2 hours ago         80.3MB
```

Then login to Docker Hub:
```bash
$ sudo docker login
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username: sergiofgonzalez
Password:
Login Succeeded
```

and push the image:

```bash
$ sudo docker push sergiofgonzalez/nodejs-sysdata-webapp
$ sudo docker push sergiofgonzalez/nodejs-sysdata-webapp
The push refers to a repository [docker.io/sergiofgonzalez/nodejs-sysdata-webapp]
80a454697453: Pushed
f3d6daebf694: Mounted from library/node
ef6ea5eda60b: Mounted from library/node
9dfa40a0da3b: Mounted from library/node
v1: digest: sha256:f50580192928dee30aad23c1d9644ba937e64eb4b06ae36e004e0a73b32f9730 size: 1162
```