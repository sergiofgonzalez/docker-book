# e21 &mdash; TypeScript Node.js container using a multi-stage build
> container starter for a Node.js application written in TypeScript, this time using a multi-stage build to create a leaner image, and configured with a user other than *root* for extra security

## Description
This file contains technical details describing how the container image was built and some info about the decisions taken.

For details about how to build the container image and run it, please refer to the container's [README.md](./staged-ts-nodejs-container/README.md).

The container specification found in [./staged-ts-nodejs-container](./staged-ts-nodejs-container/) is a simple Node.js app written in TypeScript `Dockerfile` that can be used as a starter point for any Node.js TypeScript app.

For details about the application capabilities, please refer to the application's [README.md](staged-ts-nodejs-container/ts-nodejs-ui-app/README.md).
