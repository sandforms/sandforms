Router.configure({
  layoutTemplate: 'index'
});

Router.route('/create');
Router.route('/responses');
Router.route('/submit');
Router.route('/thanks');
Router.route('/welcome');

Router.route('/', function() {
  this.subscribe('userData').wait();

  if (!this.ready() || Meteor.loggingIn()) {
      this.render('loading');
  } else if (User.ownerLoggedIn()) {
      Router.go('create');
  } else {
      Router.go('welcome');
  }
});

