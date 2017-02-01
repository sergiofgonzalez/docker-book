# 05-hello-docker-hub
> pushing user images to the Docker Hub

## Description
The example demonstrates how to push a custom image of *NGINX* with a simple message in the `/var/www/html/` directory to the Docker Hub.

### Build Instructions

Within the `static_web_nging` build environment type:
```bash
$ sudo docker --no-cache build -t="sergiofgonzalez/static_web_nginx" .
```
### Push Instructions
Type:
```bash
$ sudo docker push sergiofgonzalez/static_web_nginx
```

### Pull Instructions
To use the recently pushed image type:
```bash
$ sudo docker pull sergiofgonzalez/static_web_nginx
```