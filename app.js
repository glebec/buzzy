var stdin = process.stdin,
    locked = false;

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

process.stdout.write('\033c'); // clear
console.log('WELCOME to the fancy ¡nterƒeud! lockout buzzer system!\n');

function clear () { process.stdout.write('\033c'); }
function beep () { process.stdout.write('\x07'); };

stdin.on('data', function(key) {
  switch (key) {
    case '\u0003': process.exit(0); break; // ctrl+c
    case '\u001B': // esc
      clear();
      console.log('Ready…');
      locked = false;
      break;
    default:
      if (locked) break;
      beep();
      clear();
      console.log('THE WINNER IS: ' + key);
      locked = true;
  }
});
