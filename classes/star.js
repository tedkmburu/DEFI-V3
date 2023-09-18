class Star extends Particle
{
    constructor(props)
    {
        super(props)
        
        this.radius = 10; 
        this.diameter = 20;
        this.size = props.size || new p5.Vector(20, 20);
        this.size = this.size.copy().mult(scale);
        this.visible = true;
        this.omega = 0.025;
    }

    display()
    {
        this.move()

        if (this.visible)
        {
            push()
            translate(this.pos.x, this.pos.y)
            rotate(this.angle)
            imageMode(CENTER)
            image(icons.star, 0, 0, this.size.x, this.size.y)

            pop()
        }
    }
}