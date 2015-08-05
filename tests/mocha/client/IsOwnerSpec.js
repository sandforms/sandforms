
MochaWeb.testOnly(function() {

  describe("isOwner", function() {

    it("should return false when the user does not have the owner permission", function() {
      // Given
      var user = {
        services: { sandstorm: { permissions: []}}
      };

      // When/Then
      chai.expect(Router.isOwner(user)).to.be.false;
    });

    it("should return true when the user has the owner permission", function() {
      // Given
      var user = {
        services: { sandstorm: { permissions: [ "owner" ]}}
      };

      // When/Then
      chai.expect(Router.isOwner(user)).to.be.true;
    });

    it("should return false when the user is null", function() {
      // When
      var isOwner = Router.isOwner(null);

      // Then
      chai.expect(isOwner).to.be.false;
    });
  });
});
