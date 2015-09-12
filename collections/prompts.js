Prompts = new Mongo.Collection("prompts");

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

Prompts.create = function(promptText) {
    if(promptText != "") {
        return Prompts.insert({text: promptText});
    }
}

Prompts.allPromptIds = function() {
  return Prompts.find().map(function(prompt) {
    return prompt._id;
  })
}

Prompts.inOrder = function() {
  return Prompts.find({}, {sort: ['text']});
};

