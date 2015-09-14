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
