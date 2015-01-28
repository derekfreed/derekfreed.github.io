function Pokemon ()
{
	this.isPlayer = false;
	this.active = true;
	this.xPos = 800;
	this.yPos = getRandomInt(0, 440);
	this.imageX = getRandomInt(0, 14)*60;
	this.imageY = getRandomInt(0, 9)*60;
	this.spriteWidth = 60;
	this.spriteHeight = 60;
	this.xVelocity = -5;
	this.yVelocity = getRandomInt(-2, 2);
	this.ready = false;
	this.image = new Image();
	this.image.src = "Sprites.png";
	this.image.onload = function(){
		this.ready = true;
	};
	this.draw = function(){
		ctx.drawImage(this.image, this.imageX, this.imageY, this.spriteWidth, this.spriteHeight, this.xPos, this.yPos, this.spriteWidth, this.spriteHeight);
		//handle velocity
		this.xPos += this.xVelocity;
		this.yPos += this.yVelocity;
	};
}
function pokemonSpawn()
{
	if(Math.random() < t)
		pokemon.push(new Pokemon());
		//increase likelihood of more spawning
	t += .00001;
}
function drawAllPokemon()
{
	//draw all active pokemon
	pokemon.forEach(function (enemy){
		enemy.draw();
		//make pokemon inactive if it leaves the canvas
		if(enemy.xPos < 0 - enemy.spriteWidth)
			enemy.active = false;
	});
}
function organizePokemonArray()
{
	//filter caught pokemon
  	pokemon = pokemon.filter(function (enemy) {
    	return enemy.active;
 	});
}