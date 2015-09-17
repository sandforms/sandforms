User = {
  isOwner: function(user) {
    if (user === null) {
      return false;
    } else {
      var permissions = user.services.sandstorm.permissions;
      return _(permissions).contains("owner");
    }
  }


}
