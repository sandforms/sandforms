

MochaWeb.testOnly(function() {

  describe("questions", function() {

    it("should let us get all question ids", function() {
      // Given
      Questions.remove({});
      var id = Questions.insert({text: 'some-text'});

      // When
      var questionIds = Questions.allQuestionIds();

      // Then
      chai.expect(questionIds).to.have.members([id]);
    });
  });
});
