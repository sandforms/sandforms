Template.responses.helpers({

  prompts: function() {
    return Prompts.inOrder({ deleted: true });
  },

  responsesInOrder: function() {
    return Submissions.inTableFormat(
      Prompts.inOrder({ deleted: true })
    );
  }
});

Template.responses.events({
    'click .delete': function() {
        if (confirm("Delete this record?")) {
            Submissions.remove(this[0]);
        }
    }
});