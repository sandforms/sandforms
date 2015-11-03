Template._navigation.helpers({
    isOwner: function() {
        return User.ownerLoggedIn();
    },
    isCreatePage: function() {
      return Router.current().route.getName() === "create";
    },
    isResponsePage: function() {
      return Router.current().route.getName() === 'responses'
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

Template._navigation.events({
 'click .export-to-csv': function(event, template) {
    var file,
        fileName,
        submissions;
    event.preventDefault();

    file = new Blob([Submissions.exportCsvFormattedString()], {type: "text/plain;charset=utf-8"});
    fileName = new Date().toString() + '.csv';
    saveAs(file, fileName);
  },
  'click .share-form': function(event, template) {
    console.log('got here');
    $('.share-form').leanModal();
  }
});
