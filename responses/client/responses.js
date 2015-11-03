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
