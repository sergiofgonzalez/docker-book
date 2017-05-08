# Docker Container for Apache Tomcat 7
> Tomcat 7 container custom built on top of the Ubuntu image.

This is the working directory for a container running Apache Tomcat servlet container built on top of Ubuntu 16.04 official image. 

## Build Instructions

First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined).
Then type:
```bash
$ sudo docker build -t sergiofgonzalez/tomcat7-container .
```

## Run Instructions
To start the container type:

```bash
$  sudo docker run --name tomcat7-container \
--volumes-from sample-java-app-container -d -P sergiofgonzalez/tomcat7-container
```

**NOTES**
+ `-P` is used to publish all exposed ports from the container to random ports on the Docker host 
+ `--volumes-from` is used to link all the volumes from the given container so that they are available in the one we're starting. Note also that `/var/lib/tomcat7/webapps/` is not defined with the `VOLUME` command in *Tomcat* container.

Once successfully started, you will be able to check that the WAR has been successfully deployed by pointing your browser to:
`http://localhost:${port-from-the-container}:8080/sample`.

You can obtained the port from the container running:
```bash
$ sudo docker port tomcat7-container
8080/tcp -> 0.0.0.0:32771
```