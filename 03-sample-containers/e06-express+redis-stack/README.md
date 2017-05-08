# 06 &mdash; Express+Redis Stack
> Setting up an application based on Express and Redis on top of Docker Networking

## Description
This file contains technical details describing how the applications were set up.

For details about how to build the container images and run the containers from it, please refer to the containers' README.md files.

In a nutshell, you'll have to:

1. Create a *Docker network* called `app`:
```bash
$ sudo docker network create app
```
2. Start the *Redis container* on the `app` network, following the details on [Redis Ubuntu](./redis-ubuntu/)

3. Start the *Express app container* on the `app` network, review [Express Container](./express-container/)

Note that you will not have to hardcode any IP address, but rather, will use the Redis container name (`redis-db` if you follow the instructions) in the Express application configuration when connecting to the Redis backend.