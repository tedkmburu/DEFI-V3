"use strict";

class MyImage extends Particle
{
    constructor(props)
    {
        super(props)
        
        this.myImage = props.myImage || null;
        this.imageMode = props.imageMode || CORNER

        if (this.myImage == null)
        {
            console.log(props);
        }

        


        // if one number is given as an argument, it will be used as the width
        
        if (props.size.y == null) this.size = new p5.Vector(props.myImage.width, props.myImage.height);
        if (props.size != null)
        {
            let width = props.size;
            let height = props.size * (props.myImage.height / props.myImage.width)
            this.size = new p5.Vector(width, height) 
        }

        // if a vector is given as an argument, the image will be scaled to fit inside it
        if (props.size.y != undefined)
        {
            let size = scaleImageToSize(props.size.x, props.size.y, props.myImage.width, props.myImage.height)
            this.size = size.copy()

            let imagePos = getScaledImagePos(props.size.x, props.size.y, size.copy())
            this.pos.add(imagePos.div(1))

            this.startingPos = this.pos.copy()
        }
        
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
        this.opacity = props.opacity || 1

        
    }

    display()
    {
        this.move()

        if (this.visible)
        {
            push()

            if (gameDevMode) 
            {
                stroke("rgba(0, 0, 0, 1)")
                fill("rgba(0, 0, 0, 0.5)")
                rect(this.pos.x, this.pos.y, this.size.x, this.size.y)
            }
            if (this.shape == "rect" || gameDevMode)
            {
                
                fill(this.fillColor)
                noStroke()
                rect(this.pos.x, this.pos.y, this.size.x, this.size.y)
                
            }
    
            if (this.myImage != null)
            {
                push()
                    translate(this.pos.x, this.pos.y)
                    rotate(this.angle)
                    imageMode(this.imageMode)
                    tint(255, 255, 255, this.opacity * 255);
                    image(this.myImage, 0, 0, this.size.x, this.size.y)
                    
                pop()
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