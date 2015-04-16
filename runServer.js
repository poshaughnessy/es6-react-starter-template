/**
* To run the server on the command line or on your hosting provider.
*/

/**
 * Enable ES6 - this will make it automatically transpile required files. See: http://babeljs.io/docs/usage/require/
 * I've left this as runtime transpilation for now just for simplicity, but a real app should perform this as a build
 * step for performance.
 *
 * NB. Heroku supports some ES6 language features through the --harmony flag, but only a subset. See:
 * https://devcenter.heroku.com/articles/node-best-practices#try-new-things
 */
require('babel/register');

var server = require('./server');

server.start();
