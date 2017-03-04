---
layout: post
title: "Dual-booting Linux on a HP Pavilion Gaming Laptop: a horror story"
date: 2016-10-13
tags:
- linux
- sysadmin
- ubuntu
- kubuntu
- kde
---
In April this year, I got my first Windows laptop and the nicest piece of hardware I've ever owned.

I needed Windows for uni, but I wasn't going to settle for only ever using ~that horrible operating system~ on what amounted to my dream computer. So, being a Linux geek, I decided to <!--break--> dual-boot it.

I had never done this before, and the experience (which was, and is, ongoing) proved to be simultaneously the most educational and most horrifying technological adventure I've had yet.

I was originally going to write about the dual-booting process from beginning to end, but it became way too convoluted and messy. So instead, I've chosen to address the major issues I experienced that couldn't be answered by a simple google search, and present them in a format that will hopefully help others who may encounter the same problems.

## The hardware
A HP Pavilion gaming notebook:

- 2TB HD
- 15 inch display with touchscreen
- 8GB RAM
- Intel i7-6700HQ Skylake CPU
- NVIDIA GeForce GTX 950m GPU
- Realtek RTL8723BE wireless network adapter
- Windows 10 preinstalled

## The goal
Install Kubuntu 15.10 [the latest version at the time] on one half of my hard drive and keep Windows 10 on the other half, and be able to choose which OS to boot into on startup. Simple, right?

## The nightmares

### Reluctant Imation drive
The first step in dual-booting an OS is to create a bootable installation medium of some kind, most commonly a USB drive. Having downloaded the Kubuntu 15.10 ISO, I set about following [this tutorial](http://www.everydaylinuxuser.com/2015/11/how-to-create-ubuntu-1510-usb-drive.html) to create a bootable USB from within Windows and start up from it.

Unfortunately, I wasted a lot of time on this simple step because I wasn't aware that the brand of USB drive I was trying to use - Imation - didn't allow for the creation of a bootable partition. Not knowing what was wrong, I changed too many Windows boot settings to remember, before finding a forum post explaining that Imation drives aren't bootable.

One person said they'd had success with a Verbatim drive, and luckily I had one of those lying around. After installing the ISO on it with Win32 Disk Manager, I was able to boot from that drive just fine.

[Footnote: as of a recent Windows 10 update, the technique of holding down Shift during restart to get the advanced boot options no longer seems to work. The only way I can find to access boot options now is to go into system settings > advanced startup options > restart now.]

### Power management gone AWOL

#### The symptoms
Brightness keys don't do anything. "Battery and Brightness" menu in the system tray says "No keyboard or screen brightness controls available". Automatic screen-dimming to save power doesn't happen. 

After putting the computer to sleep (via Suspend in the app launcher or by shutting the lid), opening the lid or hitting the space bar to wake it leads to the fan spinning up and the screen remaining black.

Additionally, desktop effects and blur in the Plasma desktop don't work - seems to point to something graphics-driver-related.

#### The fix
This was, by far, the most frustrating issue I experienced. When I had Kubuntu 15.10 (and later, after an update, 16.04) installed, I thought it was a graphics driver issue. I kept trying to install the proprietary NVIDIA drivers, leading to a lot of rescues from tty1 as I completely lost my graphical environment every time I installed them.

Eventually (it took me way too long) I realised the Intel integrated graphics should be able to provide power management just fine. There was no reason why I'd need to use the NVIDIA GPU to get that.

I never solved this problem. I just switched to a different OS, doing a fresh install of KDE Neon User Edition. I've never had issues with power management since. My best guess would be that there's actually a bug in the Intel integrated graphics driver in Kubuntu, which has been fixed in KDE Neon. But who knows.

:(

### Very flaky wifi

#### The symptoms
In Kubuntu, wifi may take several attempts to connect on boot, or never connect at all (behavior is somewhat random). Once connected, connection speed is very low and drops to 0kbps after a minute or so. Connection is slightly more reliable if computer is more or less on top of the router.

In KDE Neon, connection speed no longer drops to 0 randomly, but may be very slow. Wifi signal is so weak that it disconnects if you move a few meters away from the router, and neighbouring networks don't show up at all.

#### The fix
* If you don't already have them, install these required packages:

~~~
    build-essential
    git
~~~

* Clone [this repository](https://github.com/lwfinger/rtlwifi_new).
* `cd` into the newly cloned directory
* Execute the following commands:

~~~
    git checkout rock.new_btcoex
    make
    sudo make install
    sudo modprobe -rv rtl8723be
    sudo modprobe -v rtl8723be ant_sel=1
~~~

* The last two commands will have disabled and then re-enabled your wifi. After executing them, hopefully you have much better signal strength and can see and connect to routers more than a meter or so away from your laptop. If not, try executing the last two commands again but changing `ant_sel=1` to `ant_sel=2`.

* Once you've found the `ant_sel` option that works, you'll want to save this setting permanently. To dot this, open (as root) the file `/etc/default/grub` in the text editor of your choice and add the following to the bootline (the text in quotes following `GRUB_CMDLINE_LINUX_DEFAULT`):

~~~
rtl8723be.ant_sel=<the number you chose>
~~~

Then save and close the file, and run `sudo update-grub` to update the configuration. Next time you boot, the wifi should work without you having to do anything.

I got this information [here](https://github.com/lwfinger/rtlwifi_new/issues/28), where you will also find an explanation of why there is a problem in the first place - something to do with antennae on the wifi card, I don't really understand it. I think it's enough to know that there are two antennae you can choose from, the number you assign to `ant_sel` is the antennae number, and one of them will receive stronger wifi signal than the other.

N.B. Even after taking the steps outlined above, I still get very occasional wifi problems where the signal becomes weak or drops out altogether. Unloading and reloading the driver, as described earlier, fixes it. To make it easier to reload the driver when needed, I added the following line to my .bashrc:

~~~
alias fixwifi="sudo modprobe -rv rtl8723be && sudo modprobe -i rtl8723be ant_sel=1"
~~~

With this alias, I can simply type `fixwifi` in the terminal, supply my password and the driver will be reloaded. I've found this to be a pretty reliable hack.

### PCIe error flooding

#### The symptoms
Disk usage grows by a gigabyte an hour; hard disk makes constant creaking noises due to never-ending I/O; idle CPU usage is higher than one would expect.

During boot, the screen is flooded with error messages [like this](http://askubuntu.com/questions/771899/pcie-bus-error-severity-corrected).

Closer inspection reveals systemd-journald to be using the most CPU.

kern.log and syslog in /var/log are gigabytes in size, and contain hundreds of the above error messages being logged every second.

#### The fix
This problem is due to a [bug in the Linux kernel](https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1521173) related to the Realtek wifi card. It isn't actually anything to worry about, except for the resources it uses up logging the error. So we just want to disable the logging.

For Kubuntu 15.10, I added `pci=noaer` to the boot line. That disables "advanced error reporting" for PCI devices. The disadvantage is that is disables *all* advanced error reporting for *all* PCI devices, so if some device other than the wifi card has a genuine problem, no errors will be logged for it and it'll go unnoticed.

For KDE Neon, `pci=noaer` had no effect. Instead, I had to do the following:

1. Install `systemd-ui` and `kde-config-systemd`.
2. Open System Settings; there is now a "system administration" section at the bottom with an item called "Systemd". Go into this.
3. Locate the "unit" which is generating the errors. I found mine by searching for "wlo". Yours might be called something different, but it will probably have `pci`, `net` and `wl<letter>` somewhere in the unit name.
4. Select the desired unit, then click on the "conf" tab.
5. Change the value of `DefaultStandardOutput` to `null`.

Please note that this technique only works if your OS uses systemd. It is however preferable to the `noaer` option, as it disables error logging *only* for the specific device you choose.

[Here is the thread](https://www.kubuntuforums.net/showthread.php?70899-logs-filling-up-with-PCIe-bus-errors-can-t-disable) where someone helped me find the systemd solution.

### Impatient audio

#### The symptoms
In Kubuntu 16.04, audio (played back from any source) occasionally, randomly, and very briefly becomes garbled; the sound is similar to fast-forwarding a tape.

In KDE Neon, the same thing happens but the glitch is subtler and sounds more like clicking or stuttering.

#### The fix
1. As root, open `/etc/pulse/default.pa` in your preferred text editor.
2. Locate the line that says `load-module module-udev-detect`
3. Change this line to `load-module module-udev-detect tsched=0`, save and close the file.
4. Restart PulseAudio using `pulseaudio -k`

[Credit where credit is due](https://ubuntuforums.org/showthread.php?t=1860112&p=11431109#post11431109).

### Flighty desktop configuration

#### The symptoms
Plasma desktop customisations, such as wallpaper, widgets, icon placement and desktop toolbox visibility, are reset to their defaults after reboot. Sometimes certain settings are randomly kept. I can identify no pattern to the behavior at all. It's impossible to precisely reproduce.

I have only experienced this issue in KDE Neon User Edition. I have the Stable Developer Edition installed on another machine and it also had this bug initially, but it now seems to have gone away, for no obvious reason. Maybe it's fixed in a very recent update?

#### The fix
<del>None yet! Watch this space.</del>

This issue appears to have been fixed in an update.
