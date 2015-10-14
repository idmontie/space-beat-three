var SpriteGenerator = require( 'game/generators/sprite-generator' );
var settings        = require( 'core/settings' );

function GuiManager( game ) {
  var _score            = 0;
  var _scoreText        = null;
  var _health           = settings.player.health;
  var _healthBackground = null;
  var _healthForeground = null;

  SpriteGenerator.add( function () {
    _scoreText = game.add.text(
        10,
        10,
        _textify( _score ),
        {
          font: '26px Arial',
          fill: '#fff',
          align: 'right',
          boundsAlignH: 'right',
          boundsAlignV: 'top'
        }
    );
    _scoreText.setTextBounds( 0, 0, settings.size.width - 20, 10 );

    _healthBackground = game.add.graphics();
    _healthBackground.beginFill( 0xFFFFFF, 0.2 );
    _healthBackground.drawRect(
        settings.size.width / 3.0,
        15,
        settings.size.width / 3.0,
        20
    );

    _redrawHealth( settings.player.health );
  }, function () {
    _scoreText.destroy();
    _healthForeground.clear();
    _healthBackground.clear();
  }, 1000 );

  var _textify = function ( score ) {
    return parseInt( score ) + '';
  }

  var _redrawHealth = function ( health ) {
    if ( _healthForeground ) {
      _healthForeground.clear();
    } else {
      _healthForeground = game.add.graphics();
    }

    
    _healthForeground.beginFill( 0x11FF11, 0.8 );
    _healthForeground.drawRect(
        settings.size.width / 3.0,
        15,
        settings.size.width / 3.0 * ( health / settings.player.health ),
        20
    );
    _healthForeground.endFill();
  }

  var _addScore = function ( e, add ) {
    _score += add;
    _scoreText.text = _textify( _score );
  }

  var _subtractHealth = function ( e, minus ) {
    _health -= minus;
    _health = _health < 0 ? 0 : _health;
    _redrawHealth( _health );
  }

  game.pubsub.subscribe( 'score.add', _addScore );
  game.pubsub.subscribe( 'health.subtract', _subtractHealth );

  var getScore = function() {
    return _score;
  }

  return {
    getScore : getScore
  };

}

module.exports = GuiManager;