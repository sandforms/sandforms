# SandForms

## Developer Setup

SandForms uses Meteor and [vagrant-spk](https://github.com/sandstorm-io/vagrant-spk), so dev setup is quite easy.

1. You will need vagrant-spk installed. If you get an error running the
following command, follow the [vagrant-spk installation
instructions](https://docs.sandstorm.io/en/latest/vagrant-spk/installation/)

'''bash
$ vagrant-spk -h
usage: /home/jack/bin/vagrant-spk [-h] [--work-directory WORK_DIRECTORY]
...
'''

2. Bring up the Vagrant VM

'''bash
$ vagrant-spk up
'''

3. Start the application in dev mode

'''bash
$ vagrant-spk dev
'''

4. Navigate to the Sandstorm dev instance

`http://local.sandstorm.io:6080/`

