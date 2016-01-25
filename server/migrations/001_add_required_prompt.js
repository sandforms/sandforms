Migrations.add({
  version: 1,
  up: function() {
    Prompts.update(
      {required: {$exists: false}},
      {$set: {required: true}},
      {multi: true}
      );
  },
  down: function() {
    Prompts.update(
      {required: {$exists: true}},
      {$unset: {required: ""}},
      {multi: true}
      );
  }
});


