Prompts = new Mongo.Collection("prompts");

Prompts.create = function(promptText) {
    if(promptText != "") {
        return Prompts.insert({text: promptText});
    }
}

// TODO: Let's find a good place to put this kind of code
Prompts.allPromptIds = function() {
  return Prompts.find().map(function(prompt) {
    return prompt._id;
  })
}

Prompts.inOrder = function() {
  return Prompts.find({}, {sort: ['text']});
};

Prompts.allow({
  insert: function(userId, _) {
    var user = Meteor.users.findOne({_id: userId});
    var permissions = user.services.sandstorm.permissions;
    return permissions.indexOf('owner') > -1;
  }
});

if (Meteor.isServer) {
  Meteor.publish("prompts", function() {
    return Prompts.find({});
  });
}

if (Meteor.isClient) {
  Meteor.subscribe("prompts");
}

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
