# Version 0.0.1
FROM ubuntu:16.04
MAINTAINER Sergio F. Gonzalez "sergio.f.gonzalez@gmail.com"
ENV REFRESHED_AT 2017-01-19
RUN apt-get -qq update
RUN apt-get install -y nginx
RUN echo 'Hi, I am in your NGINX running inside a container' \
    > /var/www/html/index.html
EXPOSE 80
