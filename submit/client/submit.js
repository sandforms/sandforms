Template.submit.helpers({
  prompts: function() {
    return Prompts.find();
  }
});

Template.submit.events({
  'click button': function() {
    var responses = Prompts.allPromptIds().map(function(id) {
      return {
        promptId: id,
        response: $('#' + id).val()
      }
    });

    Submissions.insert({responses: responses});

    $('input').val('');
  }
});
