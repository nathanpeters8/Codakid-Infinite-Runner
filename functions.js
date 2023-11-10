// spawns a random enemy
function spawnEnemy() {
  var x = 1000;
  var y = game.rnd.between(50, 590);
  var speed = game.rnd.between(4, 10);
  var image = "enemy" + game.rnd.between(1, 3);
  var enemyType = game.rnd.between(1, 100);

  // spawn enemies with different probabilities
  if(enemyType < 50) { // 50%
    var enemy = new Enemy(x, y, speed, image);
  }
  else if(enemyType < 70) { // 20%
    var zig = new ZigZagger(x, y, speed);
  }
  else if(enemyType < 90) { // 20%
    var chase = new Chaser(x, y, speed);
  }
  else { // 10%
    var speedy = new Speed(y);
  }

  // increase how often enemies spawn over time
  var time;
  if(game.score < 15) {
    time = 3000;
  }
  else if(game.score < 30) {
    time = 2500;
  }
  else if(game.score < 45) {
    time = 2000;
  }
  else if(game.score < 60) {
    time = 1500;
  }
  else {
    time = 1000;
  }
  // set a timer
  game.time.events.add(time, spawnEnemy, this);
  console.log(time);

  // var newEnemy = new Enemy(x, y, speed, image);
}

// checks if two objects collide
function checkCollision(obj1, obj2) {
  var distance = Phaser.Math.distance(obj1.x, obj1.y, obj2.x, obj2.y);
  if (distance <= obj1.size + obj2.size) {
    console.log("player collided with enemy");
    return true;
  } else {
    return false;
  }
}

// end the game and show game over text
function gameOver() {
  //turn background red
  game.background.tint = 0xff0000;

  game.transparent = true;

  player.destroy();

  game.gameOverText.visible = true;

  game.isOver = true;

  // check if high score is beaten
  if(game.score > game.highScore) {
    game.highScore = game.score;
    game.highScoreText.text = 'High Score: ' + game.highScore;
  }
}

// restart the game 
function restart() {
    game.background.tint = 0xFFFFFF;
    makePlayer();
    game.gameOverText.visible = false;
    game.isOver = false;
    game.score = 0;
}

// increases the score
function increaseScore() {
    if(!game.isOver) {
        game.score++;  // same as game.score += 1
    }

    // create and start new timer
    game.time.events.add(1000, increaseScore, this);
}


// randomly spawn coin patterns
function spawnCoins() {
  var randomNumber = game.rnd.between(1, 2);
  var randomY = game.rnd.between(100, 550);

  if(randomNumber === 1) {
    game.coinSpawner.zigzag(1000, randomY);
  }
  if(randomNumber === 2) {
    game.coinSpawner.diamond(1000, randomY);
  }

  // start timer to reset function
  game.time.events.add(5000, spawnCoins, this);
}

// spawn powerups over time 
function spawnPowerups() {
  var randY = game.rnd.between(50, 590);
  var powerup = new Shield(1000, randY);

  // set up spawn timer
  var time = game.rnd.between(7500, 15000);
  game.time.events.add(time, spawnPowerups, this);
}