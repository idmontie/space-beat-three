function Boot( game ) {};

Boot.prototype.preload = function () {
  // TODO load splash images
}

Boot.prototype.create = function () {
  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.scale.minWidth = 320;
  this.scale.minHeight = 480;
  this.scale.maxWidth = 768;
  this.scale.maxHeight = 1152;
  this.scale.refresh();

  this.state.start( 'Preloader' );
}


module.exports = Boot;