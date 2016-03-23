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
const token = LoginToken.createTokenForUser(userId);
```

### Log in...
Go to `http://myapp.mydomain.com/some/route?authToken=<token>`

### Events/callbacks
The `LoginToken` object emits events both on the client and server. To listen to events, just use `LoginToken.on('<event name>', callback);`

The events are:

* `errorServer`
* `errorClient`
* `loggedInServer`
* `loggedInClient`

The "error" callbacks receive the error as the only argument, and the `"loggedIn" callbacks receive the `userId` as the only argument.
```

### Change expiration
Set the token expiration by running `LoginToken.setExpiration(val)`. It is in **milliseconds**. It default to one hour (60 * 60 * 1000).

