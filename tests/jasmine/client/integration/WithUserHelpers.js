withUserLoggedIn = function(f) {
  HTTP.get("/.sandstorm-credentials", function (error, result) {
    if (error) {
      console.error(error.stack);
    } else if (!result.data) {
      console.error("/.sandstorm-credentials is not JSON?");
    } else if (result.data.token) {
      Meteor.loginWithToken(result.data.token, f);
    }
  });
}

withOwner = function(f) {
  //withUserLoggedInThatHasPermissions(['owner'], f);
}

withNonOwner = function(f) {
  //withUserLoggedInThatHasPermissions([], f);
}

withPermissions = function(permissions, f) {
  Meteor.call("stubPermissions", permissions, function() {
    withUserLoggedIn(f);
  });
}
