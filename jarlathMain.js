//This first line creates our game object.
var game = new Phaser.Game(960, 640, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
var player;

//Load all of your textures and sounds
function preload() {
  game.load.spritesheet('player', 'assets/players/pirate_green.png', 114, 114);
  game.load.spritesheet('enemy1', 'assets/enemies/bat.png', 114, 114);
  game.load.spritesheet('enemy2', 'assets/enemies/chomper.png', 114, 114);
  game.load.spritesheet('enemy3', 'assets/enemies/zombie.png', 114, 114);
  game.load.spritesheet('zigZagEnemy', 'assets/enemies/mine.png', 114, 114);
  game.load.spritesheet('chaserEnemy', 'assets/enemies/zombie.png', 114, 114);
  game.load.spritesheet('speedEnemy', 'assets/enemies/ghost.png', 114, 114);

  game.load.image('warning', 'assets/ui/warning.png');

  // loading image for background
  game.load.image('background', 'assets/backgrounds/background3.png');

  //load our font
  game.load.bitmapFont('font', 'assets/fonts/font2.png', 'assets/fonts/font2.fnt');

  // load image for coins
  game.load.image('coin', 'assets/pickups/coin4.png');
}

//Do all of your initial setup
function create() {
  game.scale.setUserScale(window.innerWidth / 960, window.innerHeight / 640);
  game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

  // create background
  game.background = game.add.tileSprite(0, 0, 960, 640, 'background');

  makePlayer();

  spawnEnemy();
  spawnEnemy();
  spawnEnemy();

  //var zzEnemy = new ZigZagger(500, 300, 8)

  var chaserEnemy = new Chaser(1000, 200, 6);
  var speed = new Speed(300);

  //spawn coins
  spawnCoins();

  game.playerSpeed = 8;
  game.upgradeState = 0;

  // game over

  game.gameOverText = game.add.bitmapText(game.world.centerX, game.world.centerY, 'font', 'Game Over \n Tap To Reset');
  game.gameOverText.anchor.setTo(0.5, 0.5);
  game.gameOverText.align = 'center';
  game.gameOverText.visible = false;

  // create score
  game.score = 0;
  game.scoreText = game.add.bitmapText(25, 25, 'font', 'score: ', game.score);
  game.scoreText.visible = true;
  increaseScore();

  // upgrades for the player
  game.upgradeText = game.add.bitmapText(15, 200, 'font', 'press Q to increase jump speed');
  game.upgradeText.visible = false;

  game.speedText = game.add.bitmapText(15, 100, 'font', 'player speed = ' + game.playerSpeed);
  game.speedText.visible = false;

  // create the highscore
  game.highScore = 0;

  game.highScoreText = game.add.bitmapText(25, 65, 'font', 'HighScore: ' + game.highScore);
  game.highScoreText.visible = true;

  // create total coins collected
  game.totalCoins = 0;
  game.totalCoinsText = game.add.bitmapText(700, 25, 'font', 'total coins: ' + game.totalCoins);

  //game.highScore.scale.setTo(0.75, 0.75);

  game.coinScore = 0;
  game.coinScoreText = game.add.bitmapText(825, 65, 'font', 'Coins: ' + game.coinScore);
  game.coinScoreText.anchor.setTo(1, 0);

  // upgrade page
  game.upgradePageText = game.add.bitmapText(25, 25, 'font', 'upgrade page');
  game.upgradePageText.visible = false;

  game.upgradeText2 = game.add.bitmapText(15, 600, 'font', 'press A to continue to upgrades');
  game.upgradeText2.visible = false;

  game.exitUpgradeText = game.add.bitmapText(15, 300, 'font', 'press U to exit upgrades');
  game.exitUpgradeText.visible = false;
}

//Write all of your continuous game logic here
function update() {
  game.background.tilePosition.x -= 4;

  if (game.input.activePointer.justPressed() && game.isOver) {
    restart();
  }

  // update the score
  game.scoreText.text = 'Score: ' + game.score;
  game.coinScoreText.text = 'Coins: ' + game.coinScore;
  game.totalCoinsText.text = 'Total Coins: ' + game.totalCoins;
  game.speedText.text = 'Speed: ' + game.playerSpeed;
}
