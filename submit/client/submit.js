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

  'keypress .input-field': function(e) {
    var isEnterKey = e.keyCode == 13;
    var focusIsNotOnSubmitButton = e.target.type != 'submit';

    if(isEnterKey && focusIsNotOnSubmitButton) {
      e.preventDefault();
      var input = e.target;
      var inputs = $(input).closest('form').find(':input');
      inputs.eq( inputs.index(input)+ 1 ).focus();
    }
  }
});

Template.submit.onRendered(function() {
  $('modal-trigger').leanModal();
});

