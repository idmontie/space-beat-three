var SpriteGenerator = require( 'game/generators/sprite-generator' );

var ProjectileManager = function ( game ) {
  this.player = {
    bullets : null
  };

  this.enemy = {
    bullets : null,
    missiles : null
  }

  var that = this;

  SpriteGenerator.add( function () {
    that.player.bullets = game.add.group();
    that.player.bullets.enableBody = true;
    that.player.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    that.player.bullets.createMultiple( 30, 'short-beam' );
    that.player.bullets.setAll( 'anchor.x', 0.5 );
    that.player.bullets.setAll( 'anchor.y', 0.5 );
    that.player.bullets.setAll( 'outOfBoundsKill', true );
    that.player.bullets.setAll( 'checkWorldBounds', true );
    that.player.bullets.setAll( 'angle', 270 );

    // Enemy bullets (bullets before player for layering)
    that.enemy.bullets = game.add.group();
    that.enemy.bullets.enableBody = true;
    that.enemy.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    that.enemy.bullets.createMultiple(30, 'enemy-beam');
    that.enemy.bullets.setAll('anchor.x', 0.5);
    that.enemy.bullets.setAll('anchor.y', 0.5);
    that.enemy.bullets.setAll('outOfBoundsKill', true);
    that.enemy.bullets.setAll('checkWorldBounds', true);

    // Enemy missiles (bullets before player for layering)
    that.enemy.missiles = game.add.group();
    that.enemy.missiles.enableBody = true;
    that.enemy.missiles.physicsBodyType = Phaser.Physics.ARCADE;
    that.enemy.missiles.createMultiple(30, 'missile');
    that.enemy.missiles.setAll('anchor.x', 0.5);
    that.enemy.missiles.setAll('anchor.y', 0.5);
    that.enemy.missiles.setAll('outOfBoundsKill', true);
    that.enemy.missiles.setAll('checkWorldBounds', true);
  }, function () {
    that.enemy.missiles.destroy();
    that.enemy.bullets.destroy();
    that.player.bullets.destroy();
  }, 100);

  this.killMissile = function ( missile ) {
    missile.kill();

    var explosion = game.explosionManager.explosions.getFirstExists( false );
    explosion.reset(missile.position.x, missile.position.y);
    explosion.play( 'explode', 30, false, true );
    game.soundManager.play( 'explode' );
  }
};

module.exports = ProjectileManager;