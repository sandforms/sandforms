Meteor.publish('userData', function() {
  if (this.userId) {
    var user = Meteor.users.find({
      _id: this.userId
    }, { fields: { 'services.sandstorm.permissions': 1 }});

    return user;
  } else {
    this.ready();
  }
});
