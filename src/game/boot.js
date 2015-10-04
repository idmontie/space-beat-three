function Boot( game ) {};

Boot.prototype.preload = function () {
  // TODO load splash images
}

Boot.prototype.create = function () {
  // TODO set up game settings

  this.state.start( 'Preloader' );
}


module.exports = Boot;