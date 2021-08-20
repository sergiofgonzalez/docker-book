# Node.js UI app
> Express server that publishes some APIs and serves a UI from its static resource directory

In order to test the application you can point your browser to http://localhost:5000 and the UI will show up. You can test the routes from:
+ http://localhost:5000/health-check &mdash; returns a simple JSON object
+ http://localhost:5000/greeter/name=<your-name> &mdash; returns a greeting in plain text format