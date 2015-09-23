#!/bin/bash

set -e

function helptext {
    echo "Usage: ./go <command>"
    echo ""
    echo "Available commands are:"
    echo "    test           Run tests"
    echo "    reset          Drop local DB (with scss assets hack)"
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
    # So we need meteor to run twice because our scss assets need to
    # be precompiled before they can be used by meteor. This is gross
    # and we are sorry. There are no meteor precompile run options.
    meteor run --test 2>/dev/null || true
    meteor deploy sandforms-ci.meteor.com --debug
    meteor add $TEST_PACKAGES
}

function reset {
    meteor reset
    echo "Meteor has been reset, now generating pre-compile assets..."
    meteor run --test &>/dev/null
}

[[ $@ ]] || { helptext; exit 1; }

case "$1" in
    help) helptext
    ;;
    test) tests
    ;;
    reset) reset
    ;;
    deploy-to-meteor) deploy-to-meteor
    ;;
    *) helptext # default, put additional options above this
    ;;
esac
