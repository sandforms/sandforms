#!/bin/bash

set -e

function helptext {
    echo "Usage: ./go <command>"
    echo ""
    echo "Available commands are:"
    echo "    test           Run tests"
}

function tests {
    ./test.sh
}

function deploy-to-meteor {
    # running Velocity on meteor.com crashes the site. we can turn Velocity off
    # by setting the env variable VELOCITY=0... but meteor.com does not support
    # setting env variables. since we need to run in debug mode for our sandstorm
    # permissions override to work (packages/accounts-sandstorm-dev), we are left
    # with the hack of removing the Velocity and Jasmine packages before deploy.
    TEST_PACKAGES="sanjo:jasmine velocity:html-reporter velocity:console-reporter"
    meteor remove $TEST_PACKAGES
    ./.go/meteor_login.exp $METEOR_EMAIL $METEOR_PASSWORD
    meteor deploy sandforms-ci.meteor.com --debug
    meteor add $TEST_PACKAGES
}

[[ $@ ]] || { helptext; exit 1; }

case "$1" in
    help) helptext
    ;;
    test) tests
    ;;
    deploy-to-meteor) deploy-to-meteor
    ;;
    *) helptext # default, put additional options above this
    ;;
esac
