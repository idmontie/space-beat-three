function StartMenu( game ) {}

StartMenu.prototype.create = function () {
  var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};

  this.titleText = this.game.add.text(this.game.world.centerX, 300, 'Space Beat Three', style);
  this.titleText.anchor.setTo(0.5, 0.5);

  this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click anywhere to play', { font: '16px Arial', fill: '#ffffff', align: 'center'});
  this.instructionsText.anchor.setTo(0.5, 0.5);

}

StartMenu.prototype.update = function () {
  if(this.game.input.activePointer.justPressed()) {
    this.startGame();
  }
}

StartMenu.prototype.startGame = function () {
  this.state.start( 'Game' );
}



module.exports = StartMenu;