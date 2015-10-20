function Boot( game ) {};

Boot.prototype.preload = function () {
  // TODO load splash images
}

Boot.prototype.create = function () {
  var game = this;
  var resize = function () {
    var height = $(window).height() - 2 * $('body').css("margin-top").replace("px", "");
    var width = $(window).width() - 2 * $('body').css("margin-left").replace("px", "");
      
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.minWidth = 320;
    game.scale.minHeight = 480;
    game.scale.maxWidth = width;
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