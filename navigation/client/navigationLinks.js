function isPage(name) {
  return Router.current().route.getName() === name;
}

Template._navigationLinks.helpers({
    isOwner: function() {
        return User.ownerLoggedIn();
    },
    isCreatePage: function() {
      console.log(isPage('create'));
      return isPage('create');
    },
    isResponsePage: function() {
      return isPage('responses');
    },
    isCreateActive: function() {
      return isPage('create') ?  'navigation__item-active' : '';
    },
    isResponsesActive: function() {
      return isPage('responses') ? 'navigation__item-active' : '';
    },
    showOrHideShareButton: function() {
      return isPage('create') ? '' : 'hide';
    },
    showOrHideExportCSVButton: function() {
      return isPage('responses') ? '' : 'hide'; }
});

Template._navigationLinks.events({
    "click #share-form": function () {
        // Tell Sandstorm to show the Share Access menu.
        window.parent.postMessage({startSharing: {}}, "*");
    }
});
