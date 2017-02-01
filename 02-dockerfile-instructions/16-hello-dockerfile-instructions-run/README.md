# 20-hello-dockerfile-instructions-run
> execute a command on the current image

## Description
Use the `RUN` instruction to execute commands on the current image. By default, `RUN` instructions executes inside a shell using the the command wrapper `/bin/sh -c`. You can prevent such wrapping by using the *array syntax*: `RUN ["apt-get", "install", "-y", "nginx"]`.


### Build Instructions
```bash
$ sudo docker build -t=sergiofgonzalez/run-container-img .
```

### Run Instructions
Type:
```bash
$ sudo docker run -it sergiofgonzalez/run-container-img
```
