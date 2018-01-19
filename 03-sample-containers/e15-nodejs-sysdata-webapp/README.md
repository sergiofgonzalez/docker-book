# e15 &mdash; Node.js hostname web app container reporting hostname
> a very simple Node.js web application that responds with some system data of the machine it's running in

## Description
This file contains technical details describing how the container image was built and some info about the decisions taken.

For details about how to build the container image and run it, please refer to the container's [README.md](./nodejs-sysdata-webapp-container/README.md).

The container specification found in [./nodejs-sysdata-webapp-container](./nodejs-sysdata-webapp-container/) is a simple Node.js web app Docker container specification that responds with a JSON document containing some system data (hostname, architecture...) of the machine it is running in.
