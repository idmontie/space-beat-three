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