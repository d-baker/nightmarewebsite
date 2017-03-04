---
layout: post
title:  "Safari SVG &lt;image&gt; bug - a solution (kinda)"
date:   2015-1-22
tags:
- safari
- svg
---
- The `<image>` tag in SVG is used to include a bitmap image inside an SVG.
- Safari (along with some other lesser-known browsers: Luakit, DWB, Rekonq, Konqueror) won't render `<image>` tags in an SVG unless the SVG is <!--break--> contained in a `<object>` tag.
- If you want your `<object>` to be a clickable link, you need to add `object { pointer-events: none}` to your CSS.
- Unfortunately, this doesn't appear to always work. I had 2 `<object>`s on one page that had similar CSS rules, and only one of them became clickable when I added the `object { pointer-events: none}` rule. There is a documented bug in webkit from 2011 that seems relevant to this problem, but it's a mystery to me.
- The solution in my case was to convert the bitmap to a vector path. You can do this in Inkscape with `Path -> Trace bitmap`. As long as you're not trying to include photographs in the middle of your SVG (why on earth would you want to do that!!) then there probably isn't anything wrong with this approach.
