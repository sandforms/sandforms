Package.describe({
  debugOnly: true
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.addFiles('test-helpers.js');
});
