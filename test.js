if(Meteor.isServer) {
  Meteor.methods({
    getLoginToken:function(userId) {
      if(userId) {
        return LoginToken.createTokenForUser(userId);
      }
      return null;
      
    },
    // To bypass auth
    createUser:function(data = {}) {
      Meteor.users.remove({});
      return Meteor.users.insert(data);
    }
  });
}

if(Meteor.isClient) {
  describe('login token', () => {
    beforeEach(function(done) {
      Meteor.call('createUser', {}, (err, userId) => {
        if(err) done(err);
        else {
          this.userId = userId;
          done();
        }
        
      });
    });

    it('should log you in with a valid token', function(done) {
      Meteor.call('getLoginToken', this.userId, (err, res) => {
        if(err) return done(err);
        
        // Wait for it...
        LoginToken.on('loggedInClient', () => {
          const user = Meteor.user();
          expect(user._id).toEqual(this.userId);
          done();
        });

        LoginToken.on('errorClient', (err) => {
          done(err);
        });
        LoginToken.checkToken(res, {});
        
        
      });
    });

    it('should not log you in with an invalid token', function(done) {
      Meteor.call('getLoginToken', this.userId, (err, res) => {
        if(err) return done(err);
        if(!res) return done(new Error('No token?'));
        
        // Wait for it...
        LoginToken.on('loggedInClient', () => {
          done(new Error('Should not have worked'));
        });

        LoginToken.on('errorClient', (err) => {
          done();
        });
        LoginToken.checkToken(res + '5', {});
        
        
      });
    });
  });
}
