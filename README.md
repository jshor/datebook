# angular-addtocalendar  [![Build Status](https://travis-ci.org/jshor/angular-addtocalendar.png?branch=master)](https://travis-ci.org/jshor/angular-addtocalendar)  [![devDependency Status](https://david-dm.org/dalelotts/angular-bootstrap-datetimepicker/dev-status.png)](https://david-dm.org/jshor/angular-addtocalendar#info=devDependencies)

v1.1.3

An AngularJS directive for adding an event to calendar apps. It supports .ics files for iCalendar and Outlook and also supports Google Calendar, Yahoo! Calendar and Microsoft Calendar.

Enjoy!

## Installation

bower:

    bower install angular-addtocalendar

npm:

	npm install angular-addtocalendar

You can also [download it directly](https://github.com/jshor/angular-addtocalendar/archive/v1.1.3.tar.gz).

Inject the dependency `jshor.angular-addtocalendar` into your app:

		angular
			.module('myApp', [
				'jshor.angular-addtocalendar', 
				'ui.bootstrap',
				...
			]);

## Demo

For a demo, please [click here](http://jshor.github.io/angular-addtocalendar/demo/).

## Example

	<addtocalendar
		start-date="20150704T190000"
		end-date="20150704T210000"
		title="Fourth of July Fireworks"
		location="Battery Park City, New York, NY"
		class-name="btn btn-sm btn-default dropdown-toggle"
		description="Celebrate the independence of the United States with fireworks in one of the greatest cities in the world."
		btn-text="Add to calendar">
	</addtocalendar>

## Attributes

| **Attribute** 	| **Description**                                                                                              	| **Format**                                                                   	| **Example**                                                                                                	| **Required** 	|
|---------------	|--------------------------------------------------------------------------------------------------------------	|------------------------------------------------------------------------------	|------------------------------------------------------------------------------------------------------------	|--------------	|
| `title`       	| Name of the event.                                                                                           	| Plain text                                                                   	| Fourth of July Fireworks                                                                                   	| Yes          	|
| `description` 	| Description of the event.                                                                                    	| Plain text. Default nil.                                                     	| Celebrate the independence of the United States with fireworks in one of the greatest cities in the world. 	| No           	|
| `location`    	| Location of the event.                                                                                       	| Plain text                                                                   	| Battery Park City, New York, NY                                                                            	| Yes          	|
| `start-date`  	| The timestamp of when the event begins.                                                                      	| Date string in format `YYYYMMDDToHHMMSS`                                     	| 20150704T190000                                                                                            	| Yes          	|
| `end-date`    	| The timestamp of when the event ends.                                                                        	| Date string in format `YYYYMMDDToHHMMSS`                                     	| 20150704T210000                                                                                            	| Yes          	|
| `class-name`  	| The bootstrap class for the dropdown button ([more info](http://getbootstrap.com/components/#btn-dropdowns)) 	| Bootstrap class/plain text. Default `btn btn-sm btn-default dropdown-toggle` 	| btn btn-sm btn-default dropdown-toggle                                                                     	| No           	|
| `btn-text`  	| Text for the button to display								 	| Plain text. Default `Add to calendar`					| Add to  calendar                                                                    		| No           	|

## Browser Support

All browsers support adding to Yahoo!, Microsoft, and Google calendars. Below is the current support for downloading .ics files for Outlook and iCalendar.

| Browser           | .ics Support |
|-------------------|--------------|
| Internet Explorer | 9.0+         |
| Edge              | Yes          |
| Safari            | No           |
| Firefox           | 20.0+        |
| Opera             | 15.0+        |
| Chrome            | 14.0+        |
| Android           | 4.4+         |

## Bugs

Please report all bugs [here](https://github.com/jshor/angular-addtocalendar/issues).

## Changelog

Available [here](https://github.com/jshor/angular-addtocalendar/blob/master/CHANGELOG.md).
