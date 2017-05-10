# 10 &mdash; Node.js Express/Redis Multicontainer Stack
> Setting up an application based on Express and Redis on top of Docker Networking

## Description
This file contains technical details describing how the applications were set up.

For details about how to build the container images and run the containers from it, please refer to the containers' README.md files.

In a nutshell, we have:
+ A Node.js container to serve the Express application, linked to
+ A Redis primary container to hold and cluster application state, linked to
+ Two Redis replica containers to cluster our state
+ A container featuring Logstash to capture our application logs

1. Create a *Docker network* called `express`:
```bash
$ sudo docker network create express
```
2. Build the *Redis Base* image that will be used to create both the Redis primary and replicas, following the details on [Redis Base](./redis-base/)
3. Start the *Redis Primary container* on the `express` network, following the details on [Redis Primary](./redis-primary/)
4. Start a couple of *Redis Replicas* on the `express` network, following the details on [Redis Replica](./redis-replica/)
5. Start the *Express container* with the Node.js Express application on the `express` network, following the details on [Express Container](./express-container/) 
6. Start the *Logstash container* on the `express` network, following the details on [Logstash Container](./logstash/)

