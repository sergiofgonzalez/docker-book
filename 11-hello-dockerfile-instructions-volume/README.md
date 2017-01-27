# 11-hello-dockerfile-instructions-volume
> adding directories that bypasses the Union File System to a container

## Description
Use `VOLUME` instruction to add a directory to a container to provide any of the following persistence/data sharing capabilities:
+ share/reuse directories between containers
+ need to perform changes to files outside of the container, and/or when the container is not running
+ when you can't or shouldn't include directories on an image

Typically, `VOLUME` is used to let a container use the source code of an app, or the database data file or logs, without including that information on the image. This ensures that the container is stateless.

Although not strictly necessary, the `VOLUME` instruction is typically paired with the `-v` flag in the `docker run` command, that lets you map a directory inside the container, identified with the `VOLUME` instruction with a Docker host directory:
```bash
# This will sync Docker host directory $PWD/data with Docker directory used in VOLUME
# You will be able to see interact with the contents while the container is running
$ sudo docker run -i -t -v $PWD/data:/data sergiofgonzalez/volume-container-img
root
```

### Build Instructions
Type:
```bash
$ sudo docker build -t="sergiofgonzalez/volume-container-img" .
```
### Run Instructions
Type:
```bash
# This will run bash in the container and will let you interact with one of the VOLUME directories
$ sudo docker run -i -t -v $PWD/data:/data sergiofgonzalez/volume-container-img
nobody
```
