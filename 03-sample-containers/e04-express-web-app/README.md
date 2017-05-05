# 04 &mdash; Exoress web app
> Serving a dynamic application using Node.js Express framework

## Description
This file contains technical details describing how the container image was built and some info about the decisions taken.

For details about how to build the container image and create a container from it, please refer to the container's [README.md](./express-container/README.md).

The container specification found in [./express-container](./express-container/) is a series of commands and Docker instructions that set up the environment for the Express based application to run.

The container assumes some pre-defined structure of the web application, so for a more general purpose you might need to update the `Dockerfile` and rebuild the image. 

A sample Epress application is provided for validation. That application is not part of the image so it can be mapped to whatever other application *that follows the same project structure*.

Note also that the application is started without reload enabled, so you should restart the container to see the changes if the application source code is changed.
