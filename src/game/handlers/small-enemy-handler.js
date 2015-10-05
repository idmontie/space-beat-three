var settings = require( 'core/settings' );
var SpriteGenerator = require( 'game/generators/sprite-generator' );

function SmallEnemyHandler( game ) {
  var _random    = game.rnd;
  var _spawnRate = settings.enemies.small.spawnRate;
  var _count     = 0;
  var _enemies   = null;

  SpriteGenerator.add( function () {
    _enemies = game.add.group();
    _enemies.enableBody = true;
    _enemies.physicsBodyType = Phaser.Physics.ARCADE;
    _enemies.createMultiple( settings.enemies.small.maxNumber, 'small-enemy' );
    _enemies.setAll( 'scale.x', 0.5 );
    _enemies.setAll( 'scale.y', 0.5 );
    _enemies.setAll( 'angle', 180 );
    _enemies.forEach( function ( enemy ) {
      enemy.anchor.setTo( 0.5, 0.5 );
    } );
  }, 200 );

  var _createSmallEnemy = function () {
    var enemy = _enemies.getFirstExists( false );

    if ( enemy ) {
      if ( enemy.lastTween ) {
        game.tweens.remove( enemy.lastTween );
      }

      enemy.reset(
          _random.between( -10, settings.size.width + 10 ),
          _random.between( -10, -20 )
      );

      var tween = game.add.tween( enemy ).to({ 
          x: _random.between( -10, settings.size.width + 10 ),
          y: settings.size.height + _random.between( 100, 200 )
        },
        7000,
        Phaser.Easing.Linear.None,
        true
      );
      enemy.lastTween = tween;
    }
  };

  var _killEnemy = function ( enemy ) {
    enemy.kill();
  
    var explosion = game.explosionManager.explosions.getFirstExists( false );
    explosion.reset( enemy.position.x, enemy.position.y );
    explosion.play( 'explode', 30, false, true );
    game.soundManager.play( 'smallExplode' );
  }

  var _rotateEnemiesTowardPlayer = function () {
    _enemies.forEach( function ( enemy ) {
      game.player.rotateObjectTowards( enemy, false, Math.PI / 2.0 );
    } );
  };

  var _shoot = function () {
    _enemies.forEach( function ( enemy ) {
      var shouldShoot = _random.between( 0, 300 ) < 1
      var inRange     = enemy.position.y < settings.size.height - 200;

      if ( enemy.alive && shouldShoot && inRange ) {
        //  Grab the first bullet we can from the pool
        var bullet = game.projectileManager.enemy.bullets.getFirstExists( false );

        if ( bullet ) {
          // TODO different sound
          game.soundManager.play( 'laser' );
          //  And fire it
          bullet.reset( enemy.x, enemy.y + 8 );
          game.player.rotateObjectTowards( bullet, true, 0 );
          bullet.body.velocity.x = Math.cos( bullet.rotation ) * 300;
          bullet.body.velocity.y = Math.sin( bullet.rotation ) * 300;
        }
      }
    } );
  }

  var _checkBounds = function () {
    _enemies.forEach( function ( enemy ) {
      if ( enemy.position.y > settings.size.height + 50 ) {
        enemy.kill();
      }
    } );
  }

  var _collisionHandler = function ( bullet, enemy ) {
    bullet.kill();
    _killEnemy( enemy );
  }

  var update = function () {
    if ( _count < settings.enemies.small.maxNumber ) {
      if ( _random.between( 0, _spawnRate ) < 1 ) {
        _spawnRate = settings.enemies.small.spawnRate;

        _createSmallEnemy();
      } else {
        _spawnRate -= 1;
      }
    }

    _checkBounds();
    _rotateEnemiesTowardPlayer();
    _shoot();

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

module.exports = SmallEnemyHandler;
