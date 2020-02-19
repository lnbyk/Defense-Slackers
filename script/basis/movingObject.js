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

    }
}