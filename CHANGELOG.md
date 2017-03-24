# Changelog

## v1.3.2

- fix ignore files issue

## v1.3.1

- npm/bower ignores extraneous files

## v1.3.0

- removes Bootstrap as a dependency
- implements custom styles and style extensibility
- implements sass, webpack, and other build tools
- enhances tests
- fixes broken demo (#36)
- adds missing PRODID, UID, and DTSTAMP fields for proper ics validation (#24)

## v1.2.2

- updates docs

## v1.2.1

- fixes vendor calendar URL generation issue
- fixes start/end date generation and format string
- adds option to disable caret
- adds option to specify hover text
- allows blank btnText

## v1.2.0

- fixes Yahoo! calendar end time issue
- adds support for `timezone` specification
- enables format of timestamp inputs (including source timezone)
- removes download.js and uses FileSaver.js to support iOS/safari
- npm-ignores junk

## v1.1.6

- provides option to use ui-bootstrap version of dropdown
- enhances test coverage and adds directive test suite

## v1.1.5

- update attributes when changed outside of directive scope
- refactors main method
- fixes chrome launcher on travis ci

## v1.1.4

- removes `;VALUE=DATE` and `;LANGUAGE=en-us` flags from icalendar
- refactoring

## v1.1.3

- fixes uri encoded .ics file issue

## v1.1.2

- remove karma-chrome from travis ci
- publishes to npm

## v1.1.1

- fixes vendor uglifier issue/`$scope` injection
- updates karma and karma launchers

## v1.1.0

- replaces data/url support for .ics files with downloadjs

## v1.0.2

- adds config for build to pass on travis
- adds uglified js file
- sets minified js file as main component in bower

## v1.0.1

- light refactoring

## v1.0.0

- adds test suite to addtocalendar functions, ensures stability

## v0.0.7

- replaces ics.js with internal rendering of ics.js file
- removes all dependencies of ics.js from bower
- sets filename of .ics file to safe version of event title

## v0.0.6

- fixes repetition in .ics file after subsequent downloads
- fixes NaN dates issue

## v0.0.5

- Adds attribute for button text

## v0.0.4

- Adds support for angular-bootstrap

## v0.0.3

- Adds changelog
- Fixes dates for .ics downloads

## v0.0.2

- Fixes bower.json to include dependencies
- Fixes dev-dependencies

## v0.0.1

Initial version