/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * This is the entry point for the NodeJS application
	 */

	if ( console && console.log ) {
	  console.log(
	    'Space Beat 3\n' +
	    'Copyright Mantaray AR LLC 2015\n'
	  );
	}

	// TODO create an instance of the game
	// var temp = require( __core + 'game' );
	// temp.init();
	var game = __webpack_require__( 1 );
	game();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Settings  = __webpack_require__( 2 );
	var Boot      = __webpack_require__( 3 );
	var Preloader = __webpack_require__( 4 );
	var StartMenu = __webpack_require__( 5 );
	var Game      = __webpack_require__( 6 );

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


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {
	  background : {
	    speed: 0.8
	  },
	  enemies : {
	    small : {
	      maxNumber: 30,
	      spawnRate: 100
	    },
	    medium : {
	      maxNumber: 5,
	      spawnRate: 400,
	      health: 100
	    },
	    large : {
	      maxNumber: 1,
	      spawnRate: 1000,
	      health: 500
	    }
	  },
	  game : {
	    debug : false
	  },
	  player: {
	    health: 100,
	    maxSpeed: 120
	  },
	  size : {
	    width: 600,
	    height: 800
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	function Boot( game ) {};

	Boot.prototype.preload = function () {
	  // TODO load splash images
	}

	Boot.prototype.create = function () {
	  // TODO set up game settings

	  this.state.start( 'Preloader' );
	}


	module.exports = Boot;

/***/ },
/* 4 */
/***/ function(module, exports) {

	function Preloader( game ) {
	  this.ready = false;
	};

	Preloader.prototype.preload = function () {
	  // TODO set up preload bar

	  this.load.image('background0', 'assets/sprites/parallax0000.png');
	  this.load.image('background1', 'assets/sprites/parallax0001.png');
	  this.load.image('background2', 'assets/sprites/parallax0002.png');
	  this.load.spritesheet(
	    'starfighter',
	    'assets/sprites/player0000.png'
	  );
	  this.load.spritesheet(
	    'short-beam',
	    'assets/sprites/short-beam-spritesheet.png',
	    16,
	    16
	  );
	  this.load.spritesheet(
	    'small-enemy',
	    'assets/sprites/enemy0001.png'
	  );
	  this.load.spritesheet(
	    'medium-enemy',
	    'assets/sprites/enemy0002.png'
	  );
	  this.load.spritesheet(
	    'large-enemy',
	    'assets/sprites/enemy0003.png'
	  );
	  this.load.spritesheet(
	    'enemy-beam',
	    'assets/sprites/enemy-beam-spritesheet.png',
	    7,
	    6
	  );
	  this.load.spritesheet(
	    'explosion',
	    'assets/sprites/explosion-spritesheet.png',
	    65,
	    65
	  );
	  this.load.spritesheet(
	    'small-explosion',
	    'assets/sprites/small-explosion-spritesheet.png',
	    9,
	    13
	  );
	  this.load.spritesheet(
	    'missile',
	    'assets/sprites/missile-spritesheet.png',
	    14,
	    11
	  );

	  this.load.audio('burst', ['assets/sounds/burst.wav']);
	  this.load.audio('laser', ['assets/sounds/laser.wav']);
	  this.load.audio('small-explode', ['assets/sounds/small-explode.wav']);
	  this.load.audio('background', ['assets/music/temp-music.mp3', 'assets/music/temp-music.ogg']);
	}

	Preloader.prototype.update = function () {
	  if ( this.cache.isSoundDecoded( 'background' ) && ! this.ready ) {
	    this.ready = true;
	    this.state.start( 'StartMenu' );
	  }
	};

	module.exports = Preloader;

/***/ },
/* 5 */
/***/ function(module, exports) {

	function StartMenu( game ) {}

	StartMenu.prototype.create = function () {
	  // TODO set up start menu

	  // TODO delete this line once the start menu is set up
	  this.state.start( 'Game' );
	}

	StartMenu.prototype.startGame = function () {
	  this.state.start( 'Game' );
	}



	module.exports = StartMenu;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var BackgroundHandler = __webpack_require__( 7 );
	var PlayerHandler     = __webpack_require__( 9 );
	var EnemyHandler      = __webpack_require__( 14 );
	var GuiManager        = __webpack_require__( 18 );
	var SoundManager      = __webpack_require__( 11 );
	var ProjectileManager = __webpack_require__( 19 );
	var ExplosionManager  = __webpack_require__( 20 );
	var StageManager      = __webpack_require__( 21 );
	var SpriteGenerator   = __webpack_require__( 8 );
	var PubSub            = __webpack_require__( 22 );
	var settings          = __webpack_require__( 2 );

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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var settings        = __webpack_require__( 2 );
	var SpriteGenerator = __webpack_require__( 8 );

	function BackgroundHandler( game ) {
	  var _speed       = settings.background.speed;
	  var _backgrounds = [];

	  SpriteGenerator.add( function () {
	    _backgrounds.push( game.add.tileSprite( 0, 0, settings.size.width, settings.size.height, 'background2' ) );
	    _backgrounds.push( game.add.tileSprite( 0, 0, settings.size.width, settings.size.height, 'background1' ) );
	    _backgrounds.push( game.add.tileSprite( 0, 0, settings.size.width, settings.size.height, 'background0' ) );
	  }, function () {
	    _.each( _backgrounds, function ( background ) {
	      background.destroy();
	    });
	  }, 0 );

	  /**
	   * Scroll the background
	   */
	  var update = function () {
	    _.each( _backgrounds, function( b, i ) {
	      b.tilePosition.y += (i + 1) * _speed;
	    } );
	  }

	  /**
	   * Set the speed
	   */
	  var setSpeed = function ( speed ) {
	    _speed = speed;
	  }

	  var getSpeed = function () {
	    return _speed;
	  }

	  return {
	    update: update,
	    setSpeed: setSpeed,
	    getSpeed: getSpeed
	  };
	}

	module.exports = BackgroundHandler;

/***/ },
/* 8 */
/***/ function(module, exports) {

	function insert(element, array) {
	  array.splice(locationOf(element, array) + 1, 0, element);
	  return array;
	}

	function locationOf(element, array, start, end) {
	  start = start || 0;
	  end = end || array.length;
	  var pivot = parseInt(start + (end - start) / 2, 10);
	  if (end-start <= 1 || array[pivot].order === element.order) return pivot;
	  if (array[pivot].order < element.order) {
	    return locationOf(element, array, pivot, end);
	  } else {
	    return locationOf(element, array, start, pivot);
	  }
	}

	var SpriteGenerator = (function () {
	  var _order = [];

	  var add = function ( createCallback, rollbackCallback, order ) {
	    insert( {
	      order: order,
	      createCallback: createCallback,
	      rollbackCallback: rollbackCallback
	    }, _order );
	  }

	  var create = function () {
	    _.each( _order, function ( entry ) {
	      entry.createCallback();
	    } );
	  }

	  var destroy = function () {
	    _.each( _order, function ( entry ) {
	      entry.rollbackCallback();
	    } );

	    _order = [];
	  }

	  return {
	    add: add,
	    create: create,
	    destroy: destroy
	  }  
	})();

	module.exports = SpriteGenerator;



/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var PlayerEntity = __webpack_require__( 10 );
	var Controls     = __webpack_require__( 12 );
	var Player       = __webpack_require__( 13 );

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

	  var render = function () {
	    _player.render();
	  };

	  var getPlayer = function () {
	    return _player;
	  }

	  return {
	    update: update,
	    render: render,
	    getPlayer : getPlayer
	  }
	}

	module.exports = PlayerHandler;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var settings        = __webpack_require__( 2 );
	var SoundManager    = __webpack_require__( 11 );
	var SpriteGenerator = __webpack_require__( 8 );

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
	      player.entity.scale.setTo( 0.3, 0.3 );

	      game.physics.enable( player.entity, Phaser.Physics.ARCADE );
	      player.entity.body.collideWorldBounds = true;
	      player.entity.body.bounce.setTo( 0, 0 );
	      player.entity.body.setSize( 90, 181, 0, 0 );

	      player.entity.play('init');

	    }, function () {
	      player.entity.destroy();
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
	        game.pubsub.publish( 'score.add', 0.03 );

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
	        game.pubsub.publish( 'health.subtract', 30 );
	        player.health -= 30;
	        player.check( missile );
	      };
	    } )( player );

	    _bulletCollisionHandler = ( function ( player ) {
	      return function ( entity, bullet ) {
	        bullet.kill();
	        game.pubsub.publish( 'health.subtract', 10 );
	        player.health -= 10;
	        player.check( bullet );
	      };
	    } )( player );

	    _missileBulletCollisionHandler = ( function ( player ) {
	      return function ( missile, bullet ) {
	        game.pubsub.publish( 'score.add', 100 );
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

	        // lose
	        game.stageManager.lose();
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

	  var _addRender = function ( player, game ) {
	    player.render = function () {
	      if ( game.isDebug ) {
	        game.game.debug.bodyInfo( player.entity, 32, 32 );
	        game.game.debug.body( player.entity );
	      }
	    }
	  }

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
	    _addRender( player, game );
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


/***/ },
/* 11 */
/***/ function(module, exports) {

	function SoundManager( game ) {
	  var _audio = {};

	  _audio.music = game.add.audio('background');
	  _audio.music.loopFull(1);
	  _audio.music.play();

	  _audio.burst = game.add.audio( 'burst' );
	  _audio.burst.volume = 0.5;

	  _audio.laser = game.add.audio( 'laser' );
	  _audio.laser.volume = 0.5;

	  _audio.smallExplode = game.add.audio('small-explode');
	  _audio.smallExplode.volume = 0.6;

	  var play = function ( name ) {
	    switch( name ) {
	      case 'burst':
	        _audio.burst.play();
	        break;
	      case 'laser':
	        _audio.laser.play();
	        break;
	      case 'smallExplode':
	        _audio.smallExplode.play();
	        break;
	      case 'largeExplode':
	        _audio.smallExplode.play();
	        break;
	    }
	  }

	  var stop = function () {
	    _audio.music.stop();
	  }

	  return {
	    play : play,
	    stop: stop
	  }
	};

	module.exports = SoundManager;


/***/ },
/* 12 */
/***/ function(module, exports) {

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


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var settings = __webpack_require__( 2 );

	function Player() {
	  var health      = settings.player.health;
	  var maxSpeed    = settings.player.maxSpeed;
	  var boostSpeed  = 240;
	  var boostFrames = 1;

	  return {
	    health: health,
	    maxSpeed: maxSpeed,
	    boostSpeed: boostSpeed,
	    boostFrames: boostFrames
	  };
	};

	module.exports = Player;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var SmallEnemyHandler  = __webpack_require__( 15 );
	var MediumEnemyHandler = __webpack_require__( 16 );
	var LargeEnemyHandler  = __webpack_require__( 17 );

	function EnemyHandler( game ) {
	  var _numberOfLargeEnemies = 0;
	  
	  var _smallEnemyHandler  = new SmallEnemyHandler( game );
	  var _mediumEnemyHandler = new MediumEnemyHandler( game );
	  var _largeEnemyHandler  = new LargeEnemyHandler( game );

	  var update = function () {
	    _smallEnemyHandler.update();
	    _mediumEnemyHandler.update();
	    _largeEnemyHandler.update();
	  };

	  var render = function () {
	    _smallEnemyHandler.render();
	    _mediumEnemyHandler.render();
	    _largeEnemyHandler.render();
	  }

	  return {
	    update : update,
	    render : render
	  }
	}

	module.exports = EnemyHandler;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var settings = __webpack_require__( 2 );
	var SpriteGenerator = __webpack_require__( 8 );

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
	    _enemies.setAll( 'scale.x', 0.3 );
	    _enemies.setAll( 'scale.y', 0.3 );
	    _enemies.setAll( 'angle', 180 );
	    _enemies.forEach( function ( enemy ) {
	      enemy.anchor.setTo( 0.5, 0.5 );
	      enemy.body.setSize( 40, 60, 0, 0 );
	    } );
	  }, function () {
	    _enemies.destroy();
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
	    game.pubsub.publish( 'score.add', 400 );
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

	module.exports = SmallEnemyHandler;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var settings = __webpack_require__( 2 );
	var SpriteGenerator = __webpack_require__( 8 );

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
	      enemy.body.setSize( 58, 75, 0, 0 );
	    } );
	  }, function () {
	    _enemies.destroy();
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

	module.exports = MediumEnemyHandler;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var settings = __webpack_require__( 2 );
	var SpriteGenerator = __webpack_require__( 8 );

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


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var SpriteGenerator = __webpack_require__( 8 );
	var settings        = __webpack_require__( 2 );

	function GuiManager( game ) {
	  var _score            = 0;
	  var _scoreText        = null;
	  var _health           = settings.player.health;
	  var _healthBackground = null;
	  var _healthForeground = null;

	  SpriteGenerator.add( function () {
	    _scoreText = game.add.text(
	        10,
	        10,
	        _textify( _score ),
	        {
	          font: '26px Arial',
	          fill: '#fff',
	          align: 'right',
	          boundsAlignH: 'right',
	          boundsAlignV: 'top'
	        }
	    );
	    _scoreText.setTextBounds( 0, 0, settings.size.width - 20, 10 );

	    _healthBackground = game.add.graphics();
	    _healthBackground.beginFill( 0xFFFFFF, 0.2 );
	    _healthBackground.drawRect(
	        settings.size.width / 3.0,
	        15,
	        settings.size.width / 3.0,
	        20
	    );

	    _redrawHealth( settings.player.health );
	  }, function () {
	    _scoreText.destroy();
	    _healthForeground.clear();
	    _healthBackground.clear();
	  }, 1000 );

	  var _textify = function ( score ) {
	    return parseInt( score ) + '';
	  }

	  var _redrawHealth = function ( health ) {
	    if ( _healthForeground ) {
	      _healthForeground.clear();
	    } else {
	      _healthForeground = game.add.graphics();
	    }

	    
	    _healthForeground.beginFill( 0x11FF11, 0.8 );
	    _healthForeground.drawRect(
	        settings.size.width / 3.0,
	        15,
	        settings.size.width / 3.0 * ( health / settings.player.health ),
	        20
	    );
	    _healthForeground.endFill();
	  }

	  var _addScore = function ( e, add ) {
	    _score += add;
	    _scoreText.text = _textify( _score );
	  }

	  var _subtractHealth = function ( e, minus ) {
	    _health -= minus;
	    _health = _health < 0 ? 0 : _health;
	    _redrawHealth( _health );
	  }

	  game.pubsub.subscribe( 'score.add', _addScore );
	  game.pubsub.subscribe( 'health.subtract', _subtractHealth );

	  var getScore = function() {
	    return _score;
	  }

	  return {
	    getScore : getScore
	  };

	}

	module.exports = GuiManager;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var SpriteGenerator = __webpack_require__( 8 );

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

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var SpriteGenerator = __webpack_require__( 8 );

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


/***/ },
/* 21 */
/***/ function(module, exports) {

	function StageManager( game ) {
	  var _stage = 3;

	  var isStage = function ( stage ) {
	    return _stage >= stage;
	  }

	  var lose = function () {
	    var score = game.guiManager.getScore();

	    amplify.store( 'topScore', score );

	    game.state.start( 'StartMenu' );

	    game.reset();
	    game.soundManager.stop();
	  }

	  return {
	    isStage : isStage,
	    lose: lose
	  }
	}

	module.exports = StageManager;

/***/ },
/* 22 */
/***/ function(module, exports) {

	function PubSub() {
	  var topics = {};
	  var subUid = -1;

	  var publish = function ( topic, args ) {
	    if ( ! topics[ topic ] ) {
	      return false;
	    }

	    var subscribers = topics[ topic ];
	    var len = subscribers ? subscribers.length : 0;

	    while ( len-- ) {
	      subscribers[ len ].func( topic, args );
	    }
	  }

	  var subscribe = function ( topic, func ) {
	    if ( ! topics[ topic ] ) {
	      topics[ topic ] = [];
	    }

	    var token = ( ++ subUid ).toString();

	    topics[ topic ].push( {
	      token : token,
	      func : func
	    } );

	    return token;
	  }

	  return {
	    publish : publish,
	    subscribe : subscribe
	  }
	}

	module.exports = PubSub;

/***/ }
/******/ ]);