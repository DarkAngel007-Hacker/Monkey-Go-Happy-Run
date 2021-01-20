//Change1 - Alligned the variables in a neat manner - Grouped similar objects under a separate variable to readability purpose. 

var ground, jungleBackground;
var monkey, monkeyImage;
var banana, bananaImage, bananaGroup;
var obstacleImage,obstacleGroup;
var score;

function preload(){
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("stone.png");
  
  backGround = loadImage("jungle.jpg");
  
  monkeyImage= loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

}

function setup() {
  //Change2 - Changed the canvas size
  createCanvas(800, 400);
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
  //Change3 - Modified the jungle1 sprite name to jungleBackground 
  //Change 4 - Made the jungle background and endless running background
  //Change 5 - Gave velocity to the jungle background, Changed size, x, y and scale
  
  jungleBackground  = createSprite(0,0,800,400);
  jungleBackground .addImage("screen",backGround);
  jungleBackground .scale=1.5;
  jungleBackground .velocityX=-4;
  
  //Change 6 - Created theground to hold the monkey at the bottom
  //Note - Ground is also going to be endless running ground
  //Note - Ground should be made invisible
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.visible=false;
  
  stroke("black");
  textSize(20);
  fill("white");
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("Player",monkeyImage);
  monkey.scale = 0.15;
  
  score = 0; 
 
}

function draw() {
  
  background(255);
  
  //Change 7 - Made the jungle background and endless background
  
  if(jungleBackground.x<100){
    jungleBackground.x=jungleBackground.width/2;
  }
  
  if (ground.x < 0)
  {
    ground.x = ground.width/2;
  }
  
  if(keyDown("space"))
  {
    monkey.velocityY = -12 ;
  }
    
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  if (bananaGroup.isTouching(monkey))
    {
      score = score + 1;
      bananaGroup.destroyEach();
    }
    
  if (obstacleGroup.isTouching(monkey))
    {
      monkey.scale = 0.15;
    }
  
  switch(score)
    {
      case 10: monkey.scale = 0.20;
        break;
        case 20: monkey.scale = 0.25;  
        break;
        case 30: monkey.scale = 0.30;
        break;
        case 14: monkey.scale = 0.35;
        break;
        default: break;    
    }
  
  spawnBanana();
  spawnObstacles();
  
// Add the score point and what should happen when mokey touches the stone now as mentioned in the project document  
  
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:" + score,700,20);
}

function spawnBanana()
{
  if (frameCount % 80 === 0) 
  {
    var banana = createSprite(400,320,40,10);
    banana.y = random(120,200);
    banana.addAnimation("Banana",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 134;
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    bananaGroup.add(banana);
  }  
}

function spawnObstacles() {
  if(frameCount % 300 === 0) 
  {
    var stone = createSprite(400,335,10,40);
    stone.velocityX = -6;
    stone.addAnimation("Stone",obstacleImage);
    stone.scale = 0.1;
    stone.lifetime = 70;
    obstacleGroup.add(stone);
  }
}
