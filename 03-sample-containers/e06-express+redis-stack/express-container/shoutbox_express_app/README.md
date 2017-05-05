# 07-full-express-app
> experimenting with the *Express* skeleton

## Table of Contents
+ [Application Description](#application-description)
  + [Known Errors and Improvements](#known-errors-and-improvements)
+ [Express Application Topics](#express-application-topics)
  + [Express Configuration](#express-configuration)
  + [View Topics](#view-topics)
    + [View Caching Considerations](#view-caching-considereations)
    + [View Lookup Considerations](#view-lookup-considerations)
    + [Mechanisms for Exposing Data to the Views](#exposing-data-to-the-views)
    + [Route Specific Middleware](#route-specific-middleware)
  + [Routing Topics](#routing-topics)
  + [Handling Form Data](#handling-form-data)


## Application Description

In this project we build a complete Express application that supports both user interaction and programmatic access. The application allows users to post messages that will be displayed in sequence.

Messages are publicly visible, but only registered users can post messages. 
The application provides self-registration for new users.

The application will:
1. Allow users to register accounts, sign-in and sign-out
2. Users should be able to post messages (entries)
3. Site visitors should be able to paginate through entries
4. There should be a simple REST API supporting authentication

Both programmatic and interactive usage is provided:
+ API endpoints (programmatic):
  + GET /api/entries &mdash; get a list of entries (no authentication needed)
  + GET /api/entries/page &mdash; get a single page of entries (no authentication needed)
  + POST /api/entry &mdash; creates a new message (authentication needed)
+ Web UI routes (interactive):
  + GET /post &mdash; returns HTML form for a new entry
  + POST /post &mdash; sends the HTML form to the server
  + GET /register &mdash; returns the HTML registration form
  + POST /registers &mdash; sends the HTML registration form to the server
  + GET /login &mdash; returns the sign-in form
  + POST /login &mdash; sends the sign-in information to the server
  + GET /logout &mdash; sends the sign-out signal for the user

### Known Errors And Improvements

+ [ ] (improvement) user/password value fields are lost when a authentication fails. Username should not be cleared.
+ [ ] (error) Navbar links dissapear when not in full screen
+ [ ] (investigate)   const entry = new Entry({ username: res.locals.user.name,... in entries.js. Who's setting this? Can be used for the lost user/password value fields. Probably loaded via middleware.
+ [ ] (investigate)   what does redirect("back") mean?


## Express Applications Topics

### Express configuration

In addition to configuring environment-specific functionality such as `app.set("view engine", "ejs")`, Express also lets you define custom configuration key/value pairs:

+ `app.set(key, value)`
+ `app.get(key)`
+ `app.enable(key)`
+ `app.disable(key)`
+ `app.enabled(key)`
+ `app.disabled(key)`

You can use an *environment based* configuration using `NODE_ENV` environment variable and `env` Express variable:
+ `NODE_ENV` is an environment variable originated in *Express* but that has been widely adopted for many other Node frameworks. By using that variable you can provide a different behavior depending on the environment. The names for the environments are completely arbitrary, but *Express* sets the `env` variable to `development` if NODE_ENV is not set. Otherwise, Express uses the value of `NODE_ENV` for `app.get("env")`.

For example, you can do:
```bash
$ NODE_ENV=production npm start
index:server Application running with env = production +72ms
index:server Application running with NODE_ENV = production +0ms
```

And if you don't set a value for `NODE_ENV` you will get:
```bash
$ npm start
index:server Application running with env = development +2ms
index:server Application running with NODE_ENV = undefined +0ms
```

### View Topics

#### View Caching Considerations
The `view cache` setting is enabled in the production environment and disabled in other environments.
```bash
$ NODE_ENV=production npm start  # app.get("view cache") -> true
$ npm start  # app.get("view cache") -> undefined
```

When the *view cache* is enabled, subsequent render calls for a particular view will not re-read the view from disk, which will boost performance. However, if you enable this mechanism in *development* changing the view will require restarting the app to view the changes. 

#### View Lookup Considerations

To render a view from *Express*, you typically use the `render` method on the `response` object as in:
```javascript
res.render("index", { title: "Express" });
```

You will typically use the following snippet to configure the directory that Express will use for the view lookup:
```javascript
app.set("views", path.join(__dirname, "views"));
```

The process of looking up a view when invoking `res.render(name)` is similar to Node's require:
+ look for a file matching the name given exists with an absolute path
+ look for a file matching the name given relative to the configured `views`directory
+ look for an index file at the given directory

Depending on the default view engine used through:
```javascript
app.set("view engine", "ejs");
```

You will be configuring the default extension for `res.render(viewName)` operations. However, Express lets you use additional templating engines just by appending the specific file extension to the `viewName`.

#### Mechanisms for Exposing Data to Views
You can use the following mechanisms to pass view variables to `res.render`, order by precedence:
+ pass local variables in the call `res.render(viewName, {key1: value1, key2: value2})`
+ `app.locals` &mdash; can be used for application-level variables
+ `res.locals` &mdash; can be used for request-level local variables

By default, Express exposes one application-level variable called `settings` to the view, which is the object containing all of the values that have been previously set with `app.set`.
For example, `app.set("title", "My Application")` would expose `settings.title` in the template so that you could use:
```html
<!DOCTYPE html>
<html>
  ...
  <body>
    <h1><%= settings.title %>
  </body>
</html>
```

### Routing Topics

The primary function of routing is pairing a URL pattern with response actions for that URL. Express allows you to do that, but it also allows you to pair a URL with middleware to provide functionality such as validation.

#### Declaring Express Routes
There are several ways of declaring the routes that will be handled by your application.

In the example application, most of the routes declared in the `index.js` file follows this syntax:
```javascript
const entries = require("./routes/entries");
app.get("/", entries.list);
```

In the `./routes/entries` file we export several actions that will be associated to responses to a particular URL. In the example above, the URL `/` will be handled by the logic specified in `entries.list`.

Alternatively, you can also use this approach:
```javascript
const info = require("./routes/info");
app.use("/info", info);
```

In this latter approach, `./routes/info` uses the *Express* Router to configure the pairing:
```javascript
const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
  res.send(...);
});

router.post("/", (req, res) => {
  res.send(...);
});


module.exports = router;
```

Both approaches are valid.

#### Route-specific Middleware

*Express* allows you to define middleware that is only triggered for a particular route. This is extremely useful to implement configurable validation logic, like the one used in the example for validating the form data:
```javascript
app.post("/post", validate.required("entry[title]"), validate.lengthAbove("entry[title]", 4), entries.submit);
app.post("/register", validate.required("user[name]"), validate.required("user[pass]"), register.submit);
```

In this case, we defined a middleware module `validate` that exports several configurable methods. As it is customary for middleware modules, each exported function returns another function with signature `(req, res, next)`:
```javascript
exports.required = field => {
  return (req, res, next) => {
    ... logic for validating given field ...
  };
};

exports.lengthAbove = (field, len) => {
  return (req, res, next) => {
    ... logic for validating given field lenght is > len ...
  };
};
```

### Handling Form Data

The example application features forms to let users log in and register, and to let users post new messages. The forms are served to the browser when a HTTP GET request for the corresponding route is received:
```javascript
# index.js
app.get("/post", entries.form);
...

# routes/entries.js
exports.form = (req, res) => {
  res.render("post");
};
```

If you have a look at the view, you will see that the following syntax is used in the form elements:
```html
<form action="/post" method="POST">
  <input type="text" name="entry[title]" class="form-control" id="postTitleInput" placeholder="Enter the post title">
  <textarea class="form-control" id="postBodyTextArea" name="entry[body]" rows="5"></textarea>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

Note how input names are declared as `entry[title]` and `entry[body]`. When the form is submitted by the user, the form data will be `entry%5Btitle%5D=TitlePost&entry%5Bbody%5D=TitleBody`. When using this approach, you will need to enable extended urlencoded body parsing:
```javascript
app.use(bodyParser.urlencoded({ extended: true }));
```

And, when the form is submitted, you will automatically receive input data in the request body:
```javascript
exports.submit = (req, res, next) => {
  const data = req.body.entry;

  const entry = new Entry({
    title: data.title,
    body: data.body
  });
...
};
```

