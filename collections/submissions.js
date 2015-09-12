Submissions = new Mongo.Collection("responses");

Submissions.inTableFormat = function(promptsInOrder) {
  return Submissions.find().map(function(submission) {
    var responsesInOrder = promptsInOrder.map(function(prompt) {
      var responseForPrompt = _(submission.responses).find(function(response) {
        return response.promptId === prompt._id;
      });

      if (responseForPrompt === undefined) {
        return '';
      } else {
        return responseForPrompt.response;
      }
    });

    return responsesInOrder;
  });
}
