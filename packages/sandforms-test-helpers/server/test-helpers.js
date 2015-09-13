function clearAllCollections() {
  Prompts.remove({});
  Submissions.remove({});
}

Meteor.methods({

  clearAllCollections: clearAllCollections,

  setupFixtures: function() {
    clearAllCollections();

    Prompts.insert("test prompt");
    Submissions.insert({
      promptId: id,
      response: 'test response'
    });
  }
});
