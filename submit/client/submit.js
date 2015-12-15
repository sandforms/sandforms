var fieldIsAnswered = function(response){
  return response.response != "";
}

Template.submit.helpers({
  prompts: function() {
    return Prompts.inOrder();
  },
  alreadySubmitted: function() {
    return Session.get('submitted');
  },
  error: function(){
    return Session.get("error");
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

    if (responses.some(fieldIsAnswered)){
        Submissions.insert({responses: responses});
        $('.response-input').val('');
        Session.set('submitted', true)
        Router.go('/thanks')
    } else {
        Session.set("error", "Please fill out at least one field");
    }
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

