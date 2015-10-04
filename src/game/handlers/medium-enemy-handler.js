var settings = require( 'core/settings' );
var SpriteGenerator = require( 'game/generators/sprite-generator' );

function MediumEnemyHandler( game ) {
  var _random    = game.rnd;
  var _spawnRate = settings.enemies.medium.spawnRate;
  var _count     = 0;
  var _enemies   = null;

  SpriteGenerator.add( function () {
    _enemies = game.add.group();
    _enemies.enableBody = true;
    _enemies.physicsBodyType = Phaser.Physics.ARCADE;
    _enemies.createMultiple( settings.enemies.medium.maxNumber, 'medium-enemy' );
    _enemies.setAll( 'scale.x', 0.5 );
    _enemies.setAll( 'scale.y', 0.5 );
    _enemies.setAll( 'angle', 180 );
    _enemies.forEach( function ( enemy ) {
      enemy.anchor.setTo( 0.5, 0.5 );
    } );
  }, 200 );

  var _createMediumEnemy = function () {
    var enemy = _enemies.getFirstExists( false );

    if ( enemy ) {
      if ( enemy.lastTweenA ) {
        game.tweens.remove( enemy.lastTweenA );
      }
      if ( enemy.lastTweenB ) {
        game.tweens.remove( enemy.lastTweenB );
      }

      enemy.reset(
          _random.between( -10, settings.size.width + 10 ),
          _random.between( -10, -20 )
      );

      enemy.health = settings.enemies.medium.health;
      var targetY = _random.between( 90, 200 );
      var targetX = _random.between(
          settings.size.width / 2 - 100,
          settings.size.width / 2 + 100
      );
      var tweenA = game.add.tween( enemy ).to( { 
          x: targetX,
          y: targetY
        },
        7000,
        Phaser.Easing.Sinusoidal.Out,
        true
      );

      var tweenB = game.add.tween( enemy ).to( {
          x: targetX + _random.pick( [-20, -10, 10, 20] )
        },
        5000,
        Phaser.Easing.Linear.None,
        false,
        0,
        -1,
        true
      );

      tweenA.chain(tweenB);

      enemy.lastTweenA = tweenA;
      enemy.lastTweenB = tweenB;
    }
  };

  var _killEnemy = function ( enemy ) {
    enemy.kill();
  
    var explosion = game.explosionManager.explosions.getFirstExists( false );
    explosion.reset( enemy.position.x, enemy.position.y );
    explosion.play( 'explode', 30, false, true );
    game.soundManager.play( 'smallExplode' );
  }

  var _shoot = function () {
    _enemies.forEach( function ( enemy ) {
      if ( typeof enemy.shootTimer != 'undefined' ) {
        enemy.shootTimer++;
      } else {
        enemy.shootTimer = 0;
      }

      if ( enemy.alive && enemy.shootTimer > 500 ) {
        enemy.shootTimer = 0;

        for ( var firedBullet = 0; firedBullet < 6; firedBullet++ ) {
          //  Grab the first bullet we can from the pool
          enemyBullet = game.projectileManager.enemy.missiles.getFirstExists( false );
          // TODO different sound
          game.soundManager.play( 'laser' );

          if ( enemyBullet ) {
            //  And fire it
            enemyBullet.reset( enemy.x, enemy.y + 8 );
            enemyBullet.body.velocity.x = 300;
            if ( firedBullet > 2 ) {
              enemyBullet.body.velocity.x = -300;
            }

            enemyBullet.body.velocity.y = -50 + ( firedBullet % 3 ) * 25;
            enemyBullet.angle = ( 270 + 60 * firedBullet  ) % 360;
          }
        }
      }
    } );
  }

  var _rotateMissilesTowardPlayer = function () {
    var missiles = game.projectileManager.enemy.missiles;

    missiles.forEach( function ( missile ) {
      if ( missile.alive ) {
        game.player.rotateObjectTowards(
            missile,
            false,
            0,
            1
        );

        var newX = ( missile.body.velocity.x + Math.cos( missile.rotation ) * 100 ) / 2.0;
        var newY = ( missile.body.velocity.y + Math.sin( missile.rotation ) * 300 ) / 2.0;
        var oldY = missile.body.velocity.y;


        missile.body.velocity.x = newX;
        missile.body.velocity.y = Math.max( oldY, newY );

        if ( missile.position.y > game.player.entity.position.y + _random.between( 30, 100 ) ) {
          game.projectileManager.killMissile( missile );
        }
      }
    } );
  };

  var _check = function ( enemy, bullet ) {
    if ( enemy.health <= 0 ) {
      _killEnemy( enemy );
    } else {
      explosion = game.explosionManager.smallExplosions.getFirstExists( false );
      game.soundManager.play( 'smallExplode' );
      explosion.reset( bullet.position.x, bullet.position.y );
      explosion.play( 'explode', 30, false, true );
    }
  }

  var _collisionHandler = function ( bullet, enemy ) {
    enemy.health -= 20;
    bullet.kill();
    _check( enemy, bullet );
  }

  var update = function () {
    if ( game.stageManager.isStage( 2 ) ) {
      if ( _count < settings.enemies.medium.maxNumber ) {
        if ( _random.between( 0, _spawnRate ) < 1 ) {
          _spawnRate = settings.enemies.medium.spawnRate;

          _createMediumEnemy();
        } else {
          _spawnRate -= 1;
        }
      }
    }

    _shoot();
    _rotateMissilesTowardPlayer();

    game.physics.arcade.overlap(
        game.projectileManager.player.bullets,
        _enemies,
        _collisionHandler,
        null,
        this
    );
  };

  return {
    update: update
  }
};

module.exports = MediumEnemyHandler;
