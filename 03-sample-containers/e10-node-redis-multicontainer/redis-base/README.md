# Redis Base Image
> Redis key-value store docker image, custom built on top of the Ubuntu image.

This is the build for a container running Redis key-value store, built on top of Ubuntu 16.04 official image. 

## Build Instructions

First, make sure that you're on the build environment dir (that is, you should be in the same directory where the `Dockerfile` is defined).
Then type:
```bash
$ sudo docker build -t sergiofgonzalez/redis-base .
```

**Note**
This image is not intended to be run directly. Instead, it will be used as a base image for Primary a Replica nodes.