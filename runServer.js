/**
* To run the server on the command line or on your hosting provider.
*/

/**
 * Enable ES6 - this will make it automatically transpile required files. See: http://babeljs.io/docs/usage/require/
 * I've left this as runtime transpilation for now just for simplicity, but a real app should perform this as a build
 * step for performance - or ideally use native support. My newer template uses native support in io.js, which is
 * ahead of node.js for ES6:
 * https://github.com/poshaughnessy/es6-react-jspm-starter-template
 */
require('babel/register');

var server = require('./server');

server.start();
