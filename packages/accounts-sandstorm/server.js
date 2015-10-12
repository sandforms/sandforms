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

WebApp.rawConnectHandlers.use(function (req, res, next) {
  if (req.url === "/.sandstorm-credentials") {
    handleCredentials(req, res);
    return;
  }
  return next();
});

var handleCredentials = Meteor.bindEnvironment(function (req, res) {
  try {
    var permissions = req.headers["x-sandstorm-permissions"];
    if (permissions && permissions !== "") {
      permissions = permissions.split(",");
    } else {
      permissions = [];
    }

    var credentials = {
      sandstormId: req.headers["x-sandstorm-user-id"] || null,
      name: decodeURI(req.headers["x-sandstorm-username"]),
      permissions: permissions,
      picture: req.headers["x-sandstorm-user-picture"] || null,
      preferredHandle: req.headers["x-sandstorm-preferred-handle"] || null,
      pronouns: req.headers["x-sandstorm-user-pronouns"] || null
    };

    if (credentials.sandstormId) {
      var login = Accounts.updateOrCreateUserFromExternalService(
          "sandstorm", {
            id: credentials.sandstormId,
            permissions: permissions,
            picture: credentials.picture,
            preferredHandle: credentials.preferredHandle,
            pronouns: credentials.pronouns
          }, { profile: { name: credentials.name } });
      console.log(login);
      credentials.meteorId = login.userId;
      var token = Accounts._generateStampedLoginToken();
      credentials.token = token.token;
      Accounts._insertLoginToken(login.userId, token);
    }

    var body = new Buffer(JSON.stringify(credentials));

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Content-Length": body.length
    });
    res.end(body);
  } catch (err) {
    res.writeHead(500, {
      "Content-Type": "text/plain"
    });
    res.end(err.stack);
  }
});
