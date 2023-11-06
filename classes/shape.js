"use strict";

class Shape extends Particle
{
    constructor(props)
    {
        super(props)
        
        this.size = props.size || new p5.Vector(100, 50);
        this.size = this.size.copy().mult(scale);

        this.fillColor = props.fillColor || "rgba(0, 0, 0, 0)";
        this.strokeColor = props.strokeColor || "rgba(0, 0, 0, 0)";

        this.shape = props.shape || "rect";
        this.visible = props.visible || true;

        if (this.shape == "arc")
        {
            this.start = props.start || 0;
            this.stop = props.stop || PI;
            this.mode = props.mode || OPEN;
            this.strokeColor = props.strokeColor || "rgba(255, 255, 255, 1)"
        }
    }

    display()
    {
        this.move()

        if (this.visible)
        {
            push()

            fill(this.fillColor)
            stroke(this.strokeColor)
            strokeWeight(10 * scale.x)

            if (this.shape == "rect")
            {
                rect(this.pos.x, this.pos.y, this.size.x, this.size.y)
            }
            if (this.shape == "ellipse")
            {
                ellipse(this.pos.x, this.pos.y, this.size.x, this.size.y)
            }
            if (this.shape == "arc")
            {
                arc(this.pos.x, this.pos.y, this.size.x, this.size.y, this.start, this.stop, this.mode)
            }

            pop()

            
        }

        if (this.countFrames) { this.frameCount++ }
    }
}