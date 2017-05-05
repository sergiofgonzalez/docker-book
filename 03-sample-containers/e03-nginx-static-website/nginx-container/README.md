# Docker Container for NGINX web server
> containerized *NGINX* allowing fine-tuning via files placed in the build environment

This is the working directory for a container running **NGINX** web server on top of Ubuntu 16.04 official image. It is intended for testing static websites.

The directory `./nginx_config` contains *NGINX* config files that can be fine-tuned for your purposes including:
+ The port on which the static website will be served, configured for standard HTTP port 80
+ The *NGINX* running on the foreground, rather than as a daemon
+ The directory from which the website will be served, configured for `/var/www/html/website`

The directory `./sample_website` contains a simple HTML5/JavaScript/CSS application that can be used to validate that the web server is correctly serving websites. This can be updated with any static site following the information found in the [Run Instructions](#run-instructions) section.


## Build Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined).
Then type:
```bash
$ sudo docker build -t="sergiofgonzalez/nginx" .
```

## Run Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined). Otherwise, you will need to adapt the paths of the mapped volumes.
```bash
$ sudo docker run -d -p 80 --name nginx-container \
-v $PWD/sample_website:/var/www/html/website sergiofgonzalez/nginx nginx
```

Note that:
+ We're mapping port 80 on the container to a random TCP port. To check the port on which the static website is being served you can use `docker ps` and inspect the *PORTS* section.
For example, if you get `0.0.0.0:32770->80/tcp`.

You will be able to check the website by pointing your browser to http://localhost:32770 on the Docker host, and if you're using a VM to host the Docker host, you can also point your browser to `http://{vm-address}:32770`.

+ We're invoking `nginx` command on the started container (that could be also included on the Dockerfile in a `CMD` statement)

To open an interactive session within the container (for inspection):
```bash
$ sudo docker exec -i -t nginx-container /bin/bash
```