# e14 &mdash; Node.js application container
> Running a Node.js application within a container

## Description
This file contains technical details describing how the container image was built and some info about the decisions taken.

For details about how to build the container image and create a container from it, please refer to the container's [README.md](./nodejs-container/README.md).

The container specification found in [./nodejs-container](./nodejs-container/) is a series of commands and Docker instructions that set up the environment for the Node.js based application to run.

The container assumes some pre-defined structure for the Node.js application, so for a more general purpose you might need to update the `Dockerfile` and rebuild the image.

A sample Node.js application is provided for validation. That application is part of the image, so you will need to build a different image if you intend to use a different application.
