console.log('Loading data...');

let table;
let array = [];
let arrayfut = [];

const canvasWidth = window.innerWidth;
const canvasHeight = 6000; // ⚠️ size limit if too long
const xPosAxis1 = 20; // px
const xPosAxis2 = 500; // px

const barWidth = canvasWidth / 100;

let drop;

let yPos;

// https://p5js.org/reference/#/p5/loadTable
function preload() {
  table = loadTable('future_cities_data_truncated.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  const barMargin = 10;
  const barHeight = 30;
  rectMode(CORNERS);
  //drop = new Raindrop(200, 200, 0.2);
  for (let i = 0; i < table.getRowCount(); i++) {
    const city = table.get(i, 'current_city');
    

    const annualPrecipitation = table.get(i, 'Annual_Precipitation');
    const futureAnnualPrecipitation = table.get(i, 'future_Annual_Precipitation');

    let xPos = i*(windowWidth/table.getRowCount())+10;
     yPos = annualPrecipitation;

    let xPosFuture = i*(windowWidth/table.getRowCount())+50;
    let yPosFuture = futureAnnualPrecipitation;

    yPos = map(yPos, 200, 1100, 0, windowHeight);
    yPosFuture = map(yPosFuture, 200, 1100, 0, windowHeight);
    
    fill('rgba(0, 0, 200, 0.25)');
    //rect(xPos, windowHeight, xPos+40, windowHeight-yPos);

    fill('rgba(200, 0, 200, 0.25)');
    rect(xPosFuture, windowHeight, xPosFuture+40, windowHeight-yPosFuture);

    let x1 = xPos;
    //let y1 = windowHeight;
    let y1 = 0;
    let x2 = xPos+40;
    //let y2 = windowHeight-yPos;
    let y2 = yPos;

    let futx1 = xPosFuture;
    //let futy1 = windowHeight;
    let futy1 = 0;
    let futx2 = xPosFuture+40;
    //let futy2 = windowHeight-yPosFuture;
    let futy2 = yPosFuture;

    
      for(let k = 0; k < 2000; k++){
        array[k*i] = new Raindrop(x1, y1, x2, y2, 0.2);
      }
      for(let k = 0; k < 2000; k++){
        arrayfut[k*i] = new Raindrop(futx1, futy1, futx2, futy2, 0.2);
      }
    
  }
}

function draw(){
  
  // count the columns
  colorMode(HSB);
  background(0,0,100,0.2);
  

  for (let i = 0; i < table.getRowCount(); i++) {
    const city = table.get(i, 'current_city');
    

    const annualPrecipitation = table.get(i, 'Annual_Precipitation');
    const futureAnnualPrecipitation = table.get(i, 'future_Annual_Precipitation');

    let xPos = i*(windowWidth/table.getRowCount())+10;
     yPos = annualPrecipitation;

    let xPosFuture = i*(windowWidth/table.getRowCount())+50;
    let yPosFuture = futureAnnualPrecipitation;

    yPos = map(yPos, 200, 1100, 0, windowHeight);
    yPosFuture = map(yPosFuture, 200, 1100, 0, windowHeight);
    
    fill('rgba(0, 0, 200, 0.25)')
    //rect(xPos, windowHeight, xPos+40, windowHeight-yPos);
    
      
    fill('rgba(200, 0, 200, 0.25)')
    //rect(xPosFuture, windowHeight, xPosFuture+40, windowHeight-yPosFuture);

    let x1 = xPos;
    let y1 = windowHeight;
    let x2 = xPos+40;
    let y2 = windowHeight-yPos;
    
    fill(0,0,0,1);
    
    if(i > 0){
      
      text(city, xPos, yPos+40);
    }

    //for(let i = 0; i < 40; i++){
    //  array[i] = new Raindrop(x1, y1, x2, y2, 0.2);
    //}
    
  }

  fill(203, 97, 49, 1);
  let wind;
  if(mouseX < windowWidth/2){
    wind = -float(map(mouseX, 0, windowWidth/2, windowWidth/2, 0)/1000);
  }else{
    wind =  float(map(mouseX, windowWidth/2, windowWidth, 0, windowWidth/2)/1000);
  }
  for(let i = 0; i < 2000; i++){
    array[i].upd(wind);
  }

  fill(287, 97, 49, 1);
  for(let i = 0; i < 2000; i++){
    arrayfut[i].upd(wind);
  }
  
  push();
  //colorMode('RGB');
  textSize(50)
  fill(0);
  text('Precipitation', windowWidth/4, (windowHeight/4)*3);
  fill(203, 97, 49, 1)
  text('now', windowWidth/4, (windowHeight/4)*3+50);
  fill(0);
  text('and', windowWidth/4, (windowHeight/4)*3+100);
  fill(287, 97, 49, 1);
  text('in the future', windowWidth/4, (windowHeight/4)*3+150);
  pop();
  /*
    for(let i = 0; i < 5; i++){
      for(let j = 0; j < yPos/10; j++){
        array[i*j].upd();
      }
    }*/

  //drop.upd();

  // drawAxes();
  // drawAxesLabels();
  
}

function convertDegreesToPosition(temp) {
  // we need to map the temperatures to a new scale
  // 0° = 600px, 25° = 300px, 20° = 30px
  // https://p5js.org/reference/#/p5/map
  const position = map(temp, 0, 20, 600, 30);
  return position;
}



function drawPrecipitation(xPos, yPos, nowOrLater) {
  //noFill();

  if(nowOrLater == 0){
    fill('rgba(23, 64, 6, 0.25)')
  }else{
    fill('rgba(23, 64, 256, 0.25)')
  }
  
  stroke(1);

  rect(xPos, windowHeight, xPos+barWidth, yPos);
}

// Task: Can you combine the two functions
// "drawLabelToday" and "drawLabelFuture"
// into one, using a fourth parameter?
function drawLabelToday(pos, city, temp) {
  fill('black');
  const label = `${city}: ${temp}°C`;
  text(label, xPosAxis1 + 10, pos + 5);
}

function drawLabelFuture(pos, city, temp) {
  fill('black');
  const label = `${city}: ${temp}°C`;
  text(label, xPosAxis2 + 10, pos + 5);
}

function drawConnectingLine(y1, y2) {
  line(xPosAxis1, y1, xPosAxis2, y2);
}


class Raindrop{
  constructor(posX1, posY1, posX2, posY2, wind){        // should use x1, y1, x2, y2 as grenzen, then random pos vectors inbetween those
    this.posX1 = posX1;
    this.posX2 = posX2;
    this.posY1 = posY1;
    this.posY2 = posY2;
    //this.posX = 
    //this.posY = ;
    this.wind = createVector(wind,0);
    this.pos = createVector(random(posX1, posX2), random(posY1, posY2));
    this.velocity = createVector(wind, 0);
    this.gravity = createVector(0, 0.2);
    this.diameter = random(1, 3);
  }

  drawDrop(){
    
    circle(this.pos.x, this.pos.y, this.diameter);

  }

  upd(wind){
    this.wind.x = wind;
    this.velocity.add(this.gravity);
    this.pos.add(this.velocity);
    //console.log(this.pos.y);
    this.drawDrop();
    if(this.pos.y > this.posY2){
      this.pos.y = random(this.posY1, this.posY2);
      this.pos.x = random(this.posX1, this.posX2);
      this.velocity =createVector(this.wind.x, 0);
    }
  }
}

// ==================== PAPIERKORB =============================
/*
const meanTemp = table.get(i, 'Annual_Mean_Temperature');
    const futureMeanTemp = table.get(i, 'future_Annual_Mean_Temperature');

    const yPosition = convertPrecToPosition(annualPrecipitation);
    const xPosition = canvasWidth/11*i;    // spacing 20 pixels

    function convertPrecToPosition(prec) {
      // we need to map the precipitation to a new scale
      // 0 = 600px, , 1000 = 30px
    
      const position = map(prec, 0, 1000, 600, 30);
      return position;
    }
    
    function drawTemperature(x, y) {
      fill('black');
      circle(x, y, 10);
    }

    */