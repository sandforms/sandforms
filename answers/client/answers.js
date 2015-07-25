
Template.answers.helpers({
  questions: function() {
    return Questions.find();
  }
});

Template.answers.events({
  'click button': function() {
    var answers = Questions.allQuestionIds().map(function(id) {
      return {
        questionId: id,
        answer: $('#' + id).val()
      }
    });

    Answers.insert({answers: answers});
  }
});
