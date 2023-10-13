class TextBox extends Particle
{
    constructor(props)
    {
        super(props)
        
        this.size = props.size || new p5.Vector(100, 50);
        let myScale = new p5.Vector(innerWidth / 844, innerHeight / 390)
        this.size = this.size.copy().mult(myScale);

        this.text = props.text || ""
        this.fontAlign = props.fontAlign || CENTER;
        this.fontSize = props.fontSize * scale.x || 12 * scale.x;
        this.fillColor = props.fillColor || "white";
        this.strokeColor = props.strokeColor || "rgba(0, 0, 0, 0)";
        this.fontColor = props.fontColor || "black";
        this.font = props.font;
        this.visible = props.visible || true;
        this.shape = props.shape || "rect"
    }

    display()
    {
        this.move()

        if (this.visible)
        {
            push()

            if (this.shape == "rect")
            {
                fill(this.fillColor)
                stroke(this.strokeColor)
                if (gameDevMode) stroke(0)
                rect(this.pos.x, this.pos.y, this.size.x, this.size.y)
            }
    
            if (this.text != "")
            {
                textAlign(this.fontAlign, CENTER)
                textSize(this.fontSize)
                fill(this.fontColor)
                noStroke()
                text(this.text, this.pos.x, this.pos.y, this.size.x, this.size.y)   
            }
            pop()
        }

        if (this.countFrames) { this.frameCount++ }
    }

    clicked() 
    {
        this.onClick();
    }
}