---
layout: post
title:  "onsubmit attribute: some gotchas"
date:   2015-2-4
tags:
- javascript
- onsubmit
---
- Don't forget the `return`: it's `onsubmit="return someFunction()"` not `onsubmit="someFunction()"`
- If you are relying on an external javascript file <!--break--> to provide `someFunction()`, the function *mustn't be wrapped in anything else*. This means, no `$(document).ready()` or the like. As a result, the external script needs to go just before the closing `</body>` tag rather than in the `<head>` in order for everything to load in the right order.
