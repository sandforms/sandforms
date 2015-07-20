#!/usr/bin/env bash

set -euo pipefail

if [ $(which chrome) ]; then
  export CHROME_BIN=chrome
elif [ $(which chromium) ]; then
  export CHROME_BIN=chromium
else
  echo 'ERROR: Cannot find chrome browser binary!'
  echo 'ERROR: Install Chrome/Chromium and/or set the CHROME_BIN environment variable'
  exit 1
fi

if [ ${DEBUG-0} -ne "0" ]; then
  export DEBUG=1
  export JASMINE_DEBUG=1
  export VELOCITY_DEBUG=1
  export VELOCITY_DEBUG_MIRROR=1
fi

meteor --test --release velocity:METEOR@1.1.0.2_3

