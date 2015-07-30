
Template.create.events({
  'click button': function() {

    $('input').each(function(i, questionInput) {
      var questionText = questionInput.value;
      Questions.insert({text: questionText});
    });

    $('input').val('');
  }
});
