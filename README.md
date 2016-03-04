# SandForms

Sandforms is a online forms application that priortizes simplicity and data autonomy: you control how to use data you collect through these forms. 

Sandforms is built for [Sandstorm](https://sandstorm.io), a platform that allows you to easily host applications on your personal server. 

## Motivations

- We want to reduce our society's reliance on proprietary software by creating user-friendly alternatives to centralized services that monetize personal information.

- We want to improve the safety of those who work to protect individuals’ liberties online by providing software that actively protects their privacy.

### Build Status
[![Build Status](https://snap-ci.com/sandforms/sandforms/branch/master/build_image)](https://snap-ci.com/sandforms/sandforms/branch/master)

## Developer Setup (Lite)

To run the webapp without Vagrant

1. Install Meteor [here](https://docs.meteor.com/#/basic/quickstart)
2. Start running the app `meteor`
3. Visit your [localhost:3000](http://localhost:3000)

To see multiple, small UI changes faster, you can run the webapp without Velocity’s constantly running tests:
```bash
VELOCITY=0 meteor
```

## Developer Setup (Heavy)

SandForms uses Meteor and [vagrant-spk](https://github.com/sandstorm-io/vagrant-spk), so dev setup is quite easy.

1. You will need vagrant-spk installed. If you get an error running the
following command, follow the [vagrant-spk installation
instructions](https://docs.sandstorm.io/en/latest/vagrant-spk/installation/)

  ```bash
  $ vagrant-spk -h
  usage: /home/jack/bin/vagrant-spk [-h] [--work-directory WORK_DIRECTORY]
  ...
  ```

2. Make sure you have [virtualbox](https://www.virtualbox.org/wiki/Downloads) installed before bringing up vagrant vm

  ```bash
  $ VirtualBox -h
  Oracle VM VirtualBox Manager 5.0.0
  ...
  ```

3. Bring up the Vagrant VM

  ```bash
  $ vagrant-spk up
  ```

4. Start the application in dev mode

  ```bash
  $ vagrant-spk dev
  ```

5. Navigate to the Sandstorm dev instance

  `http://local.sandstorm.io:6080/`

