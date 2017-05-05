# 06 &mdash; Express+Redis Stack
> Setting up an application based on Express and Redis on top of Docker Networking

## Description
This file contains technical details describing how the applications was set up.

For details about how to build the container images and run the containers from it, please refer to the containers' README.md files.

This example requires the creation of a *Docker network*. It is assumed that this network is called `app`. Therefore, you'll have to run the network creation command first:

```bash
$ sudo docker network create app
```

Then, you can proceed to create the images and run the containers:
1. For info on starting the *Redis container* on the `app` network, review [Redis Ubuntu](./redis-ubuntu/)
2. For details on starting the *Express app container* on the `app` network, review [Express Container](./express-container/)

Note that you will not have to hardcode any IP address, but rather, will use the Redis container name (`redis-db` if you follow the instructions) in the Express application configuration when connecting to the Redis backend.