Template._navigation.helpers({
    isOwner: function() {
        return User.ownerLoggedIn();
    },

    isCreateActive: function() {
      return Router.current().route.getName() === "create" ?
        'active' : '';
    },

    isResponsesActive: function() {
      return Router.current().route.getName() === 'responses' ?
        'active' : '';
    }
});
