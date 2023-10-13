class myImage extends Particle
{
    constructor(props)
    {
        super(props)
        
        this.myImage = props.myImage || null;

        this.size = new p5.Vector(props.myImage.width, props.myImage.height);
        
        if (props.size != null)
        {
            let width = props.size;
            let height = props.size * (props.myImage.height / props.myImage.width)
            this.size = new p5.Vector(width, height) 
        }

        console.log(this.size);
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

            if (this.shape == "rect" || gameDevMode)
            {
                if (gameDevMode) 
                {
                    stroke("rgba(0, 0, 0, 1)")
                    fill("rgba(0, 0, 0, 0.25)")
                    rect(this.pos.x, this.pos.y, this.size.x, this.size.y)
                }
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

        if (this.countFrames) { this.frameCount++ }
    }
}