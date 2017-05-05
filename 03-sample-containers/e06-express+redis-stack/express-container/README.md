# Docker Container for Express based web app with Python support
> containerized Express web application with Python support (as required by `bcrypt`)

This is the working directory for a container running a Node.js, Express-based web application on top of Ubuntu 16.04 official image. 

The directory `./shoutbox_express_app` contains a quite advanced Express app that requires *Redis* key-value store as the backend for the persistence layer and Python support for handling password salting and encryption through the `bcrypt` module.
The application configuration file `application.yml` contains entries for the backend specification:
```yml
db:
  host: redis-db
  port: 6379
```

Those entries can be overridden if necessary using environment variables.


## Build Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined).
Then type:
```bash
$ sudo docker build -t="sergiofgonzalez/express:python" .
```

You can configure the *PORT* on which the application will be exposed and the directory on the container that will hold the application by running:

```bash
$ sudo docker build --build-arg APP_PORT=6000 --build-arg APP_DIR=/var/app -t="sergiofgonzalez/express" .
```

## Run Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined). Otherwise, you will need to adapt the paths of the mapped volumes.
```bash
$ sudo docker run -d -p 5000 --network=app --name express-app \
-v $PWD/shoutbox_express_app:/var/www/app sergiofgonzalez/express:python
```

If anything fails, you can start the container interactively and run the commands yourself using:
```bash
$ sudo docker run -i -t -p 5000 --network=app --name express-app \
-v $PWD/shoutbox_express_app:/var/www/app sergiofgonzalez/express:python /bin/bash
```
Otherwise, running `docker logs` you should be able to see something similar to:
```bash
...
index:server ERROR_ROUTE = true
index:server Entries per page = 3
full-express-app:server Listening on Port 5000
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