var Standard = function () {
  var _player;
  var _cursors;
  var _fireButton;
  var _tapData = {
    lastTap : 0
  };

  var _onCursor = function ( item ) {
    var now = +new Date();
    var diff = now - _tapData.lastTap.time;

    if ( diff < 600 && diff > 0 ) {
      if ( item.event.keyIdentifier === 'Left' &&
           _tapData.lastTap.dir === 'Left' ) {
        _player.burstLeft();
      } else if ( item.event.keyIdentifier === 'Right' &&
           _tapData.lastTap.dir === 'Right' ) {
        _player.burstRight();
      } else {
        _tapData.lastTap = { time : +new Date(), dir : 'none'}
      }
    }

    _tapData.lastTap = {
      time: +new Date(),
      dir: item.event.keyIdentifier
    };
  }

  var _onFire = function ( ) {
    _player.fire();
  }

  var _addUpdate = function ( player, game ) {
    var oldUpdate = player.update;

    player.update = function () {
      if ( oldUpdate ) {
        oldUpdate.call( this );
      }

      if ( _cursors.left.isDown ) {
        player.moveLeft();
      }
      else if ( _cursors.right.isDown ) {
        player.moveRight();
      }
      else {
        player.notMoving();
      }
    }
  }

  var _addCursors = function ( player, game ) {
    _cursors = game.input.keyboard.createCursorKeys();
    _cursors.left.onDown.add( _onCursor, this );
    _cursors.right.onDown.add( _onCursor, this );
  };

  var _addFireButton = function ( player, game ){
    _fireButton = game.input.keyboard.addKey( Phaser.Keyboard.SPACEBAR );
    _fireButton.onDown.add( _onFire );
  };

  var decorate = function ( player, game ) {
    _player = player;
    _addUpdate( player, game );
    _addCursors( player, game );
    _addFireButton( player, game );

    return player;
  };

  return {
    decorate: decorate
  };
};

module.exports = Standard;
