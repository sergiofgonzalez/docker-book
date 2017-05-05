FROM ubuntu:16.04
MAINTAINER Sergio F. Gonzalez "sergio.f.gonzalez@gmail.com"
ENV REFRESHED_AT 2017-05-04

# Install NGINX
RUN apt-get -y update; apt-get -y install nginx

# Set up directory for holding the website
RUN mkdir -p /var/www/html/website

# Place working dir config files in correct place inside the container
ADD nginx_config/global.conf /etc/nginx/conf.d/
ADD nginx_config/nginx.conf /etc/nginx/nginx.conf

# expose standard HTTP port
EXPOSE 80