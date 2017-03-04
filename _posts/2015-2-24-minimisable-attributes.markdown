---
layout: post
title: "Minimisable HTML attributes"
date: 2015-2-24
tags:
- html
---
I had a surprising amount of difficulty finding a complete list of HTML attributes that don't require values, so I decided to make a reference list. Note that these attributes simply have a default value *of some sort*; not all of them are boolean. Also, all these attributes require values in XHTML.

Here's an example of how you might  <!--break--> use the `checked` attribute in HTML5:
{% highlight html %}
<input type="checkbox" checked>
{% endhighlight %}

And in XHTML:
{% highlight html %}
<input type="checkbox" checked="checked"/>
{% endhighlight %}

That's basically how they all work, except a few attributes have camel-cased values for some reason. I'm not documenting those here, though.

The following list was taken from [this github issue](https://github.com/kangax/html-minifier/issues/63) (thanks to these folk for their hard work). I've tweaked it a bit and matched the attributes to their relevant HTML tags/context. Let me know if I've missed anything!

{% highlight html %}
- allowfullscreen: <iframe>
- async: <script>
- autofocus: <button> <input> <keygen> <select> <textarea>
- autoplay: <audio> <video>
- checked: <input type=checkbox> <input type=radio>
- compact: <dir> <dl> <menu> <ol> <ul> (DEPRECATED)
- controls: <audio> <video>
- declare: <object>
- default: <track>
- defer: <script>
- disabled: <button> <command> <fieldset> <input> <keygen> <optgroup> <option> <select> <textarea>
- draggable: global
- formnovalidate: <form>
- hidden: global
- inert: global
- ismap: <img>
- itemscope: global
- loop: <audio> <bgsound> <marquee> <video>
- multiple: <input> <select>
- muted: <audio> <video>
- noresize: <frame> <iframe>
- noshade: <hr> (DEPRECATED)
- novalidate: <form> <input>
- nowrap: <th> <td> (DEPRECATED)
- open: <details>
- readonly: <input> <textarea>
- required: <input> <select> <textarea>
- reversed: <ol>
- scoped: <style>
- seamless: <iframe>
- selected: <option>
- sortable: <table> (DRAFT)
- sorted: <th> (DRAFT)
- spellcheck: global
- translate: global
- truespeed: <marquee>
- typemustmatch: <object>
{% endhighlight %}
