/******************************************************

Game - Chaser
Pippin Barr

A simple game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/

// Track whether the game is over
var gameOver = false;

// Player position, size, velocity
var playerX;
var playerY;
var playerRadius = 25;
var playerVX = 0;
var playerVY = 0;
var playerMaxSpeed = 2;
// Player health
var playerHealth;
var playerMaxHealth = 255;
// Player fill color
var playerFill = 50;

// Prey position, size, velocity
var preyX;
var preyY;
var preyRadius = 25;
var preyVX;
var preyVY;
var preyMaxSpeed = 4;
// Prey health
var preyHealth;
var preyMaxHealth = 100;
// Prey fill color
var preyFill = 200;

// Amount of health obtained per frame of "eating" the prey
var eatHealth = 10;
// Number of prey eaten during the game
var preyEaten = 0;
//t variable for perlin noise
var preyTX = 6;
var preyTY = 90;
var preyT = 0.5;
var myFont;

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500,500);

  noStroke();
  myFont = loadFont("assets/font/kh.ttf");

  setupPrey();
  setupPlayer();
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width/5;
  preyY = height/2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  background(playerHealth,preyHealth,150);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();
    moveSlower();

    updateHealth();
    checkEating();
    lessLossBiggerSize();

    drawPrey();
    drawPlayer();
  }
  else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }
  else {
    playerVY = 0;
  }

  //add in a sprint function
  if (keyIsDown(SHIFT)) {
    //check the decrease in health of the player when using sprint
    playerMaxSpeed = 5;
    //reduce the players health by 2 rather than 1 when sprinting
    playerHealth = constrain(playerHealth - 1.5,0,playerMaxHealth);
  }
  else {
    playerMaxSpeed = 2;
      //when not sprinting, reduce players health by the set amount
    playerHealth = constrain(playerHealth -1,0,playerMaxHealth);
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX += playerVX;
  playerY += playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    playerX += width;
  }
  else if (playerX > width) {
    playerX -= width;
  }

  if (playerY < 0) {
    playerY += height;
  }
  else if (playerY > height) {
    playerY -= height;
  }
}
//NEW//
//the player will move slower the less health it has
function moveSlower() {
  if (playerHealth <= 100) {
    console.log("going slower");
    if (keyIsDown(LEFT_ARROW)) {
      playerVX = -playerMaxSpeed/4;
    }
    else if (keyIsDown(RIGHT_ARROW)) {
      playerVX = playerMaxSpeed/4;
    }
    else {
      playerVX = 0;
    }

    // Check for vertical movement
    if (keyIsDown(UP_ARROW)) {
      playerVY = -playerMaxSpeed/4;
    }
    else if (keyIsDown(DOWN_ARROW)) {
      playerVY = playerMaxSpeed/4;
    }
    else {
      playerVY = 0;
    }
  }
}
//END NEW//

// updateHealth()
//
// Reduce the player's health (every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health, constrain to reasonable range
  console.log(playerHealth);
  playerHealth = constrain(playerHealth - 0.5,0,playerMaxHealth);
  // Check if the player is dead
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  var d = dist(playerX,playerY,preyX,preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = constrain(playerHealth + eatHealth,0,playerMaxHealth);
    // Reduce the prey health
    preyHealth = constrain(preyHealth - eatHealth,0,preyMaxHealth);

    // Check if the prey died
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0,width);
      preyY = random(0,height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten++;
    }
  }
}
//NEW//
//if they player has eaten a certain amount of prey, the amount that they lose
//health by is reduced. This gives the player a little bit of an easier time
// with handling everything else
function lessLossBiggerSize () {
  if (preyEaten > 2) {
    playerHealth = constrain(playerHealth + 0.2,0,playerMaxHealth);
    preyRadius = 22;
  }
  else if (preyEaten > 4) {
      playerHealth = constrain(playerHealth + 0.3,0,playerMaxHealth);
      preyRadius = 19;
  }
  else if (preyEaten > 9) {
      playerHealth = constrain(playerHealth + 0.4,0,playerMaxHealth);
      preyRadius = 16;
  }
  else if (preyEaten > 14) {
      playerHealth = constrain(playerHealth + 0.5,0,playerMaxHealth);
      preyRadius = 12;
  }
  else {
      playerHealth = constrain(playerHealth + 0.6,0,playerMaxHealth);
      preyRadius = 25;
  }
}
//END NEW//

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
    // Set velocity based on random values to get a new direction
    // and speed of movement
    // Use map() to convert from the 0-1 range of the random() function
    // to the appropriate range of velocities for the prey
    //NEW//
    //used noise() instead of random to change the prey's movement
    preyVX = map(noise(preyTX),0,.9974,-preyMaxSpeed,preyMaxSpeed);
    preyVY = map(noise(preyTY),0,.93,-preyMaxSpeed,preyMaxSpeed);
    preyTX += .08;
    preyTY += .09;
    //END NEW//

  // Update prey position based on velocity
  preyX += preyVX;
  preyY += preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX += width;
  }
  else if (preyX > width) {
    preyX -= width;
  }

  if (preyY < 0) {
    preyY += height;
  }
  else if (preyY > height) {
    preyY -= height;
  }
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  fill(preyFill,preyHealth, 255);
  ellipse(preyX,preyY,preyRadius*2);
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha based on health
function drawPlayer() {
  fill(playerFill,playerHealth,240);
  ellipse(playerX,playerY,playerRadius*2);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  textSize(32);
  textAlign(CENTER,CENTER);
  fill(0);
  //added custom textFont
  textFont(myFont);
  var gameOverText = "GAME OVER\n";
  //depending how many points the player got, the game over text will
  //display different text, none of which are meant to give the player praise
  if (preyEaten < 3) {
    gameOverText += "Did you even try?";
  }
  else if (preyEaten > 4) {
    gameOverText += "You could do better.";
  }
  else if (preyEaten > 7) {
    gameOverText += "Not impressive.";
  }
  else if (preyEaten > 10) {
    gameOverText += "Is that the best you have to offer?";
  }
  text(gameOverText,width/2,height/2);
}
