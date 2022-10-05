#!/usr/bin/env osascript -l JavaScript

function run([argv = 'a']) {
    const App = Application.currentApplication();
    App.includeStandardAdditions = true;
  
    const $path = (...segments) => segments.join('/').replace(/\s/g, '\\ ');
    const PWD = $path(
      App.systemAttribute('alfred_preferences'),
      'workflows',
      App.systemAttribute('alfred_workflow_uid'),
    );
  
    const NON_PRINTABLE = [
      ['NUL', 'Null'],
      ['SOH', 'Start of Heading'],
      ['STX', 'Start of Text'],
      ['ETX', 'End of Text'],
      ['EOT', 'End of Transmission'],
      ['ENQ', 'Enquiry'],
      ['ACK', 'Acknowledge'],
      ['BEL', 'Bell'],
      ['BS', 'Backspace'],
      ['TAB', 'Horizontal Tab'],
      ['LF', 'Line Feed'],
      ['VT', 'Vertical Tab'],
      ['FF', 'Form Feed'],
      ['CR', 'Carriage Return'],
      ['SO', 'Shift Out'],
      ['SI', 'Shift In'],
      ['DLE', 'Data Link Escape'],
      ['DC1', 'Device Control 1'],
      ['DC2', 'Device Control 2'],
      ['DC3', 'Device Control 3'],
      ['DC4', 'Device Control 4'],
      ['NAK', 'Negative Acknowledge'],
      ['SYN', 'Synchronous Idle'],
      ['ETB', 'End of Transmission Block'],
      ['CAN', 'Cancel'],
      ['EM', 'End of Medium'],
      ['SUB', ' Substitute'],
      ['ESC', 'Escape'],
      ['FS', 'File Separator'],
      ['GS', 'Group Separator'],
      ['RS', 'Record Separator'],
      ['US', 'Unit Separator'],
    ];
  
    const SPECIAL_ICONS = {
      ESC: 'arrow-up-left-from-circle',
      DEL: 'delete-right',
      BS: 'delete-left',
      NUL: 'empty-set',
      TAB: 'right-to-line',
      BEL: 'bell',
      VT: 'up-to-line',
      LF: 'turn-down-right',
      CR: 'turn-down-left',
    };
  
    return JSON.stringify({
      items: NON_PRINTABLE.map(([char, desc]) => ({ char, desc }))
        .concat(
          [...new Array(127 - 32)]
            .map((_, i) => `${String.fromCharCode(i + 32)}`)
            .map((char) => ({ char, desc: char })),
        )
        .map(({ char, desc }, i) => ({
          title: char,
          subtitle: `${i} | ${desc}`,
          match: `${char} ${desc}`,
          arg: i,
          icon: {
            path: $path(
              PWD,
              `${
                char in SPECIAL_ICONS
                  ? SPECIAL_ICONS[char]
                  : i < 32
                  ? 'square-terminal'
                  : 'font-case'
              }.png`,
            ),
          },
          valid: true,
        })),
    });
  }
  