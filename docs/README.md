---
home: true
heroImage: /assets/logo.svg
actionText: Read the docs →
actionLink: /start
footer: © 2023 Datebook.
---

<div class="features">
  <div class="feature">
    <h2>Renders Anywhere</h2>
    <p>Datebook supports both server-side rendering, as well as all major modern browsers.</p>
  </div>
  <div class="feature">
    <h2>Major Apps Supported</h2>
    <p>Fully supports .ics files for iCalendar and Office Outlook, and also supports Google Calendar, Yahoo! Calendar and Outlook Web.</p>
  </div>
  <div class="feature">
    <h2>No Server Needed</h2>
    <p>Datebook will generate downloadable iCalendar files on the fly, and URLs contain event data in their query strings.</p>
  </div>
</div>

## Quick start

```sh
yarn add datebook
```

### Example usage

```ts
import { ICalendar } from 'datebook'

const icalendar = new ICalendar({
  title: 'Happy Hour',
  location: 'The Bar, New York, NY',
  description: 'Let\'s blow off some steam from our weekly deployments to enjoy a tall cold one!',
  start: new Date('2020-07-04T19:00:00'),
  end: new Date('2020-07-04T23:30:00'),
  recurrence: {
    frequency: 'WEEKLY',
    interval: 2
  }
})

icalendar.download()
```
