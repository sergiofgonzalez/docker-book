# 03 &mdash; NGINX web server with custom configuration
> NGINX web server container based on Ubuntu Linux with custom configuration of the web server

## Description
This file contains technical details describing how the container image was built and some info about the decisions taken.

For details about how to build the container image and create a container from it, please refer to the container's [README.md](./nginx-container/README.md).

The container specification found in [./nginx-container](./nginx-container/) is an NGINX Docker container specification that allows you to fine-tune the web server configuration with external files.

The [./nginx-container/nginx_config](./nginx-container/nginx_config) contains a file with the global *NGINX* configuration, which sets the NGINX to listen on port 80 and serves whatever it finds in `/var/www/html/website`, and a file with additional configuration that tells NGINX to run in the foreground and sets some other config options (such as compression, location of error logs, etc.)

Note that running Docker in the foreground is **required**, because Docker containers rely on the running process inside the container to remain active. If we would start *NGINX* in the default mode (daemonized), the default would automatically stop (what i call *collapse*) briefly after starting the container.

A sample website is provided for testing, and that simple website is not part of the image, but it is mapped instead. This allow us to change the website that is being served without having to restart the server or interact with the running container.

The syntax for mapping is:
```bash
-v dir_or_mount_on_local_fs:dir_on_container
```
