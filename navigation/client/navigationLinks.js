function isPage(name) {
  return Router.current().route.getName() === name;
}

Template._navigationLinks.onRendered(function() {
  $('#share-form').leanModal();
});

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
