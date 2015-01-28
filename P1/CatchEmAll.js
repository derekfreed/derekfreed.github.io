var stage = document.getElementById("canvas");
var ctx = stage.getContext("2d");
window.addEventListener("keyup", keyHandler, false);
//array of active pokeball projectiles
var pokeballs = [];
//array of active or "uncaught" pokemon
var pokemon = [];
//true when game is started for first time
var menu = true;
//used to increase spawnrate of pokemon until a cap  ***see function pokemonSpawn()
var t = .05;
var i = 10;
//game starts here with creation of background, player and gameloop interval
var background = new Background();
var Ash = new Player();
var gameloop = setInterval(GameMain,1000/60);
	
function GameMain()
{
	//Ash is still alive
	if(Ash.active == true && menu == false)
	{
		//clear canvas
		clearCanvas();

		//scrolling background
		background.draw();

		//controls the spawning of pokemon but not the actual drawing
		pokemonSpawn();

		/*****Animate Sprites*******
		******               *******/
		Ash.draw();
		drawAllPokemon();
		drawAllPokeballs();

		//clean arrays to only include active pokemon and pokeballs
		organizePokemonArray();
		organizePokeballArray();

  		//handle any collisions with pokeball and pokemon or pokemon and Ash
		handleCollisions();
			
		//scoreboard
		drawScore();
	}
	//losing case
	else if(menu == false)
	{
		drawLoseScreen();
	}
	else
	{
		drawStartScreen();
	}
}
function drawStartScreen()
{
	clearCanvas();
	background.draw();
	//Print Lose Screen
	ctx.font = "bold 60px Arial";
	ctx.fillText("Catch 'Em All", 200, 250);
	ctx.font = "30px Arial";
	ctx.fillText("Press Enter to start!", 250, 300);
}
function drawLoseScreen()
{
	clearCanvas();
	background.draw();
	//Print Lose Screen
	ctx.font = "30px Arial";
	ctx.fillText("You Lose, Score: " + Ash.score, 268, 250);
	ctx.fillText("Press Enter to Restart!", 250, 300);
}
function drawScore()
{
	//scoreboard
	ctx.font = "bold 20px Arial";
	ctx.fillText("Score: " + Ash.score, 30, 30);
}

function clearCanvas()
{
	ctx.clearRect(0, 0, stage.width, stage.height);
}

function collides(a, b) {
	//extra if statements are used to adjust the players hitbox to a smaller hitbox
	if(a.isPlayer)
	{
		return a.xPos < b.xPos + b.spriteWidth &&
	       	a.xPos + a.spriteWidth - 4*a.scale > b.xPos &&
	       	a.yPos + 4*a.scale < b.yPos + b.spriteHeight &&
	        a.yPos + a.spriteHeight > b.yPos;
	}
	else if(b.isPlayer)
	{
		return a.xPos < b.xPos + b.spriteWidth - 4*b.scale &&
	       	a.xPos + a.spriteWidth > b.xPos &&
	       	a.yPos < b.yPos + b.spriteHeight &&
	        a.yPos + a.spriteHeight > b.yPos + 4*b.scale;
	}
	else
	{
	  	return a.xPos < b.xPos + b.spriteWidth &&
	       	a.xPos + a.spriteWidth > b.xPos &&
	       	a.yPos < b.yPos + b.spriteHeight &&
	        a.yPos + a.spriteHeight > b.yPos;
    }
}

function handleCollisions() {
	//collision between pokeball and pokemon
  	pokeballs.forEach(function(pokeball) {
	   	pokemon.forEach(function(enemy) {
	  		if (collides(pokeball, enemy)) 
	  		{
	      		pokeball.active = false;
	      		enemy.active = false;
	       		Ash.score++;
	      	}
    	});
  	});
  	//collision between pokemon and ash
  	pokemon.forEach(function(enemy) {
   		if (collides(enemy, Ash)) 
   		{
    		enemy.active = false;
      		Ash.active = false;
    	}
  	});
}
	
function getRandomInt(min, max) 
{
  	return Math.floor(Math.random()*(max-min+1)+min);
}

function keyHandler(e)
{
	//up arrow or w
	if(e.keyCode == 38 || e.keyCode == 87)
	{
		Ash.yPos += -30;
		//top boundary of canvas
		if(Ash.yPos < 0)
			Ash.yPos = 0;
	}
	//down arrow or s
	if(e.keyCode == 40 || e.keyCode == 83)
	{
		Ash.yPos += 30;
		//bottom boundary of canvas
		if(Ash.yPos > stage.height - Ash.spriteHeight)
			Ash.yPos = stage.height - Ash.spriteHeight;
	}
	//space bar to shoot pokeball or restart
	if(e.keyCode == 32)
	{
		//pokeballs.push(new Pokeball(Ash.yPos+Ash.spriteHeight*Ash.scale*.6));
		if(Ash.active)
			Ash.shoot();		
	}
	//enter to start or restart the game
	if(e.keyCode == 13)
	{
		if(menu)
			menu = false;
		if(Ash.active == false)
		{
				Ash.active = true;
				Ash.score = 0;
				Ash.xPos = 0;
				Ash.yPos = 200;
				t = .05;
				pokemon = [];
				pokeballs = [];
		}
	}
}