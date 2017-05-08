# Docker Container for Fetching a WAR file
> container that retrieves file from URL and place it in a specific dir

This is the working directory for a container that uses `wget` to retrieve a *WAR* file from a URL and place it in a specific directory.

## Build Instructions

First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined).
Then type:
```bash
$ sudo docker build -t sergiofgonzalez/war-file-fetcher-container .
```

## Run Instructions
To start the container type:

```bash
$ sudo docker run -i -t --name sample-java-app-container sergiofgonzalez/war-file-fetcher-container \
https://tomcat.apache.org/tomcat-7.0-doc/appdev/sample/sample.war
```

Once successfully executed, you'll be able to verify the contents by typing:
```bash
$ sudo docker inspect -f "{{ range .Mounts }}{{.}}{{end}}" sample-java-app-container
```

and browsing the contents of the directory returned by the previous command.
