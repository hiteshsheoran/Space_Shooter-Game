function loadImages(){
    enemyImg = new Image;
    playerImg = new Image;
    
    enemyImg.src="enemy.png"
    playerImg.src="player.png"
}



function init(){
    canvas=document.getElementById("mycanvas");
    pen=canvas.getContext('2d');
    W=canvas.width;
    H=canvas.height;
    score=0;
    
     player={
        x:W/2,
        y:H-100,
        w:70,
        h:70,
        speedX:0,
         bullets:[],
         shoot:function(){
             var b=new bullet(this.x+25,this.y,10);
             this.bullets.push(b);
         }
    };
    function movePlayer(e){
        if(e.key=="ArrowRight"){
            player.speedX= 10;console.log("right");
        }
        else if(e.key=="ArrowLeft"){
            player.speedX= -10;console.log("left");
        }
        else if(e.key==" "){
            console.log("shooting");
            player.shoot();
        }
    }
    function stopPlayer(e){
        if(e.key=="ArrowRight" || e.key=="ArrowLeft"){
            player.sppedX= 0;console.log("keyUp");
        }
    }
    document.addEventListener('keydown',movePlayer);
    document.addEventListener('keyup',stopPlayer);
    
    enemies=[];
    e=new enemy(100,200);
    function createEnemy(){
        var x=Math.round(Math.random()*W-50);
        var y=Math.round(Math.random()*200);
        var speed =Math.round(Math.random()*3)+2;
        var myEnemy = new enemy(x,y,speed);
        enemies.push(myEnemy);
    }
    setInterval(createEnemy,1000);
}




function draw(){
    pen.clearRect(0,0,W,H);
    
    //draw the player
    pen.drawImage(playerImg,player.x,player.y,player.w,player.h);
    
    //draw the bullets
    for(var i=0;i<player.bullets.length;i++){
        player.bullets[i].draw();
    }
    //draw enemies
    for(var i=0;i<enemies.length;i++){
        enemies[i].draw();
    }
}




function update(){
    player.x+=player.speedX;
    
    
    for(var i=0;i<player.bullets.length;i++){
        player.bullets[i].update();
    }
    
    ///add some random enemies;
    for(var i=0;i<enemies.length;i++){
        enemies[i].update();
    }
    
}



function bullet(x,y,speed){
    this.x=x;
    this.y=y;
    this.speed = speed;
    
    this.w=10;
    this.h=20;
    this.color="green";
    
    this.draw=function(){
        pen.fillStyle=this.color;
        pen.fillRect(this.x,this.y,this.w,this.h);
    }
    this.update=function(){
        this.y-=this.speed;
    }
}



function enemy(x,y,speed){
    this.x=x;
    this.y=y;
    this.speedY = speed-3;
    this.speedX = 5;
    
    this.draw=function(){
        //pen.fillStyle=this.color;
        pen.drawImage(enemyImg,this.x,this.y,50,50);
    }
    this.update =function(){
        this.y+=this.speedY;
        this.x+=this.speedX;
        if(this.x>=W-50||this.x<=0){
            this.speedX*=-1;
        }
    }
}



function gameLoop(){
    draw();
    update();
    window.requestAnimationFrame(gameLoop);
}



function startGame(){
    loadImages();
    init();
    gameLoop();
}
startGame();