var settings        = require( 'core/settings' );
var SoundManager    = require( 'game/managers/sound-manager' );
var SpriteGenerator = require( 'game/generators/sprite-generator' );

var PlayerEntity = function () {
  var _lastFire      = 0;
  var _burstCooldown = 0;
  var _notMoving     = true;
  var _bulletCollisionHandler        = null;
  var _missileCollisionHandler       = null;
  var _missileBulletCollisionHandler = null;

  /**
   * Create the sprite for the player
   */
  var _addEntity = function ( player, game ) {
    var _animations = {};

    SpriteGenerator.add( function () {
      player.entity = game.add.sprite(
          settings.size.width / 2.0,
          settings.size.height - 100,
          'starfighter'
      );

      player.entity.anchor.setTo( 0.5, 0.5 );
      player.entity.scale.setTo( 0.5, 0.5 );

      game.physics.enable( player.entity, Phaser.Physics.ARCADE );
      player.entity.body.collideWorldBounds = true;
      player.entity.body.bounce.setTo( 0, 0 );
      player.entity.body.setSize( 50, 131, 0, 5 );

      _animations.left  = player.entity.animations.add('left', [4,4,3,3,2,2,2,1,1,1,1,0,0,0,0,0,0,1,1,1,1,2,2,2,3,3,4,4], 10, true);
      _animations.init  = player.entity.animations.add('init', [5], 0, true);
      _animations.right = player.entity.animations.add('right', [6,6,7,7,8,8,8,9,9,9,9,10,10,10,10,10,10,9,9,9,8,8,8,7,7,6,6], 10, true);
      _animations.left.enableUpdate  = true;
      _animations.init.enableUpdate  = true;
      _animations.right.enableUpdate = true;

      player.entity.play('init');

    }, 300 );
  };

  /**
   * Decorate the player with movement functions
   */
  var _addMovement = function ( player, game ) {
    /**
     * Handle burst movement
     */
    var _burst = function ( left ) {
      if ( _burstCooldown === 0 ) {
        var factor = player.boostSpeed;
        factor = left ? -factor : factor;
        
        player.entity.body.velocity.x = factor;

        if ( left ) {
          player.entity.play( 'left' );
        } else {
          player.entity.play( 'right' );
        }
        
        _burstCooldown = player.boostFrames;
        
        game.soundManager.play( 'burst' );
      }
    }

    /**
     * Burst Left
     */
    player.burstLeft = function () {
      _burst( true );
    }

    /**
     * Burst Right
     */
    player.burstRight = function () {
      _burst( false );
    }

    player.moveLeft = function () {
      if ( player.entity.alive ) {
        var tempSpeed;
        tempSpeed = player.entity.body.velocity.x;
        tempSpeed -= 10;

        if ( _burstCooldown === 0 ) {
          tempSpeed = Math.max( tempSpeed, -player.maxSpeed );
        }

        player.entity.body.velocity.x = tempSpeed;
        player.entity.play('left');

        _notMoving = false;
      }
    }

    player.moveRight = function () {
      if ( player.entity.alive ) {
        var tempSpeed;
        tempSpeed = player.entity.body.velocity.x;
        tempSpeed += 10;

        if ( _burstCooldown === 0 ) {
          tempSpeed = Math.min( tempSpeed, player.maxSpeed );
        }

        player.entity.body.velocity.x = tempSpeed;
        player.entity.play('right');

        _notMoving = false;
      }
    }

    player.notMoving = function () {
      _notMoving = true;
    }
  }

  var _addFire = function ( player, game ) {
    player.fire = function () {
      //  To avoid them being allowed to fire too fast we set a time limit
      if ( player.entity.alive && game.time.now > _lastFire ) {
        //  Grab the first bullet we can from the pool
        bullet = game.projectileManager.player.bullets.getFirstExists( false );
        game.soundManager.play( 'laser' );

        if ( bullet ) {
          //  And fire it
          bullet.reset( player.entity.x, player.entity.y + 8 );
          bullet.body.velocity.y = -400;
          _lastFire = game.time.now + 100;
        }
      }
    }
  }

  var _addUpdate = function ( player, game ) {
    var oldUpdate = player.update;

    player.update = function () {
      if ( oldUpdate ) {
        oldUpdate.call( this );
      }

      if ( player.entity.alive ) {
        if ( _burstCooldown === 0 && _notMoving ) {
          if ( player.entity.body.velocity.x != 0 ) {
            if ( player.entity.body.velocity.x > 0 ) {
              tempSpeed = player.entity.body.velocity.x;
              tempSpeed -= 10;

              tempSpeed = tempSpeed <= 0 ? 0 : tempSpeed;
              player.entity.body.velocity.x = tempSpeed;
            } else if ( player.entity.body.velocity.x < 0 ) {
              tempSpeed = player.entity.body.velocity.x;
              tempSpeed += 10;

              tempSpeed = tempSpeed >= 0 ? 0 : tempSpeed;
              player.entity.body.velocity.x = tempSpeed;
            }
          }
        }
        
        player.entity.play('init');

        game.physics.arcade.overlap(
            game.projectileManager.enemy.missiles,
            player.entity,
            _missileCollisionHandler,
            null,
            this
        );
        game.physics.arcade.overlap(
            game.projectileManager.enemy.bullets,
            player.entity,
            _bulletCollisionHandler,
            null,
            this
        );

        game.physics.arcade.overlap(
            game.projectileManager.player.bullets,
            game.projectileManager.enemy.missiles,
            _missileBulletCollisionHandler,
            null,
            this
        );
      }

      // Cooldown
      var deltaTime = game.time.elapsed / 1000;

      if ( _burstCooldown > 0 ) {
        _burstCooldown -= deltaTime;
      }
      _burstCooldown = _burstCooldown < 0 ? 0 : _burstCooldown;
    }
  };

  var _addCollisionHandlers = function ( player, game ) {
    _missileCollisionHandler = ( function ( player ) {
      return function ( entity, missile ) {
        game.projectileManager.killMissile( missile );
        player.health -= 30;
        player.check( missile );
      };
    } )( player );

    _bulletCollisionHandler = ( function ( player ) {
      return function ( entity, bullet ) {
        bullet.kill();
        player.health -= 10;
        player.check( bullet );
      };
    } )( player );

    _missileBulletCollisionHandler = ( function ( player ) {
      return function ( missile, bullet ) {
        bullet.kill();
        game.projectileManager.killMissile( missile );
      }
    } )( player );
  }

  var _addCheck = function ( player, game ) {
    player.check = function ( bullet ) {
      var explosion;
      var x;
      var y;

      if ( player.health <= 0 ) {
        player.entity.kill();

        explosion = game.explosionManager.explosions.getFirstExists( false );
        game.soundManager.play( 'largeExplode' );
        x = player.entity.position.x;
        y = player.entity.position.y;

        // TODO lose
      } else {
        explosion = game.explosionManager.smallExplosions.getFirstExists( false );
        game.soundManager.play( 'smallExplode' );
        x = bullet.position.x;
        y = bullet.position.y;
      }

      explosion.reset( x, y );
      explosion.play( 'explode', 30, false, true );
    }
  };

  var _addHelperFunctions = function ( player, game ) {
    player.rotateObjectTowards = function ( obj, instant, offsetRotation, amount ) {
      amount = amount ? amount : 5;
      var angle = game.math.angleBetween(
          obj.position.x,
          obj.position.y,
          player.entity.position.x,
          player.entity.position.y
      ) + offsetRotation;
      var delta = angle - obj.rotation;

      if ( obj.rotation !== angle ) {
        if ( instant ) {
          obj.rotation = angle;
        } else {
          // Keep it in range from -180 to 180 to make the most efficient turns.
          if (delta > Math.PI) delta -= Math.PI * 2;
          if (delta < -Math.PI) delta += Math.PI * 2;

          if (delta > 0) {
            // Turn clockwise
            obj.angle += amount;
          } else {
            // Turn counter-clockwise
            obj.angle -= amount;
          }

          // Just set angle to target angle if they are close
          if ( Math.abs( delta ) < game.math.degToRad( 5 ) ) {
            obj.rotation = angle;
          }
        }
      }
    }
  };

  /**
   * Decorate the player object with new
   * functionality that depends on the
   * game object
   */
  var decorate = function ( player, game ) {
    _addEntity( player, game );
    _addMovement( player, game );
    _addFire( player, game );
    _addUpdate( player, game );
    _addCheck( player, game );
    _addHelperFunctions( player, game );
    _addCollisionHandlers( player, game );

    return player;
  };

  return {
    decorate : decorate
  }
};

module.exports = PlayerEntity;
