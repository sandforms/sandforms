User = {};

User.hasSandstormInfo = function(user) {
  return !(nullOrUndefined(user)
    || nullOrUndefined(user.services)
    || nullOrUndefined(user.services.sandstorm));
};

User.isOwner = function(user) {
  if (!User.hasSandstormInfo(user)) {
    return false;
  } else {
    var permissions = user.services.sandstorm.permissions;
    return _(permissions).contains("owner");
  }
};

User.isOwnersUserId = function(userId) {
  var user = Meteor.users.findOne({_id: userId});
  return User.isOwner(user);
};

User.ownerLoggedIn = function() {
  return User.isOwner(Meteor.user());
};
