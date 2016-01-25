Template._navigation.helpers({
    isOwner: function() {
        return User.ownerLoggedIn();
    },
});

Template._navigation.events({
 'click #export-to-csv': function(event, template) {
    var file,
        fileName,
        submissions;
    event.preventDefault();

    file = new Blob([Submissions.exportCsvFormattedString()], {type: "text/plain;charset=utf-8"});
    fileName = new Date().toString() + '.csv';
    saveAs(file, fileName);
  },
});
