FROM ubuntu:16.04
MAINTAINER Sergio F. Gonzalez "sergio.f.gonzalez@gmail.com"
ENV REFRESHED_AT 2017-05-04

# Install curl
RUN apt-get -y update; apt-get -y install curl

# Install Node.js via Package Manager
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get -y update
RUN apt-get -y install nodejs build-essential

# Define a build-time configurable variable for the dir holding the Express web app and port
ARG APP_DIR=/var/www/app
ARG APP_PORT=5000

# Set up a fixed directory for holding the Express web app
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

# Default command for the container: rebuild dependencies and run `npm start`
CMD npm run setup && npm start

# expose port for serving Express HTTP application
EXPOSE $APP_PORT