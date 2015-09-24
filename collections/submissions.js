Submissions = new Mongo.Collection("submissions");

Submissions.allow({
  insert: function() {
    return true;
  }
});

if (Meteor.isServer) {
  Meteor.publish("submissions", function() {
    if (this.userId === null) return [];
    var isOwner = User.isOwnersUserId(this.userId);

    if (isOwner) {
      return Submissions.find({});
    } else {
      return [];
    }
  });
}

Submissions.inTableFormat = function(prompts) {
  return Submissions.find().map(function(submission) {
    var responses = prompts.map(function(prompt) {
      var responseForPrompt = _(submission.responses).find(function(response) {
        return response.promptId === prompt._id;
      });

      if (responseForPrompt === undefined) {
        return '';
      } else {
        return responseForPrompt.response;
      }
    });

    return responses;
  });
}

Submissions.exportCsvFormattedString = function() {
  var csvFormattedResponses = '',
      headerText = [],
      prompts = Prompts.inOrder();

  prompts.forEach(function(prompt){
    headerText.push(prompt.text);
  });

  Submissions.inTableFormat(prompts).forEach(function(submission){
    console.log(submission);
    csvFormattedResponses += submission.join(',') + '\r\n';
  });

  return headerText.join(',') + '\r\n' + csvFormattedResponses;
};
