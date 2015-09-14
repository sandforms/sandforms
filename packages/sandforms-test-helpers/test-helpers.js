Meteor.methods({

  clearAllCollections: function() {
    Prompts.remove({});
    Submissions.remove({});
  }
});
