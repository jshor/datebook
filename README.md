# angular-addtocalendar

### v1.3.2

An AngularJS directive for adding an event to calendar apps. It supports .ics files for iCalendar and Outlook and also supports Google Calendar, Yahoo! Calendar and Microsoft Calendar.

Enjoy!

[![Coverage Status](https://coveralls.io/repos/github/jshor/angular-addtocalendar/badge.svg?branch=master)](https://coveralls.io/github/jshor/angular-addtocalendar?branch=master) [![Build Status](https://travis-ci.org/jshor/angular-addtocalendar.svg?branch=master)](https://travis-ci.org/jshor/angular-addtocalendar) [![npm version](https://badge.fury.io/js/angular-addtocalendar.svg)](https://badge.fury.io/js/angular-addtocalendar) [![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)

[![dependency Status](https://david-dm.org/jshor/angular-addtocalendar/status.png)](https://david-dm.org/jshor/angular-addtocalendar#info=dependencies) [![devDependency Status](https://david-dm.org/jshor/angular-addtocalendar/dev-status.png)](https://david-dm.org/jshor/angular-addtocalendar#info=devDependencies)

## Installation

1. Add source

    bower:
    ```
    bower install angular-addtocalendar --save
    ```
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
    start-date="20150704T190000"
    end-date="20150704T210000"
    title="Fourth of July Fireworks"
    location="Battery Park City, New York, NY"
    class-name="btn btn-sm btn-default dropdown-toggle"
    description="Celebrate the independence of the United States with fireworks in one of the greatest cities in the world.">
</addtocalendar>
```

## Attributes

| **Attribute**        | **Description**                                                                                               | **Format**                                                                    | **Example**                                                                                                 | **Required**  |
|----------------------|-------------------------------------------------------------------------------------------------------------- |------------------------------------------------------------------------------ |------------------------------------------------------------------------------------------------------------ |-------------- |
| `title`              | Name of the event.                                                                                            | String                                                                        | Fourth of July Fireworks                                                                                    | Yes           |
| `description`        | Description of the event.                                                                                     | String, defaults to empty                                                     | Celebrate the independence of the United States with fireworks in one of the greatest cities in the world.  | No            |
| `location`           | Location of the event.                                                                                        | Plain text                                                                    | Battery Park City, New York, NY                                                                             | Yes           |
| `start-date`         | The timestamp of when the event begins.                                                                       | Date string. Should match format of `end-date` or `format`.                   | July 4 2017 7:00 PM UTC+500                                                                                 | Yes           |
| `end-date`           | The timestamp of when the event ends.                                                                         | Date string. Should match format of `start-date` or `format`.                 | July 4 2017 10:00 PM UTC+500                                                                                | Yes           |
| `format`             | The format that the `start-date` and `end-date` are in. May include timezone.                                 | `mm/dd/yyyy hh:mm:ss Z`                                                       | `MMMM d YYYY h:m A Z                                                                                        | No            |
| `timezone`           | Any valid [momentjs UTC offset](http://momentjs.com/docs/#/parsing/utc/)                                      | Moment                                                                        | America/New_York                                                                                            | No            |
| `class-name`         | The desired class for the dropdown. See [Custom Styling](#custom).                                            | Bootstrap class/plain text. Default `btn btn-sm btn-default dropdown-toggle`  | btn btn-sm btn-default dropdown-toggle                                                                      | No            |
| `btn-text`           | Text for the button to display                                                                                | Plain text. Default `Add to calendar`                                         | Add to  calendar                                                                                            | No            |
| `use-bootstrap`      | Whether to use Bootstrap styling.                                                                             | Boolean. Default: `false`                                                     | `null`                                                                                                      | No            |
| `hover-text`         | Text to use as the title of the element.                                                                      | String Default: value of title attribute                                      | Add to calendar                                                                                             | No            |

## <a name="custom"></a>Custom Styling

angular-addtocalendar is designed to be compatible [Bootstrap](http://getbootstrap.com/) but also comes bundled with both a custom stylesheet and extendable [Sass](http://sass-lang.com/) styles. The markup selector convention is identical to the [Bootstrap dropdown markup](http://getbootstrap.com/components/#btn-dropdowns).

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

## Browser Support

All browsers support adding to Yahoo!, Microsoft, and Google calendars. Below is the current support for downloading .ics files for Outlook and iCalendar.

| Browser           | .ics Support |
|-------------------|--------------|
| Internet Explorer | 9.0+         |
| Edge              | Yes          |
| Safari            | ≤ 6          |
| Firefox           | 20.0+        |
| Opera             | 15.0+        |
| Chrome            | 14.0+        |
| Android           | 4.4+         |

* iCalendar (ironically) and Outlook do not work due to a well-known file saving bug in Safari versions > 6.

## Bugs

Please report all bugs [here](https://github.com/jshor/angular-addtocalendar/issues).

## Changelog

Available [here](https://github.com/jshor/angular-addtocalendar/blob/master/CHANGELOG.md).