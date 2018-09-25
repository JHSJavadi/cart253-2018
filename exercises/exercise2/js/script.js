/*********************************************************

Exercise 2 - The Artful Dodger
Pippin Barr

Starter code for exercise 2.

*********************************************************/

// The position and size of our avatar circle
var avatarX;
var avatarY;
var avatarSize = 100
var avatarSizeIncrease = 10

// The speed and velocity of our avatar circle
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;
var avatarSpeedIncrease = .5;
// The position and size of the enemy circle
var enemyX;
var enemyY;
var enemySize = 100;
// How much bigger the enemy circle gets with each successful dodge
var enemySizeIncrease = 20;

// The speed and velocity of our enemy circle
var enemySpeed = 5;
var enemyVX = 5;
// How much bigger the enemy circle gets with each successful dodge
var enemySpeedIncrease = 0.5;

var enemyImg;
var avatarImg;

var bgImg;

// How many dodges the player has made
var dodges = 0;
var myFont;

function preload() {
  myFont = loadFont("assets/font/kh.ttf");
  enemyImg = loadImage("assets/images/heartless.png");
  avatarImg = loadImage("assets/images/riku.png");
  bgImg = loadImage("assets/images/island.gif");
}

// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  console.log("setup");
  // Create our playing area
  createCanvas(900,500);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  console.log("placing enemy");
  enemyX = 0;
  enemyY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();
}

function movement() {
  if (keyIsDown(LEFT_ARROW)) {
    console.log("left arrow is pressed");
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    console.log("right arrow is pressed");
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    console.log("up arrow is pressed");
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    console.log("down arrow is pressed");
    avatarVY = avatarSpeed;
  }
}

function randomSpeed () {
  if (dodges > 5) {
  avatarSpeed = random(1,20);
}
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    console.log("up arrow is pressed");
    avatarVY = random(-avatarSpeed);
  }
  else if (keyIsDown(DOWN_ARROW)) {
    console.log("down arrow is pressed");
    avatarVY =  random(avatarSpeed);
  }


// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // A pink background
background(bgImg);
  //set a font
  textFont(myFont);
  //set the size of the text
  textSize(30);
  //display the amount of times the player dodged the enemy circle
  console.log("display text");
  //align the text at the top left
  textAlign(LEFT, TOP);
  fill(41, 48, 142);
  text ("Total dodge rolls  " + dodges, width/20, height/20);

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately
movement();
  // Left and right

//Makes it so that the avatar moves slowly at the beginning of the game
//The first 5 dodges specifically
if (dodges <=5) {
  console.log("move slower")
  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    console.log("up arrow is pressed");
    avatarVY = -avatarSpeed/3;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    console.log("down arrow is pressed");
    avatarVY = avatarSpeed/3;
  }
  else {
    if (keyIsDown(LEFT_ARROW)) {
      console.log("left arrow is pressed");
      avatarVX = -avatarSpeed/2;
    }
    else if (keyIsDown(RIGHT_ARROW)) {
      console.log("right arrow is pressed");
      avatarVX = avatarSpeed/2;
    }

    // Up and down (separate if-statements so you can move vertically and
    // horizontally at the same time)
    if (keyIsDown(UP_ARROW)) {
      console.log("up arrow is pressed");
      avatarVY = -avatarSpeed;
    }
    else if (keyIsDown(DOWN_ARROW)) {
      console.log("down arrow is pressed");
      avatarVY = avatarSpeed;
    }
  }
}

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed (which increases)
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the enemy's size and speed
    enemySize = 50;
    enemySpeed = 5;
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    //reset the avatar's size
    avatarSize = 100;
    // Reset the dodge counter
    dodges = 0;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0,height);
    enemySize = 50;
    enemySpeed = 5;
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
    // Increase the enemy's speed and size to make the game harder
    enemySpeed = enemySpeed + enemySpeedIncrease;
    enemySize = enemySize + random(10,enemySizeIncrease);
    //Changes the players size
    avatarSize = random(60, 100);
    randomSpeed();
  }

  // Display the current number of successful in the console
  console.log(dodges);


  // Load the image for avatar
  image(avatarImg, avatarX,avatarY,avatarSize,avatarSize);

  // Load the image for enemy
  image(enemyImg, enemyX,enemyY,enemySize,enemySize);

}
