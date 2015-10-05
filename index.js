/**
 * This is the entry point for the NodeJS application
 */

if ( console && console.log ) {
  console.log(
    'Space Beat 3\n' +
    'Copyright Mantaray AR LLC 2015\n'
  );
}

// TODO create an instance of the game
// var temp = require( __core + 'game' );
// temp.init();
var game = require( './src/game/init' );
game();