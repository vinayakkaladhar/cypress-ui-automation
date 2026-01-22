#!/usr/bin/env sh
argEnvironment=$1
argTestType=$2
argSpecName=$3
if [ -z $argEnvironment ] ; then
  eval "./node_modules/.bin/cypress run"
else
  if [ -z "$argTestType" ] ; then
    eval "./node_modules/.bin/cypress run --env configFile=cypress.$argEnvironment"
  else
    if [ -z "$argSpecName" ] ; then
      eval "./node_modules/.bin/cypress run --env configFile=cypress.$argEnvironment --spec 'integration/$argTestType/**.spec.ts'"
    else
      eval "./node_modules/.bin/cypress run --env configFile=cypress.$argEnvironment --spec 'integration/$argTestType/$argSpecName.spec.ts'"
    fi
  fi
fi