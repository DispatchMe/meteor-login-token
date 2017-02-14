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

const options = {
  removeOnUse: false,
  removeUserTokens: false
}

const token = LoginToken.createTokenForUser(userId, [options]);
```

`option` variable allows `removeOnUse` and `removeUserTokens` to be defined.
 - `removeOnUse`: will remove the token from the database once logged in.
 - `removeUserTokens`: will remove all other tokens for `userId` in the database before issuing a new token.

### Remove tokens from the database (server-only)

```js

const options = {
  allTokens: false,
  usedTokens: false,
  expiredTokens: false
}

LoginToken.removeTokens(options)

```

All options default to false, `allTokens` overrides other options.

### Remove user specific tokens from the database (server-only)

```js

const options = {
  allTokens: false,
  usedTokens: false,
  expiredTokens: false
}

LoginToken.removeUserTokens(userId, options)

```

All options default to false, `allTokens` overrides other options. Same as `removeTokens`, specific
to a single user.

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
