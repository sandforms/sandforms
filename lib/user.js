User = {}

User.isOwner = function(user) {
  if (user === null) {
    return false;
  } else {
    var permissions = user.services.sandstorm.permissions;
    return _(permissions).contains("owner");
  }
};


User.ownerLoggedIn = function() {
  return User.isOwner(Meteor.user());
}
