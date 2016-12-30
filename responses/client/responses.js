Template.responses.helpers({

  prompts: function() {
    return Prompts.inOrder({ deleted: true });
  },

  responsesInOrder: function() {
    return Submissions.inTableFormat(
      Prompts.inOrder({ deleted: true })
    );
  }
});

Template.responses.events({
  'click .responses__delete': function() {
    Submissions.remove(this._id);
  }
});

Template.response.onRendered(function() {
  this.$('.responses__actions__delete-modal').leanModal({
    complete: function() {
      $('.lean-overlay').remove();
    }
  });
});
