Router.isOwner = function(user) {
  if (user === null) {
    return false;
  } else {
    var permissions = user.services.sandstorm.permissions;
    return _(permissions).contains("owner");
  }
}

Router.configure({
  layoutTemplate: 'index'
});

Router.route('/', function() {
  if (Router.isOwner(Meteor.user())) {
    this.render('create');
  } else {
    this.render('submit');
  }
});

Router.route('/create');
Router.route('/responses');
Router.route('/submit');
