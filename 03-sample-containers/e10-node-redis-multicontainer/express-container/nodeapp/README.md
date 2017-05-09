# A Full Express app
> a complete Express-based application to test the stack

## Application Description

In this folder you have a complete Express application that supports both user interaction and programmatic access. The application allows users to post messages that will be displayed in sequence.

Messages are publicly visible, but only registered users can post messages. 
The application provides self-registration for new users.

The application will:
1. Allow users to register accounts, sign-in and sign-out
2. Users should be able to post messages (entries)
3. Site visitors should be able to paginate through entries
4. There should be a simple REST API supporting authentication

Both programmatic and interactive usage is provided:
+ API endpoints (programmatic):
  + GET /api/user/:id &mdash; get information for the user with the given id (no authentication needed)
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
