
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


Answers = new Mongo.Collection("answers");

Answers.inTableFormat = function(questionsInOrder) {
  return Answers.find().map(function(answers) {
    var answersInOrder = questionsInOrder.map(function(question) {
      var answerForQuestion = _(answers.answers).find(function(answer) {
        return answer.questionId === question._id;
      });

      return answerForQuestion.answer;
    });

    return answersInOrder;
  });
}
