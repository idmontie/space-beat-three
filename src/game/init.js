var Settings  = require( 'core/settings' );
var Boot      = require( 'game/boot' );
var Preloader = require( 'game/preloader' );
var StartMenu = require( 'game/start-menu' );
var Game      = require( 'game/game' );

var SBT = {
  Boot: Boot,
  Preloader: Preloader,
  StartMenu: StartMenu,
  Game: Game
};

module.exports = function Game() {
  var size = {
    x: Settings.size.width,
    y: Settings.size.height,
  };

  var game = new Phaser.Game(
    size.x,
    size.y,
    Phaser.AUTO,
    'game-container'
  );

  game.state.add( 'Boot', SBT.Boot );
  game.state.add( 'Preloader', SBT.Preloader );
  game.state.add( 'StartMenu', SBT.StartMenu );
  game.state.add( 'Game', SBT.Game );

  game.state.start( 'Boot' );
};
