MochaWeb.testOnly(function() {

  describe("questions", function() {

    it("should let us get all question ids", function() {
      // Given
      Questions.remove({});
      var id = Questions.insert({text: 'What is your favorite color?'});

      // When
      var questionIds = Questions.allQuestionIds();

      // Then
      chai.expect(questionIds).to.have.members([id]);
    });
  });
});
