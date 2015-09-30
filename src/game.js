var defaults = {
  width: 600,
  height: 800,
  parallaxSpeed: 0.8,
  maxSpeed: 120,
  boostSpeed: 240,
  boostFrames: 1,
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
  update: update
});



var background    = [];
var animations    = {};
var player        = null;
var parallaxSpeed = defaults.parallaxSpeed;
var cursors;
var fireButton;
var isLeftDoubleTap  = false;
var isRightDoubleTap = false;
var lastTap          = 0;
var cooldown         = 0;
var music, burst;


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

  game.load.audio('background', ['assets/music/temp-music.mp3', 'assets/music/temp-music.ogg']);
  game.load.audio('burst', ['assets/sounds/burst.wav']);
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
  animations.left  = player.animations.add('left', [0,1,2,3,4,4,4,4,3,2,1], 10, true);
  animations.init  = player.animations.add('init', [5], 0, true);
  animations.right = player.animations.add('right', [6,7,8,9,10,10,10,10,9,8,7], 10, true);
  animations.left.enableUpdate  = true;
  animations.init.enableUpdate  = true;
  animations.right.enableUpdate = true;

  player.play('init');

  // Add controls
  cursors    = game.input.keyboard.createCursorKeys();
  fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  cursors.left.onDown.add( doubleClick, this );
  cursors.right.onDown.add( doubleClick, this );

  // Music
  music = game.add.audio('background');
  music.loopFull(1);
  music.play();

  // Sounds
  burst = game.add.audio('burst');
  burst.volume = 0.5;
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
  

  // Handle player input
  if (player.alive) {
    if (isLeftDoubleTap || isRightDoubleTap) {
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
}




