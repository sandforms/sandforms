describe("migrations", function() {
  it("should start up with v1 schema", function() {
    Prompts.remove({});

    Prompts.create("Hello");

    var searchResults = Prompts.inOrder({required: {$exists: true}});

    expect(searchResults.length).toEqual(1);
  });

  it("should migrate down from v1 properly", function() {
    Prompts.remove({});

    Prompts.create("Hello again");

    Migrations.migrateTo(1);
    Migrations.migrateTo(0);

    var searchResults = Prompts.inOrder({required: {$exists: true}});

    expect(searchResults.length).toEqual(0);
  });
});

