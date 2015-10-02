/* global LoginToken:true */
function getParams(str) {
   var queryString = str || window.location.search || '';
   var keyValPairs = [];

   var params = {};

   // There are no parameters on the route.
   if (queryString.indexOf('?') === -1) return params;

   queryString = queryString.substring(queryString.indexOf('?') + 1);

   if (queryString.length) {
      keyValPairs = queryString.split('&');

      for (var pairNum in keyValPairs) {
        if(keyValPairs.hasOwnProperty(pairNum)) {
          var key = keyValPairs[pairNum].split('=')[0];
          if (!key.length) continue;
          if (typeof params[key] === 'undefined')

          params[key] = keyValPairs[pairNum].split('=')[1];
        }
        
      }
   }
   return params;
}


LoginToken.checkToken = function() {
  const params = getParams(window.location.search);

  if(params.authToken) {
    const userId = Tracker.nonreactive(Meteor.userId);

    if(!userId) {
      Accounts.callLoginMethod({
        methodArguments: [{authToken: params.authToken}],
        userCallback:function(err) {
          if(err) {
            if(typeof LoginToken.onError === 'function') {
              LoginToken.onError(err);
            }
          } else {
            delete(params.authToken);
            var queryString = [];

            for(var k in params) {
              if(params.hasOwnProperty(k)) {
                queryString.push(k + '=' + encodeURIComponent(params[k]));
              }
            }

            // Make it look clean by removing the authToken from the URL
            if(window.history) {
              window.history.pushState(null, null, window.location.href.split('?')[0] + queryString.join('&'));
            }
          }
          
        }
      });
    }
  }
};

Meteor.startup(LoginToken.checkToken);
