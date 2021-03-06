/******************************************************************************
Where's Sausage Dog?
by Pippin Barr

An algorithmic version of a Where's Wally searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
var targetX;
var targetY;
var targetImage;

var sampleImg;

// The ten decoy images
var decoyImage1;
var decoyImage2;
var decoyImage3;
var decoyImage4;
var decoyImage5;
var decoyImage6;
var decoyImage7;
var decoyImage8;
var decoyImage9;
var decoyImage10;

var rectX = 100;
var rectY = 75;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
var numDecoys = 100;

// Keep track of whether they've won
var gameOver = false;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");
  sampleImg = loadImage("assets/images/sample.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#ffff00");
  imageMode(CENTER);
  placeDecoys();
  placeDog();
}

function draw() {
  //makes it so the dog will neer be behind the rectangle
  while (targetX < width - 350 && targetY < height - 150) {
    console.log("replaced");
      background("#ffff00")
      fill(252, 134, 95);
      rect(0,30, rectX, rectY);
      //displayed the smaller image of the dog
      image(sampleImg, 40,60);
    placeDog();
    placeDecoys();
}

  if (gameOver) {
    // Prepare our typography
    textFont("Helvetica");
    textSize(128);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(random(255));
    // Tell them they won!
      text("YOU WINNED!",width/2,height/2);
    targetX = random(0,width);
    targetY = random(0,height);
    // And draw it (this means it will always be on top)
    image(targetImage,targetX,targetY);
    noFill();
    stroke(random(255));
    strokeWeight(10);
    ellipse(targetX,targetY,targetImage.width,targetImage.height);
  }
  noStroke();
  //set the color and position of the rectangle
fill(252, 134, 95);
rect(0,30, rectX, rectY);
//displayed the smaller image of the dog
image(sampleImg, 40,60);
//added text and chose the font
textFont("Helvetica");
fill(0);
text("Find pup!", 10,100);
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // Check if the mouse is in the x range of the target
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the mouse is also in the y range of the target
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }
  }
}


function placeDog () {
  // Once we've displayed all decoys, we choose a location for the target
  targetX = random(0,width);
  targetY = random(0,height);
  // And draw it (this means it will always be on top)
  image(targetImage,targetX,targetY);
}

function placeDecoys () {
  // Use a for loop to draw as many decoys as we need
  //randomized number of Decoys
  numDecoys = random(100,250);
  for (var i = 0; i < numDecoys; i++) {
    // Choose a random location for this decoy
    var x = random(0,width);
    var y = random(0,height);
    // Generate a random number we can use for probability
    var r = random();
    //made a variable to dictate the random size of the decoys
    var size = random(.6, 1.2);
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough
    if (r < 0.1) {
      image(decoyImage1,x,y,decoyImage1.width*size,decoyImage1.height*size);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y,decoyImage2.width*size,decoyImage2.height*size);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y,decoyImage3.width*size,decoyImage3.height*size);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y,decoyImage4.width*size,decoyImage4.height*size);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y,decoyImage5.width*size,decoyImage5.height*size);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y,decoyImage6.width*size,decoyImage6.height*size);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y,decoyImage7.width*size,decoyImage7.height*size);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y,decoyImage8.width*size,decoyImage8.height*size);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y,decoyImage9.width*size,decoyImage9.height*size);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y,decoyImage10.width*size,decoyImage10.height*size);
    }
  }
}
