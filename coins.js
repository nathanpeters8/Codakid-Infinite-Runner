// Coin constructor
function Coin(x, y) {
  Phaser.Sprite.call(this, game, x, y, 'coin');
  game.add.existing(this);

  this.size = 25;

  this.anchor.setTo(0.5, 0.5);
}

Coin.prototype = Object.create(Phaser.Sprite.prototype);

Coin.prototype.update = function() {
  this.x -= 5;

  // check for collision with player
  if(checkCollision(this, player)) {
    this.destroy();
    game.coinScore++;
  }
}

// coin spawner object
game.coinSpawner = {};

// spawn coins in zig zag pattern
game.coinSpawner.zigzag = function(x, y) {
  var coin1 = new Coin(x, y);
  var coin2 = new Coin(x + 50, y - 50);
  var coin3 = new Coin(x + 100, y - 100);
  var coin4 = new Coin(x + 150, y - 50);
  var coin5 = new Coin(x + 200, y);
  var coin6 = new Coin(x + 250, y + 50);
  var coin7 = new Coin(x + 300, y + 100);
  var coin8 = new Coin(x + 350, y + 50);
  var coin9 = new Coin(x + 400, y);
}


// diamond pattern
game.coinSpawner.diamond = function(x, y) {
  var coin1 = new Coin(x, y);
  var coin2 = new Coin(x + 50, y + 50);
  var coin3 = new Coin(x + 50, y - 50);
  var coin4 = new Coin(x + 100, y + 100);
  var coin5 = new Coin(x + 100, y);
  var coin6 = new Coin(x + 100, y - 100);
  var coin7 = new Coin(x + 150, y + 50);
  var coin8 = new Coin(x + 150, y - 50);
  var coin9 = new Coin(x + 200, y);
}