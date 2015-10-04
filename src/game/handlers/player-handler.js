var PlayerEntity = require( 'game/entities/player-entity' );
var Controls     = require( 'game/controls/standard' );
var Player       = require( 'core/models/player' );

function PlayerHandler( game ) {
  var _player;
  var _playerEntity;
  var _controls;

  _player       = new Player();
  _playerEntity = new PlayerEntity();
  _controls     = new Controls();

  _player = _playerEntity.decorate( _player, game );
  _player = _controls.decorate( _player, game );

  var update = function () {
    _player.update();
  };

  var getPlayer = function () {
    return _player;
  }

  return {
    update: update,
    getPlayer : getPlayer
  }
}

module.exports = PlayerHandler;
