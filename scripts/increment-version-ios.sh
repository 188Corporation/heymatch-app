#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
SRCROOT="$(dirname "$DIR")/ios"
VERSION_STRING="$1"

# get Info.plist file
INFOPLIST_APP="${SRCROOT}/HeyThereApp/Info.plist"
# set version string
/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString $VERSION_STRING" "$INFOPLIST_APP"
# read build number
BUILD_NUMBER=$(/usr/libexec/PlistBuddy -c "Print CFBundleVersion" "$INFOPLIST_APP")
# increment build number
BUILD_NUMBER=$((BUILD_NUMBER + 1))
# rewrite build number
/usr/libexec/PlistBuddy -c "Set :CFBundleVersion $BUILD_NUMBER" "$INFOPLIST_APP"
