var SpriteGenerator = require( 'game/generators/sprite-generator' );

function ExplosionManager( game ) {
  this.explosions = null;
  this.smallExplosions = null;

  var that = this;

  SpriteGenerator.add( function () {
    // Explosion (explosions after everything else)
    that.explosions = game.add.group();
    that.explosions.createMultiple(30, 'explosion');
    that.explosions.setAll('anchor.x', 0.5);
    that.explosions.setAll('anchor.y', 0.5);
    that.explosions.forEach(function( explosion ) {
      explosion.animations.add('explode', [0,1,2,3,4]);
    }, this);

    // Explosion (explosions after everything else)
    that.smallExplosions = game.add.group();
    that.smallExplosions.createMultiple(10, 'small-explosion');
    that.smallExplosions.setAll('anchor.x', 0.5);
    that.smallExplosions.setAll('anchor.y', 0.5);
    that.smallExplosions.forEach(function( explosion ) {
      explosion.animations.add('explode', [0,1,2]);
    }, this);
  }, function () {
    that.explosions.destroy();
    that.smallExplosions.destroy();
  }, 400 );
}

module.exports = ExplosionManager;
