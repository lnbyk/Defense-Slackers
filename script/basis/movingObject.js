class MovingObject extends Element {
    constructor(px, py) {
        super(px, py);
    }

    setVelocity(vx, vy) {
        this.velocity = {
            x: vx,
            y: vy
        }
    }

    setAcceleration(ax, ay) {
        this.acceleration = {
            x: ax,
            y: ay
        }
    }

    move() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    getNorm(tx, ty) {
        var dx = (this.position.x  - tx) *  (this.position.x  - tx);
        var dy = (this.position.y  - ty) *  (this.position.y  - ty);
        var norm = Math.sqrt(dx+dy);
        return norm;
    }

    // calculate the velocity to the target(tx, ty) 
    // normalize the velocity and scale it
    scaleVelcity(tx, ty, scale) {
        var vx = tx - this.position.x;
        var vy = ty - this.position.y;
        var norm = this.getNorm(tx,ty);
        vx = (vx / norm) * scale;
        vy = (vy / norm) * scale;
        this.setVelocity(vx,vy);

    }
}