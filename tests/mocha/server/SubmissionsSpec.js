MochaWeb.testOnly(function() {

  describe("submissions", function() {

    it("should give us responses back with order matching the given prompts", function() {
      // Given
      var prompts = [
        { _id: 'id-1', text: 'AAA What is your pets same?' },
        { _id: 'id-2', text: 'BBB Favorite color?' },
        { _id: 'id-3', text: 'CCC Are you the NSA?' }
      ];

      Submissions.remove({});
      Submissions.insert({ responses: [
        { promptId: 'id-2', response: 'GGG Garfield'},
        { promptId: 'id-1', response: 'ZZZ Orange'},
        { promptId: 'id-3', response: 'AAA Maybe'}
      ]});

      // When
      var responses = Submissions.inTableFormat(prompts);

      // Then
      chai.expect(responses).to.deep.have.members([
        ['ZZZ Orange', 'GGG Garfield', 'AAA Maybe']
      ]);
    });

    it("should return a blank string if the response to a prompt is missing", function() {
      // Given
      var prompts = [
        { _id: 'id-1', text: 'What is your pets name?' },
        { _id: 'id-2', text: 'Favorite color?' },
      ];

      Submissions.remove({});
      Submissions.insert({ responses: [
        { promptId: 'id-1', response: 'Garfield'},
      ]});

      // When
      var responses = Submissions.inTableFormat(prompts);

      // Then
      chai.expect(responses).to.deep.have.members([
        ['Garfield', '']
      ]);
    });
  });
});
