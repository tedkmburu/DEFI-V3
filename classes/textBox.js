"use strict";

class TextBox extends Particle
{
    constructor(props)
    {
        super(props)
        
        this.size = props.size || new p5.Vector(100, 50);
        this.size = this.size.copy().mult(scale);

        this.text = props.text || ""
        this.fontAlign = props.fontAlign || CENTER;
        this.fontSize = props.fontSize * scale.x || 36 * scale.x;
        this.fillColor = props.fillColor || "rgba(0, 0, 0 , 0)";
        this.strokeColor = props.strokeColor || "rgba(0, 0, 0, 0)";
        this.fontColor = props.fontColor || "white";
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
            
            translate(this.pos.x, this.pos.y)
            rotate(this.angle)
            strokeWeight(5)
            

            if (this.shape == "rect")
            {
                fill(this.fillColor)
                stroke(this.strokeColor)
                if (gameDevMode) stroke(0)
                rect(0, 0, this.size.x, this.size.y)
            }
    
            if (this.text != "")
            {
                textAlign(this.fontAlign, CENTER)
                textSize(this.fontSize)
                fill(this.fontColor)
                noStroke()
                text(this.text, 0, 0, this.size.x, this.size.y)   
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