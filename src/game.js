var defaults = {
  width: 600,
  height: 800,
  parallaxSpeed: 0.8,
  maxSpeed: 120,
  boostSpeed: 240,
  boostFrames: 1,
  maxNumberOfEnemies: 10,
  enemySpawnRate: 100,
  playerHealth: 100
};

/*
 |-------------------------
 | Game
 |-------------------------
 |
 |
 */
var game = new Phaser.Game(defaults.width, defaults.height, Phaser.AUTO, 'game', {
  preload: preload,
  create: create,
  update: update,
  render: render
});



var background    = [];
var animations    = {};
var player        = null;
var enemies       = [];
var enemySpawnRate = defaults.enemySpawnRate;
var parallaxSpeed = defaults.parallaxSpeed;
var cursors;
var fireButton;
var isLeftDoubleTap  = false;
var isRightDoubleTap = false;
var lastTap          = 0;
var cooldown         = 0;
var music, burst, laser, smallExplode;
var bullets, enemyBullets;
var bulletTime = 0;
var random = new Phaser.RandomDataGenerator(+new Date());
var playerHealth = defaults.playerHealth;

/*
 |-------------------------
 | Combos
 |-------------------------
 */
 // TODO add a handler that interprets
 // button presses and determines the
 // correct move
var combos = [
// TODO left
// TODO right
// TODO fire
  {
    name: "Burst Right",
    combo: ["Right", "Right"],
    callback: function() {
      player.body.velocity.x = defaults.boostSpeed;
      player.play('right');
    
      burst.play();
      cooldown = 1;
    }
  },
  {
    name: "Burst Left",
    combo: ["Left", "Left"],
    callback: function() {
      player.body.velocity.x = -defaults.boostSpeed;
      player.play('left');
    
      burst.play();
      cooldown = 1;
    }
  },
  {
    name: "Quick Burst",
    combo: ["Up", "Up", "Fire"],
    callback: function() {
      player.body.velocity.x = -defaults.boostSpeed;
      player.play('left');
    
      burst.play();
      cooldown = 1;
    }
  }
];

/*
 |-------------------------
 | Preload
 |-------------------------
 |
 |
 */
function preload() {
  game.load.image('background0', 'assets/sprites/parallax0000.png');
  game.load.image('background1', 'assets/sprites/parallax0001.png');
  game.load.image('background2', 'assets/sprites/parallax0002.png');
  game.load.spritesheet(
    'starfighter',
    'assets/sprites/fighter-spritesheet.png',
    95,
    151
  );
  game.load.spritesheet(
    'short-beam',
    'assets/sprites/short-beam-spritesheet.png',
    16,
    16
  );
  game.load.spritesheet(
    'enemy-small',
    'assets/sprites/enemy0000.png',
    64,
    64
  );
  game.load.spritesheet(
    'enemy-beam',
    'assets/sprites/enemy-beam-spritesheet.png',
    7,
    6
  );
  game.load.spritesheet(
    'explosion',
    'assets/sprites/explosion-spritesheet.png',
    65,
    65
  );
  game.load.spritesheet(
    'small-explosion',
    'assets/sprites/small-explosion-spritesheet.png',
    9,
    13
  );

  game.load.audio('background', ['assets/music/temp-music.mp3', 'assets/music/temp-music.ogg']);
  game.load.audio('burst', ['assets/sounds/burst.wav']);
  game.load.audio('laser', ['assets/sounds/laser.wav']);
  game.load.audio('small-explode', ['assets/sounds/small-explode.wav']);
}

/*
 |-------------------------
 | Create
 |-------------------------
 |
 |
 */
function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Create tile sprites for the scrolling background
  background.push( game.add.tileSprite( 0, 0, defaults.width, defaults.height, 'background2' ) );
  background.push( game.add.tileSprite( 0, 0, defaults.width, defaults.height, 'background1' ) );
  background.push( game.add.tileSprite( 0, 0, defaults.width, defaults.height, 'background0' ) );

  // Player bullets (bullets before player for layering)
  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  bullets.createMultiple(30, 'short-beam');
  bullets.setAll('anchor.x', 0.5);
  bullets.setAll('anchor.y', 0.5);
  bullets.setAll('outOfBoundsKill', true);
  bullets.setAll('checkWorldBounds', true);
  bullets.setAll('angle', 270 );

  // Enemy bullets (bullets before player for layering)
  enemyBullets = game.add.group();
  enemyBullets.enableBody = true;
  enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
  enemyBullets.createMultiple(30, 'enemy-beam');
  enemyBullets.setAll('anchor.x', 0.5);
  enemyBullets.setAll('anchor.y', 0.5);
  enemyBullets.setAll('outOfBoundsKill', true);
  enemyBullets.setAll('checkWorldBounds', true);

  // Create starfighter
  player = game.add.sprite(
      defaults.width / 2,
      defaults.height - 100,
      'starfighter'
  );
  player.anchor.setTo(0.5, 0.5);
  player.scale.setTo(0.5, 0.5);
  game.physics.enable( player, Phaser.Physics.ARCADE );
  player.body.collideWorldBounds = true;
  player.body.bounce.setTo(0.0, 0.0);
  player.body.setSize( 50, 131, 0, 5 );
  animations.left  = player.animations.add('left', [4,4,3,3,2,2,2,1,1,1,1,0,0,0,0,0,0,1,1,1,1,2,2,2,3,3,4,4], 10, true);
  animations.init  = player.animations.add('init', [5], 0, true);
  animations.right = player.animations.add('right', [6,6,7,7,8,8,8,9,9,9,9,10,10,10,10,10,10,9,9,9,8,8,8,7,7,6,6], 10, true);
  animations.left.enableUpdate  = true;
  animations.init.enableUpdate  = true;
  animations.right.enableUpdate = true;

  player.play('init');

  // Explosion (explosions after everything else)
  explosions = game.add.group();
  explosions.createMultiple(30, 'explosion');
  explosions.setAll('anchor.x', 0.5);
  explosions.setAll('anchor.y', 0.5);
  explosions.forEach(function( explosion ) {
    explosion.animations.add('explode', [0,1,2,3,4]);
  }, this);

  // Explosion (explosions after everything else)
  smallExplosions = game.add.group();
  smallExplosions.createMultiple(10, 'small-explosion');
  smallExplosions.setAll('anchor.x', 0.5);
  smallExplosions.setAll('anchor.y', 0.5);
  smallExplosions.forEach(function( explosion ) {
    explosion.animations.add('explode', [0,1,2]);
  }, this);
  

  // Add controls
  cursors    = game.input.keyboard.createCursorKeys();
  fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  cursors.left.onDown.add( doubleClick, this );
  cursors.right.onDown.add( doubleClick, this );
  fireButton.onDown.add( fireBullet );

  // Music
  music = game.add.audio('background');
  music.loopFull(1);
  music.play();

  // Sounds
  burst = game.add.audio('burst');
  burst.volume = 0.5;

  laser = game.add.audio('laser');
  laser.volume = 0.5;

  smallExplode = game.add.audio('small-explode');
  smallExplode.volume = 0.6;
}

function doubleClick( item ) {
  var now = +new Date();
  var diff = now - lastTap.time;

  if ( diff < 600 && diff > 0 ) {
    if ( item.event.keyIdentifier === 'Left' &&
         lastTap.dir === 'Left' ) {
      isLeftDoubleTap = true;
    } else if ( item.event.keyIdentifier === 'Right' &&
         lastTap.dir === 'Right' ) {
      isRightDoubleTap = true;
    } else {
      lastTap = { time : +new Date(), dir : 'none'}
    }
  }

  lastTap = {
    time: +new Date(),
    dir: item.event.keyIdentifier
  };
}


/*
 |-------------------------
 | Update
 |-------------------------
 |
 |
 */
function update() {
  var tempSpeed;

  parallaxSpeed = defaults.parallaxSpeed;

  // Scroll the background
  _.each(background, function( b, i ) {
    b.tilePosition.y += (i + 1) * parallaxSpeed;
  });
  
  handleEnemies();

  // Handle player input
  if ( player.alive ) {
    if ( isLeftDoubleTap || isRightDoubleTap ) {
      if (cooldown === 0) {
        var factor = defaults.boostSpeed;
        factor = isLeftDoubleTap ? -factor : factor;
        
        player.body.velocity.x = factor;

        if ( isLeftDoubleTap ) {
          player.play('left');
        } else {
          player.play('right');
        }
        
        cooldown        = defaults.boostFrames;
        
        burst.play();
      }

      isRightDoubleTap = false;
      isLeftDoubleTap = false;
    }
    else if (cursors.left.isDown) {
      tempSpeed = player.body.velocity.x;
      tempSpeed -= 10;

      if ( cooldown === 0 ) {
        tempSpeed = Math.max( tempSpeed, -defaults.maxSpeed );
      }
      player.body.velocity.x = tempSpeed;
      player.play('left');
    }
    else if (cursors.right.isDown) {
      tempSpeed = player.body.velocity.x;
      tempSpeed += 10;

      if ( cooldown === 0 ) {
        tempSpeed = Math.min( tempSpeed, defaults.maxSpeed );
      }
      player.body.velocity.x = tempSpeed;
      player.play('right');
    } else {
      // Slow down
      if ( cooldown === 0 ) {
        if ( player.body.velocity.x != 0 ) {
          if ( player.body.velocity.x > 0 ) {
            tempSpeed = player.body.velocity.x;
            tempSpeed -= 10;

            tempSpeed = tempSpeed <= 0 ? 0 : tempSpeed;
            player.body.velocity.x = tempSpeed;
          } else if ( player.body.velocity.x < 0 ) {
            tempSpeed = player.body.velocity.x;
            tempSpeed += 10;

            tempSpeed = tempSpeed >= 0 ? 0 : tempSpeed;
            player.body.velocity.x = tempSpeed;
          }
        }
      }
      
      player.play('init');
    }
  }

  var deltaTime = game.time.elapsed / 1000;

  if ( cooldown > 0 )
    cooldown -= deltaTime;
  cooldown = cooldown < 0 ? 0 : cooldown;

  //  Run collision
  game.physics.arcade.overlap(bullets, enemies, collisionHandler, null, this);
  game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
}

function fireBullet () {
  //  To avoid them being allowed to fire too fast we set a time limit
  if ( game.time.now > bulletTime ) {
    //  Grab the first bullet we can from the pool
    bullet = bullets.getFirstExists( false );
    laser.play();

    if ( bullet ) {
      //  And fire it
      bullet.reset( player.x, player.y + 8 );
      bullet.body.velocity.y = -400;
      bulletTime = game.time.now + 100;
    }
  }
}

//  Called if the bullet goes out of the screen
function resetBullet ( bullet ) {
  bullet.kill();
}


function handleEnemies() {
  if ( enemies.length < defaults.maxNumberOfEnemies ) {
    if ( random.between(0, enemySpawnRate ) < 1 ) {
      enemySpawnRate = defaults.enemySpawnRate;

      createEnemy();
    } else {
      enemySpawnRate -= 1;
    }
  }

  rotateEnemiesTowardPlayer();
  enemiesShoot();
}

function createEnemy() {
  var enemy = game.add.sprite(
      random.between( -10, defaults.width + 10 ),
      random.between( -10, -20 ),
      'enemy-small'
    );
  enemy.anchor.setTo(0.5, 0.5);
  enemy.scale.setTo(0.5, 0.5);
  enemy.angle = 180;
  game.physics.enable( enemy, Phaser.Physics.ARCADE );
  var tween = game.add.tween( enemy ).to(
    { 
      x: random.between( -10, defaults.width + 10 ),
      y: defaults.height + random.between( 100, 200 )
    },
    7000,
    Phaser.Easing.Linear.None,
    true,
    0,
    1000,
    true
  );
  tween.onLoop.add(killEnemy, this);

  enemies.push(
    enemy
  );
}

function killEnemy( enemy ) {
  for ( var i = 0; i < enemies.length; i++ ) {
    if ( enemies[ i ] === enemy ) {
      enemies.splice( i, 1 );
    }
  }

  enemy.kill();
}

function rotateTowardsPlayer( obj, instant, offsetRotation ) {
  var angle = this.game.math.angleBetween( obj.position.x, obj.position.y, player.position.x, player.position.y ) + offsetRotation;
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
        obj.angle += 5;
      } else {
        // Turn counter-clockwise
        obj.angle -= 5;
      }

      // Just set angle to target angle if they are close
      if ( Math.abs( delta ) < game.math.degToRad( 5 ) ) {
        obj.rotation = angle;
      }
    }
  }

}

function rotateEnemiesTowardPlayer() {
  for( var i = 0; i < enemies.length; i++ ) {
    var enemy = enemies[i];

    rotateTowardsPlayer( enemy, false, Math.PI / 2.0 );
  }
}

// TODO another type of enemy that homes in
// Calculate velocity vector based on this.rotation and this.SPEED
// this.body.velocity.x = Math.cos(this.rotation) * this.SPEED;
// this.body.velocity.y = Math.sin(this.rotation) * this.SPEED;


function enemiesShoot() {
  for( var i = 0; i < enemies.length; i++ ) {
    var enemy = enemies[i];
    if ( enemy.alive &&
         random.between( 0, 50 * defaults.maxNumberOfEnemies ) < 1 &&
         enemy.position.y < defaults.height - 200 ) {
      //  Grab the first bullet we can from the pool
      enemyBullet = enemyBullets.getFirstExists( false );
      // TODO different sound
      laser.play();

      if ( enemyBullet ) {
        //  And fire it
        enemyBullet.reset( enemy.x, enemy.y + 8 );
        rotateTowardsPlayer( enemyBullet, true, 0 );
        enemyBullet.body.velocity.x = Math.cos( enemyBullet.rotation ) * 300;
        enemyBullet.body.velocity.y = Math.sin( enemyBullet.rotation ) * 300;
      }
    }
  }
}

function collisionHandler(enemy, bullet) {
  bullet.kill();
  killEnemy( enemy );

  var explosion = explosions.getFirstExists(false);
  explosion.reset(enemy.body.x, enemy.body.y);
  explosion.play('explode', 30, false, true);
  smallExplode.play();
}

function enemyHitsPlayer(player, bullet) {
  playerHealth -= 10;
  bullet.kill();

  if ( playerHealth <= 0 ) {
    player.kill();

    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('explode', 30, false, true);

    // TODO lose
  } else {
    var explosion = smallExplosions.getFirstExists(false);
    explosion.reset(bullet.body.x, bullet.body.y);
    explosion.play('explode', 30, false, true);
    smallExplode.play();
  }

}

/*
 |-------------------
 | Render Debugging
 |-------------------
 |
 |
 */
function render() {
  // game.debug.bodyInfo(player, 32, 32);
  // game.debug.body(player);
  // game.debug.body(enemies);
}