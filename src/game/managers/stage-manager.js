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