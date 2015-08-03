Template.responses.helpers({

  prompts: function() {
    return Prompts.inOrder();
  },

  responsesInOrder: function() {
    return Submissions.inTableFormat(Prompts.inOrder());
  }
});
