describe("authorization", function() {

  beforeEach(function(done) {
    Meteor.call("setupFixtures", done);
  });

  it("should let everyone see all of the Prompts", function(done) {
    // Given
    AccountsSandstorm.withNonOwner(function() {
      // When
      var result = Prompts.find({}).fetch();

      // Then
      expect(result).not.toBeUndefined();
      expect(result.length).toBe(1);

      done();
    });
  });

  it("should not let a non-owner add Prompts", function(done) {
    // Given
    AccountsSandstorm.withNonOwner(function() {
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
     AccountsSandstorm.withOwner(function() {
      // When
      Prompts.insert("Should owners be able to add prompts?", function(error, result) {

        // Then
        expect(error).toBeUndefined();

        done();
      });
    });
  });

  it("should not let non-owners view Submissions", function(done) {
    // Given
    AccountsSandstorm.withNonOwner(function() {
      // When
      var result = Submissions.find({}).fetch();

      // Then
      expect(result.length).toBe(0);

      done();
    });
  });

  it("should let owners view all Submissions", function(done) {
    // Given
    AccountsSandstorm.withOwner(function() {
      // When
      var result = Submissions.find({}).fetch();

      // Then
      expect(result.length).toBe(1);

      done();
    });
  });

  it("should let everyone add Submissions", function(done) {
    // Given
    AccountsSandstorm.withNonOwner(function() {
      // When
      Submissions.insert({ responses: [ {
        promptId: 'test-prompt-id',
        response: 'test response'
      }]}, function(error, id) {
        // Then
        expect(error).toBeUndefined();
        expect(id).not.toBeUndefined();
        done();
      });
    })
  });
});
