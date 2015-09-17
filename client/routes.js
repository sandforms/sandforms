Router.configure({
  layoutTemplate: 'index'
});

Router.route('/', function() {
  if (User.isOwner(Meteor.user())) {
    this.render('create');
  } else {
    this.render('submit');
  }
});

Router.route('/create');
Router.route('/responses');
Router.route('/submit');
Router.route('/thanks');
