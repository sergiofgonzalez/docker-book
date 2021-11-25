FROM node:17.1.0-alpine3.12

LABEL maintainer="sergio.f.gonzalez@gmail.com"
ENV REFRESHED_AT 2021-11-25.001

# set the working dir in the container
WORKDIR /var/nodejs/app

# copy and install 3rd party dependencies
COPY ts-nodejs-ui-app/ ./
RUN npm ci

# copy the sources of our TypeScript application and build it
RUN npm run build

# # clean the development dependencies
RUN npm prune --production

# expose PORT
EXPOSE 5050

# start the program
CMD ["node", "dist/main.js"]
