---
layout: post
title:  "vim plugins"
date:   2016-5-8
tags:
- vim
---
As a vim nerd, one of my favorite things to do is find out ways to make vim more useful. vim is an incredibly powerful text editor, but without any bells and whistles it can feel lacking in  <!--break--> the convenience provided by IDEs and text editors like Sublime Text.

Without further ado, here are some plugins that make vim even more fun than an IDE.


## [vim-rsi](https://github.com/tpope/vim-rsi)
adds some convenient, familiar keybindings to vim, like `ctrl-a` and `ctrl-e` to skip to the beginning and end of a line, respectively.


## [vim-commentary](https://github.com/tpope/vim-commentary)
provides handy keybindings for commenting out code. For example, select the code you want to comment out in visual mode, then type `gc`.


## [neocomplcache](https://github.com/Shougo/neocomplcache.vim)
is a great autocompletion plugin for vim. It has filepath autocompletion, which is one of my favorite features. __Note: this plugin has been superseded by [neocomplete](https://github.com/Shougo/neocomplete.vim), which is essentially the same but requires vim to be compiled with Lua support. [This section](https://github.com/Shougo/neocomplete.vim#requirements) of the readme explains how to check if your vim satisfies this dependancy.__


## [vim-multiple-cursors](https://github.com/terryma/vim-multiple-cursors)
provides multiline text editing similar to that in Sublime Text. I don't know how I ever lived without this plugin. Changing variable names is so much easier!

Note that if you are using `vim-multiple-cursors` alongside `neocomplete`, you need to add the following to your `.vimrc` to prevent conflict:

    " Called once right before you start selecting multiple cursors
    function! Multiple_cursors_before()
      if exists(':NeoCompleteLock')==2
        exe 'NeoCompleteLock'
      endif
    endfunction
    " Called once only when the multiple selection is canceled (default <Esc>)
    function! Multiple_cursors_after()
      if exists(':NeoCompleteUnlock')==2
        exe 'NeoCompleteUnlock'
      endif
    endfunction


## [gitgutter](https://github.com/airblade/vim-gitgutter)
shows change/deletion/addition markers (like those shown by `git diff`) down the side of a file tracked by git. It gives me a lot of peace of mind when I can see exactly what I've changed since the last commit, while I'm working on the code.

GitGutter can color-code the actual lines of text to show changes as well as using markers in the sign column. In my .vimrc I decided to make a mapping for enabling this. I also shortened the delay between making a change and it being marked by the plugin.

	GitGutterEnable
 	" delay before showing signs
	setlocal updatetime=250
 	" mapping for color-coded lines
	nnoremap <Leader>l :GitGutterLineHighlightsEnable<CR>


## [vim-script-runner](https://github.com/ironcamel/vim-script-runner)
runs code written in various scripting languages at the tap of a key, and shows the output in a split window. I have wanted something like this for a long time, as one of the main reasons I will sometimes opt to use Sublime Text instead of vim is the ease of running code during testing.

The only configuration I'm using so far is remapping the script runner key to something more like Sublime Text:

	let g:script_runner_key = '<Leader>b'


## [vim-airline](https://github.com/vim-airline/vim-airline)
is a pretty status line for vim, providing (among many other more exciting things which I haven't tried yet) trailing whitespace warnings, file modification indicators, a vast array of color themes (I went through every single one to find my favorite), and addition/deletion/change counts...oh, and don't forget the color-coded editing modes, which save many an accidental insertion. Another "how did I ever live without this" plugin.

Not much config needed for basic use:

	set laststatus=2 " always show the status line
	let g:airline_theme = 'luna' " my choice of theme


## [nerdtree](https://github.com/scrooloose/nerdtree)
provides a nicer alternative to vim's `explore` function. I've only been using it for a few hours and I'm already in love with it! I've added the following mapping to open the directory tree:

    map <Leader>d NERDtree<CR>


## [syntastic](https://github.com/scrooloose/syntastic)
automatically checks syntax every time you save a file (or only on demand, if configured to do so) and integrates with vim-airline so you get syntax errors pointed out to you in the status line.

The recommended configuration for this plugin shows a list of errors AND warnings in a split window, along with the status line marker, symbols in the sign column, and markers in the actual text itself.
I opted for a more minimal config - the following only displays errors, not warnings, and doesn't show the split window error list:

	let statusline+=%{SyntasticStatuslineFlag()}
	let g:syntastic_quiet_messages={'level':'warnings'}
	set statusline+=%*

	let g:syntastic_always_populate_loc_list = 0
	let g:syntastic_auto_loc_list = 0
	let g:syntastic_check_on_open = 1
	let g:syntastic_check_on_wq = 0

_Update: After using syntastic for a short time I ended up disabling it because it slowed down vim so much, eventually crashing it completely._
