function Player() {
  var health      = 100;
  var maxSpeed    = 120;
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