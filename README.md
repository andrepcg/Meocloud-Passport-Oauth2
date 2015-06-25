# Passport-Meocloud-OAuth2
[Passport](http://passportjs.org/) strategy for authenticating with [Meocloud](https://dropbox.com/)
using the OAuth 2.0 API.

This module lets you authenticate using Dropbox in your Node.js applications.
By plugging into Passport, Dropbox authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install
    $ npm install passport-meocloud-oauth2

## Usage
### Configure Strategy

The Meocloud authentication strategy authenticates users using a Meocloud account
and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which accepts
these credentials and calls `done` providing a user, as well as `options`
specifying a client ID, client secret, and callback URL.

    passport.use(new MeocloudStrategy({
        clientID: MEOCLOUD_CONSUMER_KEY,
        clientSecret: MEOCLOUD_SECRET,
        callbackURL: "https://www.example.net/auth/meocloud/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ providerId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

### Authenticate Requests
Use `passport.authenticate()`, specifying the `'dropbox-oauth2'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/meocloud',
      passport.authenticate('meocloud-oauth2'));

    app.get('/auth/meocloud/callback', 
      passport.authenticate('meocloud-oauth2', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Examples
Examples not yet provided

## Tests
Tests not yet provided


## Prior work
This strategy is based on Jared Hanson's GitHub strategy for passport: [Jared Hanson](http://github.com/jaredhanson)

## Credits and License
express-sslify is licensed under the MIT license. If you'd like to be informed about new projects follow  [@TheSumOfAll](http://twitter.com/TheSumOfAll/).

Copyright (c) 2013-2014 Florian Heinemann
