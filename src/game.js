var defaults = {
  width: 600,
  height: 800,
  parallaxSpeed: 0.4,
  maxSpeed: 200,
  boostSpeed: 400,
  boostFrames: 4,
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
}

function doubleClick( item ) {
  var now = +new Date();
  var diff = now - lastTap;

  if ( diff < 600 && diff > 0 ) {
    if ( item.event.keyIdentifier === 'Left' ) {
      isLeftDoubleTap = true;
    } else if ( item.event.keyIdentifier === 'Right' ) {
      isRightDoubleTap = true;
    }
  }

  lastTap = +new Date();
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
    if (isLeftDoubleTap && cooldown === 0) {
      player.body.velocity.x = -defaults.boostSpeed;
      player.play('left');
      isLeftDoubleTap = false;
      cooldown        = defaults.boostFrames;
    }
    else if (isRightDoubleTap && cooldown === 0) {
      player.body.velocity.x = defaults.boostSpeed;
      player.play('right');
      isRightDoubleTap = false;
      cooldown         = defaults.boostFrames;
    }
    else if (cursors.left.isDown) {
      tempSpeed = player.body.velocity.x;
      tempSpeed -= 10;

      tempSpeed = Math.max( tempSpeed, -defaults.maxSpeed );
      player.body.velocity.x = tempSpeed;
      player.play('left');
    }
    else if (cursors.right.isDown) {
      tempSpeed = player.body.velocity.x;
      tempSpeed += 10;

      tempSpeed = Math.min( tempSpeed, defaults.maxSpeed );
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
      } else {
        cooldown--;
        cooldown = cooldown < 0 ? 0 : cooldown;
      }
      
      player.play('init');
    }
  }
}




