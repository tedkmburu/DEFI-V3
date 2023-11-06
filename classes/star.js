"use strict";

class Star extends Particle
{
    constructor(props)
    {
        super(props)
        
        this.radius = starRadius * scale.x; 
        this.diameter = this.radius * 2;
        this.size = props.size || new p5.Vector(this.diameter, this.diameter);
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
                if (gameDevMode) 
                {
                    fill("yellow")
                    noStroke()
                    ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter)
                }

                translate(this.pos.x, this.pos.y)
                rotate(this.angle)
                imageMode(CENTER)
                image(icons.star, 0, 0, this.size.x, this.size.y)

            pop()
        }

        if (this.countFrames) { this.frameCount++ }
    }
}