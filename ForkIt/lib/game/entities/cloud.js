ig.module(
	'game.entities.cloud'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityCloud = ig.Entity.extend({
		animSheet: new ig.AnimationSheet( 'media/cloud.png', 100, 50 ),
		size: {x: 100, y:60},
		offset: {x: 0, y: 0},
		maxVel: {x: 100, y: 100},
		flip: true,
		friction: {x: 0, y: 0},
		speed: 50,
		health: 1000,
		maxHealth: 1000,
		zIndex: 100,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		timer: null,
		yelltimer: null,
		deathSFX: new ig.Sound( 'media/sounds/serverdie.ogg' ),
		yellSFX: new ig.Sound( 'media/sounds/CloudNoise.ogg' ),

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim('float', .2, [0,1,2,3,4,5,6]);
			this.deathSFX.volume = .05;
			this.yellSFX.volume = .05;
			this.timer = new ig.Timer();
			this.yelltimer = new ig.Timer();
		},
		update: function() {
			if(this.distanceTo(ig.game.player)<700) {
				//player on left
				if(ig.game.player.pos.x-this.pos.x<0){
					this.vel.x=-30;
					this.flip=true;
				}
				//player on right
				else{
					this.vel.x=30;
					this.flip=false;
				}
				//player above
				if(ig.game.player.pos.y-this.pos.y<0) {
					this.vel.y=-30;
				}
				//player below
				else{
					this.vel.y=30;
					if(Math.floor((Math.random()*10)+1)>6)
						ig.game.spawnEntity(EntityRain, this.pos.x + Math.floor((Math.random()*100)+1), this.pos.y+50);

				}
				//yell every 22 seconds
				if(this.yelltimer.delta()>11){
					this.yellSFX.play();
					this.yelltimer.reset();
				}
			}
			//shoots a segfault every 10 seconds
			if(this.timer.delta()>10){
				ig.game.spawnEntity( EntitySegfault, this.pos.x , this.pos.y +10, {flip:this.flip} );
				this.timer.reset();
			}
			
			this.currentAnim.flip.x = this.flip;
			this.parent();
		},
		draw: function() {
        	//border part of healthbar
	        ig.system.context.fillStyle = "rgb(0,0,0)";
	        ig.system.context.beginPath();
	        ig.system.context.rect(
	                        (this.pos.x - ig.game.screen.x) * ig.system.scale, 
	                        (this.pos.y - ig.game.screen.y - 10) * ig.system.scale, 
	                        this.size.x * ig.system.scale, 
	       					4 * ig.system.scale);
	        ig.system.context.closePath();
	        ig.system.context.fill();
	        
	        //actual health bar
	        ig.system.context.fillStyle = "rgb(255,0,0)";
	        ig.system.context.beginPath();
	        ig.system.context.rect(
	                        (this.pos.x - ig.game.screen.x + 1) * ig.system.scale, 
	                        (this.pos.y - ig.game.screen.y - 9) * ig.system.scale, 
	                        ((this.size.x - 2) * (this.health / this.maxHealth)) * ig.system.scale, 
	                        2 * ig.system.scale);
	        ig.system.context.closePath();
	        ig.system.context.fill();
	        
	        this.parent();
    	},
		handleMovementTrace: function( res ) {
			this.parent( res );
		},
		check: function( other ) {
			other.receiveDamage( 10, this );
		},
		receiveDamage: function(value){
        	this.parent(value);
        	if(this.health > 0){
    			ig.game.spawnEntity(EntityDeathExplosion, this.pos.x+40, this.pos.y+15, {particles: 10, colorOffset: 1});
	    		if(Math.floor((Math.random()*80)+1)==1) {
            		ig.game.spawnEntity(EntityCoffee, this.pos.x, this.pos.y);
            	}
	    	}
	    },
	    kill: function(){
	    	this.deathSFX.play();
	    	ig.game.stats.kills ++;
	        this.parent();
	        ig.game.spawnEntity(EntityDeathExplosion, this.pos.x+40, this.pos.y+15, { particles: 20, colorOffset: 1});
	        ig.game.stats.bitCoins +=50;
	        ig.game.winGame();
	        
	    }
	});
	EntitySegfault = ig.Entity.extend({
		size: {x: 50, y: 10},
		animSheet: new ig.AnimationSheet( 'media/segfault.png', 50, 10 ),
		maxVel: {x: 120, y: 0},
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		segSFX: new ig.Sound( 'media/sounds/SegFault.ogg' ),
		explodeSFX: new ig.Sound( 'media/sounds/BombExplode.ogg' ),
		init: function( x, y, settings ) {
			this.parent( x + (settings.flip ? -50 : 50) , y+30, settings );
			this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
			this.addAnim( 'idle', 0.2, [0] ); 
			this.segSFX.volume = .05;  
			this.explodeSFX.volume = .05;
			this.segSFX.play();
		},
		handleMovementTrace: function( res ) {
			this.parent( res );
			if( res.collision.x || res.collision.y ){
				this.kill();
			}
		},
		check: function( other ) {
			other.receiveDamage( 3, this );
			this.kill();
		},
		receiveDamage: function(value){
        	this.parent(value);
        	if(this.health > 0){
    			ig.game.spawnEntity(EntityDeathExplosion, this.pos.x+25, this.pos.y+5, {particles: 2, colorOffset: 1});
            }
	    },
	    kill: function(){
	        this.parent();
	        this.explodeSFX.play();
	        ig.game.spawnEntity(EntityDeathExplosion, this.pos.x+25, this.pos.y+5, {particles: 5, colorOffset: 1}); 
	    }
	});
	//rain entity that spawns below cloud when the player is below the cloud
	EntityRain = ig.Entity.extend({
        size: {x: 5, y: 5},
        maxVel: {x: 0, y: 50},
        lifetime: 1,
        fadetime: 1,
        bounciness: 0.3,
        vel: {x: 0, y: 10},
        friction: {x:20, y: 20},
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,
        animSheet: new ig.AnimationSheet( 'media/rain.png', 5, 5 ),
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.vel.x = (Math.random() * 4 - 1) * this.vel.x;
            this.vel.y = (Math.random() * 30 - 1) * this.vel.y;
            this.idleTimer = new ig.Timer();
            this.addAnim( 'idle', 0.2, [0,1] );
            this.currentAnim.gotoRandomFrame();
        },
        update: function() {
            if( this.idleTimer.delta() > this.lifetime ) {
                this.kill();
                return;
            }
            this.currentAnim.alpha = this.idleTimer.delta().map(
                this.lifetime - this.fadetime, this.lifetime,
                1, 0
            );
            this.parent();
        },
        check: function( other ) {
        	other.receiveDamage( 1, this );
        	this.kill();
        },
    });
});