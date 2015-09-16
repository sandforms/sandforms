Submissions = new Mongo.Collection("submissions");

Submissions.allow({
  insert: function() {
    return true;
  }
});

if (Meteor.isServer) {
  Meteor.publish("submissions", function() {
    if (this.userId === null) return [];
    var user = Meteor.users.findOne({_id: this.userId});
    var permissions = user.services.sandstorm.permissions;
    var isOwner = permissions.indexOf('owner') > -1;

    if (isOwner) {
      return Submissions.find({});
    } else {
      return [];
    }
  });
}

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

Submissions.exportCsvFormattedString = function() {
  var parsedString = '',
      headers = [];
  Submissions.find().forEach(function(submission){
    var row = []

    Object.keys(submission).forEach(function(header){
      if (headers.indexOf(header) === -1) { headers.push(header) }
    });

    headers.forEach(function(header){
      row.push(submission[header]);
    });

    parsedString += row.join(',') + '\r\n';
  });
  if(headers.length === 0) { headers = Prompts.getPromptContent(); }

  return headers.join(',') + '\r\n' + parsedString;
};
