var SmallEnemyHandler  = require( 'game/handlers/small-enemy-handler' );
var MediumEnemyHandler = require( 'game/handlers/medium-enemy-handler' );
var LargeEnemyHandler  = require( 'game/handlers/large-enemy-handler' );

function EnemyHandler( game ) {
  var _numberOfLargeEnemies = 0;
  
  var _smallEnemyHandler  = new SmallEnemyHandler( game );
  var _mediumEnemyHandler = new MediumEnemyHandler( game );
  var _largeEnemyHandler  = new LargeEnemyHandler( game );

  var update = function () {
    _smallEnemyHandler.update();
    _mediumEnemyHandler.update();
    _largeEnemyHandler.update();
  };

  var render = function () {
    _smallEnemyHandler.render();
    _mediumEnemyHandler.render();
    _largeEnemyHandler.render();
  }

  return {
    update : update,
    render : render
  }
}

module.exports = EnemyHandler;