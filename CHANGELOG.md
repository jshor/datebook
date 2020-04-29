# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [4.1.0](https://github.com/jshor/datebook/compare/v4.0.0...v4.1.0) (2020-04-29)


### Features

* **nodejs:** adds SSR support ([#65](https://github.com/jshor/datebook/issues/65)) ([e7d8ea5](https://github.com/jshor/datebook/commit/e7d8ea573b8a5d6af42c2e28165c9b6ab884cbe6))

## [4.0.0](https://github.com/jshor/datebook/compare/v1.3.5...v4.0.0) (2020-04-29)


### ⚠ BREAKING CHANGES

* This is no longer an Angular.js component. It is now a pure JS library and will be
incompatible with old usage.

### Bug Fixes

* **bundle:** replaces parcel with webpack to address UMD export issues ([e4f7fc6](https://github.com/jshor/datebook/commit/e4f7fc6234332ff26d45cbe2c799267857c1c3e3))


### Build System

* **dist:** adds main script reference ([8278ce1](https://github.com/jshor/datebook/commit/8278ce116fc350fceacc8d7ec437f20a4cc253f2))
* replaces babili with babel minifier ([#62](https://github.com/jshor/datebook/issues/62), [#64](https://github.com/jshor/datebook/issues/64), [#73](https://github.com/jshor/datebook/issues/73)) ([553c8e6](https://github.com/jshor/datebook/commit/553c8e6540cec0c96486d72bfb889e95bdce4d3f))


### refactor

* converts component to be a vanilla js library ([9a466aa](https://github.com/jshor/datebook/commit/9a466aa881675d407d6410d699b9a7c4f896b3cb))

## [3.0.0](https://github.com/jshor/datebook/compare/v1.3.5...v3.0.0) (2020-04-29)


### ⚠ BREAKING CHANGES

* This is no longer an Angular.js component. It is now a pure JS library and will be
incompatible with old usage.

### Bug Fixes

* **bundle:** replaces parcel with webpack to address UMD export issues ([e4f7fc6](https://github.com/jshor/datebook/commit/e4f7fc6234332ff26d45cbe2c799267857c1c3e3))


### Build System

* **dist:** adds main script reference ([8278ce1](https://github.com/jshor/datebook/commit/8278ce116fc350fceacc8d7ec437f20a4cc253f2))
* replaces babili with babel minifier ([#62](https://github.com/jshor/datebook/issues/62), [#64](https://github.com/jshor/datebook/issues/64), [#73](https://github.com/jshor/datebook/issues/73)) ([553c8e6](https://github.com/jshor/datebook/commit/553c8e6540cec0c96486d72bfb889e95bdce4d3f))


### refactor

* converts component to be a vanilla js library ([9a466aa](https://github.com/jshor/datebook/commit/9a466aa881675d407d6410d699b9a7c4f896b3cb))

# Changelog

## v1.3.5

- adds full recurrence support
- adds vanilla js/core calendar library
- upgrades FileSaver to address Safari support issues
- fixes Yahoo end time issues and addresses Outlook calendar upgrade
- corrects peer dependency issues

## v1.3.4

- removes documentation on deprecated format and timezone attributes

## v1.3.3

- fixes bower install issue
- fixes broken demo issue
- fixes chunk splitting + webpackJsonp undefined issue

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
