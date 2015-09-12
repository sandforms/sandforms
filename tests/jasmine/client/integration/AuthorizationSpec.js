describe("authorization", function() {


  beforeEach(function(done) {
    withOwner(function() {
      Meteor.call("clearAllCollections", function() {
        Prompts.insert("test prompt", done);
      });
    });
  });

  it("should let everyone see all of the Prompts", function(done) {
    // Given
    withNonOwner(function() {
      // When
      var result = Prompts.find({}).fetch();
      console.log(result);

      // Then
      expect(result).not.toBeUndefined();
      expect(result.length).toBe(1);

      done();
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
