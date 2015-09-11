var FAKE_SANDSTORM_PERMISSIONS = "owner";

Meteor.startup(function () {

  var shouldInsertFakeHeaders = function(req) {
    var devMode = process.env.NODE_ENV == 'development';
    var headerExists = _(req.headers).has("x-sandstorm-user-id");
    return devMode && (!headerExists);
  }

  var addSandstormUserHeaders = function(req, res, next) {
    if (shouldInsertFakeHeaders(req)) {
      req.headers["x-sandstorm-user-id"] = "local-user-id";
      req.headers["x-sandstorm-username"] = "Local Dev User";
      req.headers["x-sandstorm-permissions"] = FAKE_SANDSTORM_PERMISSIONS;
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
    FAKE_SANDSTORM_PERMISSIONS = permissions;
  },

  dummy: function() {},

});
