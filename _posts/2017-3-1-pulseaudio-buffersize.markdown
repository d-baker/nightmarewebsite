---
layout: post
title: "Fix stuttering or distorted audio in Linux - PulseAudio buffer resizing"
date: 2017-3-4
tags:
- linux
- audio
---

Back when I dual booted Linux on my HP Pavilion laptop, I experienced a problem with glitchy audio which I documented the solution to <a href="http://nightmare.website/blog/horrorstory">here</a>.

During the process I encountered a second audio glitch, which I didn't address at the time. This post is an attempt to remedy that.
<!--break--> 

## TL;DR

<!--### System specifications
I'm including this so you can compare it to your own specs if you're having the same problem, since it may well be hardware dependent.

OS: KDE Neon User Edition (Ubuntu derivative)
TODO hardware spec
-->

### Problem
Certain audio formats (AIFF, WAV, possibly others) when played through certain applications (VLC, Dolphin's preview panel, possibly others) stutter or sound buzzy/distorted during playback.

### Cause
The size of the audio buffer on the sound card doesn't match the IO rate set in the PulseAudio sound server configuration, leading to latency. (Note: most major Linux distributions play audio using PulseAudio.)

### Solution

Run `pacmd list-sinks | grep 'buffering'`. You should see output like this:

    device.buffering.buffer_size = "x"
    device.buffering.fragment_size = "x"

`x` and `y` are integers which I will refer to as `buffer_size` and `fragment_size` from now on, for simplicity.

Perform the following calculations using the values from above:

    buffer_latency = (buffer_size / 1411200) / 1000
    fragment_latency = (fragment_size / 1411200) 1000

We now need to calculate the total bits per second for audio IO:

    (samplerate * bitdepth) * channels 

Typically the sample rate is 44100, bit depth is 16 and there are 2 channels (left and right, for stereo). So we get:

    totalBPS = (44100*16) * 2 = 1411200

If you are using a different sample rate, bit depth and/or number of channels make sure you calculate accordingly.

Now open the relevant PulseAudio configuration file (which requires root privileges):

    sudo vim /etc/pulse/daemon.conf

Feel free to replace `vim` with your preferred command line text editor.

Find the following lines in `daemon.conf` and uncomment them:

    default-fragment-size-msec = x
    default-fragments = y

`x` and `y` will be integers. Replace `x` with the `fragment_latency` you calculated earlier and replace `y` with `buffer_latency / fragment_latency`.

Also uncomment these lines in `daemon.conf`:

    default-sample-format = s16le
    default-sample-rate = 44100
    default-sample-channels = 2

If you used a different sample rate and/or number of channels earlier, change the parameters accordingly.

Finally, save and close `daemon.conf` and restart PulseAudio:

    pulseaudio -k
    pulseaudio --start

Phew! So, what did all that achieve?

Well, for me, there is no longer any buzzing or distortion when playing back AIFFs and WAVs. 

But now, M4As (but not MP3s) played from the Dolphin preview panel or from VLC are disorted - the same issue I was having with other audio formats before! And the sporadic glitch in all other audio has returned.

Oh Linux, I love you and I hate you.

<em>All the credit for this solution goes to <a href="https://forums.linuxmint.com/viewtopic.php?f=42&t=44862">this very helpful forum post</a>.</em>
