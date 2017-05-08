# Docker Container for Apache HTTP Server
> Apache container custom built on top of the Ubuntu image.

This is the working directory for a container running Apache HTTP server built on top of Ubuntu 16.04 official image. 

## Build Instructions

First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined).
Then type:
```bash
$ sudo docker build -t="sergiofgonzalez/apache" .
```

## Run Instructions
To start the container type:

```bash
$ sudo docker run -d -P --volumes-from jekyll-container --name apache-container sergiofgonzalez/apache
```
**NOTES**
+ `-P` is used to publish all exposed ports from the container to random ports on the Docker host 
+ `--volumes-from` is used to link all the volumes from the given container so that they are available in the one we're starting. Note also that `/var/www/html` is defined with the `VOLUME` command in both containers.
