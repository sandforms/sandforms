describe("submissions", function() {

  it("should give us answers back with order matching the given prompts", function() {
    // Given
    var prompts = [
      { _id: 'id-1', text: 'AAA What is your pets same?' },
      { _id: 'id-2', text: 'BBB Favorite color?' },
      { _id: 'id-3', text: 'CCC Are you the NSA?' }
    ];

    Submissions.remove({});
    var submissionId = Submissions.insert({ responses: [
      { promptId: 'id-2', response: 'GGG Garfield'},
      { promptId: 'id-1', response: 'ZZZ Orange'},
      { promptId: 'id-3', response: 'AAA Maybe'}
    ]});

    // When
    var answers = Submissions.inTableFormat(prompts);

    // Then
    expect(answers).toEqual([
      { _id: submissionId, responses: ['ZZZ Orange', 'GGG Garfield', 'AAA Maybe']}
    ]);
  });

  it("should return a blank string if the answer to a prompt is missing", function() {
    // Given
    var prompts = [
      { _id: 'id-1', text: 'What is your pets name?' },
      { _id: 'id-2', text: 'Favorite color?' },
    ];

    Submissions.remove({});
    var submissionId = Submissions.insert({ responses: [
      { promptId: 'id-1', response: 'Garfield'},
    ]});

    // When
    var answers = Submissions.inTableFormat(prompts);

    // Then
    expect(answers).toEqual([
      { _id: submissionId, responses: ['Garfield', '']}
    ]);
  });

  it("should return a csv formatted string of submissions", function() {
    var properlyFormattedString = "name,fav_food,activity\r\n" +
                                  "Garfield,lasagna,sleep\r\n" +
                                  "Fonzo,pizza,";
    var prompts = [
      { _id: 'id-1', text: 'name' },
      { _id: 'id-2', text: 'fav_food' },
      { _id: 'id-3', text: 'activity' }
    ];

    spyOn(Prompts, 'inOrder').and.returnValue(prompts);
    Submissions.remove({});
    Submissions.insert({ responses: [
      { promptId: 'id-1', response: 'Garfield'},
      { promptId: 'id-2', response: 'lasagna'},
      { promptId: 'id-3', response: 'sleep'}
    ]});
    Submissions.insert({ responses: [
      { promptId: 'id-1', response: 'Fonzo'},
      { promptId: 'id-2', response: 'pizza'},
    ]});

    var formattedString = Submissions.exportCsvFormattedString();

    expect(formattedString).toEqual(properlyFormattedString);
  });

  it("should return prompts in csv if no responses", function() {
    var properlyFormattedString = "name,fav_food,activity\r\n,,";
    var prompts = [
      { _id: 'id-1', text: 'name' },
      { _id: 'id-2', text: 'fav_food' },
      { _id: 'id-3', text: 'activity' }
    ];

    spyOn(Prompts, 'inOrder').and.returnValue(prompts);

    Submissions.remove({});

    var formattedString = Submissions.exportCsvFormattedString();

    expect(formattedString).toEqual(properlyFormattedString);
  });
});
