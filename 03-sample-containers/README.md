# Docker Book &mdash; Sample Containers
> Examples of containerized applications


## [01 &mdash; MySQL 5.6 Container with Volume Mapping](./e01-mysql-56-container/)
MySql 5.6 container in which the server configuration file and data directories are mapped to host directories.

## [02 &mdash; REDIS 3.2, Alpine-based container with volume mapping](./e02-redis-32-alpine-container/)
REDIS 3.2 container based on Alpine Linux in which the server data directory is mapped to a host directory.

## [03 &mdash; NGINX web server with custom configuration](./e03-nginx-static-website/)
NGINX container based on Ubuntu Linux in which the NGINX configuration is provided from the build environment.

## [04 &mdash; Express web app](./e04-express-web-app/)
Serving a web application based on Node.js Express framework.

## [05 &mdash; Redis Ubuntu](./e05-redis-ubuntu/)
A Redis container custom built on top of the Ubuntu image.

## [06 &mdash; Express+Redis Stack](./e06-express+redis-stack/)
An example using Docker networking that features an *Express* based web application and the *Redis* key-value store.

## [07 &mdash; Jenkins+Docker Server](./e07-jenkins+docker-server/)
An example that spins a Docker container with Jenkins that uses containers for running the jobs.

## [08 &mdash; Jekyll+Apache Stack](./e08-jekyll+apache-stack/)
An example that uses a stack with two containers: one that compiles a site using *Jekyll* and dies, and another one that uses a volume from the former and exposes the compiled website using Apache HTTP server. It also illustrated how to make a backup of a volume defined in another container.

## [09 &mdash; Tomcat WAR deployment example](./e09-tomcat-war/)
Illustrates how to deploy a WAR fetched from a URL into a Tomcat 7 container built on top of Ubuntu official image.

## [10 &mdash; Node+Redis multicontainer example](./e10-node-redis-multicontainer/)
A multicontainer example involving a Redis cluster with one primary node and two replicas, a Express based Node.js application and a Logstash node that collects the logs from both Redis primary and Express application. Illustrates concepts such as Docker Networking, volumes and using one-off containers to read information from volumes or other containers.

## [11 &mdash; Postgres 9.6 container](./e11-postgres96-container/)
A containerized Postgres 9.6 with a volume mapped for the data and configuration.

## [12 &mdash; MongoDB 3.4 container](./e12-mongodb34-container/)
A containerized MongoDB 3.4 with a volume mapped for the data directory.

## [13 &mdash; Apache Spark 2.2.0 standalone cluster](./e13-spark-standalone-cluster/)
A containerized stack for a Spark standalone cluster including a *Spark Master* and one or several *Spark Workers*. The stack is ready to be deployed to *Docker Compose* or *Docker Swarm*.

## [14 &mdash; Node.js application container](./e14-nodejs-app/)
A container for running Node.js applications using the official Node.js image.

## [15 &mdash; Node.js system data webapp container](./e15-nodejs-sysdata-webapp/)
A container running a Node.js based web application that reports a JSON document with some system data of the machine on which it is running in.

## [16 &mdash; Node.js unhealthy webapp container](./e16-nodejs-unhealthy-webapp/)
A container running a Node.js based web application that is programmed to return an HTTP status code 500 after the fifth request to simulate a failure.

## [17 &mdash; MySQL 8.0 Container with Volume Mapping](./e17-mysql-80-container/)
MySql 8.0 container in which the server configuration file and data directories are mapped to host directories.

## [18 &mdash; Node.js container](e18-nodejs-ui-app)
Container specification for a Node.js application.

## [19 &mdash; TypeScript Node.js container](e19-nodejs-ts-ui-app)
Container starter for a Node.js application written in TypeScript.