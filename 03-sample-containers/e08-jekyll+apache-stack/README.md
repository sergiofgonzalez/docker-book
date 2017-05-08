# 08 &mdash; Jekyll+Apache Stack
> on-demand website using the [Jekyll](http://jekyllrb.com/) framework served by Apache HTTP server

## Description
This file contains technical details describing how the applications were set up.

For details about how to build the container images and run the containers from it, please refer to the containers' README.md files.

This example illustrates how to use a volume defined in a Docker container from another Docker container, even when the former one is not running.

In a nutshell, you'll have to:

1. Start the *Jekyll container* following the details on [Jekyll Container](./jekyll-container/)
2. Start the *Apache container* following the details on [Apache Container](./apache-container/)
3. Backup the volume defined by the *Jekyll container* and reused by the *Apache container* by running:
```bash
# --rm instructs Docker to remove the container as soon as it exits
$ sudo docker run --rm --volumes-from jekyll-container \
-v $(pwd)/compiled_website_backup:/backup ubuntu \
tar cvfz /backup/website.tar /var/www/html
```

