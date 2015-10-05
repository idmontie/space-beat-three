function StartMenu( game ) {}

StartMenu.prototype.create = function () {
  // TODO set up start menu

  // TODO delete this line once the start menu is set up
  this.state.start( 'Game' );
}

StartMenu.prototype.startGame = function () {
  this.state.start( 'Game' );
}



module.exports = StartMenu;