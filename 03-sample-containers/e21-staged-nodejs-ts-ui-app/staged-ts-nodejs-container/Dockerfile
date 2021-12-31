# STAGE 1: image in which we build the app
FROM node:17.3.0-alpine3.14 as builder

LABEL maintainer="sergio.f.gonzalez@gmail.com"
ENV REFRESHED_AT 2021-12-31.001


# Set the working dir in the container
WORKDIR /home/node/app

# Make nodejs the owner of his home dir
RUN chown -R node:node /home/node

# Switch to `node` user
USER node

# Copy package.json and package-lock.json
COPY ts-nodejs-ui-app/package.json ./
COPY ts-nodejs-ui-app/package-lock.json ./

# Suppress UID/GID switching
RUN npm config set unsafe-perm true

# Install 3rd party dependencies
RUN npm ci

# Copy the application sources and build it
COPY --chown=node:node ts-nodejs-ui-app/ ./
RUN npm run build

# Clean the development dependencies
RUN npm prune --production


# STAGE 2: the image in which we run the app
FROM node:17.3.0-alpine3.14

LABEL maintainer="sergio.f.gonzalez@gmail.com"
ENV REFRESHED_AT 2021-12-31.001

# Set the working dir in the container
WORKDIR /home/node/app

# Make nodejs the owner of his home dir
RUN chown -R node:node /home/node

# Switch to `node` user
USER node

# Copy only the necessary resources from the builder stage to run the app
COPY --from=builder /home/node/app/node_modules ./node_modules
COPY --from=builder /home/node/app/dist ./dist

# Expose the port on which the
EXPOSE 5050

# Start the app
CMD ["node", "dist/main.js"]
