# Docker Container for Node.js app
> containerized Node.js application

This is the working directory for a container running a Node.js application on top of Node.js official image.

The directory `./nodejs_app` contains the simplest app i could think of that can be used to validate that the container is running correctly. This application can be updated with any other Node.js based application that is compliant with the expected project structure. Please review the information found in the [Run Instructions](#run-instructions) section for further information.

Note also that the directory created inside the container can be overridden as needed.

## Build Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined).
Then type:
```bash
$ sudo docker build -t="sergiofgonzalez/nodejs-container" .
```

You can configure the directory on the container that will hold the application by running:

```bash
$ sudo docker build --build-arg APP_DIR=/var/my-app -t="sergiofgonzalez/express" .
```

## Run Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined). Otherwise, you will need to adapt the paths of the mapped volumes.
```bash
$ sudo docker run -d --name nodejs-container \
sergiofgonzalez/express
```

Note that:
+ We're not mapping the application directory, but rather we're adding the application to the container. This is intentional in this case because we don't want to run `npm install` before starting the application. Thus, we're assuming that the application inside `./nodejs_app` directory already contains a `node_modules` directory completely populated.


To open an interactive session within the container (for inspection):
```bash
$ sudo docker exec -i -t nodejs-container /bin/bash
```