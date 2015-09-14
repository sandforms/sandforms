describe("stubbing user permissions for tests", function() {

  it("should log us in as an owner", function(done) {
    withOwner(function() {
      var permissions = Meteor.user().services.sandstorm.permissions;
      expect(permissions).toContain('owner');
      done();
    });
  });

  it("should let us log in without any permissions", function(done) {
    withNonOwner(function() {
      var permissions = Meteor.user().services.sandstorm.permissions;
      expect(permissions).not.toContain('owner');
      done();
    });
  });

});
