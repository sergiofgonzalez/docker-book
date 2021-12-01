# Sleeping Docker Container
> simple `Dockerfile` for a container that is kept alive indefinitely through a *while true sleep*

This is the working directory for a container that is kept alive indefinitely without doing anything special. It is intended to be used for testing and debugging purposes.

## Build Instructions

First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is found).

Then type:
```bash
docker build -t="sergiofgonzalez/sleeping-container" .
```

## Run Instructions

```bash
docker run -d --name sleeping-container sergiofgonzalez/sleeping-container
```

To open an interactive session within the container (for inspection):
```bash
docker exec -i -t sleeping-container /bin/sh
```

## Tagging and Pushing to Docker Hub

First make sure that you have created and tagged the Docker image in accordance with Docker Hub requirements:

```
$ docker images
REPOSITORY                                                                         TAG                 IMAGE ID       CREATED         SIZE
sergiofgonzalez/sleeping-container                                                 latest              51558c17bfc2   3 minutes ago   8.82MB
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
$ docker push sergiofgonzalez/slee
ping-container
Using default tag: latest
The push refers to repository [docker.io/sergiofgonzalez/sleeping-container]
1ac90ff58608: Pushed
8d3ac3489996: Mounted from library/alpine
latest: digest: sha256:1b97577f945b9f6befc3e6ba16691a424eab92fdba9391f6bbe3361c663fe2ab size: 739
```

## Tagging and Pushing to Azure Container Registry (ACR)

The first step consists in identifying the Container Registry that you want you use. In the Container registries main page, you will find a field named *Login server* that will tell you what is the name to use when doing `docker login`. Let's assume the name is `myacrtests.azurecr.io`.

Then click on *Access keys* to obtain the username and password for the registry.

Then you will have to make sure that you have created and tagged the Docker image in accordance with ACR requirements:

```bash
$ docker tag sergiofgonzalez/sleeping-container:latest `myacrtests.azurecr.io/sergiofgonzalez/sleeping-container:latest
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
$ docker push myacrtests.azurecr.io/sergiofgonzalez/sleeping-container
Using default tag: latest
The push refers to repository [myacrtests.azurecr.io/sergiofgonzalez/sleeping-container]
...
eb4bde6b29a6: Pushed
latest: digest: sha256:5edfa0c14af3ce967f79b3e0ea78feb055a7fa430ef3f42149afcf05edd91c14 size: 2208
```

## Tagging and Pushing to Amazon Elastic Container Registry (ECR)

First make sure that you have created the corresponding repository in the ECR, for example: `sergiofgonzalez/sleeping-container`.

Then click on the *view push commands* to see the commands you have to use to login to the ECR and push the image:

```bash
# login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# tag the image
docker tag sergiofgonzalez/sleeping-container:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/sergiofgonzalez/sleeping-container:latest

# push the image
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/sergiofgonzalez/sleeping-container:latest
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
docker tag sergiofgonzalez/sleeping-container:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/sergiofgonzalez/sleeping-container:latest
```

Pushing:
```bash
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/sergiofgonzalez/sleeping-container:latest
The push refers to repository [<account-id>.dkr.ecr.us-east-1.amazonaws.com/sergiofgonzalez/sleeping-container]
...
latest: digest: sha256:5edfa0c14af3ce967f79b3e0ea78feb055a7fa430ef3f42149afcf05edd91c14 size: 2208
```

