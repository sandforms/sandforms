describe("authorization", function() {

  function withUser(permissions, f) {
    var ownerId = Accounts.createUser({
      email: 'test@test.com',
      password: 'testing',
      services: {
        sandstorm: {
          permissions: permissions
        }
      }
    });

    Meteor.loginWithPassword("test@test.com", "testing", function(err) {
      expect(err).toBeUndefined();
      f();
    });
  }

  function withNonOwner(f) {
    withUser([], f);
  }

  function withOwner(f) {
    withUser(['owner'], f);
  }

  beforeEach(function() {
    Prompts.find().forEach( function (p) {
      Prompts.remove({_id: p._id});
    });
  });

  it("should not let a non-owner add Prompts", function(done) {
    withNonOwner(function() {
      Prompts.insert("Should anyone be able to add prompts?", function(error, result) {

        expect(error.error).toBe(403);

        done();
      });
    });
  });

  //it("should let an owner add Prompts", function (done) {
  //  withOwner(function() {
  //    Prompts.insert("Should anyone be able to add prompts?", function(error, result) {

  //      expect(error).toBeUndefined();

  //      done();
  //    });
  //  });
  //});
});
