describe("prompts", function() {

  it("should let us get all prompt ids", function() {
    // Given
    Prompts.remove({});
    var id = Prompts.create('What is your favorite color?');

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
    var id = Prompts.create('What is your favorite color?');

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
    var id = Prompts.create('What is your favorite color?');

    // When
    Prompts.markAsDeleted(id);

    // Then
    var prompts = Prompts.inOrder();

    expect(prompts.length).toBe(0);
    expect(prompts).not.toContain(id);
  });

  it("should pass search queries through inOrder", function() {
    Prompts.remove({});

    var id = Prompts.create("1");
    var id2 = Prompts.create("2");

    var prompts = Prompts.inOrder({text: "1"});
    expect(prompts.length).toEqual(1);
  });

  it("should return deleted prompts when the deleted option is passed to inOrder", function() {
    // Given
    Prompts.remove({});
    var id = Prompts.create('What is your favorite color?');
    var id2 = Prompts.create('This is the second question');

    // When
    Prompts.markAsDeleted(id);

    // Then
    var prompts = Prompts.inOrder({ deleted: true });

    expect(prompts.length).toBe(2);
  });


  it("should default Required to true", function() {
    Prompts.remove({});
    var promptText = "Why is the sky blue?";
    var id = Prompts.create(promptText);
    var prompt = Prompts.inOrder()[0];
    expect(prompt.text).toEqual(promptText);
    expect(prompt.required).toEqual(true);
  })

  it("should set the Required property of a prompt", function() {
    Prompts.remove({});
    var promptText = "Why is the sky blue?";
    var promptText2 = "Why do birds sing?";
    var id = Prompts.create(promptText, true);
    var id2 = Prompts.create(promptText2, false);
    var prompts = Prompts.inOrder();
    var prompt = prompts[0];
    var prompt2 = prompts[1];
    expect(prompt.text).toEqual(promptText);
    expect(prompt2.text).toEqual(promptText2);
    expect(prompt.required).toEqual(true);
    expect(prompt2.required).toEqual(false);
  })

});
