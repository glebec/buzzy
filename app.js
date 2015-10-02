var locked = false,
    noWords = /\W/,
    version = require('./package.json').version;

function clear () { process.stdout.write('\033c'); }
function beep () { process.stdout.write('\x07'); };

process.stdin.setRawMode(true);
process.stdin.setEncoding('utf8');

clear();
console.log('Fancy lockout buzzer version', version);

process.stdin.on('data', function(key) {
  switch (key) {
    case '\u0003': process.exit(0); break; // ctrl+c
    case '\u001B': // esc
      clear();
      console.log('Ready…');
      locked = false;
      break;
    default:
      if (locked || noWords.test(key)) break;
      beep();
      clear();
      console.log('THE WINNER IS: ' + key);
      locked = true;
  }
});
