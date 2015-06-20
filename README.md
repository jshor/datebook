# angular-addtocalendar [![Build Status](https://travis-ci.org/jshor/angular-addtocalendar.png?branch=master)](https://travis-ci.org/jshor/angular-addtocalendar)

An AngularJS directive for adding an event to calendar apps. It supports .ics files for iCalendar and Outlook using [ics.js](https://github.com/nwcell/ics.js) by Travis Krause and also supports Google Calendar, Yahoo! Calendar and Microsoft Calendar.

## Installation (via bower)

    bower install angular-addtocalendar

## Example

	<addtocalendar
 		start-date="20150704T190000"
 		end-date="20150704T210000"
 		title="Fourth of July Fireworks"
 		location="Battery Park City, New York, NY"
 		class-name="btn btn-sm btn-default dropdown-toggle"
 		description="Celebrate the independence of the United States with fireworks in one of the greatest cities in the world."
 	></addtocalendar>

## Params

...