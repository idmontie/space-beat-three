var BackgroundHandler = require( 'game/handlers/background-handler' );
var PlayerHandler     = require( 'game/handlers/player-handler' );
var EnemyHandler      = require( 'game/handlers/enemy-handler' );
var GuiManager        = require( 'game/managers/gui-manager' );
var SoundManager      = require( 'game/managers/sound-manager' );
var ProjectileManager = require( 'game/managers/projectile-manager' );
var ExplosionManager  = require( 'game/managers/explosion-manager' );
var StageManager      = require( 'game/managers/stage-manager' );
var SpriteGenerator   = require( 'game/generators/sprite-generator' );
var PubSub            = require( 'framework/pubsub/pubsub' );
var settings          = require( 'core/settings' );

function Game( game ) {
  var _backgroundHandler;
  var _playerHandler;
  var _enemyHandler;

  var create = function () {
    if ( settings.game.debug ) {
      this.isDebug = settings.game.debug;
    }

    this.physics.startSystem( Phaser.Physics.ARCADE );

    _backgroundHandler = new BackgroundHandler( this );
    _playerHandler     = new PlayerHandler( this );
    _enemyHandler      = new EnemyHandler( this );
    
    this.pubsub            = new PubSub();
    this.player            = _playerHandler.getPlayer();
    this.stageManager      = new StageManager( this );
    this.projectileManager = new ProjectileManager( this );
    this.soundManager      = new SoundManager( this );
    this.explosionManager  = new ExplosionManager( this );
    this.guiManager        = new GuiManager( this );

    this.reset = function () {
      SpriteGenerator.destroy();
    }

    SpriteGenerator.create();
  };

  var update = function () {
    _backgroundHandler.update();
    _playerHandler.update();
    _enemyHandler.update();
  };

  var render = function () {
    _playerHandler.render();
    _enemyHandler.render();
  };

  return {
    create : create,
    update : update,
    render : render
  }
};


module.exports = Game;