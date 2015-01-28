function Background() 
{
	this.xVelocity = -3; 
	this.xPos = 0;
	this.yPos = 0;
	this.image = new Image();
	this.image.src = "grassBackground.png";
	this.image.onload = function(){
		this.ready = true;
	};
	this.draw = function() {
		// Pan background
		this.xPos += this.xVelocity;
		ctx.drawImage(this.image, this.xPos, this.yPos);
		// Draw another image at the top edge of the first image
		ctx.drawImage(this.image, this.xPos - stage.width, this.yPos);
		// If the image scrolled off the screen, reset
		if (this.xPos <= 0)
			this.xPos = stage.width;
	};
}