# Docker Container for Express based web app
> containerized Express web application

This is the working directory for a container running a Node.js, Express-based web application on top of Ubuntu 16.04 official image. 

The directory `./sample_express_app` contains a complete Express app that can be used to validate that the web container is running correctly. This application can be updated with any other Express based application that is compliant with the expected project structure. Please review the information found in the [Run Instructions](#run-instructions) section for further information.

Note also that the directory created inside the container, the port used for serving the application and the initial command can be overridden as needed.

## Build Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined).
Then type:
```bash
$ sudo docker build -t="sergiofgonzalez/express" .
```

You can configure the *PORT* on which the application will be exposed and the directory on the container that will hold the application by running:

```bash
$ sudo docker build --build-arg APP_PORT=6000 --build-arg APP_DIR=/var/app -t="sergiofgonzalez/express" .
```

## Run Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined). Otherwise, you will need to adapt the paths of the mapped volumes.
```bash
$ sudo docker run -d -p 5000 --name express-container \
-v $PWD/sample_express_app:/var/www/app sergiofgonzalez/express
```

Note that:
+ We're mapping port 5000 on the container to a random TCP port. To check the port on which the Express app is being served you can use `docker ps` and inspect the *PORTS* section.
For example, if you get `0.0.0.0:32770->80/tcp` you will be able to check the interactive website by pointing your browser to http://localhost:32770 on the Docker host, and if you're using a VM to host the Docker host, you can also point your browser to `http://{vm-address}:32770`.

+ Alternatively, you can use the `docker port express-container 5000` command.

Programmatically, you do:
```bash
$ curl http://localhost:32770/info
```

To open an interactive session within the container (for inspection):
```bash
$ sudo docker exec -i -t express-container /bin/bash
```