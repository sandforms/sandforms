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

Meteor.startup(function () {
  Deps.autorun(function () {
    if (!Meteor.userId()) {
      // Accounts._setLoggingIn is a semi-private function, but it's also used in accounts-password.
      Accounts._setLoggingIn(true);
      HTTP.get("/.sandstorm-credentials", function (error, result) {
        if (error) {
          Accounts._setLoggingIn(false);
          console.error(error.stack);
        } else if (!result.data) {
          Accounts._setLoggingIn(false);
          console.error("/.sandstorm-credentials is not JSON?");
        } else if (result.data.token) {
          // Don't call Accounts._setLoggingIn here and let the normal login flow take over.
          Meteor.loginWithToken(result.data.token, function() {});
        } else {
          Accounts._setLoggingIn(false);
        }
      });
    }
  });
});
