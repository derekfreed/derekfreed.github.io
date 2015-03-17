ig.module('game.entities.ladder')

.requires('impact.entity')

.defines(function() {

    EntityLadder = ig.Entity.extend({

        size: { x: 20, y: 20 },

        _wmDrawBox: true,
        _wmScalable: true,
        zIndex: 1,
        nature: 'ladder',
        gravityFactor: 0,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,
        animSheet: new ig.AnimationSheet('media/ladder.png', 20, 20),

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },

        update: function() {},

        draw: function() {
            if(!ig.global.wm) {

                // Draw tiles except the first one.
                if( this.currentAnim ) {
                    var tilesize = ig.game.collisionMap.tilesize;
                    var tile_height = this.size.y / tilesize;
                    for(var i=1; i<tile_height; i++) {
                        this.currentAnim.draw(
                            this.pos.x - this.offset.x - ig.game._rscreen.x,
                            this.pos.y - this.offset.y - ig.game._rscreen.y + (i * tilesize)
                        );
                    }
                }
                this.parent();
            }
        },

        check: function( other ) {
            other.onLadder = true;
        }

    });

});