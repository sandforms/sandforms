
MochaWeb.testOnly(function() {

  describe("submit answers", function() {

    it("should allow inserts", function() {
      Submissions.remove({});

      Submissions.insert({
        questionId: 'some-question-id',
        answer: 'my favorite color is blue!'
      });

      var q = Submissions.find();

      chai.expect(q.count()).to.equal(1);
    });
  });
});
