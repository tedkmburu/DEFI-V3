class Particle 
{
    constructor(props)
    {
        this.pos = props.pos || new p5.Vector(mouseX, mouseY);
        this.pos = this.pos.copy().mult(scale)
        this.startingPos = this.pos.copy()
        this.vel = props.vel || new p5.Vector(0, 0);
        this.acc = props.acc || new p5.Vector(0, 0);

        this.angle = props.angle || 0;
        this.omega = props.omega || 0;
        this.angularAcc = props.angularAcc || 0;

        this.countFrames = props.countFrames || false;
        this.frameCount = props.frameCount || 0
    }

    move()
    {
        this.vel.add(this.acc);
        this.pos.add(this.vel);

        this.omega += this.angularAcc;
        this.angle += this.omega;
    }
}