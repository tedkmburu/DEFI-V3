class Star extends Particle
{
    constructor(props)
    {
        super(props)
        
        this.radius = 10; 
        this.diameter = this.radius * 2;
        this.size = props.size || new p5.Vector(20, 20);
        this.size = this.size.copy().mult(scale);
        this.visible = true;
        this.omega = starOmega;
    }

    display()
    {
        this.move()

        if (this.visible)
        {
            push()
                fill("yellow")
                noStroke()
                ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter)

                translate(this.pos.x, this.pos.y)
                rotate(this.angle)
                imageMode(CENTER)
                image(icons.star, 0, 0, this.size.x, this.size.y)

            pop()
        }
    }
}