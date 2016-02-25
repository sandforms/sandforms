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
    'Prompts.create': function(promptText, promptRequired) {
      var defaultPromptType = "shortAnswer";

      if (typeof promptRequired === 'undefined') {
        promptRequired = false;
      }
      if (typeof selectedPromptType === 'undefined') {
        selectedPromptType = defaultPromptType;
      }

      check(promptText, String);
      check(promptRequired, Boolean);
      var order = incrementCounter(Counters, "promptOrder");
      if(promptText != "") {
          return Prompts.insert({text: promptText,
            required: promptRequired,
            order: order,
            selectedPromptType: selectedPromptType});
      }
    }
  });
}

Prompts.create = function(promptText, promptRequired) {
  promptRequired = (typeof promptRequired === 'undefined') ? false: promptRequired;
  return Meteor.call('Prompts.create', promptText, promptRequired);
};

Prompts.allPromptIds = function(maybeOptions) {
  var queryObject = _buildQueryFromOptions(maybeOptions);
  return Prompts.find(queryObject).map(function(prompt) {
    return prompt._id;
  });
};

Prompts.inOrder = function(maybeOptions) {
  var queryObject = _buildQueryFromOptions(maybeOptions);
  return Prompts.find(queryObject, {sort: ['order']}).fetch();
};

Prompts.markAsDeleted = function(promptId) {
  Prompts.update(
    { _id: promptId },
    { $set: { "deleted": true } }
  );
};

function _buildQueryFromOptions(maybeOptions) {
  var options = _(
    nullOrUndefined(maybeOptions) ? {} : maybeOptions
  ).defaults({
    deleted : false
  });

  var queryObject = {};

  if (!options.deleted) {
    queryObject['$or'] = [
      { "deleted": { $exists: false }},
      { "deleted": false }
    ];
  }

  return queryObject;
}
