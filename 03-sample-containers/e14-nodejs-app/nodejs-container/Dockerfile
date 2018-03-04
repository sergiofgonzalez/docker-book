FROM node:9.3
MAINTAINER Sergio F. Gonzalez "sergio.f.gonzalez@gmail.com"
ENV REFRESHED_AT 2018-01-08

# Define a build-time configurable variable for the dir holding the Node.js app and port
ARG APP_DIR=/var/nodejs/app

# Set up a fixed directory for holding the Express web app
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

# Deploy the application from the working dir into the container
ADD nodejs_app $APP_DIR

# Default command for the container: run `npm start` (NOTE: it assumes all deps are already there)
CMD npm install && npm start
