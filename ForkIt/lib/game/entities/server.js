ig.module(
	'game.entities.server'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityServer = ig.Entity.extend({
		animSheet: new ig.AnimationSheet( 'media/serverEnemy.png', 50, 50 ),
		size: {x: 50, y:50},
		offset: {x: 0, y: 0},
		maxVel: {x: 100, y: 100},
		flip: true,
		friction: {x: 150, y: 0},
			speed: 50,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		deathSFX: new ig.Sound( 'media/sounds/serverdie.ogg' ),
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim('walk', .15, [0,1,2,3]);
			this.currentAnim.gotoRandomFrame();
			this.deathSFX.volume = .05;
		},
		update: function() {
			// near an edge? return!
			if( !ig.game.collisionMap.getTile(
				this.pos.x + (this.flip ? +4 : this.size.x -4),
					this.pos.y + this.size.y+1)) {
				this.flip = !this.flip;
			}
			var xdir = this.flip ? -1 : +1;
			this.vel.x = this.speed * xdir;
			this.currentAnim.flip.x = this.flip;
			this.parent();
		},
		handleMovementTrace: function( res ) {
			this.parent( res );
			// collision with a wall? return!
			if( res.collision.x ) {
				this.flip = !this.flip;
			}
		},
		check: function( other ) {
			other.receiveDamage( 10, this );
		},
		receiveDamage: function(value){
        	this.parent(value);
        	if(this.health > 0)
    			ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {particles: 8, colorOffset: 1});
	    },
	    kill: function(){
	    	for(var i = 0; i < Math.floor((Math.random()*10)+1); i++) 
                ig.game.spawnEntity(EntityBitCoin, this.pos.x, this.pos.y);
            if(Math.floor((Math.random()*10)+1)==1) {
            	ig.game.spawnEntity(EntityExtraLife, this.pos.x, this.pos.y);
            }
            if(Math.floor((Math.random()*10)+1)==1) {
            	ig.game.spawnEntity(EntityCoffee, this.pos.x, this.pos.y);
            }
	    	this.deathSFX.play();
	    	ig.game.stats.kills ++;
	        this.parent();
	        ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {colorOffset: 1});
	    }
	});
});