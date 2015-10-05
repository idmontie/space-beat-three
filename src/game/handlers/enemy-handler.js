var SmallEnemyHandler = require( 'game/handlers/small-enemy-handler' );
var MediumEnemyHandler = require( 'game/handlers/medium-enemy-handler' );

function EnemyHandler( game ) {
  var _numberOfLargeEnemies = 0;
  
  var _smallEnemyHandler  = new SmallEnemyHandler( game );
  var _mediumEnemyHandler = new MediumEnemyHandler( game );

  var update = function () {
    _smallEnemyHandler.update();
    _mediumEnemyHandler.update();
  };

  return {
    update : update
  }
}

module.exports = EnemyHandler;