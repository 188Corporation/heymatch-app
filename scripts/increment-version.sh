#!/bin/bash

VERSION_STRING="$1"

if [[ $VERSION_STRING =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  scripts/increment-version-android.py "$VERSION_STRING" \
  && scripts/increment-version-ios.sh "$VERSION_STRING"
else
  echo "Wrong version string!"
  exit 1
fi
