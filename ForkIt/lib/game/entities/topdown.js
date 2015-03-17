ig.module('game.entities.topdown')

.requires('impact.entity')

.defines(function() {

    EntityTopdown = ig.Entity.extend({

        size: { x: 20, y: 20 },

        _wmDrawBox: true,
        _wmScalable: true,
        _wmBoxColor: 'rgba(11, 100, 100, 0.3)',
        nature: 'topdown',
        gravityFactor: 0,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
        },

        update: function() {},

        draw: function() {
            if(!ig.global.wm) {
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
            other.isTopDown = true;
        }
    });

});