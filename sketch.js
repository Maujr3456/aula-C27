const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var options;
var fundo, tower;
var towerimg;
var cannon;
var balls = [];
var boats = [];
var boat_animation = [];
var boatSpriteData, boatSpriteSheet;



function preload() {
  fundo = loadImage('assets/background.gif');
  towerimg = loadImage('assets/tower.png');
  boatSpriteData = loadJSON('assets/boat/boat.json');
  boatSpriteSheet = loadImage('assets/boat/boat.png');
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  options = {
    isStatic:true

  };
  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);

  World.add(world, ground);
  tower = Bodies.rectangle(160, 350, 160,310,options);
  World.add(world, tower);
  angleMode(DEGREES);
  angle = 20
  cannon = new Cannon(180, 110, 130,100, angle);
  boatFrames = boatSpriteData.frames;
  
  for(var i = 0;i < boatFrames.length;i++){

    var pos = boatFrames[i].position;
    var img = boatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    boat_animation.push(img);

  }
  
  
  //cannonball = new Cannonball(cannon.x, cannon.y);
  
}

function draw() {
  background(189);
 
  Engine.update(engine);
  image(fundo, 0, 0, 1200, 600);
  push()
  imageMode(CENTER);
  image(towerimg, tower.position.x, tower.position.y, 160,310);
  pop()
  rect(ground.position.x, ground.position.y, width * 2, 1);

  for(var i = 0; i < balls.length; i++){
    MostrarBola(balls [i], i);
    colisionwithboat(i)
  }


  cannon.display();
  ShowBoats();

} 


function keyPressed(){
  if (keyCode === DOWN_ARROW){
    var cannonball = new Cannonball(cannon.x, cannon.y);
    balls.push(cannonball);
  }
}



function MostrarBola(ball, index){ 
  if(ball){
    ball.display();
    if(ball.body.position.x >= width || ball.body.position.y >= height -50){
      ball.remove(index)
    }
  }
  

}

function keyReleased(){
  if(keyCode === DOWN_ARROW){
    balls[balls.length -1].shoot();
  }
}


function ShowBoats(){
  if(boats.length > 0){
    if(boats[boats.length-1] === undefined ||
      boats[boats.length-1].body.position.x < width -300){

        var positions = [-40, -60,-80, -20];
        var posrandom = random(positions);
        var boat = new Boat(width, height - 100, 170, 170, posrandom, boat_animation);
        boats.push(boat);
    }
    for(var i = 0; i < boats.length; i++){
      if (boats[i]){
        Matter.Body.setVelocity(boats[i].body, {
          x:-0.5,
          y:0
        })
        boats[i].display();
        boats[i].animate();
      }
    
    }
  }
  else{
    var boat = new Boat(1100, 530, 170, 170, -80, boat_animation);
    boats.push(boat);
  }
}

function colisionwithboat(index){

  for(i=0;i < boats.length; i++){

    if(balls[index] !== undefined && boats[i] !== undefined){
      var colision = Matter.SAT.collides(balls[index].body, boats[i].body);
      if(colision.collided){
        boats[i].remove(i);
        World.remove(world, balls[index].body);
        delete balls[index]
      }
    }
    

  }

}