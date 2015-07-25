
Template.responses.helpers({
  questions: function() {
    return Questions.inOrder();
  },
  answersInOrder: function() {
    return Answers.inTableFormat(Questions.inOrder());
    //return [['1', '2', '3'], ['21', '22', '23']];
  }
});
