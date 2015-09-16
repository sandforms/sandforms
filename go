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
    echo -e "$METEOR_EMAIL\n$METEOR_PASSWORD\n" | meteor login --email
    meteor deploy sandforms-ci.meteor.com
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
