# Buzzy

[![Greenkeeper badge](https://badges.greenkeeper.io/glebec/buzzy.svg)](https://greenkeeper.io/)

## A minimal buzzer app for quiz shows

Buzzy provides a bare-bones lockout buzzer keypress system for home-brewed quiz shows.

### Installation

```sh
git clone [this repo link]
cd buzzy
npm install
```

### Usage

```sh
node app
```

Press any alphanumeric key (A–Z, a–z, 0–9) to buzz in. First hit wins.

* `ESC`: reset the buzzer and allow a new winner
* `CTRL+C`: quit Buzzy

### Advanced

Buzzy also works with HTTP POST requests containing a url-encoded or JSON body with a `name` field set to any string. The app is served on port 1337 of your IP address.
