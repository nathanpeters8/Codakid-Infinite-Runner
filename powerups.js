// Shield Powerup
function Shield(x, y) {
  Phaser.Sprite.call(this, game, x, y, 'shield');
  game.add.existing(this);

  this.size = 30;

  this.anchor.setTo(0.5, 0.5);
}
Shield.prototype = Object.create(Phaser.Sprite.prototype);

Shield.prototype.update = function() {
  // move shield
  this.x -= 4;

  // check for collision with player
  if(checkCollision(this, player)) {
    // run player's shield function
    player.shield();

    this.destroy();
  }
}


// Coin Magnet 
function CoinMagnet(x, y) {
  Phaser.Sprite.call(this, game, x, y, 'magnet');
  game.add.existing(this);

  this.size = 30;

  this.anchor.setTo(0.5, 0.5);
}
CoinMagnet.prototype = Object.create(Phaser.Sprite.prototype);