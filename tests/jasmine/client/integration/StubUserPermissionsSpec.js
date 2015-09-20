describe("stubbing user permissions for tests", function() {

  it("should log us in as an owner", function(done) {
    withOwner(function() {
      expect(User.ownerLoggedIn()).toBe(true);
      done();
    });
  });

  it("should let us log in without any permissions", function(done) {
    withNonOwner(function() {
      expect(User.ownerLoggedIn()).toBe(false);
      done();
    });
  });

});
