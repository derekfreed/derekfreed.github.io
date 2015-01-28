function Player ()
{
	this.isPlayer = true;
	this.active = true;
	this.xPos = 0;
	this.yPos = 200;
	this.imageX = 0;
	this.imageY = 96;
	this.scale = 3
	this.spriteWidth = 32*this.scale;
	this.spriteHeight = 32*this.scale;
	this.sheetWidth = 96;
	this.ready = false;
	this.image = new Image();
	this.image.src = "ash.png";
	this.score = 0;
	this.image.onload = function(){
		this.ready = true;
	};
	this.draw = function(){
		ctx.drawImage(this.image, this.imageX, this.imageY, 32,32, this.xPos, this.yPos, this.spriteWidth, this.spriteHeight);
		//controls how often Ashe sprite changes
		if(i == 10){
			//update sprite to animate
			this.imageX += 32;
			if (this.imageX >= this.sheetWidth)
				this.imageX = 0;
			i = 0;
		}
		i++;
	};
	this.shoot = function(){
		pokeballs.push(new Pokeball(Ash.yPos + Ash.spriteHeight*.6));
	};
}