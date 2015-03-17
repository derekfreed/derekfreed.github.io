ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityPlayer = ig.Entity.extend({
		animSheet: new ig.AnimationSheet( 'media/Portrait.png', 50, 50 ),
		size: {x: 24, y:50},
		offset: {x: 13, y: 0},
		flip: false,
		maxVel: {x: 100, y: 150},
		friction: {x: 600, y: 0},
		accelGround: 400,
		accelAir: 200,
		jump: 150,
		startPosition: null,
		zIndex: 100,
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.PASSIVE,
		invincible: true,
        invincibleDelay: 2,
        invincibleTimer: null,
        jumpSFX: new ig.Sound( 'media/sounds/jump.ogg' ),
        shootSFX: new ig.Sound( 'media/sounds/lasershoot.ogg' ),
        powerupSFX: new ig.Sound( 'media/sounds/powerup.ogg' ),
        bombSFX: new ig.Sound( 'media/sounds/ForkBomb.ogg' ),
        deathSFX: new ig.Sound( 'media/sounds/PlayerDeath.ogg' ),
        punchSFX: new ig.Sound( 'media/sounds/WifiPunch.ogg' ),
        weapon: 0,
        totalWeapons: 2,
        activeWeapon: "EntityBullet",
        onLadder: false,
        isSwimming: false,
        isTopDown: false,
        
		init: function( x, y, settings ) {
 			this.parent( x, y, settings );
 			this.startPosition = {x:x,y:y};
 			// Add the animations
 			this.addAnim( 'idle', 1, [0] );
 			this.addAnim( 'run', 0.12, [1,2,3,4,5,6]);
 			this.addAnim( 'jump', 1, [7] );
 			this.addAnim( 'fall', .1, [7,8] );
            this.addAnim( 'climb', .1, [9,10]);
            this.addAnim( 'idleClimb', 1, [9]);
            this.addAnim( 'swim', .1, [11,12,13]);
            this.addAnim( 'up', .2, [14,15]);
            this.addAnim( 'down', .2, [16,17]);
            this.addAnim( 'rope', 1 ,[9]);
 			this.invincibleTimer = new ig.Timer();
            this.makeInvincible();
            this.shootSFX.volume = .05;
            this.jumpSFX.volume = .05;
            this.powerupSFX.volume = .05;
            this.bombSFX.volume = .05;
            this.deathSFX.volume = .05;
            this.punchSFX.volume = .05;
            ig.game.player = this;
 		},
 		makeInvincible: function(){
            this.invincible = true;
            this.invincibleTimer.reset();
        },
 		update: function() {
 			
		// move left or right

			//prevents gravity if swimming, on ladder ot level is top down
            if(this.onLadder || this.isSwimming || this.isTopDown) {
                this.friction.y=1000;
            }
            if(this.isSwimming || this.isTopDown){
                this.friction.x=1000;
            }
            if(!this.onLadder && !this.isSwimming && !this.isTopDown){
                this.friction.y=0;
            }
            if(this.onLadder || this.isSwimming || this.isTopDown){
                if( ig.input.state('up') )
                    this.vel.y = -100;
                if( ig.input.state('down') )
                    this.vel.y = 100;
            }
			//different animations and method of walking if level is topdown
            if(this.isTopDown) {
                if(ig.input.state('up'))
                    this.currentAnim = this.anims.up;
                if(ig.input.state('down')) {
                    this.currentAnim = this.anims.down;
                }
                if(ig.input.state('left')) {
                    this.currentAnim = this.anims.run;
                    this.flip = true;
                    this.vel.x = -100;
                }
                if(ig.input.state('right')) {
                    this.currentAnim = this.anims.run;
                    this.flip = false;
                    this.vel.x = 100;
                }
                if(this.vel.x==0 && this.vel.y==0)
                    this.currentAnim = this.anims.idle;
            }
            //if level is not top down
            else {
                var accel = this.standing ? this.accelGround : this.accelAir;
            
                if( ig.input.state('left') ) {
                
                    this.accel.x = -accel;
                    this.flip = true;
                
                }else if( ig.input.state('right') ) {
                
                    this.accel.x = accel;
                    this.flip = false;
                }else{

                    this.accel.x = 0;
                }
                // jump
                if( this.standing && ig.input.pressed('jump') ) {
                    this.vel.y = -this.jump;
                    this.jumpSFX.play();
                }
                //shoot
                if( ig.input.pressed('shoot') ) {
                    if(this.activeWeapon == "EntityBomb") {
                        if(ig.game.bombs>0) {
                            ig.game.spawnEntity( this.activeWeapon, this.pos.x , this.pos.y, {flip:this.flip} );
                            this.bombSFX.play();
                            ig.game.bombs--;
                        }
                    }
                    else {
                        ig.game.spawnEntity( this.activeWeapon, this.pos.x , this.pos.y, {flip:this.flip} );
                        this.shootSFX.play();
                    }
                }
                //punch
                if ( ig.input.pressed('punch') ) {
                    ig.game.spawnEntity( EntityPunch, this.pos.x,this.pos.y, {flip:this.flip});
                    this.punchSFX.play();
                }
                //swap weapons
                if( ig.input.pressed('switch') ) {
                    this.weapon ++;
                    if(this.weapon >= this.totalWeapons)
                        this.weapon = 0;
                    switch(this.weapon){
                        case(0):
                            this.activeWeapon = "EntityBullet";
                            break;
                        case(1):
                            this.activeWeapon = "EntityBomb";
                        break;
                    }
                }
                //Handles the animations
                if(this.isSwimming) {
                    this.currentAnim = this.anims.swim;
                }
                else if( this.vel.y !=0 && this.onLadder) {
                    this.currentAnim = this.anims.climb;
                }
                else if( this.vel.y==0 && this.onLadder) {
                    this.currentAnim = this.anims.idleClimb;
                }
    			else if( this.vel.y < 0 ) {
    				this.currentAnim = this.anims.jump;
    			}else if( this.vel.y > 0 ) {
    				this.currentAnim = this.anims.fall;
    			}else if( this.vel.x != 0 ) {
    				this.currentAnim = this.anims.run;
    			}else{
    				this.currentAnim = this.anims.idle;
    			}
            }

			this.currentAnim.flip.x = this.flip;
			if( this.invincibleTimer.delta() > this.invincibleDelay ) {
                this.invincible = false;
                this.currentAnim.alpha = 1;
            }
			
            this.isTopDown = false;
            this.isSwimming = false;
            this.onLadder = false;
			this.parent();
		},
		handleMovementTrace: function( res ) {
			this.parent( res );
			
			// collision with a wall? return!
			if( res.collision.x && !this.flip) {
				this.flip = true;
			}
			else if( res.collision.x && this.flip) {
				this.flip = false;
			}
		},
		kill: function(){
            this.parent();
            ig.game.respawnPosition = this.startPosition;
            this.deathSFX.play();
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {callBack:this.onDeath} );
        },
        onDeath: function(){
        	ig.game.stats.deaths ++;
            ig.game.lives --;
            if(ig.game.lives < 0){
                ig.game.gameOver();
            }
            else{
                ig.game.spawnEntity( EntityPlayer, ig.game.respawnPosition.x, ig.game.respawnPosition.y);
            }
        },
        receiveDamage: function(amount, from){
            if(this.invincible)
                return;
            this.parent(amount, from);
        },
        draw: function(){
            //makes it so player can't die for a few seconds when he/she spawns 
            if(this.invincible)
                this.currentAnim.alpha = this.invincibleTimer.delta()/this.invincibleDelay * 1 ;
            this.parent();
        }
		
	});
    //this is the wifi punch -- the player can spam this as much as he/she wants
    EntityPunch = ig.Entity.extend({
        size: {x: 20, y: 10},
        animSheet: new ig.AnimationSheet( 'media/wifi.png', 20, 10 ),
        maxVel: {x: 250, y: 0},
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.Fixed,
        lifetime: .07,
        timer: null,
        init: function( x, y, settings ) {
            this.parent( x + (settings.flip ? -30 : 30) , y+30, settings );
            this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
            this.addAnim( 'idle', 0.2, [0] );
            this.timer = new ig.Timer();
            this.currentAnim.flip.x = settings.flip;
        },
        // handleMovementTrace: function( res ) {
        //     this.parent( res );
        //     if( res.collision.x || res.collision.y ){
        //         this.kill();
        //     }
        // },
        check: function( other ) {
            other.receiveDamage( 5, this );
            // this.kill();
        },
        update: function() {
            if( this.timer.delta() > this.lifetime ) {
                this.kill();
                // if(this.callBack)
                //     this.callBack();
                // return;
            }
        }
    });
    //fork() bullet -- player has infinite amount of fork()
	EntityBullet = ig.Entity.extend({
		size: {x: 30, y: 10},
		animSheet: new ig.AnimationSheet( 'media/Fork.png', 30, 10 ),
		maxVel: {x: 250, y: 0},
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.PASSIVE,
		init: function( x, y, settings ) {
			this.parent( x + (settings.flip ? -30 : 30) , y+30, settings );
			this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
			this.addAnim( 'idle', 0.2, [0] );   
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
	});
    //spawner for blood
	EntityDeathExplosion = ig.Entity.extend({
        lifetime: 1,
        callBack: null,
        particles: 30,
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
                for(var i = 0; i < this.particles; i++)
                    ig.game.spawnEntity(EntityDeathExplosionParticle, x+10, y+20, {colorOffset: settings.colorOffset ? settings.colorOffset : 0});
                this.idleTimer = new ig.Timer();
            },
            update: function() {
                if( this.idleTimer.delta() > this.lifetime ) {
                    this.kill();
                    if(this.callBack)
                        this.callBack();
                    return;
                }
            }
    });
    //blood particles
    EntityDeathExplosionParticle = ig.Entity.extend({
        size: {x: 2, y: 2},
        maxVel: {x: 160, y: 200},
        lifetime: 2,
        fadetime: 1,
        bounciness: 0,
        vel: {x: 100, y: 30},
        friction: {x:100, y: 0},
        collides: ig.Entity.COLLIDES.LITE,
        colorOffset: 0,
        totalColors: 7,
        animSheet: new ig.AnimationSheet( 'media/blood.png', 2, 2 ),
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            var frameID = Math.round(Math.random()*this.totalColors) + (this.colorOffset * (this.totalColors+1));
            this.addAnim( 'idle', 0.2, [frameID] );
            this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
            this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
            this.idleTimer = new ig.Timer();
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
        }
    });
    //forkbombs that spawns forks that also do damage
    //player has a limmited amount of forkbombs -- but you can get more by picking up coffee 
	EntityBomb = ig.Entity.extend({
        size: {x: 40, y: 10},
        offset: {x: 0, y: 0},
        animSheet: new ig.AnimationSheet( 'media/bomb.png', 40, 10 ),
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        maxVel: {x: 200, y: 200},
        bounciness: 0.6,
        bounceCounter: 0,
        explodeSFX: new ig.Sound( 'media/sounds/BombExplode.ogg' ),
        init: function( x, y, settings ) {
            this.parent( x + (settings.flip ? -30 : 30), y+30, settings );
            this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
            this.vel.y = -(50 + (Math.random()*100));
            this.addAnim( 'idle', 1, [0] );
            this.explodeSFX.volume = .05;
        },
        handleMovementTrace: function( res ) {
        	this.parent( res );
        	if( res.collision.x || res.collision.y ) {
        		// only bounce 3 times
        		this.bounceCounter++;
        		if( this.bounceCounter > 3 ) {
        			this.kill();
        		}
        	}
        },
        check: function( other ) {
        	other.receiveDamage( 1, this );
        	this.kill();
        },
        kill: function(){
            this.explodeSFX.play();
            for(var i = 0; i < 10; i++)
                ig.game.spawnEntity(EntityFrackParticle, this.pos.x, this.pos.y);
            this.parent();
        }
    });
    //spawned when a forkbomb explodes and they each do 1 damage
	EntityFrackParticle = ig.Entity.extend({
        size: {x: 10, y: 10},
        maxVel: {x: 160, y: 200},
        lifetime: 2,
        fadetime: 1,
        bounciness: 0.3,
        vel: {x: 40, y: 100},
        friction: {x:20, y: 20},
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        animSheet: new ig.AnimationSheet( 'media/frack.png', 10, 10 ),
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.vel.x = (Math.random() * 4 - 1) * this.vel.x;
            this.vel.y = (Math.random() * 30 - 1) * this.vel.y;
            this.idleTimer = new ig.Timer();
            this.addAnim( 'idle', 0.2, [0,1,2,3] );
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
        }
    });
    //spawns random amount of bitcoins whenever an entity dies
    //bitcoins basically serve as the score 
	EntityBitCoin = ig.Entity.extend({
        size: {x: 20, y: 20},
        maxVel: {x: 160, y: 200},
        lifetime: 4,
        fadetime: 1,
        bounciness: 0.3,
        vel: {x: 40, y: 100},
        friction: {x:20, y: 20},
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,
        coinSFX: new ig.Sound( 'media/sounds/pickupcoin.ogg' ),
        animSheet: new ig.AnimationSheet( 'media/bitcoin.png', 20, 20 ),
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.vel.x = (Math.random() * 3 - 1) * this.vel.x;
            this.vel.y = (Math.random() * 6 - 1) * this.vel.y;
            this.idleTimer = new ig.Timer();
            // var frameID = Math.round(Math.random()*7);
            this.addAnim( 'idle', 0.05, [0,1,2,3,4,5,6,7] );
            this.coinSFX.volume = .05;
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
        	this.coinSFX.play();
        	ig.game.stats.bitCoins++;
        	this.kill();
        }
    });
    //Randomly spawns when an enemy dies and gives player a new life if he collides with it
    EntityExtraLife = ig.Entity.extend({
        size: {x: 20, y: 20},
        maxVel: {x: 160, y: 200},
        lifetime: 4,
        fadetime: 1,
        bounciness: 0.3,
        vel: {x: 40, y: 100},
        friction: {x:20, y: 20},
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,
        lifeSFX: new ig.Sound( 'media/sounds/ExtraLife.ogg' ),
        animSheet: new ig.AnimationSheet( 'media/extraLife.png', 20, 20 ),
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.vel.x = (Math.random() * 3 - 1) * this.vel.x;
            this.vel.y = (Math.random() * 6 - 1) * this.vel.y;
            this.idleTimer = new ig.Timer();
            // var frameID = Math.round(Math.random()*7);
            this.addAnim( 'idle', 0.05, [0,1,2,3,4,5] );
            this.lifeSFX.volume = .05;
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
            this.lifeSFX.play();
            ig.game.lives++;
            this.kill();
        }
    });
    //Coffee gives the player more ammo for Fork Bomb
    EntityCoffee = ig.Entity.extend({
        size: {x: 20, y: 20},
        maxVel: {x: 160, y: 200},
        lifetime: 4,
        fadetime: 1,
        bounciness: 0.3,
        vel: {x: 40, y: 100},
        friction: {x:20, y: 20},
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,
        coffeeSFX: new ig.Sound( 'media/sounds/Coffee.ogg' ),
        animSheet: new ig.AnimationSheet( 'media/coffee.png', 20, 20 ),
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.vel.x = (Math.random() * 6 - 1) * this.vel.x;
            this.vel.y = (Math.random() * 6 - 1) * this.vel.y;
            this.idleTimer = new ig.Timer();
            this.addAnim( 'idle', 0.05, [0] );
            this.coffeeSFX.volume = .05;
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
            this.coffeeSFX.play();
            ig.game.bombs++;
            this.kill();
        }
    });
});