---
layout: post
title:  "HTML5 audio loading effiency hack"
date:   2014-11-4
tags:
- HTML5
- audio
- javascript
- snippet
---
This function was part of a HTML5 audio player I worked on for my personal website at one point. It ensures that on a page with multiple HTML5 `<audio>` elements, only the file the user currently wishes to hear will <!--break-->load, saving a lot of bandwidth. Depending on what you're trying to achieve, and the size of the files in question, this may or may not be useful.

Setting the attribute `preload=none` on an `audio` element achieves a similar result to this code. It will cause an audio file to only be loaded once the user hits the play button.

However, as far as I am aware, `preload=none` will NOT cancel the download if the user stops playing the audio. It's an uncommon use case, but I found myself in a situation where this specific behavior was required, and devised the solution below. 

This Javascript snippet dynamically adds and removes audio sources from the DOM depending on which audio element the user has chosen to play. Removing an `audio` element's `src` attribute will force the download of the audio file to cancel.


{% highlight javascript %}
// an array of the src attributes of every audio element on the page (assumes sources are already set, obviously)
var sources = [];
$("audio").each (function(i) {
    $(this).attr("id", i.toString());
    sources.push($(this).find("source").attr("src"));
});

// call this function when the user clicks the play button
// $target is a jQuery object containing the "path" to your audio elements in the dom
function hack($target) {
	// remove all audio sources
    $("audio source").attr("src", "");

    // find and load the audio source of ONLY the chosen audio element
    var id = parseInt($target.find("audio").attr("id"));
    $target.find("audio source").attr("src", sources[id]);
    $("audio").load();
}
{% endhighlight %}

