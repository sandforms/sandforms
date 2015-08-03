Template.submit.helpers({
  prompts: function() {
    return Prompts.find();
  }
});

Template.submit.events({
  'click button': function() {
    var answers = Prompts.allPromptIds().map(function(id) {
      return {
        promptId: id,
        answer: $('#' + id).val()
      }
    });

    Submissions.insert({answers: answers});

    $('input').val('');
  }
});
