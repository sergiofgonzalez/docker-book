# Docker Container for Consul
> containerized Consul

This is the build environment for a container running Consul, the service discovery tool. The tool is built on top of the official Ubuntu 16.04 image instead of using the official image.

The `consul.json` contains a sample *Consul configuration file*.


## Build Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined). Make sure that you're not ignoring the `consul.json` file directory on the build, as the image will be built with the configuration file inside it.
Then type:
```bash
$ sudo docker build -t sergiofgonzalez/consul .
```


## Run Instructions

First, make sure that you're on the container build environment (that is, you should be in the same directory where the `Dockerfile` is defined).

```bash
$ sudo docker run -d -p 8500:8500 -p 53:53/udp -h node1 --name node1 sergiofgonzalez/consul -server -bootstrap
```

You can check the logs in the usual way using `docker logs node1` and also you can point your browser to http://localhost:8500 to review the *Consul UI*.
