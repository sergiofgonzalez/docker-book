# e20 &mdash; sleeping container
> container that sleeps forever, useful for testing and debugging purposes

## Description
This file contains technical details describing how the container image was built and some info about the decisions taken.

For details about how to build the container image and run it, please refer to the container's [README.md](./sleeping-container/README.md).

The container specification found in [./sleeping-container](./ts-nodejs-container/) is a simple `Dockerfile` that executes a shell command that keeps the container running without doing anything useful. It can be used for testing and debugging purposes (e.g. validating networking configuration, etc.)
