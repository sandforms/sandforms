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

    Submissions.insert({
      responses: responses
    });

    $('.response-input').val('');
    Session.set('submitted', true)
    Router.go('/thanks')
  },

  'keypress form': function(e) {
    if (e.keyCode != 13) { // Return if the key is not Enter
      return;
    }

    var activeInput = e.target;
    var focusIsNotOnSubmitButton = e.target.type != 'submit';

    var inputs = $(activeInput).closest('form').find(':input');
    var isLastInput = (inputs.index(activeInput) >= inputs.length - 2);

    if (focusIsNotOnSubmitButton && !isLastInput) {
      e.preventDefault();
      inputs.eq(inputs.index(activeInput) + 1).focus();
    }
  }


});

Template.submit.onRendered(function() {
  $('modal-trigger').leanModal();
  $('#submit-form').verify(); // Bind verify.js to the form
});

$.notify.addStyle('mystyle', {
  html: "<div><span data-notify-text/></div>",
  classes: {
    base: {
      "white-space": "nowrap",
      "color": "red",
      "padding": "5px"
    }
  }
});

$.notify.defaults({
  style: 'mystyle',
  elementPosition: 'right middle'
});