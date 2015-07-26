

MochaWeb.testOnly(function() {

  describe("submissions", function() {

    it("should give us answers back with order matching the given questions", function() {
      // Given
      var questions = [
        { _id: 'id-1', text: 'aaa' },
        { _id: 'id-2', text: 'bbb' },
        { _id: 'id-3', text: 'ccc' }
      ];

      Submissions.remove({});
      Submissions.insert({ answers: [
        { questionId: 'id-2', answer: 'udfn answer 2'},
        { questionId: 'id-1', answer: 'zl3k answer 1'},
        { questionId: 'id-3', answer: 'akdf answer 3'}
      ]});

      // When
      var answersArray = Submissions.inTableFormat(questions);

      // Then
      chai.expect(answersArray).to.deep.have.members([
        ['zl3k answer 1', 'udfn answer 2', 'akdf answer 3']
      ]);
    });

    it("should return a blank string if the answer to a question is missing", function() {
      // Given
      var questions = [
        { _id: 'id-1', text: 'aaa' },
        { _id: 'id-2', text: 'bbb' },
      ];

      Submissions.remove({});
      Submissions.insert({ answers: [
        { questionId: 'id-1', answer: 'zl3k answer 1'},
      ]});

      // When
      var answersArray = Submissions.inTableFormat(questions);

      // Then
      chai.expect(answersArray).to.deep.have.members([
        ['zl3k answer 1', '']
      ]);
    });
  });
});
