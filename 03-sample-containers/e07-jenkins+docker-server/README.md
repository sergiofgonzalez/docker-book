# 07 &mdash; Jenkins+Docker Server 
> Jenkins container that runs tests inside containers

## Description
This file contains technical details describing how the container image was built and some info about the decisions taken.

For details about how to build the container image and run it, please refer to the container's [README.md](./jenkins+docker-container/README.md).

The `Dockerfile` in [./jenkins+docker-container](./jenkins+docker-container/) uses the official Jenkins image from *Docker Hub*. A custom directory `jenkins_home/` is created to hold the configuration so that we don't have to recreate it for each container run.
