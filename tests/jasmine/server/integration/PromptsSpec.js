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

  it("create should increment the order each time we call it", function() {
    // Given
    Prompts.remove({});
    Counters.remove({});

    Prompts.create('hello');
    Prompts.create('world');

    // When
    var promptId = Prompts.create('the third prompt');

    // Then
    var order = Prompts.findOne(promptId).order
    expect(order).toBe(3);
  });

  it("should return all prompts' content", function() {
      Prompts.remove({});
      Prompts.create('hello');
      Prompts.create('world');

      var prompts = Prompts.getPromptContent();
      expect(prompts).toEqual(['hello', 'world']);
  });

  it("should return all prompts in creation order", function() {
    Counters.remove({})
    Prompts.remove({});
    var id1 = Prompts.create('Your favorite book?');
    var id2 = Prompts.create('What is your favorite color?');

    var prompts = Prompts.inOrder();

    expect(prompts[0].text).toEqual('Your favorite book?');
  });

  it("should not return deleted prompt ids", function(){
    // Given
    Prompts.remove({});
    var id = Prompts.create({text: 'What is your favorite color?'});

    // When
    Prompts.markAsDeleted(id);

    // Then
    var promptIds = Prompts.allPromptIds();

    expect(promptIds.length).toBe(0);
    expect(promptIds).not.toContain(id);
  });

  it("should not return deleted prompts when inOrder is called", function() {
    // Given
    Prompts.remove({});
    var id = Prompts.create({text: 'What is your favorite color?'});

    // When
    Prompts.markAsDeleted(id);

    // Then
    var prompts = Prompts.inOrder();

    expect(prompts.length).toBe(0);
    expect(prompts).not.toContain(id);
  });

  it("should return deleted prompts when the deleted option is passed to inOrder", function() {
    // Given
    Prompts.remove({});
    var id = Prompts.create({text: 'What is your favorite color?'});

    // When
    Prompts.markAsDeleted(id);

    // Then
    var prompts = Prompts.inOrder({ deleted: true });

    expect(prompts.length).toBe(1);
  });
});
