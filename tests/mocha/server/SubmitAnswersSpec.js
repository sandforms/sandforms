
MochaWeb.testOnly(function() {

  describe("submit answers", function() {

    it("should allow inserts", function() {
      Answers.remove({});

      Answers.insert({
        questionId: 'some-question-id',
        answer: 'my favorite color is blue!'
      });

      var q = Answers.find();

      chai.expect(q.count()).to.equal(1);
    });
  });
});
