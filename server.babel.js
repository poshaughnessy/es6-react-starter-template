/**
 * CURRENTLY UNUSED
 * Just getting this ready for Gulp v0.4 which will support ES6:
 * https://github.com/gulpjs/gulp/issues/830
 * I'll also need to update package.json to run server with these flags:
 * node --harmony --use_strict --harmony_generators server.js
 */
const express = require('express'),
      PORT = process.env.PORT || 8000;

export class Server {

    constructor() {
        this.app = express();
    }

    startExpress() {

        this.app.use(express.static(__dirname));

        this.app.get('/', function(req, res) {
            res.sendFile(__dirname + '/index.html');
        });

        this.app.listen(PORT);

        console.log('Started server on port', PORT);

    }

}

/**
 * Command line usage: see package.json scripts.start.
 */
if( process.argv[2] === 'run' ) {

    let server = new Server();
    server.startExpress();

}
