function Pokeball (y)
{
	this.isPlayer = false;
	this.active = true;
	this.xPos = 100;
	this.yPos = y;
	this.xVelocity = 15;
	this.yVelocity = 0;
	this.spriteHeight = 12;
	this.spriteWidth = 12;
	this.ready = false;
	this.image = new Image();
	this.image.src = "pokeball.png";
	this.image.onload = function(){
		this.ready = true;
	};
	this.draw = function(){
		ctx.drawImage(this.image, this.xPos, this.yPos);
		//handle velocity
		this.xPos += this.xVelocity;
	};
}
function drawAllPokeballs()
{
	//draw all active pokeballs
	pokeballs.forEach(function (pokeball){
		pokeball.draw();
		//make pokeball inactive if it leaves the canvas
		if(pokeball.xPos > stage.width)
			pokeball.active = false;
	});
}
function organizePokeballArray()
{
	//filter nonactive pokeballs
	pokeballs = pokeballs.filter(function (pokeball) {
	   	return pokeball.active;
 	});
}