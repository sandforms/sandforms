function defaults(value, fallback) {
  if (value === undefined) {
    return fallback;
  } else {
    return value;
  }
}

var STUB_PERMISSIONS = defaults(process.env.STUB_SANDSTORM_PERMISSIONS, 'owner');
var STUB_USER_ID = defaults(process.env.STUB_USER_ID, 'dev-user-id');
var STUB_USERNAME = defaults(process.env.STUB_USERNAME, 'Dev User');

Meteor.startup(function () {

  var shouldInsertFakeHeaders = function(req) {
    return req.headers['x-sandstorm-user-id'] === undefined;
  }

  var addSandstormUserHeaders = function(req, res, next) {
    if (shouldInsertFakeHeaders(req)) {
      req.headers['x-sandstorm-user-id'] = STUB_USER_ID;
      req.headers['x-sandstorm-username'] = STUB_USERNAME;
      req.headers['x-sandstorm-permissions'] = STUB_PERMISSIONS;
    }
    return next();
  };

  // Add the headers before any other handlers so that the
  // kenton:accounts-sandstorm package picks them up
  WebApp.rawConnectHandlers.stack.splice(0, 0, {
    route: '',
    handle: addSandstormUserHeaders
  });
});

Meteor.methods({

  stubPermissions: function(permissions) {
    STUB_PERMISSIONS = permissions.join(' ');
  }
});
