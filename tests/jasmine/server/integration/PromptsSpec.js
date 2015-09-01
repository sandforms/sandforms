describe("prompts", function() {

  it("should let us get all prompt ids", function() {
    // Given
    Prompts.remove({});
    var id = Prompts.create({text: 'What is your favorite color?'});

    // When
    var promptIds = Prompts.allPromptIds();

    // Then
    expect(promptIds.length).toBe(1);
    expect(promptIds).toContain(id);
  });

  it("should not store empty prompts", function() {
      // Given
      Prompts.remove({});
      var id = Prompts.create('');

      // When
      var promptIds = Prompts.allPromptIds();

      // Then
      expect(promptIds).not.toContain(id);
  });
});
