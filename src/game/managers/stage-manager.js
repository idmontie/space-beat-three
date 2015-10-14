function StageManager( game ) {
  var _stage = 0;
  var _score = 0;

  var isStage = function ( stage ) {
    return _stage >= stage;
  }

  var getStage = function () {
    return _stage;
  }

  var lose = function () {
    var score = game.guiManager.getScore();

    amplify.store( 'topScore', score );

    game.state.start( 'StartMenu' );

    game.reset();
    game.soundManager.stop();
    _stage = 0;
  }

  game.pubsub.subscribe( 'score.add', function (e, score) {
    _score += score;

    if ( _score > 35000 ) {
      _stage = 8;
    } else if ( _score > 25000 ) {
      _stage = 7;
    } else if ( _score > 16000 ) {
      _stage = 6;
    } else if ( _score > 10000 ) {
      _stage = 5;
    } else if ( _score > 6000 ) {
      _stage = 4;
    } else if ( _score > 2000 ) {
      _stage = 3;
    } else if ( _score > 500 ) {
      _stage = 2;
    } else if ( _score > 5 ) {
      _stage = 1;
    }
  });

  return {
    isStage : isStage,
    getStage : getStage,
    lose: lose
  }
}

module.exports = StageManager;