ig.module(
	'game.entities.levelexit'
)
.requires(
	'impact.entity'
)
.defines(function(){

    EntityLevelexit = ig.Entity.extend({
        _wmDrawBox: true,
        _wmScalable: true,
        _wmBoxColor: 'rgba(0, 255, 40, 0.5)',
        size: {x: 10, y: 10},
        level: null,
        checkAgainst: ig.Entity.TYPE.A,
        update: function(){},
        check: function(other) {
            if (other instanceof EntityPlayer) {
                ig.game.toggleStats(this);
            }
        },
        nextLevel: function(){
            ig.game.loadLevelDeferred(ig.global['Level' + this.level]);
        }
    });
});