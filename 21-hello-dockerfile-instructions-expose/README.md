# 21-hello-dockerfile-instructions-expose
> announce the port that an application will use in the container

## Description
Use the `EXPOSE` instruction to tell Docker that the application runnin in this container will use this specific port on the container. The port will not be opened automatically, so typically, the `EXPOSE` instruction should be paired with `-p` flag of the `docker run` command.

You can also expose ports at run time using the `--expose` option.




### Build Instructions
```bash
$  sudo docker build -t=sergiofgonzalez/expose-container-img .
```

### Run Instructions
Type:
```bash
$ sudo docker run -d -p 5000:80 sergiofgonzalez/expose-container-img
```

The message will be exposed on port 5000 in the Docker host and on port 80 on the container. Thus, if we assume that the container is running on 172.17.0.2 (by looking at `IPAddress` value when running `docker inspect`).
+ http://172.17.0.2:80
+ http://localhost:8080

And if the Docker host is a VM with ip address 192.168.56.1, with a *Host-only Adapter* you can also access:
+ http://192.168.56.1:8080