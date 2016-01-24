// This rate limiting was causing our integration tests to fail. Also, we don't
// actually handle authentication in the app -- it all happens in Sandstorm --
// so this rate limiting doesn't help us in any way.
Accounts.removeDefaultRateLimit();
