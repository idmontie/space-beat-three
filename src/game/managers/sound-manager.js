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
