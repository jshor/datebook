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
    <p>Fully supports ICS content generation for iCalendar and Office Outlook, and also supports Google Calendar, Yahoo! Calendar and Outlook Web.</p>
  </div>
  <div class="feature">
    <h2>Consistent and Versatile</h2>
    <p>The unified API and configuration simplifies the process of rendering URLs and ICS for identical events across calendar providers.</p>
  </div>
</div>

## Quick start

```sh
yarn add datebook
```

### Example usage

```ts
import { GoogleCalendar } from 'datebook'

const googleCalendar = new GoogleCalendar({
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

window.location.href = googleCalendar.render()
```
