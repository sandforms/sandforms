Template.responses.helpers({

  prompts: function() {
    return Prompts.inOrder();
  },

  answersInOrder: function() {
    return Submissions.inTableFormat(Prompts.inOrder());
  }
});
