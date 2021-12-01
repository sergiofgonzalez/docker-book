FROM alpine:3.15.0

LABEL maintainer="sergio.f.gonzalez@gmail.com"
ENV REFRESHED_AT 2021-12-01.001

# install additional tools by way of apk
RUN apk add --no-cache \
    curl \
    jq

# keep the container alive executing a while true
CMD exec /bin/sh -c "trap : TERM INT; (while true; do sleep 1000; done) & wait"
