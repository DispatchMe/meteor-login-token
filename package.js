Package.describe({
  name: 'dispatch:login-token',
  version: '0.0.2',
  summary: 'Log the user in if they have the correct single-use token in the URL',
  git: 'https://github.com/DispatchMe/meteor-login-token'
});

Npm.depends({
  'hat': '0.0.3',
});

Package.onUse(function (api) {
  api.versionsFrom('1.2');

  api.use([
    'tracker',
    'check',
    'accounts-base',
    'ecmascript',
    'mongo',
    'ecmascript',
    'http',
    'raix:eventemitter@0.1.3'
  ], ['client', 'server']);


  api.addFiles('namespace.js', ['client', 'server']);
  api.addFiles('client.js', 'client');
  api.addFiles('server.js', 'server');

  api.export('LoginToken', ['client', 'server']);
});

Package.onTest(function (api) {
  api.use('sanjo:jasmine@0.20.1');

  api.use('http', 'client');

  api.use([
    'accounts-base',
    'dispatch:login-token',
    'ecmascript'
  ], ['client', 'server']);

  api.addFiles('test.js');
});
