var bubbles = [];
var automatic = false;

let Bubble = class {
  constructor(pos, vel, col, radius, time) {
    this.pos = pos;
    this.vel = vel;
    this.col = col;
    this.radius = radius;
    this.time = time;
  }
  show() {
    noStroke();
    fill(this.col);
    ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
    this.time--
  }
  update() {
    this.pos.add(this.vel);
    this.edges();
  }
  edges() {
    if(this.pos.x - (this.radius / 2) < 0 || this.pos.x + (this.radius / 2) > width) {
      this.vel.x *= -1;
    }
    if(this.pos.y - (this.radius / 2) < 0 || this.pos.y + (this.radius / 2) > height) {
      this.vel.y *= -1;
    }
  }
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB);
	
	textSize(windowWidth/10)
	textFont(font)
	textAlign(CENTER, CENTER)
	
	createBubbles(true);
}

let font;
function preload() {
  font = loadFont('visually.otf');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

let autoTime = 0;

function draw() {
	background(0);
	if(automatic && autoTime == 350) {
	  autoTime = 0;
	  createBubbles(true)
	  return;
	} else if(automatic) {
	  autoTime++
	} else {
	  autoTime = 0;
	}
	if(bubbles.length > 0) {
	  brightness = 0;
	  renderBubbles();
	} else {
	  if(!automatic) {
  	  if(brightness >= 100) {
  	    brightness = 100
  	  }
  	  fill(0, 0, brightness)
  	  textSize(windowWidth/10)
  	  text('Click for More!', windowWidth/2, 3*(windowHeight/7))
  	  textSize(windowWidth/25)
  	  text('or Press A for Auto!', windowWidth/2, 4*(windowHeight/7))
  	  brightness++
	  }
	}
}

function renderBubbles() {
  for(let i = bubbles.length - 1; i >= 0; i--) {
    if(bubbles[i].time > 0) {
	    bubbles[i].update();
		  bubbles[i].show();
	  } else {
      bubbles.splice(bubbles.indexOf(bubbles[i]), 1)
	  }
  }
}

function mousePressed() {
	createBubbles();
}

function keyPressed() {
  if(keyCode == 65 && automatic == false) {
    automatic = true;
    createBubbles(true)
  } else if(keyCode == 65 && automatic == true) {
    automatic = false;
  }
}

function createBubbles(createAuto) {
  if(createAuto) {
    let xval = random(2*(windowWidth/5), 4*(windowWidth/5))
    let yval = random(2*(windowHeight/5), 4*(windowHeight/5))
    for(let x = 0;x < 50;x++) {
    	createBubble(true, xval, yval);
    }  
  } else {
  	for(let x = 0;x < 15;x++) {
  		createBubble();
  	}
  }
} 

function createBubble(createAuto, x, y) {
  let pos;
  if(createAuto) {
    pos = createVector(x, y);
  } else {
    pos = createVector(mouseX, mouseY);
  }
	let vel = createVector(random(-7, 7), random(-7, 7));
	let col = color(random(0, 360), 100, 100, 130/255);
	let radius = random(20, 150);
	let time = random(200, 400);
	bubbles.push(new Bubble(pos, vel, col, radius, time));
}