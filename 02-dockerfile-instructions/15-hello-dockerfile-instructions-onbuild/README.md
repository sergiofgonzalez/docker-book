# 19-hello-dockerfile-instructions-onbuild
> add triggers to images that will be run when the image is used as the basis for another image

## Description
Use the `ONBUILD` instruction to trigger an action that will be executed when the image is used as the basis for another image. The trigger will insert the new instructions as if it were specified right after the `FROM` instruction. The trigger can be any build instruction (`FROM`, `MAINTAINER` and `ONBUILD` are not allowed).


In the example we have two build environments:
+ 01-onbuild-container &mdash; the build environment for an image that sets up *apache2* HTTP server and features an `ONBUILD` instruction to add the contents of the build environment to `/www/var/html`, which is the directory used to serve the static files.
+ 02-webapp-container &mdash; the build environment for an image that uses the previously created image and publishes a web application in *apache*.




### Build Instructions
cd into `01-buid-container` and run:
```bash
$ sudo docker build -t=sergiofgonzalez/apache2-img .
```

cd into `02-webapp-container` and run:
```bash
$ sudo docker build -t=sergiofgonzalez/webapp-img .
Sending build context to Docker daemon  21.5 kB
Step 1/5 : FROM sergiofgonzalez/apache2-img
# Executing 1 build trigger...
Step 1/1 : ADD . /var/www/html
 ---> b70741df485c
Removing intermediate container d64b1a703016
...
```

### Run Instructions
Type:
```bash
$ sudo docker run -d -p 8080:80 sergiofgonzalez/webapp-img 
```
