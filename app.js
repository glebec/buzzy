var stdin = process.stdin,
    locked = false;

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

process.stdout.write('\033c'); // clear
console.log('WELCOME to the fancy ¡nterƒeud! lockout buzzer system!\n');

stdin.on('data', function(key) {
  // ctrl-c ( end of text )
  if (key === '\u0003') {
    process.exit();
  }
  // lockout buzzer
  if (!locked) {
    process.stdout.write('\x07'); // beep
    process.stdout.write('\033c'); // clear
    console.log('THE WINNER IS: ' + key);
  }
  locked = true;
  // reset on escape key
  if (key === '\u001B') {
    process.stdout.write('\033c'); // clear
    console.log('Ready…');
    locked = false;
  }
});
