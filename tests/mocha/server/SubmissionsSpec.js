MochaWeb.testOnly(function() {

  describe("submissions", function() {

    it("should give us answers back with order matching the given questions", function() {
      // Given
      var questions = [
        { _id: 'id-1', text: 'AAA What is your pets same?' },
        { _id: 'id-2', text: 'BBB Favorite color?' },
        { _id: 'id-3', text: 'CCC Are you the NSA?' }
      ];

      Submissions.remove({});
      Submissions.insert({ answers: [
        { questionId: 'id-2', answer: 'GGG Garfield'},
        { questionId: 'id-1', answer: 'ZZZ Orange'},
        { questionId: 'id-3', answer: 'AAA Maybe'}
      ]});

      // When
      var answers = Submissions.inTableFormat(questions);

      // Then
      chai.expect(answers).to.deep.have.members([
        ['ZZZ Orange', 'GGG Garfield', 'AAA Maybe']
      ]);
    });

    it("should return a blank string if the answer to a question is missing", function() {
      // Given
      var questions = [
        { _id: 'id-1', text: 'What is your pets name?' },
        { _id: 'id-2', text: 'Favorite color?' },
      ];

      Submissions.remove({});
      Submissions.insert({ answers: [
        { questionId: 'id-1', answer: 'Garfield'},
      ]});

      // When
      var answers = Submissions.inTableFormat(questions);

      // Then
      chai.expect(answers).to.deep.have.members([
        ['Garfield', '']
      ]);
    });
  });
});
