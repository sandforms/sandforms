Router.configure({
    layoutTemplate: 'index'
});

Router.route('/', function() {
    if(Meteor.loggingIn()){
        this.render('loading');
        return;
    }

    if (User.ownerLoggedIn()) {
        this.render('create');
    } else {
        this.render('welcome');
    }
});

Router.route('/create');
Router.route('/responses');
Router.route('/submit');
Router.route('/thanks');
Router.route('/welcome');
