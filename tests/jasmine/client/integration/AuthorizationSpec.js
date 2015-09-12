describe("authorization", function() {


  beforeEach(function() {
    Prompts.find().forEach(function (p) {
      Prompts.remove({_id: p._id});
    });
  });

  it("should not let a non-owner add Prompts", function(done) {
    // Given
    withNonOwner(function() {
      // When
      Prompts.insert("Should anyone be able to add prompts?", function(error, result) {

        // Then
        expect(error.error).toBe(403);

        done();
      });
    });
  });

  it("should let an owner add Prompts", function (done) {
    // Given
     withOwner(function() {
      // When
      Prompts.insert("Should owners be able to add prompts?", function(error, result) {

        // Then
        expect(error).toBeUndefined();

        done();
      });
    });
  });

});
