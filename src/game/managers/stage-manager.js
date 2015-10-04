function StageManager() {
  var _stage = 2;

  var isStage = function ( stage ) {
    return _stage >= stage;
  }

  return {
    isStage : isStage
  }
}

module.exports = StageManager;