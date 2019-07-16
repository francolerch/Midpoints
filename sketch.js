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
let points = [];
let times = 2;
let slider1;
let slider2;
let offset = 0;

function setup() {
  createCanvas(800,600);
  frameRate(60)
  slider1 = createSlider(0,12,0)
  slider2 = createSlider(2,8,2)
  for (let i = 0; i < PI * 2; i += PI) {
    let x = 200 * cos(i);
    let y = 200 * sin(i);
    circles.push(new circle(x, y, PI))
  }
  for (let i = PI/3; i < PI * 2; i += PI) {
    let x = 200 * cos(i);
    let y = 200 * sin(i);
    circles.push(new circle(x, y, PI * 2))
  }
  for (let i = -PI/3; i < PI * 2; i += PI) {
    let x = 200 * cos(i);
    let y = 200 * sin(i);
    circles.push(new circle(x, y, PI * 3))
  }

  circles = [circles[0], circles[4], circles[3], circles[1], circles[5], circles[2]]
}

function draw() {
  points = [];
  times = slider1.value();
  offset = slider2.value();
  background(0)
  translate(width/2, height/2)

  for (let i = 0; i < circles.length; i++) {
    circles[i].update();
    circles[i].draw();

    let point = {
      x: circles[i].dot.x,
      y: circles[i].dot.y,
    }
    points.push(point);
  }

    if (times === 0) {
      points = []
    } else if (times > 0) {
      getRecursivePoints()
    }
  
    renderUnions(points);
}

function getRecursivePoints() {
  let pointsToReturn = [];
  
  for (let i = 0; i < times - 1; i++) {
    for (let j = 0; j < circles.length; j++) {
      let lastElements = getLastElements(points)
      let nextPoint = getNextElement(parseInt(j), lastElements);
      let pointA = {
        x: lastElements[j].x,
        y: lastElements[j].y,
      }
      let pointB = {
        x: nextPoint.x,
        y: nextPoint.y,
      }
      let averagePoint = getAverageBetweenTwoPoints(pointA, pointB);

      pointsToReturn.push(averagePoint)
    }
    points = points.concat(pointsToReturn)
  }

  return pointsToReturn;
}

function renderUnions(arr) {
  for (let i in arr) {
    let nextPoint = getNextElement(parseInt(i), arr);
    let pointA = {
      x: arr[i].x,
      y: arr[i].y,
    }
    let pointB = {
      x: nextPoint.x,
      y: nextPoint.y,
    }

    drawLine(pointA, pointB)
}
}

function getNextElement(i, arr) {
  if (i % circles.length === circles.length - 1) {
    return arr[i - circles.length + 1];
  }

  return arr[i + 1];
}

function getAverageBetweenTwoPoints(pointA, pointB) {
  return {
    x: (pointA.x + pointB.x) / 2,
    y: (pointA.y + pointB.y) / 2
  }
}
function drawLine(pointA, pointB) {
  stroke(255);
  strokeWeight(1);
  line(pointA.x, pointA.y, pointB.x, pointB.y);
}

function getLastElements(arr) {
  let arrClone = [...arr]

  while (arrClone.length > circles.length) {
    arrClone.shift();
  }
  return arrClone;
}