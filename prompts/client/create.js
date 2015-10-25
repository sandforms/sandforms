if (Meteor.isClient) {

  Template.create.helpers({
    prompts: function() {
      return Prompts.inOrder();
    }
  });

  Template.create.events({
    "submit .create-survey__form": function (event) {
      event.preventDefault();
      var text = event.target.prompt.value;

      Prompts.create(text);
      event.target.prompt.value = "";
    },
    "submit .create-survey__update-form": function (event) {
      event.preventDefault();
      var text = event.target.prompt.value;
      var promptId = $(event.target).data('prompt-id');

      Prompts.update(
        {_id: promptId},
        {$set: {"text": text}}
      );
    },
    "click .deleteX":function(prompt){
      Prompts.markAsDeleted(this._id);
    }
  });
}
