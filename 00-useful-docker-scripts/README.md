# 00-useful-docker-scripts
> collection of useful docker scripts

## Description
The following scripts have been tested:

+ `cleanup-containers.sh` &mdash; removes all the containers with `status=exited`
+ `cleanup-containers+volumes.sh` &mdash; removes all the containers and associated volumes with `status=exited`


In the project, a *Docker build context* named `static_web` is created. Inside that folder, we create the `Dockerfile` with the basic set of instructions needed to create an Ubuntu container with *NGINX* installed on it.

In the Dockerfile we use the following commands:
+ `FROM` &mdash; specifies the base image
+ `MAINTAINER` &mdash; specifies the author and email of the image owner
+ `RUN` &mdash; execute instructions as if written in `/bin/sh -c`
+ `EXPOSE` &mdash; tells Docker that the image will use that specific port on the container

To build the image, you must `cd` into the *build context* and run:
```bash
$ cd static_web
$ sudo docker build -t="sergiofgonzalez/static_web" .
```

Then, you will be able to verify that the image has been correctly created running `sudo docker images`.
