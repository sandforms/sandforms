Router.configure({
    layoutTemplate: 'index'
});

Router.route('/', function() {
    if(Meteor.loggingIn()){
        this.render('loading');
        return;
    }

    if (User.ownerLoggedIn()) {
        Router.go('create');
    } else {
        Router.go('welcome');
    }
});

Router.route('/create');
Router.route('/responses');
Router.route('/submit');
Router.route('/thanks');
Router.route('/welcome');
