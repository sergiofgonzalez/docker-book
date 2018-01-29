# Docker Container for the *Unhealthy* Node.js web app
> simple Node.js web app that responds with an HTTP status code 500 from the 5th request onwards

This is the working directory for a container running **Node.js Alpine 8.9.4** official image which also includes a simple Node.js application that responds with an HTTP status code 500 from the 5th request. On the non-error requests, a JSON document with system data about the machine it is running in is returned.

The application can be found in `./unhealthy_webapp` and the default port is 8080, therefore, once running you can test the application running:

```bash
$ curl http://localhost:8080
```

## Build Instructions

First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined).
Then type:

```bash
sudo docker build -t="sergiofgonzalez/nodejs-unhealthy-webapp" .
```

## Run Instructions

First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined). Otherwise, you will need to adapt the paths of the mapped volumes.

```bash
sudo docker run -d -p 8080:8080 --name unhealthy-webapp sergiofgonzalez/nodejs-unhealthy-webapp
```

To open an interactive session within the container (for inspection):

```bash
sudo docker exec -i -t unhealthy-webapp /bin/bash
```

If you want to override the default port on which the HTTP server listens for request type:
```bash
sudo docker run -d \
--env SERVER__PORT=5000 -p 5000:5000 \
--name unhealthy-webapp sergiofgonzalez/nodejs-unhealthy-webapp
```

## Tagging and Pushing to Docker Hub
First, make sure that your recently created image is tagged in accordance with Docker Hub requirements:
```bash
$ sudo docker images
REPOSITORY                                TAG                 IMAGE ID            CREATED             SIZE
sergiofgonzalez/nodejs-unhealthy-webapp   latest              05f4e8d7d2d7        2 minutes ago       80.3MB
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
$ sudo docker push sergiofgonzalez/nodejs-unhealthy-webapp
The push refers to repository [docker.io/sergiofgonzalez/nodejs-unhealthy-webapp]
50fec31e5cff: Pushed 
f3d6daebf694: Mounted from library/node 
ef6ea5eda60b: Mounted from library/node 
9dfa40a0da3b: Mounted from library/node 
latest: digest: sha256:462f7d42a73cfdf39306946612c322a376a43808b4b63da162610c40ac8db9a3 size: 1162
```