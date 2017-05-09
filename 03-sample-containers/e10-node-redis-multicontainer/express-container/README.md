# Docker Container for Express based web app
> containerized full Express web application

This is the build environment for a container running a Node.js, Express-based web application on top of Ubuntu 16.04 official image. 

The directory `./nodeapp` contains a complete Express app that requires *Redis* key-value store as the backend for the persistence layer and Python support for handling password salting and encryption through the `bcrypt` module.
The application configuration file `application.yml` contains entries for the backend specification:
```yml
db:
  host: redis-primary
  port: 6379
```

Those entries can be overridden if necessary using environment variables.


## Build Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined). Make sure that you're not ignoring the `nodeapp/` directory on the build, as the image will be built with the application inside it.
Then type:
```bash
$ sudo docker build -t sergiofgonzalez/express .
```


## Run Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined).
```bash
$ sudo docker run -d --name express-app -p 5000:5000 --network express sergiofgonzalez/express
```

The application logging is somewhat mixed using both `express-logger` and `debug` modules. The latter displays the information on stdout, so you can have a look at the logs running `docker logs`. The *Express* related information (such as request information, etc.) will be logged to file, so you will have to use a container to see it:

```bash
 $ sudo docker run -it --rm --volumes-from express-app \
 ubuntu \
 cat /var/log/nodeapp/nodeapp.log
 ```
