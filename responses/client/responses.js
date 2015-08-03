Template.responses.helpers({

  questions: function() {
    return Questions.inOrder();
  },

  answersInOrder: function() {
    return Submissions.inTableFormat(Questions.inOrder());
  }
});
