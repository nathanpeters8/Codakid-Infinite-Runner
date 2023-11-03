function makePlayer() {
  player = game.add.sprite(100, 200, "player");
  player.size = 40;
  player.anchor.setTo(0.5, 0.5);
  var keyW = game.input.keyboard.addKey(Phaser.Keyboard.W);

  // player update function
  player.update = function () {
    if (keyW.isDown) {
      if (this.y > 60) {
        this.y -= 4;
      }
      this.frame = 0;
    } else {
      if (this.y < 580) {
        this.y += 4;
      }
      this.frame = 1;
    }
  };
}
