function clearAllCollections() {
  Prompts.remove({});
  Submissions.remove({});
}

Meteor.methods({

  clearAllCollections: clearAllCollections,

  setupFixtures: function() {
    clearAllCollections();

    var id = Prompts.insert("test prompt");
    Submissions.insert({
      promptId: id,
      response: 'test response'
    });
  }
});
