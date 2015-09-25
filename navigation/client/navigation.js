Template._navigation.helpers({
    isOwner: function() {
        return User.ownerLoggedIn();
    },

    createActive: function() {
      return Router.current().route.getName() === "create";
    },

    responsesActive: function() {
      return Router.current().route.getName() === "responses";
    }
});
