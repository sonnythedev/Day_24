//let helicopterImg=document.getElementById('imgHelicopter');
//console.log(helicopterImg);
/*
let helipcopterImg=new Image();
helipcopterImg.src='helicopter.png';
//helipcopterImg.src='helicopter.gif';
//helipcopterImg.height=helipcopterImg.height*.3;
//We have to wait till the image loads
helipcopterImg.onload=function(){
    ctx.beginPath();
    ctx.drawImage(helipcopterImg,50,50);
    ctx.closePath();
}

 let x=0;
 let y=100;
 */




myCanvas.addEventListener('mousemove',
   function(event){
       //console.log(event.clientX);
       //console.log(event.clientY);
       let x=event.clientX-myCanvas.offsetLeft;
       let y=event.clientY-myCanvas.offsetTop
       document.getElementById('xyPos').innerHTML='x: '+x+' | y: '+y;
   }
);

/*
  let d1=Date();
  d1.getMinutes();
  d1.getSeconds();
  d1.getMillisecods();
*/

//let timerStarted=false;


////START OF OOP APPROACH

//This is the main app class
class HelicopterGame{
    constructor(canvasId,theTimerId,theScoreId){
        
        this.myCanvas=document.getElementById(canvasId);
        this.ctx=this.myCanvas.getContext('2d');
        this.myCanvas.width=window.innerWidth-50;
        this.myCanvas.height=window.innerHeight-50;

        this.theTimerId=theTimerId;
        this.theScoreId=theScoreId;

        this.gameFinished=false;
        //this.timerInterval=null;
        this.gameInterval=null;

        this.timerAndScore=null;

        this.heliImage=new Image();
        this.heliImage.src='helicopter.png';

        //ctx.globalCompositeOperation='destination-over';
        // this.bar1Y=null;
        // this.bar2Y=null;
        // this.bar3Y=null;
        // this.bar4Y=null;
        // this.bar5Y=null;
        this.fiveBarsArr=[];
     }

     startTheGame(){
        this.helX=0;
        this.helY=100;
        this.dx=30;
        this.dy=30;
        //document.getElementById('gameStatus').style.display='none';

        //Start The Game Interval
        this.gameInterval=setInterval(
            //function(){
            ()=>{
             this.helX+=this.dx; //this will move helicopter horizontally
             this.helY+=this.dy; //this will move helicopter vertically
             //drawHelicopter();
             console.log(this.ctx);
             //Timer
             console.log(this.theTimerId,this.theScoreId);
             this.timerAndScore=new TimerAndScore(this.theTimerId,this.theScoreId);
             this.timerAndScore.startTheTimer();
             //this.timerInterval=timerAndScore.timerInterval;

             //Helicopter
             let helicopterObj=new Helicopter(this.myCanvas,this.ctx,'helicopter.png',this.helX,this.helY);
             helicopterObj.drawMeOnCanvas();
             this.helicopterObj=helicopterObj;
             //Obstacles
             let obstacleObj=new Obstacle(this.ctx,this.myCanvas,this.fiveBarsArr,0,0);
             obstacleObj.drawMeOnCanvas();

             //Handle The collison
             this.handleCollision();

             //},
            },
            300);
     }


     handleCollision(){
        //this.fiveBarsArr
        //if(bar1Y<y || bar2Y<y || bar3Y<y || bar4Y<y || bar5Y<y){ //We have collison
        for(let i=0; i<this.fiveBarsArr.length; i++){
            if(this.fiveBarsArr[i]<this.helY){ 
                console.log('COLLISON!');
                //If we have collison then just stop timer and score
                this.gameFinished=true;
                //console.log('timerInterval:',this.timerInterval);
                console.log(this.timerAndScore);
                clearInterval(this.timerAndScore.timerInterval);
                clearInterval(this.gameInterval);
                document.getElementById('gameStatus').style.display='block';
             }
             else{
                 console.log('NO COLLISON!');
             }
        }
        
     }
}

//This is Generic Shape class
class Shape{
   constructor(x,y,imgSrc){
       this.x=x;
       this.y=y;
       this.imgSrc=imgSrc;
       this.imgObj=new Image();
       this.imgObj.src=imgSrc;
   }
   drawMeOnCanvas(){
       console.log('Generic Implementation');
   }
}

class Helicopter extends Shape{
    constructor(myCanvas,ctx,imgSrc,x,y){
        super(x,y,imgSrc);
        this.ctx=ctx;
        this.myCanvas=myCanvas;
    }
    //main method that will draw the helicopter on canvas
    drawMeOnCanvas(){
        //console.log('Generic Implementation');
        this.ctx.beginPath();
        //This makes sure of right and left boundary(x)
        if(this.x+this.imgObj.width>this.myCanvas.width ||this.x<0){ //adding 
           this.x=0;
        }
        //This makes sure of top and bottom boundary(y)
        if(this.y+50>this.myCanvas.height || this.y<0){
            this.y=100;
        }
        //This basically erases your canvas
        this.ctx.clearRect(0,0,this.myCanvas.width,this.myCanvas.height); 
        this.ctx.drawImage(this.imgObj,this.x,this.y,this.imgObj.width*.7,this.imgObj.height*.7);
        this.ctx.closePath();
    }

    

}

class Obstacle extends Shape{
    constructor(ctx,myCanvas,fiveBarsArr,x,y){
        super(x,y,'helicopter.png');
        this.ctx=ctx;
        this.myCanvas=myCanvas;
        this.fiveBarsArr=fiveBarsArr;
    }

    drawMeOnCanvas(){
        this.ctx.beginPath();
        let barX=0; //by let you can keep as private variables
        let minBarHeight=this.myCanvas.height*.3; //minimum bar height is one third of the canvas height
        let barWidth=50;
        for(let i=0; i<5; i++){
            barX +=(this.myCanvas.width/5);
            let barHeight=minBarHeight+Math.round((this.myCanvas.height-minBarHeight)*Math.random()) - (this.imgObj.height)*3;
            //console.log('barX:',barX,'barY:',myCanvas.height,'barWidth:',barWidth,'barHeight:',barHeight);
            let barY=this.myCanvas.height-barHeight; 
            this.ctx.fillStyle='red';
            this.ctx.rect(barX,barY,barWidth,barHeight);
            this.ctx.fill();
            //ctx.rect(x,y,width,height);
            this.fiveBarsArr.push(barY);
            
        }
        /*
        ctx.drawImage(mountainImg,0,myCanvas.height-mountainImg.height,myCanvas.width,myCanvas.height);
        */
        this.ctx.closePath();
    }
    
}

class TimerAndScore{
     constructor(theTimerId,theScoreId){
        this.theTimerId=theTimerId;
        this.theScoreId=theScoreId;
        this.timerInterval=null;
        this.theScore=0;
        this.secs=0;
        this.mins=0;
        this.secsStr='';
        this.minsStr='';
     }

     startTheTimer(){
         //Start the Timer Interval
         this.timerInterval=setInterval(
        //function(){
         ()=>{
         this.secs++;
         this.theScore+=10;
         if(this.secs%60==0){
             this.secs=0;
             this.mins++;
         }
         this.secsStr=this.secs<10?'0'+this.secs:this.secs;
         this.minsStr=this.mins<10?'0'+this.mins:this.mins;
         
         //timerStarted=true;
         //console.log(this.theTimerId, this.theScoreId);
         document.getElementById(this.theTimerId).innerHTML=`Time: ${this.minsStr} : ${this.secsStr}`;
         document.getElementById(this.theScoreId).innerHTML=`&nbsp;&nbsp;&nbsp;Score: ${this.theScore}`;
        },
        1000
     );

     //return timerInterval;

     }

}

//Initialize Your MAIN APP HERE!!!

let heliCopterGame=new HelicopterGame('myCanvas','theTimer','theScore');
heliCopterGame.startTheGame();

////LETS TRY TO MANIPULATE THE HELICOPTER'S PATH ACCORDING TO ARROW KEYS( -> <- etc,). SO WE NEED TO HANDLE KEYPRESS/KEYUP EVENT HANDLER.
window.addEventListener('keydown',
   function(event){
        switch(event.keyCode){
           case 38:
             //keyCode 38 is arrow up
             //y-=dy;
             heliCopterGame.helY -=heliCopterGame.dy;
             //drawHelicopter();
             heliCopterGame.helicopterObj.drawMeOnCanvas();
           break;

           case 40:
             //keyCode 40 is arrow down
             heliCopterGame.helY +=heliCopterGame.dy;
             //drawHelicopter();
             heliCopterGame.helicopterObj.drawMeOnCanvas();
           break;

           case 37:
             //keyCode 37 is arrow left
             heliCopterGame.helX -=heliCopterGame.dx;
             //drawHelicopter();
             heliCopterGame.helicopterObj.drawMeOnCanvas();
           break;

           case 39:
             //keyCode 39 is arrow right
             heliCopterGame.helX +=heliCopterGame
             .dx;
             //drawHelicopter();
             heliCopterGame.helicopterObj.drawMeOnCanvas();
           break;

           default:
            break;
       }

       
   }
);





