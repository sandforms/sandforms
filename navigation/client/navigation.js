Template._navigation.helpers({
    isOwner: function() {
        return User.ownerLoggedIn();
    }
});

Template._navigation.rendered = function () {

}
