# angular-addtocalendar

### v1.3.5

An Angular.js component for adding an event to calendar apps. It supports .ics files for iCalendar and Outlook and also supports Google Calendar, Yahoo! Calendar and Outlook Online.

[![Coverage Status](https://coveralls.io/repos/github/jshor/angular-addtocalendar/badge.svg?branch=master)](https://coveralls.io/github/jshor/angular-addtocalendar?branch=master) [![Build Status](https://travis-ci.org/jshor/angular-addtocalendar.svg?branch=master)](https://travis-ci.org/jshor/angular-addtocalendar) [![npm version](https://badge.fury.io/js/angular-addtocalendar.svg)](https://badge.fury.io/js/angular-addtocalendar) [![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org) [![dependency Status](https://david-dm.org/jshor/angular-addtocalendar/status.png)](https://david-dm.org/jshor/angular-addtocalendar#info=dependencies)

## Installation

1. Add source

    npm:

    ```
    npm i angular-addtocalendar --save
    ```

2. If you're using webpack, you need to require the module.

    ```javascript
    require('angular-addtocalendar');
    ```

    Alternatively:

    ```javascript
    import 'angular-addtocalendar';
    ```

3. Inject the dependency `angular-atc` into your app:

    ```javascript
    angular
      .module('myApp', [
        'angular-atc',
        ...
      ]);
    ```

    Note: If you're using a version earlier than 1.3.0, the module name is `jshor.angular-addtocalendar`.

## Demo

For a demo, please [click here](http://jshor.github.io/angular-addtocalendar/dist/).

## Example

```
  <addtocalendar
    start-date="20190704T190000"
    end-date="20190704T210000"
    title="Happy Hour"
    location="The Bar, New York, NY"
    description="Let's blow off some steam from our weekly deployments to enjoy a tall cold one!"
    recurrence-frequency="WEEKLY"
    recurrence-interval="2"
    recurrence-until="20190904T210000">
  </addtocalendar>
```

## Attributes

| Attribute            | Description                                                                                        | Type                | Required? | Example              |
|----------------------|----------------------------------------------------------------------------------------------------|---------------------|-----------|----------------------|
| title                | Title of the event                                                                                 | `String`            | Yes       | `Happy Hour`         |
| description          | Summary of the event                                                                               | `String`            | Yes       | `Come enjoy drinks!` |
| location             | Event location                                                                                     | `String`            | Yes       | `The Bar, NYC`       |
| start-date           | Date that the event starts on                                                                      | `String` date`      | Yes       | `20180704T190000`    |
| end-date             | Date that the event ends on. Omit for an all-day event                                             | `String` date`      | No        | `20180704T210000`    |
| recurrence-frequency | Event frequency; `DAILY`, `WEEKLY`, `MONTHLY`, `YEARLY`                                            | `Enum`              | No        | `DAILY`              |
| recurrence-interval  | Time between recurrences                                                                           | `Integer`           | No        | `2`                  |
| recurrence-count     | Number of times the event should repeat                                                            | `Integer`           | No        | `4`                  |
| recurrence-end       | Date when the last recurrence should occur                                                         | `String` date       | Yes*      | `20190904T210000`    |
| recurrence-weekstart | Day that the week starts on (default: `SU`); `SU` `MO`, `TU`, `WE`, `TH`, `FR`, `SA`               | `Enum`              | No        | `SU`                 |
| recurrence-weekdays  | Comma-separated days of the week that the event occurs on; `SU` `MO`, `TU`, `WE`, `TH`, `FR`, `SA` | `Enum`              | No        | `TU,TH,SA`           |
| recurrence-monthdays | Comma-separated list of monthdays                                                                  | `String` of numbers | No        | `2,4,6,8`            |
| btn-text             | Text to be displayed on the button                                                                 | `String`            | No        | `Add to calendar`    |
| use-bootstrap        | Use [Bootstrap](https://getbootstrap.com/) classes                                                 | `Boolean`           | No        | `true`               |

## <a name="custom"></a>Custom Styling

angular-addtocalendar is designed to be compatible with [Bootstrap](http://getbootstrap.com/) but also comes bundled with both a custom stylesheet and extendable [Sass](http://sass-lang.com/) styles. The markup selector convention is identical to the [Bootstrap dropdown markup](http://getbootstrap.com/components/#btn-dropdowns).

### Using Bootstrap

If you already have Bootstrap set up in your project, just pass in `use-bootstrap="true"` as a parameter to the `<angular-addtocalendar />` component.

### Using the default styling

If you're using Sass, you can import the default Sass stylesheet like so:

```scss
@import '~/angular-addtocalendar/addtocalendar.scss';
```

Or if you want to reference the compiled stylesheet directly:

```html
<link rel="stylesheet" href="node_modules/angular-addtocalendar/styles.css" />
```

### Extending the existing styles

Assuming you're using Sass, import the stylesheet as noted above. Otherwise, copy the compiled CSS bundled with the project and modify styles as such.

#### Namespacing

The css namespace (parent class) for this module is `atc-btn-group` (assuming `use-bootstrap` is false).

## Bugs

Please report all bugs [here](https://github.com/jshor/angular-addtocalendar/issues).

## Changelog

Available [here](https://github.com/jshor/angular-addtocalendar/blob/master/CHANGELOG.md).
