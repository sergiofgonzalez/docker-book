# Docker Container for Jekyll
> building a website on a volume using containerized Jekyll

This is the working directory for a container running Jekyll, a framework that builds static websites.

The directory `./jekyll_sample_website` contains an example of *Jekyll sources* that are used to build a static website that will be later published by an HTTP server.

Note that the website creation is a *one-off* thing, so the container will just build the site on a particular volume and die.

## Build Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined).
Then type:
```bash
$ sudo docker build -t="sergiofgonzalez/jekyll" .
```

## Run Instructions
First, make sure that you're on the container working dir (that is, you should be in the same directory where the `Dockerfile` is defined). Otherwise, you will need to adapt the paths of the mapped volumes.

```bash
$ sudo docker run -v $PWD/jekyll_sample_website:/data/ \
--name jekyll-container sergiofgonzalez/jekyll-container
```

When unning `docker logs` you should be able to see something similar to:
```bash
$ sudo docker logs jekyll-container
Configuration file: /data/_config.yml
            Source: /data
       Destination: /var/www/html
      Generating...
                    done.
 Auto-regeneration: disabled. Use --watch to enable.
```

Note that:
+ We're not mapping the directory that holds the compile website `/var/www/html` to a particular directory in the build environment for the container because we wouldn't typically interact with the compiled website.

You can however locate where it's created on the host by running:
```bash
$ sudo docker inspect -f "{{ range .Mounts }}{{.}}{{end}}" jekyll-container
```

You can regenerate the website from sources running:
```bash
$ sudo docker start jekyll-container
```