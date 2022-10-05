#!/usr/bin/env osascript -l JavaScript

function run([argv = 97]) {
    const App = Application.currentApplication();
    App.includeStandardAdditions = true;
  
    if (!argv) return;
  
    App.setTheClipboardTo(String.fromCharCode(argv));
    App.doShellScript(`afplay /System/Library/Sounds/Funk.aiff`);
  }