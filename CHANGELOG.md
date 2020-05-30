# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [4.1.2](https://github.com/jshor/datebook/compare/v4.1.1...v4.1.2) (2020-05-13)


### Bug Fixes

* **timestamps:** fixes calendar timestamp formats ([#84](https://github.com/jshor/datebook/issues/84)) ([#85](https://github.com/jshor/datebook/issues/85)) ([0e41dd7](https://github.com/jshor/datebook/commit/0e41dd7369835bfc341ae939ec43e821acfdc550))

### [4.1.1](https://github.com/jshor/datebook/compare/v4.1.0...v4.1.1) (2020-04-29)


### Bug Fixes

* **ics:** removes maxlen for all fields ([#58](https://github.com/jshor/datebook/issues/58)) ([#83](https://github.com/jshor/datebook/issues/83)) ([7cf979e](https://github.com/jshor/datebook/commit/7cf979e71e99876bde4918c6b2a71cbe634ae460))

## [4.1.0](https://github.com/jshor/datebook/compare/v4.0.0...v4.1.0) (2020-04-29)


### Features

* **nodejs:** adds SSR support ([#65](https://github.com/jshor/datebook/issues/65)) ([e7d8ea5](https://github.com/jshor/datebook/commit/e7d8ea573b8a5d6af42c2e28165c9b6ab884cbe6))

## [4.0.0](https://github.com/jshor/datebook/compare/v1.3.5...v4.0.0) (2020-04-29)


### ⚠ BREAKING CHANGES

* This is no longer an Angular.js component. It is now a pure JS library and will be
incompatible with old usage.
* Package has been renamed from angular-addtocalendar to **datebook**.

### Bug Fixes

* **bundle:** replaces parcel with webpack to address UMD export issues ([e4f7fc6](https://github.com/jshor/datebook/commit/e4f7fc6234332ff26d45cbe2c799267857c1c3e3))


### Build System

* **dist:** adds main script reference ([8278ce1](https://github.com/jshor/datebook/commit/8278ce116fc350fceacc8d7ec437f20a4cc253f2))
* replaces babili with babel minifier ([#62](https://github.com/jshor/datebook/issues/62), [#64](https://github.com/jshor/datebook/issues/64), [#73](https://github.com/jshor/datebook/issues/73)) ([553c8e6](https://github.com/jshor/datebook/commit/553c8e6540cec0c96486d72bfb889e95bdce4d3f))


### refactor

* converts component to be a vanilla js library ([9a466aa](https://github.com/jshor/datebook/commit/9a466aa881675d407d6410d699b9a7c4f896b3cb))

## [1.3.5](https://github.com/jshor/datebook/compare/v1.3.4...v1.3.5) (2019-05-10)

### Features

- adds full recurrence support
- adds vanilla js/core calendar library

### Bug Fixes

- upgrades FileSaver to address Safari support issues
- fixes Yahoo end time issues and addresses Outlook calendar upgrade
- corrects peer dependency issues

## [1.3.4](https://github.com/jshor/datebook/compare/v1.3.3...v1.3.4) (2017-09-01)

### Documentation

- removes documentation on deprecated format and timezone attributes

## [1.3.3](https://github.com/jshor/datebook/compare/v1.3.2...v1.3.3) (2017-03-24)

### Build System

- fixes bower install issue
- fixes broken demo issue
- fixes chunk splitting + webpackJsonp undefined issue

## [1.3.2](https://github.com/jshor/datebook/compare/v1.3.1...v1.3.2) (2017-03-24)

### Build System

- fix ignore files issue

## [1.3.1](https://github.com/jshor/datebook/compare/v1.2.2...v1.3.1) (2017-03-24)

### Build System

- npm/bower ignores extraneous files

## [1.2.2](https://github.com/jshor/datebook/compare/v1.2.1...v1.2.2) (2016-10-13)

### Documentation

- updates docs

## [1.2.1](https://github.com/jshor/datebook/compare/v1.2.0...v1.2.1) (2016-07-20)

### Features

- adds option to disable caret
- adds option to specify hover text
- allows blank btnText

### Bug Fixes

- fixes vendor calendar URL generation issue
- fixes start/end date generation and format string

## [1.2.0](https://github.com/jshor/datebook/compare/v1.1.6...v1.2.0) (2016-07-20)

### Features

- adds support for `timezone` specification
- removes download.js and uses FileSaver.js to support iOS/safari
- enables format of timestamp inputs (including source timezone)

### Bug Fixes

- fixes Yahoo! calendar end time issue

### Build System

- npm-ignores junk

## [1.1.6](https://github.com/jshor/datebook/compare/v1.1.5...v1.1.6) (2016-06-28)

### Features

- provides option to use ui-bootstrap version of dropdown

### Build System

- enhances test coverage and adds directive test suite

## [1.1.5](https://github.com/jshor/datebook/compare/v1.1.4...v1.1.5) (2016-05-11)

### Build System

- fixes chrome launcher on travis ci

### refactor

- update attributes when changed outside of directive scope
- refactors main method

## [1.1.4](https://github.com/jshor/datebook/compare/v1.1.3...v1.1.4) (2015-12-28)

### Bug Fixes

- removes `;VALUE=DATE` and `;LANGUAGE=en-us` flags from icalendar

## [1.1.3](https://github.com/jshor/datebook/compare/v1.1.2...v1.1.3) (2015-12-03)

### Bug Fixes

- fixes uri encoded .ics file issue

## [1.1.2](https://github.com/jshor/datebook/compare/v1.1.0...v1.1.2) (2015-12-02)

### Build System

- remove karma-chrome from travis ci
- publishes to npm

### Bug Fixes

- fixes vendor uglifier issue/`$scope` injection

### Build System

- updates karma and karma launchers

## [1.1.0](https://github.com/jshor/datebook/compare/v1.0.2...v1.1.0) (2015-11-19)

### Bug Fixes

- replaces data/url support for .ics files with downloadjs

## [1.0.2](https://github.com/jshor/datebook/compare/v1.0.1...v1.0.2) (2015-11-18)

### Build System

- adds config for build to pass on travis
- adds uglified js file
- sets minified js file as main component in bower

## [1.0.2](https://github.com/jshor/datebook/compare/v0.0.7...v1.0.1) (2015-11-16)

### ⚠ BREAKING CHANGES

* first major release

### Tests

- adds test suite to addtocalendar functions, ensures stability

### refactor

- refactors basic project structure

## [0.0.7](https://github.com/jshor/datebook/compare/v0.0.6...v0.0.7) (2015-11-16)

### Features

- replaces ics.js with internal rendering of ics.js file
- removes all dependencies of ics.js from bower
- sets filename of .ics file to safe version of event title

## [0.0.6](https://github.com/jshor/datebook/compare/v0.0.5...v0.0.6) (2015-10-21)

### Bug Fixes

- fixes repetition in .ics file after subsequent downloads
- fixes `NaN` dates issue

## [0.0.5](https://github.com/jshor/datebook/compare/v0.0.4...v0.0.5) (2015-07-09)

### Features

- Adds attribute for button text

## [0.0.4](https://github.com/jshor/datebook/compare/v0.0.3...v0.0.4) (2015-06-22)

### Features

- Adds support for angular-bootstrap

## [0.0.3](https://github.com/jshor/datebook/compare/v0.0.2...v0.0.3) (2015-06-22)

### Documentation

- Adds changelog

### Bug Fixes

- Fixes dates for .ics downloads

## [0.0.2](https://github.com/jshor/datebook/compare/v0.0.1...v0.0.2) (2015-06-22)

### Bug Fixes

- Fixes bower.json to include dependencies
- Fixes dev-dependencies

## 0.0.1

- Initial version
