// Exercise 1 - Moving pictures
// Pippin Barr
//
// Starter code for exercise 1.
// It moves two pictures around on the canvas.
// One moves linearly down the screen.
// One moves toward the mouse cursor.


// The image of a clown face
var clownImage;
// The current position of the clown face
var clownImageX;
var clownImageY;

//image of sakura
var sakuraImage;
//current position of added photo
var sakuraImageX;
var sakuraImageY;

//image of butterfly
var flyImage;
//current position of butterfly
var flyImageX;
var flyImageY;

//image of coffee cup
var coffeeImage;
//current position of coffee
var coffeeImageX;
var coffeeImageY;
// The transparent image of "felt" that wipes down the canvas
var feltTextureImage;
// The current position of the transparent image of "felt"
var feltTextureImageX;
var feltTextureImageY;

// preload()
// Load the images we're using before the program starts

function preload() {
  clownImage = loadImage("assets/images/clown.png");
  feltTextureImage = loadImage("assets/images/black-felt-texture.png");
  sakuraImage = loadImage("assets/images/sakura.png");
  flyImage= loadImage("assets/images/butterfly.png");
  coffeeImage = loadImage("assets/images/coffee.png");
}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);
  // Start the clown image at the centre of the canvas
  clownImageX = width/2;
  clownImageY = height/2;

  //start sakura at the left of the canvas
  sakuraImageX = 0 - sakuraImage.width/2;
  sakuraImageY = height/2;

  //start the butterfly at the center of the canvas
  flyImageX = width/2;
  flyImageY = height/2;

  //start the coffee cup a third of the way down the canvas
  coffeeImageX = width/3;
  coffeeImageY = height/3;

  // Start the felt image perfectly off screen above the canvas
  feltTextureImageX = width/2;
  feltTextureImageY = 0 - feltTextureImage.height/2;

  // We'll use imageMode CENTER for this script
  imageMode(CENTER);
}


// draw()
//
// Moves the felt image linearly
// Moves the clown face toward the current mouse location

function draw() {

  // Move the felt image down by increasing its y position
  feltTextureImageY += 1;

  //move sakura across the screen from left to right
  sakuraImageX += 1;

  // Display the felt image
  image(feltTextureImage,feltTextureImageX,feltTextureImageY);

  // Move the clown by moving it 1/10th of its current distance from the mouse

  // Calculate the distance in X and in Y
  var xDistance = mouseX - clownImageX;
  var yDistance = mouseY - clownImageY;
  // Add 1/10th of the x and y distance to the clown's current (x,y) location
  clownImageX = clownImageX + xDistance/10;
  clownImageY = clownImageY + yDistance/10;

  // Move the coffee by moving it 1/80th of its current distance from the mouse
  // Calculate the distance in X and in Y
  var xDistance2 = mouseX - coffeeImageX;
  var yDistance2 = mouseY - coffeeImageY;
  // Add 1/80th of the x and y distance to the clown's current (x,y) location
  coffeeImageX = coffeeImageX + xDistance2/80;
  coffeeImageY = coffeeImageY + yDistance2/80;


  //move the butterfly according to the mouse's location
  flyImageX = mouseX;
  flyImageY = mouseY;

  // Display the clown image
  image(clownImage,clownImageX,clownImageY);
  //display the sakura image
  image(sakuraImage, sakuraImageX, sakuraImageY);
  //display the butterfly image
  image(flyImage, flyImageX, flyImageY);
  //display the coffee cup images
  image(coffeeImage, coffeeImageX, coffeeImageY);
}
