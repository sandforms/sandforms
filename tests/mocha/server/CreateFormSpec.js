

MochaWeb.testOnly(function() {

  describe("form builder", function() {

    it("should allow inserts", function() {
      Questions.remove({});

      Questions.insert({
        text: 'What is your favorite color?'
      });

      var q = Questions.find();

      chai.expect(q.count()).to.equal(1);
    });
  });
});
