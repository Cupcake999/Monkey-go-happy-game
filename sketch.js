
  var monkey , monkey_running, monkey_collided;
  var banana ,bananaImage, obstacle, obstacleImage;
  var FoodGroup, obstacleGroup ;
  var ground, PLAY= 1,gameState=PLAY , END = 0;
  var survivalTime = 0 , Score = 0;

  function preload(){
  
  
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
    
monkey_collided = loadAnimation("sprite_1.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
  }



  function setup() {
  createCanvas(600, 600);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.15;
  //monkey.debug = true;
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
    
   ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width /2;
  console.log("ground");
  ground.visible=true;
    
    

    obstacleGroup = createGroup();
    FoodGroup = createGroup();
  }


  function draw() {
  background("skyblue");
      drawSprites();
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime=Math.ceil(frameCount/frameRate());
    text("Survival Time: "+survivalTime,100,50);
    
     stroke("white");
    textSize(30);
    fill("white");
    text("Score :"+Score,400,100);
    
  monkey.collide(ground);
    if(gameState === PLAY){
     spawnObstacles ();
     spawnBanana ();
      
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
   
      monkey.velocityY = monkey.velocityY + 0.8;
    if(keyDown("space") && monkey.y >= 100 ){
        monkey.velocityY = -12;
    }
      if (FoodGroup.isTouching(monkey)){
         Score = Score+1;
       }
      
      if (obstacleGroup.isTouching(monkey)){
        gameState = END;
        
      }
       
    }
    
   else if (gameState=== END){
     obstacleGroup.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1);
     FoodGroup.setVelocityXEach(0);
     obstacleGroup.setVelocityXEach(0);
     ground.velocityX = 0;
     monkey.velocityX = 0;
     monkey.velocityY = 0;
     stroke("black");
    textSize(40);
    fill("black");
    text("GAMEOVER",200,300);
   }
    }

    function spawnObstacles (){
      if (frameCount % 300 === 0){
     var obstacle = createSprite(400,330,40,10);
      obstacle.addImage(obstaceImage); 
      obstacle.scale = 0.1;
      obstacle.velocityX = -3;
      obstacle.lifetime = 400;
      obstacle.velocityX = -(6 + survivalTime/100);
      obstacleGroup.add(obstacle);
    }
    }
    function spawnBanana (){
      if (frameCount % 80 === 0){
        var banana = createSprite (400,150,10,10);
        banana.velocityX =-3;
        banana.addImage(bananaImage);
        banana.scale = 0.1;
        banana.lifetime = 500;
        FoodGroup.add(banana);
      }
    }



