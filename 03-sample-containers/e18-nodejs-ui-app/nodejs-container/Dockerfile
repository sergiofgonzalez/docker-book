FROM node:16.7.0-alpine3.11

LABEL maintainer="sergio.f.gonzalez@gmail.com"
ENV REFRESHED_AT 2021-08-20.001

# set the working dir in the container
WORKDIR /var/nodejs/app

# copy and install 3rd party dependencies
COPY nodejs-ui-app/package*.json ./
RUN npm ci --production

# copy the source code of our app, and the environment file
COPY nodejs-ui-app/app/src/ .
COPY nodejs-ui-app/.env .

# expose PORT
expose 5000

# start the program
CMD ["node", "--require", "dotenv/config", "server.js"]
