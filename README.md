Wordcast
========

A real-time captioning service over Google Chrome and Socket.IO.

## Installation

Project is in beta. If you find any issues or have any feedback, open an issue.

* `git clone git@github.com:a11yproject/Wordcast.git` or download the project
* `cd path/to/Wordcast`
* `npm install` the required modules
* `npm install -g grunt-cli` if you don't already have it
* `grunt` to build the app
* `node server.js` to run the app
* Open `http://localhost:3000` in two different browser windows. Chrome 25+ required to broadcast.
* To broadcast in a room, use the `?viewMode=broadcast` param on the end of your room URL.

## Contributing

If you'd like to help, fork the repo and make a pull request! To start working on things, simply:

    $ grunt dev

This will automate the build process, so you don't have to `grunt` everytime you make a change :)
