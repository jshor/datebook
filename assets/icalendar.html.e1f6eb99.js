import{_ as d,r as t,o as r,c as p,b as n,d as a,e as s,w as o,a as e}from"./app.be7f4ba4.js";const u={},v=n("h1",{id:"icalendar-options-calendaroptions",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#icalendar-options-calendaroptions","aria-hidden":"true"},"#"),a(),n("code",null,"ICalendar(options: CalendarOptions)")],-1),m=n("p",null,"Generates an iCalendar instance.",-1),k=n("strong",null,[n("code",null,"options: CalendarOptions")],-1),b=e(`<h3 id="example" tabindex="-1"><a class="header-anchor" href="#example" aria-hidden="true">#</a> Example</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> options<span class="token operator">:</span> CalendarOptions <span class="token operator">=</span> <span class="token punctuation">{</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),h={id:"addevent-icalendar-icalendar",tabindex:"-1"},g=n("a",{class:"header-anchor",href:"#addevent-icalendar-icalendar","aria-hidden":"true"},"#",-1),E=n("code",null,"addEvent(icalendar: ICalendar)",-1),T=e(`<ul><li><strong><code>icalendar: ICalendar</code></strong> - <code>ICalendar</code> instance of the event to add</li></ul><p>This method allows you to add multiple events to a single <code>.ics</code> file. Returns the <code>ICalendar</code> instance.</p><h3 id="example-1" tabindex="-1"><a class="header-anchor" href="#example-1" aria-hidden="true">#</a> Example</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> secondEvent <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ICalendar</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token string">&#39;Monthly Meeting with Boss Man&#39;</span><span class="token punctuation">,</span>
  location<span class="token operator">:</span> <span class="token string">&#39;Conference Room 2A, Big Company, Brooklyn, NY&#39;</span><span class="token punctuation">,</span>
  description<span class="token operator">:</span> <span class="token string">&#39;Meeting to discuss weekly things&#39;</span><span class="token punctuation">,</span>
  start<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token string">&#39;2022-07-08T19:00:00&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  recurrence<span class="token operator">:</span> <span class="token punctuation">{</span>
    frequency<span class="token operator">:</span> <span class="token string">&#39;MONTHLY&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

icalendar<span class="token punctuation">.</span><span class="token function">addEvent</span><span class="token punctuation">(</span>secondEvent<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),A={id:"addalarm-alarm-alarm",tabindex:"-1"},N=n("a",{class:"header-anchor",href:"#addalarm-alarm-alarm","aria-hidden":"true"},"#",-1),_=n("code",null,"addAlarm(alarm: Alarm)",-1),I=n("p",null,[a("Adds an alarm. Multiple different alarms may be added to a single instance. Returns the "),n("code",null,"ICalendar"),a(" instance.")],-1),f=n("strong",null,[n("code",null,"alarm: Alarm")],-1),R=e(`<h3 id="example-2" tabindex="-1"><a class="header-anchor" href="#example-2" aria-hidden="true">#</a> Example</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> alarm1<span class="token operator">:</span> Alarm <span class="token operator">=</span> <span class="token punctuation">{</span>
  action<span class="token operator">:</span> <span class="token string">&#39;DISPLAY&#39;</span><span class="token punctuation">,</span>
  trigger<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token string">&#39;1998-01-01T05:00:00Z&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  description<span class="token operator">:</span> <span class="token string">&#39;the event description&#39;</span><span class="token punctuation">,</span>
  summary<span class="token operator">:</span> <span class="token string">&#39;a quick summary&#39;</span><span class="token punctuation">,</span>
  duration<span class="token operator">:</span> <span class="token punctuation">{</span>
    after<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    minutes<span class="token operator">:</span> <span class="token number">3</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> alarm2<span class="token operator">:</span> Alarm <span class="token operator">=</span> <span class="token punctuation">{</span>
  action<span class="token operator">:</span> <span class="token string">&#39;DISPLAY&#39;</span><span class="token punctuation">,</span>
  trigger<span class="token operator">:</span> <span class="token punctuation">{</span>
    minutes<span class="token operator">:</span> <span class="token number">5</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

calendar
  <span class="token punctuation">.</span><span class="token function">addAlarm</span><span class="token punctuation">(</span>alarm1<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">addAlarm</span><span class="token punctuation">(</span>alarm2<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="result" tabindex="-1"><a class="header-anchor" href="#result" aria-hidden="true">#</a> Result:</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>BEGIN:VCALENDAR
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
DESCRIPTION:the event description
SUMMARY:a quick summary
DURATION:PT3M
TRIGGER;VALUE=DATE-TIME:19980101T050000Z
END:VALARM
BEGIN:VALARM
ACTION:DISPLAY
DURATION:
TRIGGER:-PT5M
END:VALARM
TRANSP:TRANSPARENT
END:VEVENT
END:VCALENDAR
UID:19hq3v1lm15
DTSTAMP:20200916
PRODID:datebook.dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),y={id:"setmeta-key-string-value-string",tabindex:"-1"},x=n("a",{class:"header-anchor",href:"#setmeta-key-string-value-string","aria-hidden":"true"},"#",-1),D=n("code",null,"setMeta(key: string, value: string)",-1),C=e(`<p>Sets iCalendar meta properties, such as <code>UID</code>, <code>DTSTAMP</code>, etc. Returns the <code>ICalendar</code> instance.</p><ul><li><strong><code>key: string</code></strong> - iCalendar meta property key.</li><li><strong><code>value: string</code></strong> - Value of the meta property.</li></ul><h3 id="example-3" tabindex="-1"><a class="header-anchor" href="#example-3" aria-hidden="true">#</a> Example</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>calendar
  <span class="token punctuation">.</span><span class="token function">setMeta</span><span class="token punctuation">(</span><span class="token string">&#39;UID&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;e9de89b0a5e9ad6efd5e5ab543ec617c&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),w={id:"addproperty-key-string-value-icspropertyvalue",tabindex:"-1"},L=n("a",{class:"header-anchor",href:"#addproperty-key-string-value-icspropertyvalue","aria-hidden":"true"},"#",-1),S=n("code",null,"addProperty(key: string, value: ICSPropertyValue)",-1),V=e(`<p>Adds any additional desired iCalendar event property having the given key-value pair to the instance. Returns the <code>ICalendar</code> instance.</p><ul><li><strong><code>key: string</code></strong> - iCalendar event property name.</li><li><strong><code>value: Record&lt;string, any&gt; | string | number</code></strong> - A key-value subset of properties, or a valid value.</li></ul><h3 id="example-4" tabindex="-1"><a class="header-anchor" href="#example-4" aria-hidden="true">#</a> Example</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>calendar
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
END:VEVENT
END:VCALENDAR
UID:19hq3v1lm15
DTSTAMP:20200916
PRODID:datebook.dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="render" tabindex="-1"><a class="header-anchor" href="#render" aria-hidden="true">#</a> <code>render()</code></h2>`,7),M={href:"https://icalendar.org/",target:"_blank",rel:"noopener noreferrer"},P=e(`<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>calendar<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
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
END:VEVENT
END:VCALENDAR
UID:19hq3v1lm15
DTSTAMP:20200916
PRODID:datebook.dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="download-filename-string" tabindex="-1"><a class="header-anchor" href="#download-filename-string" aria-hidden="true">#</a> <code>download(fileName?: string)</code></h2><ul><li><strong><code>fileName: string</code></strong> - optional file name</li></ul><p>Downloads a <code>.ics</code> file on the user&#39;s browser for use in local calendars and email clients.</p>`,6);function O(B,Y){const l=t("RouterLink"),i=t("Badge"),c=t("ExternalLinkIcon");return r(),p("div",null,[v,m,n("ul",null,[n("li",null,[k,a(" - Basic calendar "),s(l,{to:"/config/basic.html"},{default:o(()=>[a("configuration options")]),_:1}),a(".")])]),b,n("h2",h,[g,a(),E,a(),s(i,{text:"6.0.0",vertical:"middle"})]),T,n("h2",A,[N,a(),_,a(),s(i,{text:"6.0.0",vertical:"middle"})]),I,n("ul",null,[n("li",null,[f,a(" - "),s(l,{to:"/config/alarms.html"},{default:o(()=>[a("Alarm options")]),_:1}),a(".")])]),R,n("h2",y,[x,a(),D,a(),s(i,{text:"6.0.0",vertical:"middle"})]),C,n("h2",w,[L,a(),S,a(),s(i,{text:"6.0.0",vertical:"middle"})]),V,n("p",null,[a("Returns a generated "),n("a",M,[a("iCalendar"),s(c)]),a(" file content string containing the event details.")]),P])}const G=d(u,[["render",O],["__file","icalendar.html.vue"]]);export{G as default};
