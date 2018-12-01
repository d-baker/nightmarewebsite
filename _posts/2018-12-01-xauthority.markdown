---
layout: post
title:  "A flat battery locks me out of my computer"
date:   2018-12-01
tags:
- linux
---
This morning I woke up to find that I couldn't log into my laptop (a Metabox running Kubuntu 17.10).

I hadn't done anything particularly unusual. I hadn't installed any updates recently, and I'd been using the machine just last night. But this morning when I typed in my password at the login screen and hit Enter<!--break-->, nothing happened, and the entire GUI became unresponsive. I could move my cursor and click on things, but to no effect.

I hit Ctrl-Alt-F1 to switch TTY and was able to log in via the terminal. My first instinct was to check for updates in case an automatically-installed security update had broken something, so I was alarmed when `sudo apt update` reported not being able to connect to the ubuntu repos. I checked my internet connection by running `ping 8.8.8.8`, and when that failed to connect as well, I realised I was not, in fact, connected to the wifi.

Googling things is awkward when you have neither a working GUI nor a working internet connection. Fortunately, my partner volunteered to look up my questions on their own laptop, and after a few false starts I finally located the correct command to connect to the internet: `nmcli device connect --ask wlp4s0`. This prompted me for the wifi password, and got my internet connection up and running. I installed the available updates via `apt` , then rebooted and tried to login again via the GUI...and once more the login screen became unresponsive.

At this point I was beginning to panic. My partner had been googling the issue, but none of the forum posts we found were describing quite the same problem as I was experiencing. People were talking about custom theme breakages, NVIDIA driver issues or power management problems, none of which were relevant to me (I don't use a custom theme, I've never had power management issues on this particular laptop, and I've disabled my NVIDIA card completely).

Before investigating further, I thought it would be a good idea to make a backup onto my external hard drive, as I was starting to get paranoid. In order to do this, I had to learn how to manually mount the drive. This required first finding the ID of the drive, which I did by comparing the list of mounted devices (`df -h`) with the list of available devices (`sudo fdisk -l`). I knew that whichever device appeared in the second list and not in the first was my external hard drive. In my case this was `sdc1`.

I then had to create a directory for the hard drive to be mounted to. I chose `/media/dbaker/wd-elements` as this is where it would normally be mounted automatically. Then I ran `sudo mount /dev/sdc1 /media/dbaker/wd-elements`. When I ran `ls` inside the folder I'd created, I saw the files from my hard drive. Easy! (To unmount the disk, which I later had to do before unplugging it, I ran `sudo umount /dev/sdc1` then deleted the `/media/dbaker/wd-elements` directory).

I have a backup script I run periodically that uses rsync to backup my files. It takes a while, so I went away and let it run. When I returned, I saw that it had finished with a message saying that some files failed to be synced - "see errors above". Unfortunately you can't scroll in a command-line TTY, and the errors referred to were long since lost in the large amount of output. So I ran the script again, knowing that only the failed files would attempt to sync this time and I would therefore easily be able to tell what went wrong.

One file attempted and failed to sync: `~/.Xauthority`.

I'd briefly seen this file mentioned in one of the forum posts I found while trying to work out what was wrong with my login screen. I hadn't understood what it was for and thought it wasn't relevant to me, but now I wasn't sure. I googled it again on my partner's laptop and learnt that Xauthority stores a cookie used to authenticate the user session.

BOOM.

I made a backup of the `Xauthority` file, then deleted the original and rebooted. When I reached the login screen, for a moment I had a horrible sinking feeling that it would freeze again, but when I typed my password and hit enter - voila! There was my desktop, in all its GUI glory.

So the question remains: what went wrong? Well, I can only make a guess, but here's what I think.

Last night, I'd been using my laptop without the power cable plugged in. That's what laptops are for, after all. I decided to leave it unplugged over night, knowing full well that in the morning I'd have to plug it back in before I could boot it. This is an unfortunate fact of running Linux on a machine designed for Windows: the power management is so poor that the battery depletes rapidly to 0% even while the machine is asleep. But I like to occasionally do this to prolong the life of the battery.

As I mentioned before, power management on Linux is not very sophisticated. I'd like to think that when the battery charge reaches a critical level, the system does a cleanup before shutting down, but honestly I don't know WHAT it does. My guess is that when my poor laptop, its battery depleted, shut down in the early hours of the morning, it may have saved the `~/.Xauthority` file in a corrupted state. Without a valid cookie, it couldn't authenticate the session and clearly the login screen GUI was not designed to handle this particular error case. I'm guessing it also relied on an authenticated session to gain access to the saved wifi password, hence my lack of internet connection when I logged in via the terminal.

TL;DR: keep your Linux laptops plugged into the power supply, kids.
 
