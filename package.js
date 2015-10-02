Package.describe({
  name: 'dispatch:login-token',
  version: '0.0.1',
  summary: 'Log the user in if they have the correct single-use token in the URL',
  git: 'https://github.com/DispatchMe/meteor-login-token'
});

Npm.depends({
  'hat': '0.0.3',
});

Package.onUse(function (api) {
  api.versionsFrom('1.2');

  api.use([
    'check',
    'accounts-base',
    'ecmascript',
    'mongo',
    'ecmascript',
    'http',
  ], ['client', 'server']);


  api.addFiles('namespace.js', ['client', 'server']);
  api.addFiles('client.js', 'client');
  api.addFiles('server.js', 'server');

  api.export('LoginToken', ['client', 'server']);
});

// Package.onTest(function (api) {
//   api.use('sanjo:jasmine@0.20.0');

//   api.use('http', 'client');

//   api.use([
//     'accounts-base',
//     'simple:json-routes@1.0.3',
//     'simple:sso',
//     'ecmascript'
//   ], 'server');

//   api.addFiles('sso.test.js');
// });
