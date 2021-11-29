//Maleficent
//Maleficent character holds her magic wand in her left hand whenever left wrist is in the canvas's height. Fireballs are shot out of her right hand whenever she raises her hand.

let video;
let poseNet;
let poses = [];
let frame = 50;
let fireball = [];
function setup() {
  createCanvas(800, 700);
  video = createCapture(VIDEO);
  video.size(width, height);

  poseNet = ml5.poseNet(video, modelReady);

  poseNet.on('pose', function(results) {
    poses = results;
  });
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function mousePressed(){
  console.log(JSON.stringify(poses))
}

function draw() {
  image(video, 0, 0, width, height);
  let angle = frameCount/10;
  rectMode(CENTER);
  angleMode(DEGREES);
  noStroke();

  if (poses.length > 0) {
    let pose = poses[0].pose;
    noStroke();
    
    let rightEye = pose['rightEye'];
    let leftEye = pose['leftEye'];
    let rightWrist = pose['rightWrist'];
    let leftWrist = pose['leftWrist'];
    let rightShoulder = pose['rightShoulder'];
    let leftShoulder = pose['leftShoulder'];
    let nose = pose['nose'];
    let angle = PI/3;
    fill(60, 46, 40, 200);
    push();
    triangle(nose.x - 65, nose.y + 10, nose.x-(abs((rightEye.x-leftEye.x)/0.99)), nose.y - 10, nose.x - 45, nose.y + abs((rightEye.x-leftEye.x)/1.1));
    triangle(nose.x + 65, nose.y + 10, nose.x +(abs((rightEye.x-leftEye.x)/0.99)), nose.y - 10, nose.x + 45, nose.y + abs((rightEye.x-leftEye.x)/1.1));
    pop();
    
    //fireballs
    let p;
    if(rightWrist.y < 4 / 5 * height){
      for(let i = 0; i < 10; i++){
        p = new FireBall(rightWrist.x, rightWrist.y);
        fireball.push(p);
      }
      for(let i = fireball.length - 1; i >= 0; i --){
        fireball[i].update();
        fireball[i].display();
        if(fireball[i].finish()){
          fireball.splice(i, 1);
        }
      }
    }
    //headpiece
    fill(0);
    beginShape();
    vertex(nose.x, nose.y - 100);
    quadraticVertex(rightEye.x - 25, rightEye.y - 150,rightEye.x - 50, rightEye.y);
  quadraticVertex(rightEye.x - 60, rightEye.y, rightEye.x - 60, rightEye.y - 50);
    quadraticVertex(rightEye.x - 80, rightEye.y - 80, rightEye.x - 80, rightEye.y - 110);
    quadraticVertex(rightEye.x - 80, rightEye.y - 110, rightEye.x - 120, rightEye.y - 150);
    quadraticVertex(rightEye.x - 150, rightEye.y - 170, rightEye.x - 150, rightEye.y - 210);
    quadraticVertex(rightEye.x - 140, rightEye.y - 250, rightEye.x - 130, rightEye.y - 250);
    quadraticVertex(rightEye.x - 50, rightEye.y - 270, rightEye.x - 50, rightEye.y - 300);
    quadraticVertex(rightEye.x - 45, rightEye.y - 330, rightEye.x - 80, rightEye.y - 350);
    quadraticVertex( rightEye.x + 20, rightEye.y - 330,rightEye.x, rightEye.y - 270);
    quadraticVertex(rightEye.x - 20, rightEye.y - 220, rightEye.x - 45, rightEye.y - 200)
    quadraticVertex(rightEye.x - 40, rightEye.y - 180, rightEye.x - 20, rightEye.y - 150);
    
    quadraticVertex(nose.x, nose.y - 250, leftEye.x + 20, leftEye.y - 150);
    
    quadraticVertex(leftEye.x + 30, leftEye.y - 180, leftEye.x + 20, leftEye.y - 150);
    quadraticVertex(leftEye.x + 60, leftEye.y- 200, leftEye.x + 45, leftEye.y - 200);
    quadraticVertex(leftEye.x + 60, leftEye.y - 180, leftEye.x, leftEye.y - 270);
    quadraticVertex(leftEye.x - 45, leftEye.y - 330, leftEye.x + 80, leftEye.y - 350);
    quadraticVertex(leftEye.x + 20 , leftEye.y - 330, leftEye.x + 50, leftEye.y - 300);
    quadraticVertex(leftEye.x + 140, leftEye.y - 250, leftEye.x + 130, leftEye.y - 250);
    quadraticVertex(leftEye.x + 150, leftEye.y - 220, leftEye.x + 150, leftEye.y - 210);
    quadraticVertex(leftEye.x + 160, leftEye.y - 180, leftEye.x + 120, leftEye.y - 150);
    quadraticVertex(leftEye.x + 80, leftEye.y - 110, leftEye.x + 80, leftEye.y - 110);
    quadraticVertex(leftEye.x + 80, leftEye.y - 80, leftEye.x + 60, leftEye.y - 50);
    quadraticVertex(leftEye.x + 65, leftEye.y - 25,leftEye.x + 50, leftEye.y);
    quadraticVertex(leftEye.x + 25, leftEye.y - 150,nose.x, nose.y - 100);
    endShape();
    //headpiece decor
    fill(250);
    ellipse(nose.x, nose.y - 130, 30, 30);
    triangle(nose.x - 10, nose.y-120, nose.x + 10, nose.y - 120, nose.x, nose.y - 80);
    stroke(20);
    strokeWeight(35);
    line(rightEye.x - 90, rightEye.y - 200, rightEye.x - 60, rightEye.y - 150);
    line(leftEye.x + 90, leftEye.y - 200, leftEye.x + 60, leftEye.y - 150);
    
    fill(0);
    noStroke();
    
    //eyeshadows on lefteye
    beginShape();
    vertex(leftEye.x - 20, leftEye.y);
    quadraticVertex(leftEye.x + 5, leftEye.y - 30, leftEye.x + 40, leftEye.y - 10);
    vertex(leftEye.x + 30, leftEye.y);
    quadraticVertex(leftEye.x + 5, leftEye.y - 10, leftEye.x - 20, leftEye.y);
    endShape();
    
    //eyeshadows on righteye
    beginShape();
    vertex(rightEye.x + 20, rightEye.y);
    quadraticVertex(rightEye.x - 5, rightEye.y - 30, rightEye.x - 40, rightEye.y - 10);
    vertex(rightEye.x - 30,rightEye.y);
    quadraticVertex(rightEye.x - 5, rightEye.y - 10, rightEye.x + 20, rightEye.y);
    endShape();
    
    //shirt
    fill(0);
    beginShape();
    vertex(rightShoulder.x + 90, rightShoulder.y - 80);
    vertex(rightShoulder.x - 150, rightShoulder.y);
    vertex(rightShoulder.x - 250, rightShoulder.y + 400);
    vertex(rightShoulder.x + 200, rightShoulder.y + 400);
    endShape();
    beginShape();
    vertex(leftShoulder.x - 90, leftShoulder.y - 80);
    vertex(leftShoulder.x + 150, leftShoulder.y);
    vertex(leftShoulder.x + 250, leftShoulder.y + 400);
    vertex(leftShoulder.x - 200, leftShoulder.y + 400);
    endShape();
    
    fill('#00172D');
    beginShape();
    vertex(rightShoulder.x + 130, rightShoulder.y);
    quadraticVertex(rightShoulder.x - 50, rightShoulder.y - 150, rightShoulder.x - 100, rightShoulder.y - 100);
    quadraticVertex(rightShoulder.x - 50, rightShoulder.y - 250, rightShoulder.x + 130, rightShoulder.y);
    endShape();
    beginShape();
    vertex(leftShoulder.x - 130, leftShoulder.y);
    quadraticVertex(leftShoulder.x + 50, leftShoulder.y - 150, leftShoulder.x + 100, leftShoulder.y - 100);
    quadraticVertex(leftShoulder.x + 50, leftShoulder.y - 250, leftShoulder.x - 130, leftShoulder.y);
    endShape();
    
    fill('#02386E');
    beginShape();
    vertex(rightShoulder.x + 130, rightShoulder.y);
    quadraticVertex(rightShoulder.x + 40, rightShoulder.y - 100,rightShoulder.x - 70, rightShoulder.y - 180);
    quadraticVertex(rightShoulder.x - 150, rightShoulder.y - 200, rightShoulder.x - 150, rightShoulder.y - 150);
    quadraticVertex(rightShoulder.x - 100, rightShoulder.y - 350, rightShoulder.x + 130, rightShoulder.y);
    endShape();
    beginShape();
    vertex(leftShoulder.x - 130, leftShoulder.y);
    quadraticVertex(leftShoulder.x - 40, leftShoulder.y - 100,leftShoulder.x + 70, leftShoulder.y - 180);
    quadraticVertex(leftShoulder.x + 150, leftShoulder.y - 200, leftShoulder.x + 150, leftShoulder.y - 150);
    quadraticVertex(leftShoulder.x + 100, leftShoulder.y - 350, leftShoulder.x - 130, leftShoulder.y);
    endShape();
    
    //magic wand
    if(leftWrist.y < height){
    stroke('#362511');
    strokeWeight(10);
    line(leftWrist.x, leftWrist.y + 100, leftWrist.x - 50, leftWrist.y - 300);
    fill('#AEFB59');
    noStroke();
    ellipse(leftWrist.x - 50, leftWrist.y - 300, 50, 50);
    }
    
    
    //background
    push();
    noFill();
    stroke('#234F1E');
    strokeWeight(100);
    ellipse(width/2, height/2, width + 150, height + 200);
    pop();
    push();
    stroke('#AEF359');
    noFill();
    strokeWeight(100);
    translate(width/2, height/2);
    ellipse(0, 0, height + 50, width);
    pop();
    push();
    stroke('#98BF64');
    noFill();
    rotate(5);
    translate(width/2, height/2);
    strokeWeight(50);
    ellipse(0, 0, height + 50, width);
    pop();
    push();
    stroke('#B2D3C2');
    noFill();
    rotate(-5);
    translate(width/2, height/2);
    strokeWeight(25);
    ellipse(0, 0, height + 50, width);
    pop();
    push();
    stroke('#32612D');
    noFill();
    rotate(10);
    translate(width/2, height/2);
    strokeWeight(10);
    ellipse(0, 0, height + 100, width+50);
    pop();
    
      }
}

class FireBall {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.xspeed = random(-1,1);
    this.yspeed = random(-5,1);
    this.alpha = 255;
    
  }
  
  finish(){
    return this.alpha < 0;
  }
  
  update(){
    this.x += this.xspeed;
    this.y += this.yspeed;
    this.alpha -= 6;
  }
  
  display(){
    noStroke();
    fill(57, 255, 20);
    push();
    translate(this.x + 5, this.y - 150);
    ellipse(0, 0, 10, 20);
    fill(11, 102, 35, 150);
    ellipse(0, 0, 8, 18);
    pop();
  }
}