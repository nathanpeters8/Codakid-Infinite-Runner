//This first line creates our game object.
var game = new Phaser.Game(960, 640, Phaser.AUTO, "game", { preload: preload, create: create, update: update });
var player;

//Load all of your textures and sounds
function preload() {
  game.load.spritesheet("player", "assets/players/pirate_red.png", 114, 114);
  game.load.image("background", "assets/backgrounds/background1.png");

  game.load.spritesheet("enemy1", "assets/enemies/octopus.png", 114, 114);
  game.load.spritesheet("enemy2", "assets/enemies/chomper.png", 114, 114);
  game.load.spritesheet("enemy3", "assets/enemies/mine.png", 114, 114);
  game.load.spritesheet("zigZagEnemy", "assets/enemies/bat.png", 114, 114);
  game.load.spritesheet("chaser", "assets/enemies/ghost.png", 114, 114);
  game.load.spritesheet('speedEnemy', 'assets/enemies/zombie.png', 114, 114);
  
  game.load.image('warning', 'assets/ui/warning.png');

  //load our font
  game.load.bitmapFont("font", "assets/fonts/font2.png", "assets/fonts/font2.fnt");

  // load image for coins
  game.load.image('coin', 'assets/pickups/coin4.png');

  // powerup images
  game.load.image('shield', 'assets/pickups/powerup2.png');
  game.load.image('magnet', 'assets/pickups/powerup1.png');
}

//Do all of your initial setup
function create() {
  game.scale.setUserScale(window.innerWidth / 960, window.innerHeight / 640);
  game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

  // create background
  game.background = game.add.tileSprite(0, 0, 960, 640, "background");

  // player object
  makePlayer();

  spawnEnemy();

  // spawn coins
  spawnCoins();

  // spawn powerups
  spawnPowerups();

  //game over text
  game.gameOverText = game.add.bitmapText(game.world.centerX, game.world.centerY, "font", "Game Over\nTap To Restart");
  game.gameOverText.anchor.setTo(0.5, 0.5);
  game.gameOverText.align = "center";
  game.gameOverText.visible = false;

  // create score
  game.score = 0;
  game.scoreText = game.add.bitmapText(25, 25, "font", "Score: 0");
  increaseScore();

  // create high score
  game.highScore = 0;
  game.highScoreText = game.add.bitmapText(25, 60, "font", "High Score: " + game.highScore);
  game.highScoreText.scale.setTo(0.50, 0.50);

  game.coinScore = 0;
  game.coinScoreText = game.add.bitmapText(935, 25, 'font', "Coins: " + game.coinScore);
  game.coinScoreText.anchor.setTo(1, 0);
}

//Write all of your continuous game logic here
function update() {
  //move the background
  game.background.tilePosition.x -= 4;

  // restart game if screen clicked
  if (game.input.activePointer.justPressed() && game.isOver) {
    restart();
  }

  // update the score
  game.scoreText.text = "Score: " + game.score;

  //update coin score
  game.coinScoreText.text = 'Coins: ' + game.coinScore;
}
