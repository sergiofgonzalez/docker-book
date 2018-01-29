# e16 &mdash; Node.js unhealthy web app container
> a very simple Node.js web application that includes an artificial failure to test container restart mechanisms

## Description
This file contains technical details describing how the container image was built and some info about the decisions taken.

For details about how to build the container image and run it, please refer to the container's [README.md](./nodejs-unhealthy-webapp-container/README.md).

The container specification found in [./nodejs-unhealthy-webapp-container](./nodejs-unhealthy-webapp-container/) is a simple Node.js web app Docker container specification that responds with an HTTP status code 500 from the fifth request onwards to simulate an error. In the first five non-error requests, a JSON document containing some system data (hostname, architecture...) of the machine it is running in is returned.
