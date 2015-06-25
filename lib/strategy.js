/**
 * Module dependencies.
 */
var util = require('util')
  , OAuth2Strategy = require('passport-oauth').OAuth2Strategy
  , InternalOAuthError = require('passport-oauth').InternalOAuthError;



function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'https://meocloud.pt/oauth2/authorize';
  options.tokenURL = options.tokenURL || 'https://meocloud.pt/oauth2/token';
  options.scopeSeparator = options.scopeSeparator || ',';
  options.customHeaders = options.customHeaders || {};

  OAuth2Strategy.call(this, options, verify);
  this.name = 'meocloud-oauth2';
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);



Strategy.prototype.userProfile = function(accessToken, done) {
  this._oauth2.get('https://publicapi.meocloud.pt/1/Account/Info', accessToken, function (err, body, res) {
    if (err) { return done(new InternalOAuthError('failed to fetch user profile', err)); }
    
    try {
      var json = JSON.parse(body);
      
      var profile = { provider: 'dropbox' };
      profile.id = json.uid;
      profile.displayName = json.display_name;
      profile.emails = [{ value: json.email }];
      
      profile._raw = body;
      profile._json = json;
      
      done(null, profile);
    } catch(e) {
      done(e);
    }
  });
}


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
