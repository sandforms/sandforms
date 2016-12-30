Submissions = new Mongo.Collection("submissions");

Submissions.allow({
  insert: function(userId, submission) {
    var requiredPrompts = Prompts.find({$and: [{required: true}, {deleted: {$ne: true}}]}).fetch();

    var areAnyRequiredPromptsNotRespondedTo = requiredPrompts.some(function(prompt) {
      return !submission.responses.some(function(response) {
          return ((response.promptId === prompt._id) && (response.response != ''));
      });
    });

    return !areAnyRequiredPromptsNotRespondedTo;
  },

  update: function(userId) {
    return User.isOwnersUserId(userId);
  },

  remove: function(userId) {
    return User.isOwnersUserId(userId);
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
    submission.responses = prompts.map(function(prompt) {
      var responseForPrompt = _(submission.responses).find(function(response) {
        return response.promptId === prompt._id;
      });

      if (responseForPrompt === undefined) {
        return '';
      } else {
        return responseForPrompt.response;
      }
    });

    return submission;
  });
};

Submissions.exportCsvFormattedString = function() {
  var prompts = Prompts.inOrder();

  var fields = prompts.map(function(p) {
    return p.text;
  });
  
  var data = Submissions.inTableFormat(prompts).map(function(s) {
    return s.responses;
  });

  return Papa.unparse({
    fields: fields,
    data: data
  });
};
