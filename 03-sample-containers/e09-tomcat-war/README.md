# 09 &mdash; Tomcat WAR deployment example
> running a Java application packaged as a war on top of Tomcat

## Description
This file contains technical details describing how the applications were set up.

For details about how to build the container images and run the containers from it, please refer to the containers' README.md files.

This example illustrates how to use a volume defined in a Docker container from another Docker container, even when the former one is not running.

In a nutshell, you'll have to:

1. Start the *WAR File Fetcher container* following the details on [WAR File Fetcher Container](./war-file-fetcher-container/)
2. Start the *Tomcat 7 container* following the details on [Tomcat 7 Container](./tomcat7-container/)


