FROM node:8.9.4-alpine
LABEL maintainer="sergio.f.gonzalez@gmail.com"
ENV REFRESHED_AT 2018-01-28

ENV SERVER__PORT 8080

EXPOSE ${SERVER__PORT}
ADD unhealthy_webapp /app

WORKDIR /app

CMD npm install --production && npm start