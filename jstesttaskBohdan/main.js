"use strict";

var numberOfFigures = 15;
var collectionOfFigures = [];
var sideOfSquare = 20;
var stopGame = true;
var clearArea = false;
var counter = 0;


function start(){
	if(stopGame){
		stopGame = false;
		requestAnimationFrame(animate);
		clearArea = true;
	}
}
function stop(){
	var score = document.getElementById('score');
	stopGame = true;
	counter = 0;
	score.innerHTML = counter;
}

function getRandomInt(min, max) {
	return Math.floor(Math.floor(Math.random() * (max - min + 1) + min));
}


function getRandom(min,max,num){
    return Math.floor(Math.floor(Math.random() * (max - min + 1) + min) / num) * num;
} // Returns a random number multiple of num

function getRandomColor(){
	var arr = ["red", "green", "blue", "black", "orange", "magenta", "white", "grey", "cyan"];
	var rand = Math.floor(Math.random() * arr.length);
	return arr[rand];
}
// or
function getRandomColorRGB(){
	var color = 'rgb(' + Math.floor(getRandomInt(0, 255)) + ',' + Math.floor(getRandomInt(0, 255)) + ',' + Math.floor(getRandomInt(0, 255)) +')';
	return color;
}


function Rect(speedX, currentPosX, currentPosY, width, height, color, windowWidth, windowHeight) {
	this._speedX = speedX;
	this._currentPosX = currentPosX;
	this._currentPosY = currentPosY;
	this._width = width;
	this._height = height;
	this._windowWidth = windowWidth;
	this._windowHeight = windowHeight;
	this._masX = [];
	this._masY = [];
	this._color = color;
}

Rect.prototype.matrix = function(){
	var n = this._width-(this._width/2), m = this._height-(this._width/2);
	for(var i=0; i<m; i++){
		this._masY[i] = [];
		for(var j=0; j<n; j++){
			this._masY[i][j] = this._currentPosY+i+j;
		}
	}
	for(var i=0; i<m; i++){
		this._masX[i] = [];
		for(var j=0; j<n; j++){
			this._masX[i][j] = this._currentPosX+i+j;
		}
	}
}
Rect.prototype.move = function() {
	this._currentPosY += this._speedX;
	if(this._currentPosY >= this._windowHeight) {
		this._currentPosX = getRandom(0, this._windowWidth - this._width, this._width);
	    this._currentPosY = 0;
	    this._speedX = getRandomInt(2, 9);
	}
}


function animate() {  
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');  
  	var startGame = document.getElementById('start');
  	var score = document.getElementById('score');
  	var x = 0;
	var y = 0;

  	if(clearArea){
  		ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  	}

  	if(collectionOfFigures.length == 0){
  		for(var i = 0; i < numberOfFigures; i++){
			collectionOfFigures[i] = new Rect(getRandomInt(2, 9), getRandom(0, canvas.clientWidth-sideOfSquare, sideOfSquare), 
				0, sideOfSquare, sideOfSquare, getRandomColorRGB(), canvas.clientWidth - sideOfSquare, canvas.clientHeight);
		}
  	}
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	var g = canvas.clientHeight;
	for(var i = 0; i < collectionOfFigures.length; i++){
	 	ctx.fillStyle = collectionOfFigures[i]._color;
	 	ctx.fillRect(collectionOfFigures[i]._currentPosX, collectionOfFigures[i]._currentPosY, collectionOfFigures[i]._width, 
	 		collectionOfFigures[i]._height, canvas.clientWidth, canvas.clientHeight);
	  	collectionOfFigures[i].matrix();
	  	collectionOfFigures[i].move();
	 }; 
	 canvas.onclick = function(event){
	 	 x = event.offsetX;
	 	 y = event.offsetY;
	 	 var xCoordinate = false;
	 	 var yCoordinate = false;
	 	 var xfigure = null;
	 	 var yfigure = null;
	 	 try{
		 	for(var i = 0; i < collectionOfFigures.length; i++){
			 	for(var j=0; j<sideOfSquare-(sideOfSquare/2); j++){
					for(var z=0; z<sideOfSquare-(sideOfSquare/2); z++){
				 		if(x == collectionOfFigures[i]._masX[j][z]){
				 			xCoordinate = true;
				 			xfigure = i;
					 	}
					 	if(y == collectionOfFigures[i]._masY[j][z] ){
							 yCoordinate = true;
							 yfigure = i;
						}
					}
				}
			}
		}
	 	catch(e){

	 	}
	 	if(xCoordinate && yCoordinate && xfigure == yfigure){
			collectionOfFigures[xfigure] = new Rect(getRandomInt(2, 10), getRandom(0, canvas.clientWidth-sideOfSquare, 
				sideOfSquare), 0, sideOfSquare, sideOfSquare, getRandomColorRGB(), canvas.clientWidth - sideOfSquare, canvas.clientHeight);
			collectionOfFigures[xfigure].matrix();
	  		collectionOfFigures[xfigure].move();
	  		counter++;
			score.innerHTML = counter;
		}
	 }
	if(!stopGame){
		requestAnimationFrame(animate);
	}
	else{
		ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
		collectionOfFigures = [];
	}
}
	document.body.onload = animate;


