if (Meteor.isClient) {
  
  Template.create.helpers({
    prompts: function() {
      return Prompts.inOrder();
    }
  });

  Template.create.events({
    "submit form": function (event) {
      preventBrowserDefaultFormSubmit(event);
      var text = event.target.prompt.value;
      Prompts.create(text);
      event.target.prompt.value = "";
    }
  });

  var preventBrowserDefaultFormSubmit = function(event) {
    event.preventDefault();
  }
}