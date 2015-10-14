var settings = require( 'core/settings' );
var SpriteGenerator = require( 'game/generators/sprite-generator' );

function LargeEnemyHandler( game ) {
  var _random    = game.rnd;
  var _spawnRate = settings.enemies.large.spawnRate;
  var _count     = 0;
  var _enemies   = null;

  SpriteGenerator.add( function () {
    _enemies = game.add.group();
    _enemies.enableBody = true;
    _enemies.physicsBodyType = Phaser.Physics.ARCADE;
    _enemies.createMultiple( settings.enemies.large.maxNumber, 'large-enemy' );
    _enemies.setAll( 'scale.x', 0.7 );
    _enemies.setAll( 'scale.y', 0.7 );
    _enemies.setAll( 'angle', 90 );
    _enemies.forEach( function ( enemy ) {
      enemy.anchor.setTo( 0.5, 0.5 );
      enemy.body.setSize( 258, 75, 0, 0 );
    } );
  }, function () {
    _enemies.destroy();
  }, 200 );

  var _createLargeEnemy = function () {
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

      enemy.health = settings.enemies.large.health;
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

      if ( enemy.alive && enemy.shootTimer > 100 ) {
        if ( enemy.shootTimer > 140 ) {
          enemy.shootTimer = 0;  
        }

        if ( enemy.shootTimer % 3 === 0 ) {
          //  Grab the first bullet we can from the pool
          var bullet = game.projectileManager.enemy.bullets.getFirstExists( false );
          // TODO different sound
          game.soundManager.play( 'laser' );

          if ( bullet ) {
            //  And fire it
            bullet.reset( enemy.x, enemy.y + 8 );
            game.player.rotateObjectTowards( bullet, true, 0 );
            bullet.body.velocity.x = Math.cos( bullet.rotation ) * 300;
            bullet.body.velocity.y = Math.sin( bullet.rotation ) * 300;
          }
        }
      }
    } );
  }

  var _check = function ( enemy, bullet ) {
    if ( enemy.health <= 0 ) {
      _killEnemy( enemy );

      return true;
    } else {
      explosion = game.explosionManager.smallExplosions.getFirstExists( false );
      game.soundManager.play( 'smallExplode' );
      explosion.reset( bullet.position.x, bullet.position.y );
      explosion.play( 'explode', 30, false, true );

      return false;
    }
  }

  var _collisionHandler = function ( bullet, enemy ) {
    enemy.health -= 20;
    bullet.kill();
    if ( _check( enemy, bullet ) ) {
      game.pubsub.publish( 'score.add', 1000 );
    }
  }

  var update = function () {
    if ( game.stageManager.isStage( 3 ) ) {
      if ( _count < settings.enemies.large.maxNumber ) {
        if ( _random.between( 0, _spawnRate ) < 1 ) {
          _spawnRate = settings.enemies.large.spawnRate;

          _createLargeEnemy();
        } else {
          _spawnRate -= 1;
        }
      }
    }

    _shoot();

    game.physics.arcade.overlap(
        game.projectileManager.player.bullets,
        _enemies,
        _collisionHandler,
        null,
        this
    );
  };

  var render = function () {
    if ( game.isDebug ) {
      _enemies.forEachAlive( function ( member ) {
        game.game.debug.body( member );
      }, this );
    }
  }

  return {
    update: update,
    render: render
  }
};

module.exports = LargeEnemyHandler;
