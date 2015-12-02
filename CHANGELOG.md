# Changelog

## v0.0.1

Initial version

## v0.0.2

- Fixes bower.json to include dependencies
- Fixes dev-dependencies

## v0.0.3

- Adds changelog
- Fixes dates for .ics downloads

## v0.0.4

- Adds support for angular-bootstrap

## v0.0.5

- Adds attribute for button text

## v0.0.6

- fixes repetition in .ics file after subsequent downloads
- fixes NaN dates issue

## v0.0.7

- replaces ics.js with internal rendering of ics.js file
- removes all dependencies of ics.js from bower
- sets filename of .ics file to safe version of event title

## v1.0.0

- adds test suite to addtocalendar functions, ensures stability

## v1.0.1

- light refactoring

## v1.0.2

- adds config for build to pass on travis
- adds uglified js file
- sets minified js file as main component in bower

## v1.1.0

- replaces data/url support for .ics files with downloadjs

## v1.1.1

- fixes vendor uglifier issue/`$scope` injection
- updates karma and karma launchers