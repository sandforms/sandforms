function clearAllCollections() {
  Prompts.remove({});
  Submissions.remove({});
}

Meteor.methods({

  clearAllCollections: clearAllCollections,

  setupFixtures: function() {
    clearAllCollections();

    var id = Prompts.create("test prompt");
    Submissions.insert({
      responses: [{
        promptId: id,
        response: 'test response'
      }]
    });
  }
});