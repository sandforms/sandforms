describe("isOwner", function() {

  it("should return false when the user does not have the owner permission", function() {
    // Given
    var user = {
      services: { sandstorm: { permissions: []}}
    };

    // When/Then
    expect(User.isOwner(user)).toBe(false);
  });

  it("should return true when the user has the owner permission", function() {
    // Given
    var user = {
      services: { sandstorm: { permissions: [ "owner" ]}}
    };

    // When/Then
    expect(User.isOwner(user)).toBe(true);
  });

  it("should return false when the user is null", function() {
    // When
    var isOwner = User.isOwner(null);

    // Then
    expect(isOwner).toBe(false);
  });

  it("should return false when the sandstorm object is undefined", function() {
    // Given
    var user = {
      services: {}
    }

    // When / Then
    expect(User.isOwner(user)).toBe(false);
  })

  it("should return false when the services object is undefined", function() {
    // Given
    var user = {};

    // When / Then
    expect(User.isOwner(user)).toBe(false);
  })
});
