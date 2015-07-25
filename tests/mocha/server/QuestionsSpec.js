

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

    it("should give us answers back with order matching the given questions", function() {
      // Given
      var questions = [
        { _id: 'id-1', text: 'aaa' },
        { _id: 'id-2', text: 'bbb' },
        { _id: 'id-3', text: 'ccc' }
      ];

      Answers.remove({});
      Answers.insert({ answers: [
        { questionId: 'id-2', answer: 'udfn answer 2'},
        { questionId: 'id-1', answer: 'zl3k answer 1'},
        { questionId: 'id-3', answer: 'akdf answer 3'}
      ]});

      // When
      var answersArray = Answers.inTableFormat(questions);

      // Then
      chai.expect(answersArray).to.deep.have.members([
        ['zl3k answer 1', 'udfn answer 2', 'akdf answer 3']
      ]);
    });
  });
});
