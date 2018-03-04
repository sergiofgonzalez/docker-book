# e14-nodejs-batch-app
> a very simple, one-off, batch application built on Node.js

## Description
A very simple application that prints a message in a console every second, for 15 seconds and then ends. The application is used as as an example for a *Job Resource* in Kubernetes.

To build the image for the Kubernetes example type:

```bash
$ sudo docker build -t="sergiofgonzalez/nodejs-batch-app" .
```

