if (Meteor.isServer) {
  Meteor.methods({
    getLoginToken: function(userId) {
      if (userId) {
        return LoginToken.createTokenForUser(userId);
      }
      return null;
    },
    // To bypass auth
    createUser: function(data = {}) {
      Meteor.users.remove({});
      return Meteor.users.insert(data);
    },
  });
}

if (Meteor.isClient) {
  describe('login token', () => {
    beforeEach(function(done) {
      this.listeners = {
        loggedInClient: null,
        errorClient: null
      };
      Meteor.call('createUser', {}, (err, userId) => {
        if (err) {
          done(err);
        } else {
          this.userId = userId;
          done();
        }
      });
    });

    afterEach(function() {
      LoginToken.removeListener('loggedInClient', this.listeners.loggedInClient);
      LoginToken.removeListener('errorClient', this.listeners.errorClient);
    });

    it('should log you in with a valid token', function(done) {
      Meteor.call('getLoginToken', this.userId, (err, res) => {
        if (err) return done(err);

        this.listeners.loggedInClient = () => {
          const user = Meteor.user();
          expect(user._id).toEqual(this.userId);
          done();
        };

        this.listeners.errorClient = (error) => {
          done.fail(error);
        };

        // Wait for it...
        LoginToken.on('loggedInClient', this.listeners.loggedInClient);

        LoginToken.on('errorClient', this.listeners.errorClient);
        LoginToken.checkToken(res, {});
      });
    });

    // This fails every time because the server-side error gets thrown on the client.
    // Until we can figure out how to catch it client-side I'm going to comment out this test
    it('should not log you in with an invalid token', function(done) {
      Meteor.call('getLoginToken', this.userId, (err, res) => {
        if (err) return done.fail(err);
        if (!res) return done(new Error('No token?'));

        this.listeners.loggedInClient = () => {
          done.fail(new Error('Should not have worked'));
        };
        // Wait for it...
        LoginToken.on('loggedInClient', this.listeners.loggedInClient);

        this.listeners.errorClient = (err) => {
          console.log('Got error:', err);
          done(null);
        };
        LoginToken.on('errorClient', this.listeners.errorClient);
        LoginToken.checkToken(res + '5', {});
      });

    });
  });
}
