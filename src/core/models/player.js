var settings = require( 'core/settings' );

function Player() {
  var health      = settings.player.health;
  var maxSpeed    = settings.player.maxSpeed;
  var boostSpeed  = 240;
  var boostFrames = 1;

  return {
    health: health,
    maxSpeed: maxSpeed,
    boostSpeed: boostSpeed,
    boostFrames: boostFrames
  };
};

module.exports = Player;