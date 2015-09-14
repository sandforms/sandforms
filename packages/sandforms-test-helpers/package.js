Package.describe({
  version: '1.0.0',
  debugOnly: true
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.addFiles('server/test-helpers.js', 'server');
});

Package.onTest(function(api) {
  api.use('test-helpers');
});
