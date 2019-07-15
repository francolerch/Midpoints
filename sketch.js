class circle {
  x;
  y;
  radius = 100;
  dot;
  speed = 10;
  angle = 0;

  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.dot = new dot(this.x, this.y,this.radius,this.angle)
  }

  draw() {
    this.dot.draw();
    stroke(255);
    noFill()
    ellipse(this.x, this.y, this.radius, this.radius);
  }

  update() {
    this.angle += 0.1;
    this.dot.update(this.x, this.y, this.radius, this.angle)
  }
}

class dot {
  x;
  y;
  radius = 8;

  constructor (x, y,radius,angle) {
    this.update(x,y,radius,angle)
  }

  update(x, y, radius, angle) {
    this.x = x + radius/2 * cos(angle);
    this.y = y + radius/2 * sin(angle);
  }

  draw() {
    stroke(255);
    fill(255)
    ellipse(this.x, this.y, this.radius, this.radius);
  }
  
}

let circles = [];
let averages = [];
let times = 0;
let slider;

function setup() {
  createCanvas(800,600);
  frameRate(30)
  slider = createSlider(0,4,0)
  for (let i = .96; i < (PI * 2) ; i += PI/2.5) {
    let x = 200 * cos(i);
    let y = 200 * sin(i);
    circles.push(new circle(x, y, random(.96, PI*2)));
  }
}

function draw() {
  averages = [];
  times = slider.value();
  console.log(times)

  background(0);
  translate(width/2, height/2)
  for (let i = 0; i < circles.length; i++) {
    circles[i].update();

    this.drawConnectors(parseInt(i), averages)
    circles[i].draw();
  }
  
  for (let t = 0; t <= times; t++) {
    drawAverages(averages)
    getNewAverages()
  }
}

function getNextElement(i, arr) {
  if (i === arr.length - 1) {
    return arr[0];
  }

  return arr[i+1];
}

function drawConnectors(i, averages) {
  let nextCircle = this.getNextElement(i, circles);
  let pointA = {
    x: circles[i].dot.x,
    y: circles[i].dot.y
  };
  let pointB = {
    x: nextCircle.dot.x,
    y: nextCircle.dot.y
  }

  averages.push(getAverageBetweenTwoPoints(pointA, pointB));

  stroke(255);
  strokeWeight(1);
  line(pointA.x, pointA.y, pointB.x, pointB.y);
}

function getAverageBetweenTwoPoints(pointA, pointB) {
  return {
    x: (pointA.x + pointB.x) / 2,
    y: (pointA.y + pointB.y) / 2
  }
}

function drawAverages(arr) {
  for (let i in arr) {
    let nextAverages = this.getNextElement(parseInt(i), arr);
    stroke(255);
    strokeWeight(1);
    line(arr[i].x, arr[i].y, nextAverages.x, nextAverages.y);
  }
}

function getNewAverages() {
  let newAverages = []
  for (let i in averages) {
    let nextAverage = this.getNextElement(parseInt(i), averages);

    newAverages.push(getAverageBetweenTwoPoints(averages[i], nextAverage));
  }

  drawAverages(newAverages)
}