FROM ubuntu:16.04
MAINTAINER Sergio F. Gonzalez "sergio.f.gonzalez@gmail.com"
ENV REFRESHED_AT 2017-05-08

# Install curl
RUN apt-get -y update; apt-get -y install curl

# Install Node.js via Package Manager
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get -y install nodejs build-essential python

# Create the directory that will hold app logs
RUN mkdir -p /var/log/nodeapp

# Copy directory from build environment onto the container
ADD nodeapp /opt/nodeapp
WORKDIR /opt/nodeapp

RUN npm install

VOLUME [ "/var/log/nodeapp" ]

EXPOSE 5000

ENTRYPOINT [ "npm", "start" ]
