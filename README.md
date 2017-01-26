# Docker Book
> Examples from the book *The Docker Book, v.1.12.4* by James Turnbull (Manning, 2016)

## 01-hello-images-with-dockerfile
Illustrates how to create an user image that includes the *NGINX* server using a Dockerfile.

## 02-debugging-image-creation
Illustrates how to debug the image creation process when the execution of the `Dockerfile` fails.

## 03-exploring-docker-build-cache
Illustrates how does Docker benefits from the build cache when building images, and how to control from the Dockerfile where it should be used or not.

## 04-hello-nginx-web-server
Illustrates how to create an image on *Ubuntu* with the *NGINX* web server installed on it and how to create containers from it.

## 05-hello-dockerfile-instructions-cmd
Illustrates a use-case scenario for the `CMD` instruction, which runs a command after the container has been launched.

## 06-hello-dockerfile-instructions-entrypoint
Illustrates a use-case scenario for the `ENTRYPOINT` instruction, which specifies the default command for the container (it's *entrypoint* command).

## 07-hello-dockerfile-instructions-cmd-entrypoint
Illustrates a use-case scenario mixing both the `ENTRYPOINT` and `CMD` instruction to provide a default behavior for the container.

## 08-hello-dockerfile-instructions-workdir
Illustrates the usage of `WORKDIR` to establish the working directory for the container and therefore for the `ENTRYPOINT` and `CMD` instructions.

## 09-hello-dockerfile-instructions-env
Illustrates the usage of `ENV` to define environment variables that will be available for other subsequent instructions, as well as for the processes running in the container.

## 10-hello-dockerfile-instructions-user
Illustrates the usage of `USER` to establish the user the image should be run as.

