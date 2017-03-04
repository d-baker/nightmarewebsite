---
layout: post
title: "git+GitHub: a primer, Chapter 1"
date: 2016-10-22
tags:
- git
- github
---
I've decided to start a series of tutorials on using git and GitHub in the hope it will help a complete newcomer to the topic, and also further my own understanding. Git is a very powerful <!--break--> tool and I myself only know how to use a small subset of its capabilities, but even as I write this tutorial I'm learning cool new things about it!

In this chapter, I introduce the basics of creating a git repository, making some commits and reverting changes. This tutorial assumes familiarity with the command line, but only enough that you can open a terminal and run the commands you're told to run. Please note that I use angle brackets < > to indicate text that should be replaced by something of your choosing (don't type the angle brackets).

## What is version control?
Version control is a way of making snapshots of the state of some files at a particular time, and managing those snapshots. Well, really it's a lot more complex than that, but for the purposes of this tutorial, the snapshot explanation will do.

Consider the following scenario.

1. You write some code. It works.
2. You decide to implement a new feature. Suddenly the code doesn't work, and you can't figure out why. You want to go back to the working version and try again from scratch.
3. You don't know what you changed and you don't have a backup of the working version! Oh no!

Here's how that scenario might play out if you were using version control:

1. You write some code. It works.
2. You make a *commit*, which is a sort of snapshot of the state of your files. You give the commit a *commit message*, for example "it works".
3. You make a change that breaks things, and you want to go back. Easy - you just *revert* to the "it works" commit, and all your code is back to how it was before you broke things.

There is much more you can do with version control (in particular, collaborating on a project with others), but in my day-to-day usage this kind of break-things-and-revert functionality is what I find myself using most often. So I'm going to start by guiding you through how to do that.

## What are git and GitHub?
git is a *version control system*. It's a piece of software you can download that allows you to do things like I described above.

GitHub is not the same thing as git, although people often think it is. GitHub is a website that provides three things:

- A sort of graphical interface to the git version control system
- A platform for publicly sharing your git repositories so that other people can view, download and collaborate on them
- A way to sync your project across multiple machines

I won't be saying any more about GitHub until the next chapter, but it's good to understand what it is.

## Using git on the command line
First you need to install git. This is just like installing any software and it's not the aim of this post to explain how to do it, so I'll leave that to you to figure out.

Once git is installed, open up a terminal. Now we can get started.

### Initialising a repo
Create a directory which will become your git *repository*. A repository (often shortened to "repo") is a folder that contains a version-controlled project. Anything you do inside the repository can be managed using git. 

In the terminal, `cd` into the directory you just created:

    cd <your directory>

Then type `git init`. This will perform the necessary setup to allow git to manage the files in the directory. 

### Configuring git
When you first start using git, you need to provide it a name and email address which are used to identify you as the author of changes (this will make more sense once you learn about collaborating using git).

Keep in mind that if you publish your project to GitHub at some point, the name and email you set will be public. Git allows you to use a fake email address like foo@example.com.

To set the name and email that will be used by git to identify you, run the following:

    git config --global user.name "<your name>"
    git config --global user.email <your email>

<aside>
<p>The <code>--global</code> flag makes these details the default. If you want to set different details for a specific project, you can change the name and email attached to that project by running the commands again without the <code>--global</code> flag while inside the project directory.</p>
</aside>

You might also want to configure the text editor git will automatically open when you need to type a message (not relevant to this tutorial, but may be in the future). If you don't set one yourself, git will use the default text editor for your operating system.
There are some cross-platform complexities to setting a text editor, so I refer you to this [this article](https://git-scm.com/book/en/v2/Getting-Started-First-Time-git-Setup#Your-Editor).


### File states in git

Before going on, it's important to understand a few different ways files are understood by git.

- *Tracked* files are files which git is tracking changes to. If a file is tracked, git monitors every change you make to it, and you can choose to commit those changes.
- *Untracked* files are visible to git, but changes to them are not monitored. When you initialise a git repo, all files are untracked. You have to track them manually, which I'll explain how to do later.
- *Ignored* files are essentially invisible to git. To ignore files, you must create a text file called .gitignore and add the names of the files (or directories) you want git to ignore. It's a good idea to put things like java .class files in the .gitignore, as you don't care about changes to them and they just clutter up your view when you ask git to show you the status of your project (more on that later).
- *Staged* files are included in a commit, whereas unstaged files are not. Files are only staged when you tell git to stage them. This is so you can choose what changes to commit; you could stage one tracked file and commit it while leaving another tracked file to be committed separately.


### Tracking and staging a file
Now, create a file in your newly-initialised git repository. A simple text file full of nonsense will do. Save the file, then type `git status` in the terminal.

This command tells you the current status of your repository - what files are there, what ones have changed or been added or deleted since the last commit, what ones are staged, and what ones are untracked. You should see something along the lines of `Untracked files: <yourfilename>`.

git knows your file is there, but it isn't tracking changes to it yet. To get git to track the file, type `git add <filename>`. Now when you run `git status`, you should see something along the lines of `changes to be committed: new file: <filename>`.

git has done two things here. It has *tracked* your file so it will now monitor changes to the file, and it has also *staged* it, which means that the file will be included in a commit if you make one.

<aside>
<p>
To track and stage all files in your project: <code>git add -a</code>
<br/>
...or all files ending with a particular extension:
<code>git add *.&lt;extension&gt;</code>
</p>
<p>
To untrack a file that is being tracked: <code>git rm --cached &lt;filename&gt;</code>
</p>
</aside>

Now open your file again and make some changes to it. After saving the file file, when you run `git status` you should see something like `Changes not staged for commit: modified: <filename>`.

git has noticed the file has changed, but it doesn't automatically stage the changes, meaning that if you make a commit now, the older, unmodified version of the file will be committed instead. 

Why do this? Well, maybe you decide you don't want to commit those changes. git is giving you the option of whether or not to make your changes part of the next commit (you could always commit them in a later commit - the changes won't go away!).

### Making a commit

For now, we want to commit the changes. To do this, run `git commit -a -m "my first commit"`.

The `-a` flag tells git to include ALL the tracked files in the commit by staging them, which is often what you want to do and saves you the trouble of typing out `git add` again.

The `-m` allows you to supply a commit message, which in this case is "my first commit".

A commit message should tell you what changes have been introduced in a particular commit, and "my first commit" isn't a very descriptive one. For an excellent discussion of how to write useful commit messages, I strongly recommend [this article](http://chris.beams.io/posts/git-commit/).

What if you had wanted to commit just the original version of the file, not the changed version? Just run `git commit -m "commit message"`. This just commits whatever files are already staged.

You can also use wildcards to stage files with particular file extensions, which can be handy. For example, maybe you're working on a website and only want to commit html files:

    git add *.html

The asterisk means "any character" so you're essentially telling git to stage any file that ends with .html.

## Viewing commit history
Now that we've made a commit, let's check that it worked.

Run `git log`. This displays a list of every commit you've made in the repo. We only have one at the moment, but when you have a lot of commits you'll need to scroll to see them all. You can do this using the arrow keys. To exit a large log like this, hit `q`.

The commit's identifier is the ugly string of numbers and letters at the top. You might need this later.

### Examining what has changed

If you make some changes to your file now, then run `git diff`, git will show you what has changed since the last commit. Additions have a `+` symbol next to them and are shown in green; deletions have a `-` symbol and are shown in red.

If the output is lengthy you can scroll through it with the arrow keys and exit by hitting `q`.

`git diff` is really handy if you can't remember what you've changed and need to write a descriptive commit message.

<aside>
<p>To view the difference between the current project state and a previous commit:</p>
<code>git diff &lt;commit id&gt;</code>
<p>To view the difference between two commits:</p>
<code>git diff &lt;commit id 1&gt; &lt;commit id 2&gt;</code>
<br/>
</aside>

### Reverting uncommitted changes

Often when I'm writing code, I'll make some changes without committing them, then decide I want to revert to the version I had at the time of the last commit. 

You can do this by running `git stash`, which temporarily discards your changes. You can get them back again if you want, by running `git stash pop`. 

As with most things git-related, this can get complicated. I found [this great Stack Overflow article](http://stackoverflow.com/questions/19003009/git-how-to-recover-stashed-uncommitted-changes) which provides very comprehensive advice for dealing with tricky situations that might arise when using `git stash`. It's way too advanced for this tutorial, but a good one to bookmark for later.

### Reverting to a previous commit

`git stash` is great if you just want to discard changes made SINCE the last commit - but sometimes you might want to discard changes that have been committed. In that case, you have to do something different.

To practise this, make some more changes to your file and create another commit. Now run `git log` to list your commits. If this is the second commit you've made, you should see 2 commits listed.

Now we want to get your file back to the state it was in when you made the FIRST commit. 

To do this, copy the the commit identifier for the first commit. The commit identifier is the long string of numbers and letters following the word "commit" at the top of each entry in the commit log. Newer commits appear at the top of the list, so the one you're looking for is the last one.

Now run:

    git reset --hard <commit identifier>

This PERMANENTLY deletes all the changes made since the commit specified by `<commit identifier>`, reverting your project to the state it was in at the time the specified commit was made.

Be very careful when reverting to a previous commit in this way - you need to be absolutely sure, as you can't get back the changes you reverted!

### Wrap up

That's it for this tutorial. In the next instalment, I plan to cover using GitHub to synchronise and share your project.
