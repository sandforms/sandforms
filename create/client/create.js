Template.create.events({
  'click button': function() {

    $('input').each(function(i, promptInput) {
      var promptText = promptInput.value;
      Prompts.insert({text: promptText});
    });

    $('input').val('');
  }
});
