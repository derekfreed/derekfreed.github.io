ig.module(
	'game.entities.spawner'
)
.requires(
	'impact.entity'
)
.defines(function(){

	EntitySpawner = ig.Entity.extend({
		_wmScalable: true,
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(255, 170, 66, 0.7)',
		
		size: {x: 10, y: 10},
		duration: 5,
		count: 5,
		
		durationTimer: null,
		nextEmit: null,
		
		
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			
			this.durationTimer = new ig.Timer();
			this.nextEmit = new ig.Timer();
		},
		
		
		triggeredBy: function( entity, trigger ) {
			this.durationTimer.set( this.duration );
			this.nextEmit.set( 0 );
		},
		
		
		update: function(){		
			if( this.durationTimer.delta() < 0 && this.nextEmit.delta() >= 0 ) {
				this.nextEmit.set( this.duration / this.count );
				
				var x = Math.random().map( 0,1, this.pos.x, this.pos.x+this.size.x );
				var y = Math.random().map( 0,1, this.pos.y, this.pos.y+this.size.y );
				ig.game.spawnEntity( EntityBitCoin, x, y );
			}
		}
	});
});