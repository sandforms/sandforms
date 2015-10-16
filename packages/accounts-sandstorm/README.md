Jack: Pulled from https://github.com/sandstorm-io/meteor-accounts-sandstorm in
order to change the meteor version to 1.0.2 (the new version of this package
adds a dependency on Meteor 1.2)

When we upgrade to Meteor 1.2 this package can be removed from our repo and we
can switch back to kenton:accounts-sandstorm from Atmosphere

# Sandstorm.io login integration for Meteor.js

[Sandstorm](https://sandstorm.io) is a platform for personal clouds that makes
installing apps to your personal server as easy as installing apps to your
phone.

[Meteor](https://meteor.com) is a revolutionary web app framework. Sandstorm's
own UI is built using Meteor, and Meteor is also a great way to build Sandstorm
apps.

This package is meant to be used by Meteor apps built to run on Sandstorm.
It integrates with Sandstorm's built-in login system to log the user in
automatically when they open the app. The user's `profile.name` will be
populated from Sandstorm. When using this package, you should not use
`accounts-ui` at all; just let login happen automatically.

To use this package in your Meteor project, simply install it from the Meteor
package repository:

    meteor add kenton:accounts-sandstorm

To package a Meteor app for Sandstorm,
[use the `meteor-spk` tool](https://github.com/sandstorm-io/meteor-spk).

## User profile info

This package automatically populates `profile.name` based on the user's
display name provided by Sandstorm. Sandstorm also provides [a bunch of
other information](https://docs.sandstorm.io/en/latest/developing/auth/#headers-that-an-app-receives)
about users that you may be interested in; `accounts-sandstorm` will
place that information inside `services.sandstorm` in the user doc.

The specific fields are:

* `id`: From `X-Sandstorm-User-Id`; globally unique and stable
  identifier for this user.
* `picture`: From `X-Sandstorm-User-Picture`, URL of the user's preferred
  avatar, or null if they don't have one.
* `permissions`: From `X-Sandstorm-Permissions` (but parsed to a list),
  the list of permissions the user has as determined by the Sandstorm
  sharing model. Apps can define their own permissions.
* `preferredHandle`: From `X-Sandstorm-Preferred-Handle`, the user's
  preferred handle ("username", in the unix sense). This is NOT
  guaranteed to be unique; it's just a different form of display name.
* `pronouns`: From `X-Sandstorm-User-Pronouns`, indicates the pronouns
  by which the user prefers to be referred.

The package does not automatically publish any of these; it is up to your
app to do so.

## Development aids

`accounts-sandstorm` normally only does anything when running inside Sandstorm. However, it's often a lot more convenient to develop Meteor apps using Meteor's normal dev tools which currently cannot run inside Sandstorm. This makes it hard to test your Sandstorm integration.

To solve this, try using the package [`jacksingleton:accounts-sandstorm-dev`](https://atmospherejs.com/jacksingleton/accounts-sandstorm-dev), which lets you fake Sandstorm parameters even when running in regular dev mode outside Sandstorm!
