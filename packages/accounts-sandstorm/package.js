// Copyright (c) 2014 Sandstorm Development Group, Inc. and contributors
// Licensed under the MIT License:
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

Package.describe({
  summary: "Login service for Sandstorm.io applications",
  version: "0.1.5",
  name: "accounts-sandstorm",
  git: "https://github.com/sandstorm-io/meteor-accounts-sandstorm.git"
});

Package.onUse(function(api) {
  //api.versionsFrom('1.2');
  api.versionsFrom('1.0.2');

  api.use('random', 'server');
  api.use('accounts-base');
  api.use('webapp', 'server');
  api.use('http', 'client');

  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base');

  api.addFiles("client.js", "client");
  api.addFiles("server.js", "server");
});
