withUserLoggedInThatHasPermissions = function(permissions, f) {
  //Meteor.call("stubPermissions", permissions, function(error) {
    //if (error) {
      //console.error(error);
    //} else {
      HTTP.get("/.sandstorm-credentials", function (error, result) {
        if (error) {
          console.error(error.stack);
        } else if (!result.data) {
          console.error("/.sandstorm-credentials is not JSON?");
        } else if (result.data.token) {
          Meteor.loginWithToken(result.data.token, f);
        }
      });
    //}
  //});
}

withOwner = function(f) {
  withUserLoggedInThatHasPermissions(['owner'], f);
}

withNonOwner = function(f) {
  withUserLoggedInThatHasPermissions([], f);
}
