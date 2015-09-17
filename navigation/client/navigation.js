Template._navigation.helpers({
  isOwner: function() {
    return User.ownerLoggedIn();
  }
});
