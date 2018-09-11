/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// setup()
//
// Description of setup

function setup() {
  createCanvas(500,500);
  background(2,174,220);

  //back hair
  fill(48,3,3);
  stroke(0);
  strokeWeight(2);
  rect(135,250,230,400);

  //face shape
  ellipseMode(CENTER);
  noStroke();
  fill(242,200,145);
  ellipse(250,250,220,235);

  //eyeglasses
  stroke(188,187,186);
  strokeWeight(4);
  fill(255,255,255);
  ellipse(205,246,70,70);
  ellipse(295,246,70,70);

  //nosepiece of glasses
  fill(188,187,186);
  rect(240,245,20,2);

  //accents of glasses
  noFill();
  triangle(170,215,190,215,170,234);
  triangle(310,213,330,214,330,234);

  //hair
  fill(48,3,3);
  noStroke();
  //bangs
  rect(160,130,180,70);
  //hair parts on either side
  stroke(0);
  strokeWeight(2);
  rect(112,150,48,280);
  rect(338,150,48,280);
  //circles to round everything out and
  //not have the image be so edgy
  noStroke();
  ellipse(150,164,80,70);
  ellipse(350,164,80,70);

  //mouth
  stroke(0);
  strokeWeight(1);
  fill(0);
  ellipse(247,320,60,40);
  noStroke();
  fill(242,200,145);
  ellipse(247,319,65,40);

}


// draw()
//
// Description of draw()

function draw() {

}
