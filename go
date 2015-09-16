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
    echo $METEOR_EMAIL $METEOR_PASSWORD
    ./.go/meteor_deploy.exp $METEOR_EMAIL $METEOR_PASSWORD
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
