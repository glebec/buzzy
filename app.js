var version = require('./package.json').version,
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    locked = false,
    winner = null,
    noWords = /\W/;

process.stdin.setRawMode(true);
process.stdin.setEncoding('utf8');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function clear () { process.stdout.write('\033c'); }
function beep () { process.stdout.write('\x07'); };

// keyboard entry
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
      winner = String(key);
  }
});

// HTTP POST entry
app.post('/', function(req, res){
  if (!req.body.name) return res.status(400).send('`name` body field required');
  if (locked) return res.send('Sorry, ' + winner + ' was faster.');
  locked = true;
  winner = req.body.name;
  beep();
  clear();
  console.log('THE WINNER IS: ', req.body.name);
  res.send('YOU ARE THE WINNER!');
});

// initialize
clear();
console.log('Fancy lockout buzzer version', version);

app.listen(1337, function () {
  console.log('Listening on 1337');
});
