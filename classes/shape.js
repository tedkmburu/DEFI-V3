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
    }

    display()
    {
        this.move()

        if (this.visible)
        {
            push()

            fill(this.fillColor)
            stroke(this.strokeColor)

            if (this.shape == "rect")
            {
                rect(this.pos.x, this.pos.y, this.size.x, this.size.y)
            }
            if (this.shape == "ellipse")
            {
                ellipse(this.pos.x, this.pos.y, this.size.x, this.size.y)
            }

            pop()

            
        }

        if (this.countFrames) { this.frameCount++ }
    }
}