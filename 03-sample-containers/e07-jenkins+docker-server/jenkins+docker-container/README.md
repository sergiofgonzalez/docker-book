# Docker Container for Jenkins with Docker installed on it
> Building a testing pipeline using Jenkins, which uses Docker for the test run.

This is the working directory for a container running **Jenkins CI**. Along with the *Jenkins* installation, the `Dockerfile` also installs *Docker* and some additional plugins.
Additionally, a directory `./jenkins_home/` is created to hold the Jenkins stateful configuration.


## Build Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined).
Then type:
```bash
$ sudo docker build -t="sergiofgonzalez/jenkins" .
```

## Run Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined). Otherwise, you will need to adapt the paths of the mapped volumes.

Make sure, that you have created the `jenkins_home` directory and that it is assigned to *UID 1000* which is the UID of the jenkins user inside the image we're about to build:
```bash
$ sudo mkdir -p jenkins_home
$ sudo chown -R 1000 jenkins_home
```

Then, you can proceed to start the container:
```bash
$ sudo docker run -d -p 3306:3306 -v $PWD/mysql-data:/var/lib/mysql -v $PWD/mysql-custom-config:/etc/mysql/conf.d --name mysql56-container sergiofgonzalez/mysql56:v1
```

To open an interactive session within the container (for inspection):
```bash
$ sudo docker run -d -p 8080:8080 -p 50000:50000 \
-v $PWD/jenkins_home:/var/jenkins_home \
-v /var/run/docker.sock:/var/run/docker.sock \
--name jenkins-container sergiofgonzalez/jenkins
```

After that, you will have Jenkins available in port 8080, and you can do your Jenkins jobs configuration.