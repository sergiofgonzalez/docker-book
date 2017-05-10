# Docker Container for Flask (Python) based web app
> containerized Flask web application

This is the build environment for a container running a simple Python, Flask-based web application.

The directory `./sample_flask_app` contains a simple Flask app that uses *Redis* key-value store as the backend for the persistence layer.


## Build Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined). Make sure that you're not ignoring the `sample_flask_app/` directory on the build, as the image will be built with the application inside it.
Then type:
```bash
$ sudo docker build -t sergiofgonzalez/flask .
```


## Run Instructions
Please refer to the instructions on the [README](../README.md) as this example illustrates how to use *Docker Compose*.
