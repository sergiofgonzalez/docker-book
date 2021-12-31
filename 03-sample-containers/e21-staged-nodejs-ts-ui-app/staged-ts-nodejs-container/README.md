# Docker Container starter kit using a multi-stage build for a Node.js app written in TypeScript
> starter `Dockerfile` using a multi-stage build to containerize any Node.js application written in TypeScript

This is the working directory for a container using multi-stage build running a Node.js application written in TypeScript on top of Node.js official image. The container is configured to run with a non-root user.

The directory `./ts-nodejs-ui-app/` contains a simple application written in TypeScript.

## Build Instructions

First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is found).

Then type:
```bash
docker build -t="sergiofgonzalez/staged-ts-nodejs-container" .
```

## Run Instructions

In order to run the container and expose the same port (5050) used within the container, type:

```bash
docker run -d -p 5050:5050 --name staged-ts-nodejs-ui-app-container sergiofgonzalez/staged-ts-nodejs-container
```

To open an interactive session within the container (for inspection):
```bash
docker exec -i -t staged-ts-nodejs-ui-app-container /bin/sh
```

| NOTE: |
| :---- |
| The references to variables (e.g. directory paths, port, etc.) found in the `Dockerfile` have been hardcoded for simplicity. Feel free to use build arguments to parameterize them as required. |

To run the application on a port other than the default 5050 you can either do:

```bash
docker run -d -p 8080:5050 --name staged-ts-nodejs-ui-app-container sergiofgonzalez/staged-ts-nodejs-container
```

which will expose the application to the outside on port 8080, or configure a PORT environment variable when running the app:

```bash
docker run -d --env PORT=8080 -p 8080:8080 --name staged-ts-nodejs-ui-app-container sergiofgonzalez/staged-ts-nodejs-container
```

which will also cause the container to use the port 8080.

## Debugging while building the image

An effective way to debug/inspect an image you're building consists of commenting out the sections you don't want to run (e.g. `RUN npm run build`) then build the image using:

```bash
docker build -t="sergiofgonzalez/staged-ts-nodejs-container" .
```

and finally run the container in interactive mode:

```bash
docker run -i -t --rm --name staged-ts-nodejs-container sergiofgonzalez/staged-ts-nodejs-container:latest /bin/sh
```

| NOTE: |
| :---- |
| The `--rm` parameter is used to remove the container upon exiting, as you don't want to keep it around once you're done. |

## Tagging and Pushing to Docker Hub

First make sure that you have created and tagged the Docker image in accordance with Docker Hub requirements:

```
$ docker images
REPOSITORY                                      TAG                 IMAGE ID       CREATED        SIZE
sergiofgonzalez/ts-nodejs-container             latest              b75cef5960d9   3 days ago     304MB
...
```

Then, log in the Docker Hub:

```bash
$ docker login
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username: sergiofgonzalez
Password:
WARNING! Your password will be stored unencrypted in /home/ubuntu/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded
```

Right after that, you're ready to push the image:

```bash
$ docker push sergiofgonzalez/ts-nodejs-container
Using default tag: latest
The push refers to repository [docker.io/sergiofgonzalez/ts-nodejs-container]
de4f20deb033: Layer already exists
9b3a61066d0c: Layer already exists
55743aec4525: Layer already exists
5f059b8d7e44: Layer already exists
ced6ab4490e4: Layer already exists
fbb780c68308: Layer already exists
07839c439cf9: Layer already exists
1a57cb2912c8: Layer already exists
eb4bde6b29a6: Layer already exists
latest: digest: sha256:5edfa0c14af3ce967f79b3e0ea78feb055a7fa430ef3f42149afcf05edd91c14 size: 2208
```

## Tagging and Pushing to Azure Container Registry (ACR)

The first step consists in identifying the Container Registry that you want you use. In the Container registries main page, you will find a field named *Login server* that will tell you what is the name to use when doing `docker login`. Let's assume the name is `myacrtests.azurecr.io`.

Then click on *Access keys* to obtain the username and password for the registry.

Then you will have to make sure that you have created and tagged the Docker image in accordance with ACR requirements:

```bash
$ docker tag sergiofgonzalez/ts-nodejs-container:latest `myacrtests.azurecr.io/sergiofgonzalez/ts-nodejs-container:latest
```

Then login to Azure Container registry using the information identified above for `myacrtests`:
```bash
$ docker login myacrtests.azurecr.io
Username: myacrtests
Password:
WARNING! Your password will be stored unencrypted in /home/ubuntu/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded
```

Then push the image as you would do to DockerHub:

```bash
$ docker push myacrtests.azurecr.io/sergiofgonzalez/ts-nodejs-container
Using default tag: latest
The push refers to repository [myacrtests.azurecr.io/sergiofgonzalez/ts-nodejs-container]
de4f20deb033: Pushed
9b3a61066d0c: Pushed
55743aec4525: Pushed
5f059b8d7e44: Pushed
ced6ab4490e4: Pushed
fbb780c68308: Pushed
07839c439cf9: Pushed
1a57cb2912c8: Pushed
eb4bde6b29a6: Pushed
latest: digest: sha256:5edfa0c14af3ce967f79b3e0ea78feb055a7fa430ef3f42149afcf05edd91c14 size: 2208
```

## Tagging and Pushing to Amazon Elastic Container Registry (ECR)

First make sure that you have created the corresponding repository in the ECR, for example: `sergiofgonzalez/ts-nodejs-container`.

Then click on the *view push commands* to see the commands you have to use to login to the ECR and push the image:

```bash
# login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# tag the image
docker tag sergiofgonzalez/ts-nodejs-container:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/sergiofgonzalez/ts-nodejs-container:latest

# push the image
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/sergiofgonzalez/ts-nodejs-container:latest
```

Execute them replacing the account-id with the proper account ID of your AWS account. Note that you might need to use `--profile` to identify the credentials to use.

Logging in:

```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
WARNING! Your password will be stored unencrypted in /home/ubuntu/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded
```

Tagging:
```bash
docker tag sergiofgonzalez/ts-nodejs-container:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/sergiofgonzalez/ts-nodejs-container:latest
```

Pushing:
```bash
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/sergiofgonzalez/ts-nodejs-container:latest
The push refers to repository [<account-id>.dkr.ecr.us-east-1.amazonaws.com/sergiofgonzalez/ts-nodejs-container]
de4f20deb033: Pushed
9b3a61066d0c: Pushed
55743aec4525: Pushed
5f059b8d7e44: Pushed
ced6ab4490e4: Pushed
fbb780c68308: Pushed
07839c439cf9: Pushed
1a57cb2912c8: Pushed
eb4bde6b29a6: Pushed
latest: digest: sha256:5edfa0c14af3ce967f79b3e0ea78feb055a7fa430ef3f42149afcf05edd91c14 size: 2208
```

