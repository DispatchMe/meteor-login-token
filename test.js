
// if (Meteor.isServer) {

//   // Hardcode an authenticated userId
//   Meteor.users.upsert({
//     _id: '1'
//   }, {});

  

//   // Setup an sso route
//   SSO.route('/test');

// }

// if (Meteor.isClient) {

//   describe('SSO', function () {
//     it('add a login token when the user is authenticated', function () {
//       // HTTP.get(Meteor.absoluteUrl('/test'), function (error, response) {
//       //   done();
//       //   debugger;
//       // });
//     });
//   });

// }

// if (Meteor.isServer) {
//   describe('SSO', () => {
//     it('should validate bearer token', () => {
//       Meteor.settings = {
//         dispatchApi: {
//           url: 'https://api-dev.dispatch.me'
//         }
//       };
//       SSO.validateBearerToken('b229c2425902245b3167d69a1f846e0f3dd3a2b590d9498129edeb10297fdae11');
//     });
//   });

// }
