# Docker Container starter kit for a Node.js app
> starter `Dockerfile` to containerize any Node.js application

This is the working directory for a container running a Node.js application on top of Node.js official image.

The directory `./nodejs-ui-app/` contains a simple application built in Node.js.

## Build Instructions

First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is found).

Then type:
```bash
docker build -t="sergiofgonzalez/nodejs-container" .
```

## Run Instructions

In order to run the container and expose the same port (5000) used within the container, type:

```bash
docker run -d -p 5000:5000 --name nodejs-ui-app-container \
sergiofgonzalez/nodejs-container
```

To open an interactive session within the container (for inspection):
```bash
docker exec -i -t nodejs-ui-app-container /bin/sh
```

| NOTE: |
| :---- |
| The references to variables (e.g. directory paths, port, etc.) found in the `Dockerfile` have been hardcoded for simplicity. Feel free to use build arguments to parameterize them as required. |