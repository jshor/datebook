import{_ as r,r as i,o as d,c as p,b as n,d as s,e as a,w as c,a as e}from"./app.5f1bebec.js";const u={},v=n("h1",{id:"icalendar-options-calendaroptions",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#icalendar-options-calendaroptions","aria-hidden":"true"},"#"),s(),n("code",null,"ICalendar(options: CalendarOptions)")],-1),m=n("p",null,"Generates an iCalendar instance.",-1),k=n("strong",null,[n("code",null,"options: CalendarOptions")],-1),b=e(`<h3 id="example" tabindex="-1"><a class="header-anchor" href="#example" aria-hidden="true">#</a> Example</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> options<span class="token operator">:</span> CalendarOptions <span class="token operator">=</span> <span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token string">&#39;Happy Hour&#39;</span><span class="token punctuation">,</span>
  location<span class="token operator">:</span> <span class="token string">&#39;The Bar, New York, NY&#39;</span><span class="token punctuation">,</span>
  description<span class="token operator">:</span> <span class="token string">&#39;Let\\&#39;s blow off some steam with a tall cold one!&#39;</span><span class="token punctuation">,</span>
  start<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token string">&#39;2022-07-08T19:00:00&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  end<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token string">&#39;2022-07-08T23:30:00&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  recurrence<span class="token operator">:</span> <span class="token punctuation">{</span>
    frequency<span class="token operator">:</span> <span class="token string">&#39;WEEKLY&#39;</span><span class="token punctuation">,</span>
    interval<span class="token operator">:</span> <span class="token number">2</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> icalendar <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ICalendar</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),h={id:"addevent-icalendar-icalendar",tabindex:"-1"},g=n("a",{class:"header-anchor",href:"#addevent-icalendar-icalendar","aria-hidden":"true"},"#",-1),T=n("code",null,"addEvent(icalendar: ICalendar)",-1),f=e(`<ul><li><strong><code>icalendar: ICalendar</code></strong> - <code>ICalendar</code> instance of the event to add</li></ul><p>This method allows you to add multiple events to a single <code>.ics</code> file. Returns the <code>ICalendar</code> instance.</p><h3 id="example-1" tabindex="-1"><a class="header-anchor" href="#example-1" aria-hidden="true">#</a> Example</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> secondEvent <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ICalendar</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token string">&#39;Monthly Meeting with Boss Man&#39;</span><span class="token punctuation">,</span>
  location<span class="token operator">:</span> <span class="token string">&#39;Conference Room 2A, Big Company, Brooklyn, NY&#39;</span><span class="token punctuation">,</span>
  description<span class="token operator">:</span> <span class="token string">&#39;Meeting to discuss weekly things&#39;</span><span class="token punctuation">,</span>
  start<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token string">&#39;2022-07-08T19:00:00&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  recurrence<span class="token operator">:</span> <span class="token punctuation">{</span>
    frequency<span class="token operator">:</span> <span class="token string">&#39;MONTHLY&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

icalendar<span class="token punctuation">.</span><span class="token function">addEvent</span><span class="token punctuation">(</span>secondEvent<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),_={id:"addalarm-alarm-alarm",tabindex:"-1"},y=n("a",{class:"header-anchor",href:"#addalarm-alarm-alarm","aria-hidden":"true"},"#",-1),E=n("code",null,"addAlarm(alarm: Alarm)",-1),A=n("p",null,[s("Adds an alarm. Multiple different alarms may be added to a single instance. Returns the "),n("code",null,"ICalendar"),s(" instance.")],-1),N=n("strong",null,[n("code",null,"alarm: Alarm")],-1),I=e(`<h3 id="example-2" tabindex="-1"><a class="header-anchor" href="#example-2" aria-hidden="true">#</a> Example</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> alarm1<span class="token operator">:</span> Alarm <span class="token operator">=</span> <span class="token punctuation">{</span>
  action<span class="token operator">:</span> <span class="token string">&#39;DISPLAY&#39;</span><span class="token punctuation">,</span>
  trigger<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token string">&#39;1998-01-01T05:00:00Z&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  description<span class="token operator">:</span> <span class="token string">&#39;The first alarm description&#39;</span><span class="token punctuation">,</span>
  summary<span class="token operator">:</span> <span class="token string">&#39;The first alarm summary&#39;</span><span class="token punctuation">,</span>
  summary<span class="token operator">:</span> <span class="token string">&#39;a quick summary&#39;</span><span class="token punctuation">,</span>
  duration<span class="token operator">:</span> <span class="token punctuation">{</span>
    after<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    minutes<span class="token operator">:</span> <span class="token number">3</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> alarm2<span class="token operator">:</span> Alarm <span class="token operator">=</span> <span class="token punctuation">{</span>
  action<span class="token operator">:</span> <span class="token string">&#39;DISPLAY&#39;</span><span class="token punctuation">,</span>
  description<span class="token operator">:</span> <span class="token string">&#39;The second alarm description&#39;</span><span class="token punctuation">,</span>
  summary<span class="token operator">:</span> <span class="token string">&#39;The second alarm summary&#39;</span><span class="token punctuation">,</span>
  trigger<span class="token operator">:</span> <span class="token punctuation">{</span>
    minutes<span class="token operator">:</span> <span class="token number">5</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  duration<span class="token operator">:</span> <span class="token punctuation">{</span>
    after<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    minutes<span class="token operator">:</span> <span class="token number">3</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

calendar
  <span class="token punctuation">.</span><span class="token function">addAlarm</span><span class="token punctuation">(</span>alarm1<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">addAlarm</span><span class="token punctuation">(</span>alarm2<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="result" tabindex="-1"><a class="header-anchor" href="#result" aria-hidden="true">#</a> Result:</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
CLASS:PUBLIC
DESCRIPTION:Let&#39;s blow off some steam with a tall cold one!
DTSTART:20220708T190000
DTEND:20220708T230000
LOCATION:The Bar, New York, NY
SUMMARY:Happy Hour
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:The first alarm description
SUMMARY:The first alarm summary
DURATION:PT3M
TRIGGER;VALUE=DATE-TIME:19980101T050000Z
END:VALARM
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:The second alarm description
SUMMARY:The second alarm summary
DURATION:
TRIGGER:-PT5M
DURATION:PT3M
END:VALARM
TRANSP:TRANSPARENT
UID:19hq3v1lm15
DTSTAMP:20200916T000000
END:VEVENT
PRODID:datebook.dev
END:VCALENDAR
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),R={id:"setmeta-key-string-value-string",tabindex:"-1"},x=n("a",{class:"header-anchor",href:"#setmeta-key-string-value-string","aria-hidden":"true"},"#",-1),D=n("code",null,"setMeta(key: string, value: string)",-1),w=e(`<p>Sets iCalendar meta properties, such as <code>UID</code>, <code>DTSTAMP</code>, etc. Returns the <code>ICalendar</code> instance.</p><ul><li><strong><code>key: string</code></strong> - iCalendar meta property key.</li><li><strong><code>value: string</code></strong> - Value of the meta property.</li></ul><h3 id="example-3" tabindex="-1"><a class="header-anchor" href="#example-3" aria-hidden="true">#</a> Example</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>calendar
  <span class="token punctuation">.</span><span class="token function">setMeta</span><span class="token punctuation">(</span><span class="token string">&#39;UID&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;e9de89b0a5e9ad6efd5e5ab543ec617c&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),C={id:"addproperty-key-string-value-icspropertyvalue",tabindex:"-1"},S=n("a",{class:"header-anchor",href:"#addproperty-key-string-value-icspropertyvalue","aria-hidden":"true"},"#",-1),L=n("code",null,"addProperty(key: string, value: ICSPropertyValue)",-1),V=e(`<p>Adds any additional desired iCalendar event property having the given key-value pair to the instance. Returns the <code>ICalendar</code> instance.</p><ul><li><strong><code>key: string</code></strong> - iCalendar event property name.</li><li><strong><code>value: Record&lt;string, any&gt; | string | number</code></strong> - A key-value subset of properties, or a valid value.</li></ul><h3 id="example-4" tabindex="-1"><a class="header-anchor" href="#example-4" aria-hidden="true">#</a> Example</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>calendar
  <span class="token punctuation">.</span><span class="token function">addProperty</span><span class="token punctuation">(</span><span class="token string">&#39;CATEGORIES&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;RECREATION,TEAM-BUILDING&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="result-1" tabindex="-1"><a class="header-anchor" href="#result-1" aria-hidden="true">#</a> Result:</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
CLASS:PUBLIC
DESCRIPTION:Let&#39;s blow off some steam with a tall cold one!
DTSTART:20220708T190000
DTEND:20220708T230000
LOCATION:The Bar, New York, NY
SUMMARY:Happy Hour
TRANSP:TRANSPARENT
CATEGORIES:RECREATION,TEAM-BUILDING
UID:19hq3v1lm15
DTSTAMP:20200916T000000
END:VEVENT
PRODID:datebook.dev
END:VCALENDAR
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="render" tabindex="-1"><a class="header-anchor" href="#render" aria-hidden="true">#</a> <code>render()</code></h2>`,7),M={href:"https://icalendar.org/",target:"_blank",rel:"noopener noreferrer"},O=e(`<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>calendar<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="result-2" tabindex="-1"><a class="header-anchor" href="#result-2" aria-hidden="true">#</a> Result:</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
CLASS:PUBLIC
DESCRIPTION:Let&#39;s blow off some steam with a tall cold one!
DTSTART:20220708T190000
DTEND:20220708T230000
LOCATION:The Bar, New York, NY
SUMMARY:Happy Hour
TRANSP:TRANSPARENT
RRULE:FREQ=DAILY;INTERVAL=1
UID:19hq3v1lm15
DTSTAMP:20200916T000000
END:VEVENT
PRODID:datebook.dev
END:VCALENDAR
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-for-downloading-an-ics-file" tabindex="-1"><a class="header-anchor" href="#example-for-downloading-an-ics-file" aria-hidden="true">#</a> Example for downloading an ICS file</h3>`,4),P={href:"https://www.npmjs.com/package/file-saver",target:"_blank",rel:"noopener noreferrer"},B=e(`<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> FileSaver <span class="token keyword">from</span> <span class="token string">&#39;file-saver&#39;</span>

<span class="token keyword">const</span> ics <span class="token operator">=</span> calendar<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> blob <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Blob</span><span class="token punctuation">(</span><span class="token punctuation">[</span>ics<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  type<span class="token operator">:</span> <span class="token string">&#39;text/calendar&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

FileSaver<span class="token punctuation">.</span><span class="token function">saveAs</span><span class="token punctuation">(</span>blob<span class="token punctuation">,</span> <span class="token string">&#39;my-calendar-event.ics&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),Y={id:"download-filename-string",tabindex:"-1"},U=n("a",{class:"header-anchor",href:"#download-filename-string","aria-hidden":"true"},"#",-1),G=n("code",null,"download(fileName?: string)",-1),H=n("ul",null,[n("li",null,[n("strong",null,[n("code",null,"fileName: string")]),s(" - optional file name")])],-1),q=n("p",null,[s("Downloads a "),n("code",null,".ics"),s(" file on the user's browser for use in local calendars and email clients.")],-1),F=n("div",{class:"custom-container warning"},[n("p",{class:"custom-container-title"},"Deprecation Notice"),n("p",null,"This feature is deprecated and will be removed in v8.")],-1);function j(Z,K){const l=i("RouterLink"),t=i("Badge"),o=i("ExternalLinkIcon");return d(),p("div",null,[v,m,n("ul",null,[n("li",null,[k,s(" - Basic calendar "),a(l,{to:"/config/basic.html"},{default:c(()=>[s("configuration options")]),_:1}),s(".")])]),b,n("h2",h,[g,s(),T,s(),a(t,{text:"6.0.0",vertical:"middle"})]),f,n("h2",_,[y,s(),E,s(),a(t,{text:"6.0.0",vertical:"middle"})]),A,n("ul",null,[n("li",null,[N,s(" - "),a(l,{to:"/config/alarms.html"},{default:c(()=>[s("Alarm options")]),_:1}),s(".")])]),I,n("h2",R,[x,s(),D,s(),a(t,{text:"6.0.0",vertical:"middle"})]),w,n("h2",C,[S,s(),L,s(),a(t,{text:"6.0.0",vertical:"middle"})]),V,n("p",null,[s("Returns a generated "),n("a",M,[s("iCalendar"),a(o)]),s(" file content string containing the event details.")]),O,n("p",null,[s("Once an ICS file string is rendered, you can use "),n("a",P,[s("FileSaver.js"),a(o)]),s(" or a similar library to locally download the ICS file onto the user's device.")]),B,n("h2",Y,[U,s(),G,s(),a(t,{text:"Deprecated",type:"warning",vertical:"middle"})]),H,q,F])}const W=r(u,[["render",j],["__file","icalendar.html.vue"]]);export{W as default};
