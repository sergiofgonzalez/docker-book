# 01 &mdash; Python Flask web app with Redis backend Stack using Docker Compose
> Setting up a Python application based on Flask framework with a Redis backend managed by Docker Compose

## Description
This file contains technical details describing the *Docker Compose* considerations.

For details about how to build the Flask container image, please refer to the container [README.md](./python-flask-container).

In this example, we use *Docker Compose* to run:
+ A Python container to serve the Flask application, linked to
+ A Redis backend that holds the application state


The application is a web server that responds with a simple message that includes information from the Redis backend.

## Run Instructions

First, make sure that you're inside the directory with the docker-compose.yml file.
Then type:

```bash
$ sudo docker-compose up
```

This will create two containers as specified in the `docker-compose.yml` file and will display the logs from both containers on stdout.
