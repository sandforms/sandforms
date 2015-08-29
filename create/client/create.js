Template.create.events({
 'submit form': function(e) {
    e.preventDefault();

    $('.input-field input').each(function(i, promptInput) {
      var promptText = promptInput.value;
      Prompts.create(promptText);
    });

    $('.input-field input').val('');
  }
});
