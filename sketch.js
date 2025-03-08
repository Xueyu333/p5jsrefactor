// Configuration
const GRID_SIZE = 6;
const CELL_SIZE = 100;
const ROTATION_SPEED = 0.05;
const ARC_RADIUS = 50;
const ARC_OFFSET = 25;

// Colors
let topLeftColor, bottomRightColor;
let backColor1, backColor2;
let angle = 0;

function setup() {
  createCanvas(600, 600);
  initializeColors();
}

function initializeColors() {
  topLeftColor = color(255, 0, 0);
  bottomRightColor = color(0, 0, 255);
  backColor1 = color(0, 0, 255);
  backColor2 = color(255, 0, 0);
}

function draw() {
  drawGradientBackground();
  drawFlowerGrid();
}

function drawGradientBackground() {
  for (let y = 0; y < height; y++) {
    let interFactor = y / height;
    let backgroundColor = lerpColor(backColor1, backColor2, interFactor);
    stroke(backgroundColor);
    fill(backgroundColor);
    rect(0, y, width, 1);
  }
}

function drawFlowerGrid() {
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      drawFlower(i, j);
    }
  }
}

function drawFlower(i, j) {
  const offsetX = i * CELL_SIZE + CELL_SIZE/2;
  const offsetY = j * CELL_SIZE + CELL_SIZE/2;
  const interFactor = (i + j) / 10;
  const currentColor = lerpColor(topLeftColor, bottomRightColor, interFactor);

  push();
  translate(offsetX, offsetY);
  rotate(angle);
  drawFlowerPetals(currentColor);
  pop();
}

function drawFlowerPetals(petalColor) {
  fill(petalColor);
  // Draw four arcs to create the flower pattern
  arc(0, -ARC_OFFSET, ARC_RADIUS, ARC_RADIUS, PI*3/2, PI/2, CHORD);  // top
  arc(ARC_OFFSET, 0, ARC_RADIUS, ARC_RADIUS, 0, PI, CHORD);          // right
  arc(0, ARC_OFFSET, ARC_RADIUS, ARC_RADIUS, PI/2, PI*3/2, CHORD);   // bottom
  arc(-ARC_OFFSET, 0, ARC_RADIUS, ARC_RADIUS, PI, 0, CHORD);         // left
}

function mouseMoved() {
  angle += ROTATION_SPEED;
}