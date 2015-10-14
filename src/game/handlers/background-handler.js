var settings        = require( 'core/settings' );
var SpriteGenerator = require( 'game/generators/sprite-generator' );

function BackgroundHandler( game ) {
  var _speed       = settings.background.speed;
  var _backgrounds = [];

  SpriteGenerator.add( function () {
    _backgrounds.push( game.add.tileSprite( 0, 0, settings.size.width, settings.size.height, 'background2' ) );
    _backgrounds.push( game.add.tileSprite( 0, 0, settings.size.width, settings.size.height, 'background1' ) );
    _backgrounds.push( game.add.tileSprite( 0, 0, settings.size.width, settings.size.height, 'background0' ) );
  }, function () {
    _.each( _backgrounds, function ( background ) {
      background.destroy();
    });
  }, 0 );

  /**
   * Scroll the background
   */
  var update = function () {
    _.each( _backgrounds, function( b, i ) {
      b.tilePosition.y += (i + 1) * _speed;
    } );
  }

  /**
   * Set the speed
   */
  var setSpeed = function ( speed ) {
    _speed = speed;
  }

  var getSpeed = function () {
    return _speed;
  }

  return {
    update: update,
    setSpeed: setSpeed,
    getSpeed: getSpeed
  };
}

module.exports = BackgroundHandler;