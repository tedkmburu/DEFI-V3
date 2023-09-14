class myImage extends Particle
{
    constructor(props)
    {
        super(props)
        
        this.myImage = props.myImage || null;
        this.size = props.size || new p5.Vector(100, 50);
        this.size = this.size.copy().mult(scale);

        this.text = props.text || ""
        this.fontAlign = props.fontAlign || CENTER;
        this.fontSize = props.fontSize * scale.x || 12;
        this.fillColor = props.fillColor || "rgba(0, 0, 0, 0)";
        this.fontColor = props.fontColor || "black"; 
        this.onClick = props.onClick;
        this.shape = props.shape || "rect";
        this.font = props.font;
        this.visible = props.visible || true;
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
                noStroke()
                rect(this.pos.x, this.pos.y, this.size.x, this.size.y)
            }
    
            if (this.myImage != null)
            {
                image(this.myImage, this.pos.x, this.pos.y, this.size.x, this.size.y)
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
    }
}