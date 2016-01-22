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

  'keypress .response-input': function(e) {
    var activeInput = e.target;
    var isEnterKey = e.keyCode == 13;
    var inputs = $(activeInput).closest('form').find(':input');
    var isLastInput = (inputs.index(activeInput) >= inputs.length - 2);

    if(isEnterKey && !isLastInput) { 
      e.preventDefault();
      inputs.eq( inputs.index(activeInput)+ 1 ).focus();
    }
  },

  'focus .btn': function(e) {
    var button = e.target;
    if( button.id == 'submit-responses') {
      button.style.backgroundColor = 'black';   
    }
  },

  'blur .btn': function(e) {
    var button = e.target;
    if (button.id == 'submit-responses') {
      button.style.backgroundColor = '';
    }
  }
});

Template.submit.onRendered(function() {
  $('modal-trigger').leanModal();
});

