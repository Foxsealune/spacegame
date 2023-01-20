let canvas; 
let brush; 
let rectangles;
let player;
let energy;
let intObj;
let dX;
let dY;
let n=5;
let e=0;
let centerX;
let centerY;
let backgroundImage = new Image();
backgroundImage.src = "space2.jpg"
function Setup(){
    canvas = document.getElementById("drawingCanvas");
    brush = canvas.getContext("2d");
}
Setup();

var gradient = brush.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0"," magenta");
        gradient.addColorStop("0.5", "aqua");
        gradient.addColorStop("1.0", "lime"); //establishes color gradient for menus


function Clear(){
    /* clears entire canvas area
    params: none return: none*/
    brush.clearRect(0, 0, canvas.width, canvas.height);
}

function ToRadians(degrees){
    /*converts inputted number to radians
    params: degrees
    return: degrees*/
    return degrees * Math.PI / 180;
}

function GetRandomInteger(a, b){
/*Returns random integer between two inputted numbers, switches them if first integer
is less than second integer  of range
params: a,b
returns:x*/
    if (a > b){
        small = b;
        large = a;
    }
    else{
        small = a;
        large = b;
    }
    
    let x = parseInt(Math.random() * (large - small + 1)) + small
    return x;
}

let mouse ={
    x:canvas.width/2,
    y:canvas.height-15} // initializes mouse coordinates
    
    canvas.addEventListener("mousedown",function(event){
        mouse.click=true; //add event listener to find mouse coordinates on click
        mouse.x=event.offsetX;
        mouse.y=event.offsetY;
    });
    canvas.addEventListener("mouseup",function(event){
        mouse.click=false;
    });
    
let ufoImg= new Image();
ufoImg.src = "ufo2.png"


class Rectangle {
   //class for enemy objects in game
    constructor(X, Y, length, dX, dY){

        this.X = X; 
        this.Y = Y; 
        this.length = length;
        this.color = "rgb(255,0,0)";
        this.name = "Rectangle";

        this.dX = dX;

        this.dY = dY;
    }


    
    MoveHorizontal(){
        
        if(this.X + this.length >= canvas.width){
            this.dX = -this.dX;
        }

        if(this.X + 1 < 0){
            this.dX = -this.dX;
        }

        this.X += this.dX;
    }

    MoveVertical(){
        if(this.Y + this.length >= canvas.height){
            this.dY = -this.dY;
        }
        if(this.Y -1 < 0){
            this.dY = -this.dY;
        }
        this.Y += this.dY;
    }


    Draw(){
        //draw enemy objects to get their iconic shape
        brush.beginPath();
        brush.moveTo(this.X,this.Y);
        brush.lineTo(this.X+this.length*0.4,this.Y+this.length*0.25);
        brush.lineTo(this.X+this.length*0.5,this.Y);
        brush.lineTo(this.X+this.length*0.6,this.Y+this.length*0.25);
        brush.lineTo(this.X+this.length,this.Y);
        brush.lineTo(this.X+this.length*0.75,this.Y+this.length*0.4);
        brush.lineTo(this.X+this.length,this.Y+this.length*0.5);
        brush.lineTo(this.X+this.length*0.75,this.Y+this.length*0.6);
        brush.lineTo(this.X+this.length,this.Y+this.length);
        brush.lineTo(this.X+this.length*0.6,this.Y+this.length*0.75);
        brush.lineTo(this.X+this.length*0.5,this.Y+this.length);
        brush.lineTo(this.X+this.length*0.4,this.Y+this.length*0.75);
        brush.lineTo(this.X,this.Y+this.length);
        brush.lineTo(this.X+this.length*0.25,this.Y+this.length*0.6);
        brush.lineTo(this.X,this.Y+this.length*0.5);
        brush.lineTo(this.X+this.length*0.25,this.Y+this.length*0.4);
        brush.lineTo(this.X,this.Y)
        brush.closePath();
        brush.fillStyle = this.color;
        brush.fill();
        brush.strokeStyle = "black";
        brush.stroke();
        
    }
}

class Circle {
    //class for player object and energy ball
    constructor(centerX, centerY, radius, dX, dY){

        this.centerX = centerX; 
        this.centerY = centerY;
        this.rad = radius;
        this.color = "rgb(255,255,255)";
        this.name = "CIRCLE";
        this.dX = dX;
        this.dY = dY;
        
    }

    MovePlayer(){
        //move player to mouse click coordinates
        let dX= this.centerX-mouse.x;
        let dY = this.centerY-mouse.y;

        if (mouse.x!=this.centerX){
            this.centerX -= dX/10;//steadily decreases speed approaching click
        }
        if (mouse.y!=this.centerY){
            this.centerY -= dY/10;
        }
    }

    Draw(){
        // Draws ufo image on player
        brush.drawImage(ufoImg,this.centerX-60, this.centerY-60);
        
        brush.fill();
    }
    DrawEnergy(){
        this.color=gradient;
        brush.beginPath();
        brush.arc(this.centerX, this.centerY, this.rad, ToRadians(0), ToRadians(180));
        brush.lineTo(this.centerX-10,this.centerY-10);
        brush.lineTo(this.centerX-4,this.centerY);
        brush.lineTo(this.centerX,this.centerY-10);
        brush.lineTo(this.centerX+4,this.centerY);
        brush.lineTo(this.centerX+10,this.centerY-10);
        brush.strokeStyle = "white"
        brush.fillStyle = this.color;
        brush.fill();
    }
    
}

function CreateRectangles(n){
      /*Creates rectangle objects to be displayed as enemies and pushes 
    into enemy array.
    params: none return: none*/
    rectangles = [];
    Clear();
    for (let i = 0; i < n; i++){
        let length = 20
        let x = GetRandomInteger(0, canvas.width - 1 - length);
        let y = GetRandomInteger(0, canvas.height - 100);
        let speedX = GetRandomInteger(-2, -1||1,2);
        let speedY = GetRandomInteger(-2, -1);
        let rectangleObj = new Rectangle(x, y, length,speedX,speedY);
        rectangles.push(rectangleObj);
    }
    
}

Setup();

function CreatePlayer(){
    /* Creates player object and initializes to start mid bottom end of canvas
    params:none 
    return: none*/
    let rad = 25;
    let x = canvas.width / 2;
    let y = canvas.height - rad;
    let speedX = 20;
    let speedY = 20;
    player = new Circle(x, y, rad, speedX, speedY);
}  
    
function CreateEnergy(){
     /*Initializes empty energy array, and continues pushing energy objects
    to randomized x and y location until player collects 1000
     params:none 
    return: none*/
    energy = []
    for(let i = 0; i <1000;i++){
        let rad = 10;
        let x = GetRandomInteger(0,canvas.width-1-rad)
        let y = GetRandomInteger(5, canvas.height-10);
        let a = 0;
        let b = 0;
        let energyObj = new Circle(x,y,rad,a,b);
        energy.push(energyObj);
    }
}


function DrawAndMoveRectangles(){
       /*Draws enemies at their pre established random coordinates for entirety of 
    rectangles array and sets them on their ransomized horizontal/vertical path
     params:none 
    return: none*/
    for(let i = 0 ; i < rectangles.length; i++){
        rectangles[i].Draw();
        rectangles[i].MoveHorizontal();
        rectangles[i].MoveVertical();
    }
}

function Distance(x1,y1,x2,y2){
      /*Calculate straight line distance between two points
     params:x1,y1,x2,y2 
    return: dis*/
    let dis = Math.sqrt((x2-x1)**2 + (y2-y1)**2);
    return dis;
}

function Overlaps(circle, rectangle){
     /*Returns true or false if straight line distance between centre of 
    player object and enemy rectangle is overlapping.
    params:circle, rectangle
    return: Boolean*/
    let dis = Distance(circle.centerX, circle.centerY, rectangle.X+rectangle.length*0.5, rectangle.Y+rectangle.length*0.5);
    if(dis <= (circle.rad + rectangle.length*0.3)){
        return true;
    }
    else{
        return false;
    }
}

function Eat(circle1,circle2){
    /*Returns true or false if player circle object overlaps with energy ball,
    "eating" it.
    params: circle1,circle2
    return: Boolean*/ 
    let dis = Distance(circle1.centerX, circle1.centerY, circle2.centerX, circle2.centerY);
    if(dis <= (circle1.rad + circle2.rad)){
        return true;
    }
    else{
        return false;
    }
}


function CheckEat(){
    /*Returns true or false if player circle object overlaps with energy ball,
    "eating" it.
    params: circle1,circle2
    return: Boolean*/ 
    if(Eat(player,energy[e])===true){
        
        n=n+5
        e=e+1
        return true
    }
    else{
        return false
    }

}

function CheckCollission(){
    /*Checks if player object has collided with enemy rectangle, 
    calls EndGame and displays Game over screen and score if true.
    params:none
    return: none*/
    for(let i = 0; i < rectangles.length; i++){
        if(Overlaps(player,rectangles[i])){
            EndGame();
            brush.font = "60px Arial";
            brush.fillText("Game Over", 280, canvas.height/3);
            brush.fillText("You took "+e+" energy balls", 150, canvas.height-200);
            
        }
    }
}

function KeepScore(){
    /*Represents player score on top left end of page
    params:none
    return:none*/
    brush.font = "20px Arial";
    brush.fillStyle = gradient;
    brush.fillText("Obtained energy = "+e, 25, 50);
}

function DrawGameScreen(){
    /*Coordinates all seperate functions needed for gameplay
    and clears canvas and back image so that animation is
    accomplished when called on Set Interval.
     params:none 
    return: none*/

    Clear();
    backImage();

    DrawAndMoveRectangles();

    player.Draw();
    player.MovePlayer();
    energy[e].DrawEnergy();

    CheckEat();
    CheckCollission();
    KeepScore();
        
}
function backImage(){
    brush.drawImage(backgroundImage,0,0,canvas.width,canvas.height);
}
let backObj;


function Mission(){
    /*Displays game mission on screen prior to start button press
     params:none 
    return: none*/
    backImage();

    brush.font = "45px Verdana";
    brush.fillStyle = gradient;
    brush.fillText("Your Mission", 100, 100);
    brush.font = "26px Verdana";
    brush.fillText("Control your spaceship with mouse click", 150,200);
    brush.fillText("Try to get green energy source as many as possible", 150,300);
    brush.fillText("Avoid your enemies", 150,400);


}

function Start(){
   
    clearInterval(intObj);
    CreateRectangles(n);
    CreatePlayer();
    
    CreateEnergy();
    intObj = setInterval(DrawGameScreen, 20);
}

function EndGame(){

    clearInterval(intObj);
    


}