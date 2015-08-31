describe("isOwner", function() {

  it("should return false when the user does not have the owner permission", function() {
    // Given
    var user = {
      services: { sandstorm: { permissions: []}}
    };

    // When/Then
    expect(Router.isOwner(user)).toBe(false);
  });

  it("should return true when the user has the owner permission", function() {
    // Given
    var user = {
      services: { sandstorm: { permissions: [ "owner" ]}}
    };

    // When/Then
    expect(Router.isOwner(user)).toBe(true);
  });

  it("should return false when the user is null", function() {
    // When
    var isOwner = Router.isOwner(null);

    // Then
    expect(isOwner).toBe(false);
  });
});
