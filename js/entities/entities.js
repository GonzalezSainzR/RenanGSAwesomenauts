game.PlayerEntity = me.Entity.extend({
    init: function (x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "player",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function () {
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
            }]);

        this.body.setVelocity(5, 20);

        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);

        this.renderable.setCurrentAnimation("idle");
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },
    update: function (delta) {
        if (me.input.isKeyPressed("right")) {
            //sets the position of my X by adding the velocity defined above in
            //setVelocity and multiplying it by me.timer.tick
            //me.timer.tick makes the movement look smooth
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.flipX(true);
        } else if (me.input.isKeyPressed("left")) {
            this.flipX(false);
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        }
        else {
            this.body.vel.x = 0;
        }

        if (this.body.vel.x !== 0) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        }else if (me.input.isKeyPressed('jump')) {
                // make sure we are not already jumping or falling
                if (!this.body.jumping && !this.body.falling) {
                    // set current vel to the  maximum defined value
                    // gravity will then do the res
                    this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
                    // set the jumping flag
                    this.jumping = true;
                    
                }
                

            }else {
            this.renderable.setCurrentAnimation("idle");
        }

        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    }
});