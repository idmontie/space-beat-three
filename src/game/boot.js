var Settings = require('core/settings');

function Boot( game ) {};

Boot.prototype.preload = function () {
  // TODO load splash images
}

Boot.prototype.create = function () {
  var game = this;
  var ratio = Settings.size.width / Settings.size.height;
  var resize = function () {
    var height = $(window).height() - 2 * $('body').css("margin-top").replace("px", "");
    var width = $(window).width() - 2 * $('body').css("margin-left").replace("px", "");

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.minWidth = height * ratio;
    game.scale.minHeight = height;
    game.scale.maxWidth = height * ratio;
    game.scale.maxHeight = height;
    game.scale.refresh();
  }

  $(window).resize(resize);

  resize();
    
  if (this.renderType === Phaser.WEBGL) {
    this.renderer.resize(width, height);
  }

  this.state.start( 'Preloader' );
}


module.exports = Boot;