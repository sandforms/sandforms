#!/usr/bin/env bash

set -euo pipefail

TEST_SUITE=${1-all}

if [ $(which chrome >/dev/null 2>&1) ]; then
  export CHROME_BIN=chrome
elif [ $(which chromium >/dev/null 2>&1) ]; then
  export CHROME_BIN=chromium
fi

which velocity >/dev/null 2>&1 || {
  echo "To run tests, install velicity with 'sudo npm install -g velocity-cli'" 1>&2
  exit 1
}

if [ ${DEBUG-1} -ne "0" ]; then
  export DEBUG=1
  export JASMINE_DEBUG=1
  export VELOCITY_DEBUG=1
  export VELOCITY_DEBUG_MIRROR=1
fi

export JASMINE_SERVER_UNIT=0
export JASMINE_SERVER_INTEGRATION=0
export JASMINE_CLIENT_UNIT=0
export JASMINE_CLIENT_INTEGRATION=0

case "$TEST_SUITE" in
  cu)
    export JASMINE_CLIENT_UNIT=1
    ;;
  ci)
    export JASMINE_CLIENT_INTEGRATION=1
    ;;
  si)
    export JASMINE_SERVER_INTEGRATION=1
    ;;
  su)
    echo "As of Sep 9, server unit tests not supported according to:" 1>&2
    echo "https://velocity.readme.io/docs/jasmine-testing-modes#section-server-unit-test-mode" 1>&2
    exit 1
    ;;
  all)
    export JASMINE_SERVER_INTEGRATION=1
    export JASMINE_CLIENT_UNIT=1
    export JASMINE_CLIENT_INTEGRATION=1
    ;;
  *)
    echo 'Invalid test suite' 2>&1
    exit 1
esac

pkill -f meteor || true

velocity test-app --ci
