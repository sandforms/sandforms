#!/usr/bin/env bash

set -euo pipefail

if [ ${DEBUG-0} -ne "0" ]; then
  export DEBUG=1
  export VELOCITY_DEBUG=1
  export VELOCITY_DEBUG_MIRROR=1
fi

meteor --test --release velocity:METEOR@1.1.0.2_3

