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
    var activeInput = e.target;
    var isEnterKey = e.keyCode == 13;

    if(isEnterKey) { 
      e.preventDefault();
      var inputs = $(activeInput).closest('form').find(':input');
      inputs.eq( inputs.index(activeInput)+ 1 ).focus();
    }
  }
  // TODO: Consider posting when user hits Enter on final form element
  // TODO: Submit button should have same focus/blur behavior as hover/no-hover
});

Template.submit.onRendered(function() {
  $('modal-trigger').leanModal();
});

