describe("migrations", function() {

  // _setControl avoids running unnecessary migrations to get to the
  // starting point and lets us ensure that 'locked' is false... it
  // seems to get stuck at true when running tests sometimes
  function startMigrationsAt(version) {
    Migrations._setControl({version: version, locked: false});
  };
  
  it("should migrate to v1 properly", function() {
    // Given
    Prompts.remove({});
    startMigrationsAt(0);
    Prompts.insert({
      text: "Hello"
    });

    // When
    Migrations.migrateTo(1);

    // Then
    var searchResults = Prompts.find({required: true}).fetch();

    expect(searchResults.length).toEqual(1);
  });

  it("should migrate down from v1 properly", function() {
    // Given
    Prompts.remove({});
    startMigrationsAt(1);
    Prompts.insert({
      text: "Hello",
      required: true
    });

    // When
    Migrations.migrateTo(0);

    // Then
    var searchResults = Prompts.find({required: {$exists: true}}).fetch();

    expect(searchResults.length).toEqual(0);
  });
  
  it("should migrate to v2 properly", function() {
    // Given
    Prompts.remove({});
    startMigrationsAt(1);
    Prompts.insert({
      text: "Hello"
    });

    // When
    Migrations.migrateTo(2);

    // Then
    var searchResults = Prompts.find({selectedPromptType: "shortAnswer"}).fetch();

    expect(searchResults.length).toEqual(1);
  });
});

