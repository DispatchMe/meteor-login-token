LoginToken.TokenCollection = new Mongo.Collection('LoginToken_tokens');

Meteor.startup(function () {  
  LoginToken.TokenCollection._ensureIndex({ "token": 1});
});

// Default expiration is 1 hour
LoginToken.expiration = 60*60 * 1000;

// Hat can generate unique tokens
const hat = Npm.require('hat');


// Login with just a token
Accounts.registerLoginHandler(function(loginRequest) {
  // Is there an auth token? If not, just let Meteor handle it
  if(!loginRequest || !loginRequest.authToken) {
    return;
  }

  // Find the matching user from the code
  const doc = LoginToken.TokenCollection.findOne({
    token:loginRequest.authToken
  });


  if(!doc) {
    return;
  }

  if(doc.used === true) {
    throw new Meteor.Error('Token has already been used');
  }

  // Check expiration
  const now = Date.now();
  if(doc.expiresAt < now) {
    throw new Meteor.Error('Token has expired');
  }

  // Update it to used
  LoginToken.TokenCollection.update(doc._id, {
    $set:{
      used:true,
      usedAt:new Date()
    }
    
  });


  return {
    userId:doc.userId.toString()
  };
  
});

LoginToken.createTokenForUser = function(userId) {
  const token = hat(256);
  LoginToken.TokenCollection.insert({
    userId:userId,
    expiresAt:new Date(Date.now() + LoginToken.expiration),
    token:token
  });

  return token;
};


