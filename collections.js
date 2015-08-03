Prompts = new Mongo.Collection("prompts");

// TODO: Let's find a good place to put this kind of code
Prompts.allPromptIds = function() {
  return Prompts.find().map(function(prompt) {
    return prompt._id;
  })
}

Prompts.inOrder = function() {
  return Prompts.find({}, {sort: ['text']});
};

Submissions = new Mongo.Collection("answers");

Submissions.inTableFormat = function(promptsInOrder) {
  return Submissions.find().map(function(submission) {
    var answersInOrder = promptsInOrder.map(function(prompt) {
      var answerForPrompt = _(submission.answers).find(function(answer) {
        return answer.promptId === prompt._id;
      });

      if (answerForPrompt === undefined) {
        return '';
      } else {
        return answerForPrompt.answer;
      }
    });

    return answersInOrder;
  });
}
