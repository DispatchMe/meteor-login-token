login-token
============

Automatically log in a user if a valid, unexpired, single-use `authToken` is present in the URL.

Use at your own risk. We use it for logging in via email and SMS notifications.

## Usage

### Add package
```
$ meteor add dispatch:login-token
```

### Generate a token for a user (server-only)
```js
const token = LoginToken.generateTokenForUser(userId);
```

### Log in...
Go to `http://myapp.mydomain.com/some/route?authToken=<token>`

### Handle errors
If you want to display errors on the client if the login attempt via `authToken` fails, just set `LoginToken.onError` to a function that accepts the error.

For example:

```js
LoginToken.onError = function(err) {
  alert('Oops!');
};
```

### Change expiration
Set the token expiration by modifying `LoginToken.expiration`. It is in **milliseconds**. It default to one hour (60 * 60 * 1000).

## To-do list
* Tests
* Change `onError =` to `onError(callback)`
