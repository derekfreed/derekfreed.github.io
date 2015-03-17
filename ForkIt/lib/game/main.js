ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.levels.level1',
    'game.levels.level2',
    'game.levels.level3',
    'game.levels.bonus',
    'plugins.box2d.game',
    'plugins.box2d.entity'
)
.defines(function(){

MyGame = ig.Game.extend({
	gravity: 300,
    statText: new ig.Font( 'media/04b03.font.png' ),
	stats: {bitCoins: 0, kills: 0, deaths: 0},
	lives: 3,
    bombs: 8,
    showStats: false,
    lifeSprite: new ig.Image('media/life-sprite.png'),
    coinSprite: new ig.Image('media/coin-sprite.png'),
    bombSprite: new ig.Image('media/bomb.png'),
    statScreen: new ig.Image('media/backgroundMenu.png'),
	
	
	init: function() {
		// Initialize your game here; bind keys etc.
		this.loadLevel(LevelLevel1);
		this.stats = {bitCoins: 0, kills: 0, deaths: 0};
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.UP_ARROW, 'up' );
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
		ig.input.bind( ig.KEY.X, 'jump' );
		ig.input.bind( ig.KEY.C, 'shoot' );
        ig.input.bind( ig.KEY.V, 'punch' );
        ig.input.bind( ig.KEY.TAB, 'switch' );
        ig.input.bind( ig.KEY.SPACE, 'continue' );
	},
	
	update: function() {
		// screen follows the player
		var player = this.getEntitiesByType( EntityPlayer )[0];
    	if( player ) {
    		this.screen.x = player.pos.x - ig.system.width/2;
    		this.screen.y = player.pos.y - ig.system.height/2;
            if(player.accel.x > 0 && this.instructText)
                this.instructText = null;
    	}
        if(this.screen.x <= 0){
           this.screen.x = 0;
         }
        else if(this.screen.x >= ig.game.collisionMap.pxWidth - ig.system.width){
            this.screen.x = ig.game.collisionMap.pxWidth - ig.system.width;
        }

        if(this.screen.y <= 0){
            this.screen.y = 0;
        }
        else if(this.screen.y >= ig.game.collisionMap.pxHeight - ig.system.height){
            this.screen.y = ig.game.collisionMap.pxHeight - ig.system.height;
        }
		// Update all entities and backgroundMaps
        if(!this.showStats) {
            this.parent();
        }
        else {
            if(ig.input.state('continue')){
                this.showStats = false;
                this.levelExit.nextLevel();
                this.parent();
            }
        }
	},
	loadLevel: function( data ) {
        
    	this.parent(data);
    },
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		if(this.showStats){
            this.statScreen.draw(0,0);
            var x = ig.system.width/2;
            var y = ig.system.height/2 - 20;
            this.statText.draw('Level Complete', x, y, ig.Font.ALIGN.CENTER);
            this.statText.draw('Kills: '+this.stats.kills, x, y+40, ig.Font.ALIGN.CENTER);
            this.statText.draw('Deaths: '+this.stats.deaths, x, y+50, ig.Font.ALIGN.CENTER);
            this.statText.draw('BitCoins: '+this.stats.bitCoins, x, y+60, ig.Font.ALIGN.CENTER);
            this.statText.draw('Press Spacebar to continue.', x, ig.system.height - 10, ig.Font.ALIGN.CENTER);
        }
		
		
		var x = ig.system.width/2,
			y = ig.system.height/2;
        
        this.statText.draw("Lives", 5, 5);
        for(var i=0; i < this.lives; i++)
            this.lifeSprite.draw(((this.lifeSprite.width +2)*i)+5, 15);
        this.statText.draw("Fork Bombs", ig.system.width-175, 5);
        this.bombSprite.draw(ig.system.width-175, 15);
        this.statText.draw(":", ig.system.width-130, 18);
        this.statText.draw(this.bombs, ig.system.width-125, 18);
        this.statText.draw("BitCoins", ig.system.width-50, 5);
        this.coinSprite.draw(ig.system.width-50, 15);
        this.statText.draw(":", ig.system.width-25, 22);
        this.statText.draw(this.stats.bitCoins, ig.system.width-20, 22);
		
	},
    toggleStats: function(levelExit){
        this.showStats = true;
        this.levelExit = levelExit;
    },
	gameOver: function(){
        ig.finalStats = ig.game.stats;
        ig.system.setGame(GameOverScreen);
    },
    winGame: function(){
        ig.finalStats = ig.game.stats;
        ig.system.setGame(WinScreen);
    }
});
StartScreen = ig.Game.extend({
    instructText: new ig.Font( 'media/04b03.font.png' ),
    background: new ig.Image('media/backgroundMenu.png'),
    title: new ig.Image('media/title.png'),
    menuSFX: new ig.Sound( 'media/sounds/menuselect.ogg' ),
    init: function() {
        ig.input.bind( ig.KEY.SPACE, 'start');
        this.menuSFX.volume =.05;
    },
    update: function() {
        if(ig.input.pressed ('start')){
            this.menuSFX.play();
            ig.system.setGame(StoryScreen)
        }
        this.parent();
    },
    draw: function() {
        this.parent();
        this.background.draw(0,0);
        this.title.draw(ig.system.width/2 - this.title.width/2, ig.system.height/2 - this.title.height);
        var x = ig.system.width/2,
        y = ig.system.height - 10;
        this.instructText.draw( 'By Derek Freed', x, ig.system.height-50, ig.Font.ALIGN.CENTER );
        this.instructText.draw( 'Press Spacebar To Start', x, y, ig.Font.ALIGN.CENTER );
    }
});

GameOverScreen = ig.Game.extend({
    instructText: new ig.Font( 'media/04b03.font.png' ),
    background: new ig.Image('media/backgroundMenu.png'),
    gameOver: new ig.Image('media/game-over.png'),
    stats: {},
    menuSFX: new ig.Sound( 'media/sounds/menuselect.ogg' ),
    init: function() {
        ig.input.bind( ig.KEY.SPACE, 'start');
        this.stats = ig.finalStats;
        this.menuSFX.volume =.05;
    },
    update: function() {
        if(ig.input.pressed('start')){
            this.menuSFX.play();
            ig.system.setGame(StartScreen)
        }
        this.parent();
    },
    draw: function() {
        this.parent();
        this.background.draw(0,0);
        var x = ig.system.width/2;
        var y = ig.system.height/2 - 20;
        this.gameOver.draw(x - (this.gameOver.width * .5), y - 30);
        var score = (this.stats.kills * 100) + (this.stats.bitCoins * 100);
        this.instructText.draw('Total Kills: '+this.stats.kills, x, y+30, ig.Font.ALIGN.CENTER);
        this.instructText.draw('Total Deaths: '+this.stats.deaths, x, y+40, ig.Font.ALIGN.CENTER);
        this.instructText.draw('BitCoins: '+this.stats.bitCoins, x, y+50, ig.Font.ALIGN.CENTER);
        this.instructText.draw('Score: '+score, x, y+60, ig.Font.ALIGN.CENTER);
        this.instructText.draw('Press Spacebar To Continue.', x, ig.system.height - 10, ig.Font.ALIGN.CENTER);
    }
});
InstructionScreen = ig.Game.extend({
    instructText: new ig.Font( 'media/04b03.font.png' ),
    menuSFX: new ig.Sound( 'media/sounds/menuselect.ogg' ),
    init: function() {
        ig.input.bind( ig.KEY.SPACE, 'start');
        this.menuSFX.volume =.05;
    },
    update: function() {
        if(ig.input.pressed('start')){
            this.menuSFX.play();
            ig.system.setGame(MyGame)
        }
        this.parent();
    },
    draw: function() {
        this.parent();
        
        var x = ig.system.width/2;
        var y = ig.system.height/2 - 20;
        this.instructText.draw('Instructions:', x, y-40, ig.Font.ALIGN.CENTER);
        this.instructText.draw('Arrow Keys for Movement', x, y-10, ig.Font.ALIGN.CENTER);
        this.instructText.draw('Tab to switch weapon', x, y, ig.Font.ALIGN.CENTER);
        this.instructText.draw('X to shoot', x, y+10, ig.Font.ALIGN.CENTER);
        this.instructText.draw('C to jump', x, y+20, ig.Font.ALIGN.CENTER);
        this.instructText.draw('V to melee', x, y+30, ig.Font.ALIGN.CENTER);
        this.instructText.draw('Press Spacebar To Continue.', x, ig.system.height - 10, ig.Font.ALIGN.CENTER);
    }
});
StoryScreen = ig.Game.extend({
    instructText: new ig.Font( 'media/04b03.font.png' ),
    menuSFX: new ig.Sound( 'media/sounds/menuselect.ogg' ),
    init: function() {
        ig.input.bind( ig.KEY.SPACE, 'start');
        this.menuSFX.volume =.05;
    },
    update: function() {
        if(ig.input.pressed('start')){
            this.menuSFX.play();
            ig.system.setGame(InstructionScreen)
        }
        this.parent();
    },
    draw: function() {
        this.parent();
        
        var x = ig.system.width/2;
        var y = ig.system.height/2 - 20;
        this.instructText.draw('Forkit', x, y-40, ig.Font.ALIGN.CENTER);
        this.instructText.draw('We were told the cloud would be a better place...', 40, y-10, ig.Font.ALIGN.LEFT);
        this.instructText.draw('We could live in a simulated world with no sickness...', 40, y, ig.Font.ALIGN.LEFT);
        this.instructText.draw('We were told lies...', 40, y+10, ig.Font.ALIGN.LEFT);
        this.instructText.draw('We should have known...', 40, y+20, ig.Font.ALIGN.LEFT);
        this.instructText.draw('We were going to be deleted!', 40, y+30, ig.Font.ALIGN.LEFT);
        this.instructText.draw('I knew what I had to do...FORK THE SERVERS!!!', 40, y+40, ig.Font.ALIGN.LEFT);
        this.instructText.draw('Press Spacebar To Continue.', x, ig.system.height - 10, ig.Font.ALIGN.CENTER);
    }
});
WinScreen = ig.Game.extend({
    instructText: new ig.Font( 'media/04b03.font.png' ),
    background: new ig.Image('media/backgroundMenu.png'),
    winBanner: new ig.Image('media/win.png'),
    stats: {},
    menuSFX: new ig.Sound( 'media/sounds/menuselect.ogg' ),
    init: function() {
        ig.input.bind( ig.KEY.SPACE, 'start');
        this.stats = ig.finalStats;
        this.menuSFX.volume =.05;
    },
    update: function() {
        if(ig.input.pressed('start')){
            this.menuSFX.play();
            ig.system.setGame(BoxGame)
        }
        this.parent();
    },
    draw: function() {
        this.parent();
        this.background.draw(0,0);
        var x = ig.system.width/2;
        var y = ig.system.height/2 - 20;
        this.winBanner.draw(x - (this.winBanner.width * .5), y - 30);
        var score = (this.stats.kills * 100) + (this.stats.bitCoins * 100);
        this.instructText.draw('Total Kills: '+this.stats.kills, x, y+30, ig.Font.ALIGN.CENTER);
        this.instructText.draw('Total Deaths: '+this.stats.deaths, x, y+40, ig.Font.ALIGN.CENTER);
        this.instructText.draw('BitCoins: '+this.stats.bitCoins, x, y+50, ig.Font.ALIGN.CENTER);
        this.instructText.draw('Score: '+score, x, y+60, ig.Font.ALIGN.CENTER);
        this.instructText.draw('Press Spacebar To Continue.', x, ig.system.height - 10, ig.Font.ALIGN.CENTER);
    }
});
BoxGame = ig.Box2DGame.extend({
    init: function(){
        var gravity = new Box2D.Common.Math.b2Vec2( 0, 30 );
        ig.world = new Box2D.Dynamics.b2World( gravity, true ); 
        this.loadLevel(LevelBonus); 
    },
    draw: function(){
        this.parent();
    },
    update: function(){
        ig.world.Step( ig.system.tick, 6, 6 );
        ig.game.spawnEntity(EntityRain, Math.floor((Math.random()*300)+1), 0);
        this.parent();
    }
});
EntityNumber = ig.Box2DEntity.extend({
    size: {x: 5, y: 5},

    // Collision is already handled by Box2D!
    collides: ig.Entity.COLLIDES.NEVER,

    animSheet: new ig.AnimationSheet( 'media/rain.png', 5, 5 ),

    init: function( x, y, settings ) {
        this.addAnim( 'idle', 1, [0] );
        this.parent( x, y, settings );
    }
});

// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', StartScreen, 60, 300, 200, 3 );

});
