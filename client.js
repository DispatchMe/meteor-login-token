/* global LoginToken:true */

/**
 * Parse a query string into a key/value object
 * @param  {String} queryString String to parse
 * @return {Object}             Key/value object
 */
var parseQueryString = function(queryString) {
  return _.object(_.map(queryString
            .split('&'), function(keyval) {
              return _.map(keyval.split('='), (val) => decodeURIComponent(val));
            }));
};

/**
 * Converts an object into a querystring
 * @param  {Object} obj) Source
 * @return {String}      Query string
 */
var objectToQueryString = (obj) => _.map(obj, (val, key) => `${key}=${val}`).join('&');

function getParams(str) {
  let queryString = str || window.location.search || '';

  queryString = queryString.substring(queryString.indexOf('?') + 1);

  return parseQueryString(queryString);
}

LoginToken.checkToken = function(token, params, argName = 'authToken') {
  if (!token) {
    return;
  }
  const userId = Tracker.nonreactive(Meteor.userId);

  if (userId) {
    LoginToken.emit('loggedInClient');
  } else {
    Accounts.callLoginMethod({
      methodArguments: [{
        dispatch_authToken: token,
      }],
      userCallback: function(err) {
        if (err) {
          LoginToken.emit('errorClient', err);
        } else {
          LoginToken.emit('loggedInClient');

          if (params) {
            delete params[argName];

            // Make it look clean by removing the authToken from the URL
            if (window.history) {
              window.history.pushState(null, null,
                window.location.href.split('?')[0] + objectToQueryString(params));
            }
          }
        }
      },
    });
  }
};

/**
 * Parse querystring for token argument, if found use it to auto-login the
 * user
 * @param  {String} name Name of argument (default "authToken")
 */
LoginToken.autologin = function(name = 'authToken') {
  Meteor.startup(function() {
    const params = getParams(window.location.search);

    if (params[name]) {
      LoginToken.checkToken(params[name], params);
    }
  });
};
