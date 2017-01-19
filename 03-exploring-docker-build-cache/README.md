# 03-exploring-docker-build-cache
> exploring build cache functionality in Docker

## Description
Illustrates how to force the running new statements when required.

As Docker automatically uses images from its build cache when building new images, you may end up with a `Dockerfile` that includes the command `apt-get update` but that it is not actually contacting the repos to fetch the latests versions, but instead using a cached image that included older versions.

To circumvent that, you can use a simple trick consisting in using the `ENV` command and defining a variable that holds a date. Just by updating the variable value, the cache would not be used, and therefore the images will be new.

It's very easy to verify such functionality:
1. Use (for example), the date `2017-01-01` for `REFRESHED_AT` variable in the Dockerfile
2. Build an image using `sudo docker build -t="sergiofgonzalez/static_web:v0" .`
3. Without modifying the `Dockerfile` run `sudo docker build -t="sergiofgonzalez/static_web:v1" .` again. You'll see that the build cache is being used, and therefore `apt-get update` command will not be run.
4. Then, modify the `Dockerfile` using another date and run `sudo docker build -t="sergiofgonzalez/static_web:v2" .`. You'll see that this time, the cache is not used and the `apt-get update` is effectively executed.

In the Dockerfile we use the following commands:
+ `FROM` &mdash; specifies the base image
+ `MAINTAINER` &mdash; specifies the author and email of the image owner
+ `ENV` &mdash; sets environment variables in the image
+ `RUN` &mdash; execute instructions as if written in `/bin/sh -c`
+ `EXPOSE` &mdash; tells Docker that the image will use that specific port on the container

To build the image, you must `cd` into the *build context* and run:
```bash
$ cd static_web
$ sudo docker build -t="sergiofgonzalez/static_web" .
```

Then, you will be able to verify that the image has been correctly created running `sudo docker images`.
