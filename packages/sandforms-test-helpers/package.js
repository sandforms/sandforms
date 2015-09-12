Package.describe({
<<<<<<< HEAD
  version: '1.0.0',
=======
>>>>>>> allow everyone to see all prompts
  debugOnly: true
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
<<<<<<< HEAD
  api.addFiles('server/test-helpers.js', 'server');
});

Package.onTest(function(api) {
  api.use('test-helpers');
=======
  api.addFiles('test-helpers.js');
>>>>>>> allow everyone to see all prompts
});
