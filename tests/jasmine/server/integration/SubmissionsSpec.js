describe("submissions", function() {

  it("should give us answers back with order matching the given prompts", function() {
    // Given
    var prompts = [
      { _id: 'id-1', text: 'AAA What is your pets same?' },
      { _id: 'id-2', text: 'BBB Favorite color?' },
      { _id: 'id-3', text: 'CCC Are you the NSA?' }
    ];

    Submissions.remove({});
    Submissions.insert({ responses: [
      { promptId: 'id-2', response: 'GGG Garfield'},
      { promptId: 'id-1', response: 'ZZZ Orange'},
      { promptId: 'id-3', response: 'AAA Maybe'}
    ]});

    // When
    var answers = Submissions.inTableFormat(prompts);

    // Then
    expect(answers).toEqual([
      ['ZZZ Orange', 'GGG Garfield', 'AAA Maybe']
    ]);
  });

  it("should return a blank string if the answer to a prompt is missing", function() {
    // Given
    var prompts = [
      { _id: 'id-1', text: 'What is your pets name?' },
      { _id: 'id-2', text: 'Favorite color?' },
    ];

    Submissions.remove({});
    Submissions.insert({ responses: [
      { promptId: 'id-1', response: 'Garfield'},
    ]});

    // When
    var answers = Submissions.inTableFormat(prompts);

    // Then
    expect(answers).toEqual([
      ['Garfield', '']
    ]);
  });

  it("should return a csv formatted string of submissions", function() {
    var properlyFormattedString = "_id,name,fav_food,activity\r\n" +
                                  "id-1,Garfield\r\n" +
                                  "id-2,Garfield,lasagna\r\n" +
                                  "id-3,Garfield,,sleep\r\n";

    Submissions.remove({});
    Submissions.insert({ _id: 'id-1', name: 'Garfield'});
    Submissions.insert({ _id: 'id-2', name: 'Garfield', 'fav_food': 'lasagna'});
    Submissions.insert({ _id: 'id-3', name: 'Garfield', activity: 'sleep'})

    var formattedString = Submissions.exportCsvFormattedString();

    expect(formattedString).toEqual(properlyFormattedString);
  });

  it("should return prompts if no responses", function() {
    var properlyFormattedString = "_id,name,fav_food,activity\r\n";

    Submissions.remove({});
    spyOn(Prompts, 'getPromptContent').and.returnValue([
      '_id', 'name', 'fav_food', 'activity'
    ])

    var formattedString = Submissions.exportCsvFormattedString();

    expect(formattedString).toEqual(properlyFormattedString);
  });
});
