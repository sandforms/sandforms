@0xc2cc325507512399;

using Spk = import "/sandstorm/package.capnp";
# This imports:
#   $SANDSTORM_HOME/latest/usr/include/sandstorm/package.capnp
# Check out that file to see the full, documented package definition format.

const pkgdef :Spk.PackageDefinition = (
  # The package definition. Note that the spk tool looks specifically for the
  # "pkgdef" constant.

  id = "ztxnreej8a0pqn97ccfhuckswjkrmsaavn85n5sgzk30tv2k4y9h",

  # Your app ID is actually its public key. The private key was placed in
  # your keyring. All updates must be signed with the same key.

  manifest = (
    # This manifest is included in your app package to tell Sandstorm
    # about your app.

    appTitle = (defaultText = "SandForms"),

    appVersion = 3,  # Increment this for every release.

    appMarketingVersion = (defaultText = "0.3.0"),
    # Human-readable representation of appVersion. Should match the way you
    # identify versions of your app in documentation and marketing.

    actions = [
      # Define your "new document" handlers here.
      ( title = (defaultText = "New Form"),
        command = .myCommand
        # The command to run when starting for the first time. (".myCommand"
        # is just a constant defined at the bottom of the file.)
      )
    ],

    continueCommand = .myCommand,
    # This is the command called to start your app back up after it has been
    # shut down for inactivity. Here we're using the same command as for
    # starting a new instance, but you could use different commands for each
    # case.
    metadata = (
      icons = (
        appGrid = (svg = embed "../graphics/appGrid.svg"),
        grain = (svg = embed "../graphics/grain.svg"),
        market = (svg = embed "../graphics/market.svg"),
      ),

      website = "https://github.com/sandforms/sandforms",
      codeUrl = "https://github.com/sandforms/sandforms",
      license = (openSource = apache2),
      categories = [office, productivity],

      author = (
        contactEmail = "sandforms@jacksingleton.com",
        pgpSignature = embed "pgp-signature",
      ),

      pgpKeyring = embed "pgp-keyring",

      description = (defaultText = embed "description.md"),
      shortDescription = (defaultText = "Form App"),

      screenshots = [
        (width = 448, height = 343, png = embed "screenshot.png")
      ],
    ),
  ),
  sourceMap = (
    # The following directories will be copied into your package.
    searchPath = [
      ( sourcePath = "/home/vagrant/bundle" ),
      ( sourcePath = "/opt/meteor-spk/meteor-spk.deps" )
    ]
  ),

  alwaysInclude = [ "." ],
  # This says that we always want to include all files from the source map.
  # (An alternative is to automatically detect dependencies by watching what
  # the app opens while running in dev mode. To see what that looks like,
  # run `spk init` without the -A option.)

  bridgeConfig = (viewInfo = (permissions = [(name = "owner")]))
);

const myCommand :Spk.Manifest.Command = (
  # Here we define the command used to start up your server.
  argv = ["/sandstorm-http-bridge", "8000", "--", "/opt/app/.sandstorm/launcher.sh"],
  environ = [
    # Note that this defines the *entire* environment seen by your app.
    (key = "PATH", value = "/usr/local/bin:/usr/bin:/bin")
  ]
);
