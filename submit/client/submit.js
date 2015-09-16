Template.submit.helpers({
  prompts: function() {
    return Prompts.find();
  },
  alreadySubmitted: function() {
    return Session.get('submitted');
  }
});

Template.submit.events({

  'submit form': function(e) {
    e.preventDefault();

    var responses = Prompts.allPromptIds().map(function(id) {
      return {
        promptId: id,
        response: $('#' + id).val()
      }
    });

    Submissions.insert({responses: responses});

    $('.response-input').val('');
    Session.set('submitted', true)
    Router.go('/thanks')
  }
});
