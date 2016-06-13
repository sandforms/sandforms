var fieldIsAnswered = function(response){
  return response.response != "";
};

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
      function responseFromPage() {
        if (Prompts.findOne(id).selectedPromptType == "multipleChoice") {
          return $('#' + id + ' input:checked').val();
        } else {
          return $('#' + id).val();
        }
      }

      return {
        promptId: id,
        response: responseFromPage()
      };
    });

    if (responses.some(fieldIsAnswered)){
        Submissions.insert({responses: responses});
        $('.response-input').val('');
        Session.set('submitted', true);
        Router.go('/thanks');
    } else {
        Session.set("error", "Please fill out at least one field");
    }
  },

  'keypress input': function(e) {
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

$.notify.addStyle('redalert', {
  html: "<div><span data-notify-text/></div>",
  classes: {
    base: {
      "white-space": "nowrap",
      "color": "red",
      "padding": "0px",
      "position": "absolute",
      "right": "5px",
      "top": "0.8rem"
    }
  }
});

$.notify.defaults({
  style: 'redalert',
  elementPosition: 'right top',
  autoHide: false,
  arrowShow: false
});
