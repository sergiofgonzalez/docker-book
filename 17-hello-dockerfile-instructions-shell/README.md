# 17-hello-dockerfile-instructions-shell
> set the default shell for the subsequent Dockerfile instruction and the container

## Description
Use `SHELL` instruction to configure the shell that will be used for the subsequent instructions in the Dockerfile and ultimately in the container.


### Build Instructions
To use the default value type:
```bash
$ sudo docker build -t="sergiofgonzalez/shell-container-img" .
```

### Run Instructions
Type:
```bash
$ sudo docker run -i -t sergiofgonzalez/shell-container-img
/bin/bash
```
