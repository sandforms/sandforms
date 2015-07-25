
Questions = new Mongo.Collection("questions");

// TODO: Let's find a good place to put this kind of code
Questions.allQuestionIds = function() {
  return Questions.find().map(function(question) {
    return question._id;
  })
}

Questions.inOrder = function() {
  return Questions.find({}, {sort: ['text']});
};


Submissions = new Mongo.Collection("answers");

Submissions.inTableFormat = function(questionsInOrder) {
  return Submissions.find().map(function(submission) {
    var answersInOrder = questionsInOrder.map(function(question) {
      var answerForQuestion = _(submission.answers).find(function(answer) {
        return answer.questionId === question._id;
      });

      return answerForQuestion.answer;
    });

    return answersInOrder;
  });
}
