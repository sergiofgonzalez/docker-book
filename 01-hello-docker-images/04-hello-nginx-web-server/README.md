# 04 &mdash; Launching an NGINX web server from an image
> building a Docker image on Ubuntu with NGINX web server and spinning containers from it

## Description
Based on the previous examples, we build an user image from `ubuntu:16.04` and install `nginx` web server on top.

To build the image, you must `cd` into the *build context* and run:
```bash
$ cd static_web
$ sudo docker build -t="sergiofgonzalez/static_web:v0" .
```

Then, you will be able to verify that the image has been correctly created running `sudo docker images`.

After that, you can run a container from the recently created image using:
```bash
$ sudo docker run -d -p 8080:80 --name static_web_8080 sergiofgonzalez/static_web:v0 nginx -g "daemon off;"
```

This will create a new container with the name `static_web_8080` which will have *NGINX* running and exposing port 80 to the docker host and also to real machine hosting the Virtual Machine hosting the container:
+ From your Docker host (VM running the Docker container):
  + curl $(sudo docker inspect static_web_8080 --format '{{.NetworkSettings.IPAddress}}'):80 => will return the message
  + curl http://localhost:8080 => will return the message
+ From your Virtual Machine host (physical machine running VirtualBox):
  + Open Chrome on http://{{vm-ip-address}}:8080 => will return the message