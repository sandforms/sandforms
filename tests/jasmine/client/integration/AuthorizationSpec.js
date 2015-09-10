describe("authorization", function() {

  function withSandstormUser(f) {
    HTTP.get("/.sandstorm-credentials", function (error, result) {
      if (error) {
        console.error(error.stack);
      } else if (!result.data) {
        console.error("/.sandstorm-credentials is not JSON?");
      } else if (result.data.token) {
        Meteor.loginWithToken(result.data.token, f);
      }
    });
  }

  beforeEach(function() {
    Prompts.find().forEach(function (p) {
      Prompts.remove({_id: p._id});
    });
  });

  //it("should not let a non-owner add Prompts", function(done) {
  //  withSandstormUser(function() {
  //    Prompts.insert("Should anyone be able to add prompts?", function(error, result) {

  //      // TODO: not checking for undefined error first passes? what?
  //      expect(error).not.toBeUndefined();
  //      expect(error.error).toBe(403);

  //      done();
  //    });
  //  });
  //});

  it("should let an owner add Prompts", function (done) {
    // Given
    withSandstormUser(function() {
      // When
      Prompts.insert("Should owners be able to add prompts?", function(error, result) {

        // Then
        expect(error).toBeUndefined();

        done();
      });
    });
  });

});
