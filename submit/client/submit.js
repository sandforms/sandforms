Template.submit.helpers({
  prompts: function() {
    return Prompts.inOrder();
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
  },

  'keypress form': function(e) {
    var isEnterKey = e.keyCode == 13;
    var focusIsNotOnSubmitButton = e.target.type != 'submit';

    if(isEnterKey && focusIsNotOnSubmitButton) {
      e.preventDefault();
    }
  }
});

Template.submit.onRendered(function() {
  $('modal-trigger').leanModal();
});

