module.exports = {
  background : {
    speed: 0.8
  },
  enemies : {
    small : {
      maxNumber: 30,
      spawnRate: 100
    },
    medium : {
      maxNumber: 5,
      spawnRate: 400,
      health: 100
    },
    large : {
      maxNumber: 1,
      spawnRate: 1000,
      health: 500
    }
  },
  game : {
    debug : false
  },
  player: {
    health: 100,
    maxSpeed: 120
  },
  size : {
    width: 600,
    height: 800
  }
};