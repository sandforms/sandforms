MochaWeb.testOnly(function() {

  describe("submissions", function() {

    it("should give us answers back with order matching the given prompts", function() {
      // Given
      var prompts = [
        { _id: 'id-1', text: 'AAA What is your pets same?' },
        { _id: 'id-2', text: 'BBB Favorite color?' },
        { _id: 'id-3', text: 'CCC Are you the NSA?' }
      ];

      Submissions.remove({});
      Submissions.insert({ answers: [
        { promptId: 'id-2', answer: 'GGG Garfield'},
        { promptId: 'id-1', answer: 'ZZZ Orange'},
        { promptId: 'id-3', answer: 'AAA Maybe'}
      ]});

      // When
      var answers = Submissions.inTableFormat(prompts);

      // Then
      chai.expect(answers).to.deep.have.members([
        ['ZZZ Orange', 'GGG Garfield', 'AAA Maybe']
      ]);
    });

    it("should return a blank string if the answer to a prompt is missing", function() {
      // Given
      var prompts = [
        { _id: 'id-1', text: 'What is your pets name?' },
        { _id: 'id-2', text: 'Favorite color?' },
      ];

      Submissions.remove({});
      Submissions.insert({ answers: [
        { promptId: 'id-1', answer: 'Garfield'},
      ]});

      // When
      var answers = Submissions.inTableFormat(prompts);

      // Then
      chai.expect(answers).to.deep.have.members([
        ['Garfield', '']
      ]);
    });
  });
});
