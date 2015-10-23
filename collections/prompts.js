Prompts = new Mongo.Collection("prompts");

Prompts.allow({
  insert: function(userId) {
    return User.isOwnersUserId(userId);
  },
  update: function(userId) {
    return User.isOwnersUserId(userId);
  },
  remove: function(userId) {
    return User.isOwnersUserId(userId);
  }
});

if (Meteor.isServer) {
  Meteor.publish("prompts", function() {
    return Prompts.find({});
  });

  Meteor.methods({
    'Prompts.create': function(promptText) {
      var order = incrementCounter(Counters, "promptOrder");
      if(promptText != "") {
          return Prompts.insert({text: promptText, order: order});
      }
    }
  });
}

Prompts.create = function(promptText) {
  return Meteor.call('Prompts.create', promptText);
};

Prompts.allPromptIds = function() {
  var notDeleted = {
    $or: [
      { "deleted": { $exists: false }},
      { "deleted": false }
    ]
  };
  return Prompts.find(notDeleted).map(function(prompt) {
    return prompt._id;
  });
};

Prompts.inOrder = function() {
  var notDeleted = {
    $or: [
      { "deleted": { $exists: false }},
      { "deleted": false }
    ]
  };
  return Prompts.find(notDeleted, {sort: ['order']}).fetch();
};

Prompts.getPromptContent = function() {
  return Prompts.find().map(function(prompt) {
    return prompt.text;
  });
};

Prompts.markAsDeleted = function(promptId) {
  Prompts.update(
    { _id: promptId },
    { $set: { "deleted": true } }
  );
}
