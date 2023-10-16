class Button extends Particle
{
    constructor(props)
    {
        super(props)
        
        this.myImage = props.myImage || null
        this.size = props.size || new p5.Vector(100, 50);
        this.size = this.size.copy().mult(scale);

        this.text = props.text || ""
        this.fontAlign = props.fontAlign || CENTER;
        this.fontSize = props.fontSize * scale.x || 72 * scale.x;
        this.fillColor = props.fillColor || "rgba(0, 0, 0, 0)";
        this.strokeColor = props.strokeColor || "rgba(0, 0, 0, 0)";
        this.fontColor = props.fontColor || "black";
        this.onClick = props.onClick;
        this.shape = props.shape || "rect";
        this.font = props.font;
        this.visible = props.visible;
        if (this.visible == null) this.visible = true;

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
                rect(this.pos.x, this.pos.y, this.size.x, this.size.y)

                if (gameDevMode) 
                {
                    stroke("rgba(0, 0, 0, 1)")
                    fill("rgba(0, 0, 0, 0.25)")
                    rect(this.pos.x, this.pos.y, this.size.x, this.size.y)
                }
            }

            if (this.shape == "ellipse")
            {
                fill(this.fillColor)
                stroke(this.strokeColor)
                ellipse(this.pos.x + (this.size.x / 2), this.pos.y + (this.size.y / 2), this.size.x, this.size.y)

                if (gameDevMode) 
                {
                    stroke("rgba(0, 0, 0, 1)")
                    fill("rgba(0, 0, 0, 0.25)")
                    rect(this.pos.x, this.pos.y, this.size.x, this.size.y)
                }
            }
    
            if (this.myImage != null && this.text == "")
            {
                let width = this.size.x;
                let height = this.size.x * (this.myImage.height / this.myImage.width)
                
                image(this.myImage, this.pos.x, this.pos.y, width, height)
            }

            if (this.myImage != null && this.text != "")
            {
                let width = this.size.x;
                let height = this.size.x * (this.myImage.height / this.myImage.width)
                
                image(this.myImage, this.pos.x + (width * 0.15), this.pos.y + (height * 0.15), width * 0.7, height * 0.7)

                textAlign(this.fontAlign, CENTER)
                textSize(this.fontSize)
                fill(this.fontColor)
                noStroke()
                text(this.text, this.pos.x, this.pos.y + (this.fontSize * 2), this.size.x, this.size.y)
            }
    
            if (this.text != "" && this.myImage == null)
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
        if (this.visible)
        {
            this.onClick();
            createScreens()
        }
    }
}