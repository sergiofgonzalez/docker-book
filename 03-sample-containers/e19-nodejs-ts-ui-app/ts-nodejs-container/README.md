# Docker Container starter kit for a Node.js app written in TypeScript
> starter `Dockerfile` to containerize any Node.js application written in TypeScript

This is the working directory for a container running a Node.js application written in TypeScript on top of Node.js official image.

The directory `./ts-nodejs-ui-app/` contains a simple application written in TypeScript.

## Build Instructions

First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is found).

Then type:
```bash
docker build -t="sergiofgonzalez/ts-nodejs-container" .
```

## Run Instructions

In order to run the container and expose the same port (5000) used within the container, type:

```bash
docker run -d -p 5050:5050 --name ts-nodejs-ui-app-container sergiofgonzalez/ts-nodejs-container
```

To open an interactive session within the container (for inspection):
```bash
docker exec -i -t ts-nodejs-ui-app-container /bin/sh
```

| NOTE: |
| :---- |
| The references to variables (e.g. directory paths, port, etc.) found in the `Dockerfile` have been hardcoded for simplicity. Feel free to use build arguments to parameterize them as required. |

## Debugging while building the image

An effective way to debug/inspect an image you're building consists of commenting out the sections you don't want to run (e.g. `RUN npm run build`) then build the image using:

```bash
docker build -t="sergiofgonzalez/ts-nodejs-container" .
```

and finally run the container in interactive mode:

```bash
docker run -i -t --name ts-nodejs-container sergiofgonzalez/ts-nodejs-container:latest /bin/sh
```
