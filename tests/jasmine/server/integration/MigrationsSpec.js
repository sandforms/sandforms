describe("migrations", function() {
  
  it("should migrate to v1 properly", function() {
    // Given
    Prompts.remove({});
    Migrations.migrateTo(0);
    Prompts.create("Hello");

    // When
    Migrations.migrateTo(1);

    // Then
    var searchResults = Prompts.find({required: true}).fetch();

    expect(searchResults.length).toEqual(1);
  });

  it("should migrate down from v1 properly", function() {
    // Given
    Prompts.remove({});
    Migrations.migrateTo(1);
    Prompts.create("Hello again");

    // When
    Migrations.migrateTo(0);

    // Then
    var searchResults = Prompts.find({required: {$exists: true}}).fetch();

    expect(searchResults.length).toEqual(0);
  });
});

