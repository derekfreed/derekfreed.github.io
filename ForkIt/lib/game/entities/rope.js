ig.module('game.entities.rope')

.requires('impact.entity')

.defines(function() {

    EntityRope = ig.Entity.extend({

        size: { x: 2, y: 60 },

        _wmDrawBox: true,
        _wmScalable: false,
        zIndex: 1,
        nature: 'rope',
        gravityFactor: 0,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,
        animSheet: new ig.AnimationSheet('media/rope.png', 2, 60),
        pivotx: null,
        pivoty: null,
        

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
            this.currentAnim.pivot.x=0;
            this.currentAnim.pivot.y=0;
        },

        update: function() {
            if(this.currentAnim.angle>0.1){
                this.currentAnim.angle -= Math.PI/16 * ig.system.tick;
            }
            else if(this.currentAnim.angle<-0.1){
                this.currentAnim.angle += Math.PI/16 * ig.system.tick;
            }

        },

        draw: function() {
           
            this.parent();
        },

        check: function( other ) {

            if(other.flip){
                if(ig.input.state('left')){
                    this.currentAnim.angle += Math.PI/2 * ig.system.tick;
                    other.vel.y=-100;
                    other.vel.x=-200;
                }    
            }  
            else if(!other.flip){  
                if(ig.input.state('right')){    
                    this.currentAnim.angle -= Math.PI/2 * ig.system.tick;
                    other.vel.y=-100;
                    other.vel.x=200;
                }   
            }
            other.currentAnim = other.anims.rope;   
        }

    });

});