// Main control piece
//
// A class that defines how the piece behaves, including the ability
// to specify the input keys to move it up and down

// Piece constructor
//
// Sets the properties with the provided arguments or defaults
function Piece(x1,y1,x2,y2,x3,y3,speed,downKey,upKey,fill) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.x3 = x3;
  this.y3 = y3;
  this.vx = 0;
  this.vy = 0;
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
  this.leftKey = leftKey;
  this.rightKey = rightKey;
  this.fill = fill;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Piece.prototype.handleInput = function() {
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  else if (keyIsDown(this.downKey)) {
    this.vy = this.speed;
  }
  else if (keyIsDown(this.rightKey)) {
    this.vx = this.speed;
  }
  else if (keyIsDown(this.leftKey)) {
    this.vx = -this.speed;
  }
  else {
    this.vy = 0;
    this.vx = 0;
  }
}

// display()
//
// Draw the piece as a rectangle on the screen
Piece.prototype.display = function() {
  fill(255);
  rect(this.x,this.y,this.w,this.h);
}
