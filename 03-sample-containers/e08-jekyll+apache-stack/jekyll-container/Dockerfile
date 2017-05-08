FROM ubuntu:16.04
MAINTAINER Sergio F. Gonzalez "sergio.f.gonzalez@gmail.com"
ENV REFRESHED_AT 2017-05-08

# Install Jekyll and prerequisites
RUN apt-get -y update
RUN apt-get -y install ruby ruby-dev build-essential nodejs
RUN gem install jekyll -v 2.5.3

# Create Volumes to hold source code and compiled Jekyll site
VOLUME /data
VOLUME /var/www/html

# Set working directory to where our source code is hosted
WORKDIR /data

# Entrypoint will build the contents on data and put it on /var/www/html
ENTRYPOINT [ "jekyll", "build", "--destination=/var/www/html"]