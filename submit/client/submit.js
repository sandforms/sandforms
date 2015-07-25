
Template.submit.helpers({
  questions: function() {
    return Questions.find();
  }
});

Template.submit.events({
  'click button': function() {
    var answers = Questions.allQuestionIds().map(function(id) {
      return {
        questionId: id,
        answer: $('#' + id).val()
      }
    });

    Submissions.insert({answers: answers});
  }
});
