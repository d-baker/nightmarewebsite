---
layout: post
title: "Browser add-ons for security and privacy"
date: 2017-7-26
tags:
- web
- browsers
---

I generally don't like to have too many browser add-ons enabled at a time, because they can get slow. However, add-ons for improving web privacy and security should be essential.

There are many aspects of web security that can be addressed with add-ons: malware, intrusive ads, trackers, untrustworthy websites. In this blog post I'm going to discuss my favorite tools for dealing with these issues.
<!--break-->

Note that while I use and recommend Firefox (Mozilla advocates for privacy and does great work on web technologies), all the add-ons mentioned here are available for other browsers as well.

[DuckDuckGo](https://duckduckgo.com/)
----------
_Supported by: All major browsers (and some minor ones)_

DuckDuckGo is an alternative search engine with a focus on privacy: it doesn't store your search history or use trackers (obviously, the latter is less important if you're using some kind of script blocker, but it's the principle that counts, right?)

DuckDuckGo is not as effective as Google, but unless you're searching for something obscure it's usually just fine. If you're having troubling finding what you're looking for, append `!g` to the end of the search query and it will search with Google instead.

[This add-on](https://add-ons.mozilla.org/en-US/firefox/add-on/duckduckgo-ssl/) makes DuckDuckGo the default search engine in Firefox, so any searches you make via the address bar or search bar will go through DuckDuckGo instead of Google. Instructions for achieving the same result in other browsers can be found [here](https://duck.co/help/desktop/adding-duckduckgo-to-your-browser).


[WOT (web of trust)](https://www.mywot.com/)
------------------
_Supported by: All major browsers_

WOT is a unique add-on designed to show you at a glance whether a link is safe to visit, and it's perfect for exploring obscure corners of the internet via a search engine.

It's based on community ratings of websites, and provides two metrics: "trustworthiness" and "child safety" (the latter is pretty much the same as "safe for work").

As stated by the WOT website, this add-on doesn't just warn you about malicious sites, but also provides ratings based on "threats that only humans can spot" including "bad online shopping experiences". How cool is that!

When you install WOT, a colored circle appears next to every link in search results. A green circle means a safe/trusted website, orange means a website of dubious reputation, red means positively terrible, and grey means there haven't been enough ratings to make a judgement.

The great thing is anyone can contribute ratings without needing to sign up for anything: if a website you know well has a grey circle, go contribute!


[Adblock Plus](https://adblockplus.org/)
------------
_Supported by: All major browsers_

This add-on hides most advertisements on the web, and is almost guaranteed to make your browsing experience more relaxing. It has simple, self-explanatory settings and is easy to use without any special configuration.

These days, many sites that rely heavily on advertising will detect the existence of an adblocker and refuse to show you any content until you disable it. Fortunately, Adblock Plus can easily be disabled on a site-by-site basis, so it's definitely still worth using.


[uMatrix](https://github.com/gorhill/uMatrix)
-------
_Supported by: Firefox, Chrome, Opera_

uMatrix is not for the faint-hearted. If you know what you're doing, it could eliminate the need for any other security add-ons, but finding the right settings to do so would be time-consuming.

uMatrix allows you to individually block or allow *every single request* made by a website. You can block/allow particular kinds of content, particular kinds of content from particular domains, all content from particular domains...the possibilities are endless, intimidating, and need a lot of tweaking if you want anything to work.

But for the paranoid, nothing else will do.

As suggested by its name, the uMatrix interface is a grid. The columns represent different kinds of content (css, images, scripts). The rows represent domains from which content originates (like google.com and various subdomains). It would take far too long to explain its usage here, but in spite of this complexity the uMatrix interface is actually quite intuitive.

However, it can be hard to know where to start, so here are some suggested default settings:

- Allow all CSS and Images (by default, some of these requests may still be blocked by uMatrix's built-in anti-malware blacklist, which is a good thing)
- Block all cookies, XHR (AJAX) and "other" request types
- Allow only 1st-party media, scripts and frames (requests originating from the same domain)

If you find that these settings are causing certain sites to misbehave, you can make uMatrix less restrictive for those specific sites. You can also disable it entirely with the click of a button.

I may write an in-depth blog post on how to use the basic features of uMatrix in the future, because it's really worth learning about. In the meantime, you can refer to [this documentation](https://github.com/gorhill/uMatrix/wiki).


[Firefox multi-account containers](https://blog.mozilla.org/firefox/introducing-firefox-multi-account-containers/)
---------------------
_Supported by: Firefox_

Unfortunately this add-on is, at present, only a feature of Firefox. But it's such an awesome feature! While there's a little bit of a learning curve, if you're security conscious, need to manage multiple accounts on social media sites, and/or love to keep things very organised (i.e. putting things in boxes), multi-account containers are a dream come true.

From a security perspective, this add-on allows you to sandbox cookies for different types of browsing activity, like banking and watching Youtube videos. This theoretically makes it harder for sites to "spy" on each other and could prevent some web-based attacks like cross-site request forgery and cookie theft.

From a usability perspective, the most obvious advantage this add-on provides is enabling you to be logged in to, say, several different Twitter accounts in the same browser. (For the paranoid: it also lets you work around Google's native multiple account management, since you can separately log in to each of your accounts without them being linked in Google's account management page.)

------------------------------------------------------------------------------

Here's an overview of how all these add-ons fit together during my daily internet usage.

Searching the web with DuckDuckGo, I'm free from that disturbing, Googley sensation of being followed. Browsing the search results, I can make an informed decision about which ones to click thanks to the WOT rating, and if a website turns out to be bad after all, uMatrix will block any trackers or malicious scripts. It's often necessary to partially or completely disable uMatrix in order for some sites to work, but Firefox's multi-account containers provide peace of mind by separating the data for different areas of my browsing activity. Meanwhile, this whole time I've seen only peaceful whitespace in place of ads (this is Adblock Plus's doing, although depending on the website and the configuration, uMatrix can have the same effect).
