function StageManager() {
  var _stage = 3;

  var isStage = function ( stage ) {
    return _stage >= stage;
  }

  return {
    isStage : isStage
  }
}

module.exports = StageManager;