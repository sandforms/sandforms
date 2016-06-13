 Migrations.add({
   version: 2,
   up: function() {
     Prompts.update(
       {selectedPromptType: {$exists: false}},
       {$set: {selectedPromptType: "shortAnswer"}},
       {multi: true}
     );
   }
//   down: function() {
//     Prompts.update(
//       {selectedPromptType: {$exists: true}},
//       {$unset: {selectedPromptType: ""}},
//       {multi: true}
//     );
//   }
});

