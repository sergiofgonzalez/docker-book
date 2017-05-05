# 02 &mdash; REDIS 3.2, Alpine-based container with volume mapping
> a REDIS 3.2 server container based on Alpine Linux with volume mapping for the data

## Description
This file contains technical details describing how the container image was built and some info about the decisions taken.

For details about how to build the container image and create a container from it, please refer to the container's [README.md](./redis-32-alpine-container/README.md).

The container specification found in [./redis-32-alpine-container](./redis-32-alpine-container/) is a simple REDIS 3.2 server Docker container specification that allows you to map the `redis-data/` to `/data` inside the container.


The datastore is exposed on port `6379` without user or password. Therefore, you'll be able to connect programmatically using the *url*: `redis://localhost:6379`.
