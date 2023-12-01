"use strict";

class Button extends Particle
{
    constructor(props)
    {
        super(props)
        
        this.myImage = props.myImage || null
        this.size = props.size || new p5.Vector(commonButtonSize, commonButtonSize);
        this.size = this.size.copy().mult(scale);

        this.text = props.text || ""
        this.fontAlign = props.fontAlign || CENTER;
        this.fontSize = props.fontSize * scale.x || 36 * scale.x;
        this.fillColor = props.fillColor || purpleColor[1];
        this.strokeColor = props.strokeColor || "rgba(0, 0, 0, 0)";
        this.fontColor = props.fontColor || "white";
        this.onClick = props.onClick;
        this.shape = props.shape || "ellipse";
        this.font = props.font;
        this.visible = props.visible || true;
        this.hover = false; 
        this.toggleState = props.toggleState || false; 
        if (this.visible == null) this.visible = true;

    }

    display()
    {
        this.move()

        if (this.visible)
        {
            push()

            if (this.hover)
            {
                this.strokeColor = "rgba(0, 0, 0, 1)";
            }
            else
            {
                this.strokeColor = "rgba(0, 0, 0, 0)";
            }
            fill(this.fillColor)
            strokeWeight(3)
            stroke(this.strokeColor)


            
            translate(this.pos.x, this.pos.y)

            if (this.shape == "rect")
            {
                rect(0, 0, this.size.x, this.size.y)

                if (gameDevMode) 
                {
                    stroke("rgba(0, 0, 0, 1)")
                    fill("rgba(0, 0, 0, 0.25)")
                    rect(0, 0, this.size.x, this.size.y)
                }
            }

            if (this.shape == "ellipse")
            {
                ellipse((this.size.x / 2), (this.size.y / 2), this.size.x, this.size.y)

                if (gameDevMode) 
                {
                    stroke("rgba(0, 0, 0, 1)")
                    fill("rgba(0, 0, 0, 0.25)")
                    rect(0, 0, this.size.x, this.size.y)
                }
            }

            if (this.shape == "toggle")
            {
                let xOffset = 25 * scale.x
                

                fill(purpleColor[3])
                noStroke()
                let bleed = 10 * scale.y;
                if (!this.toggleState) fill("gray")
                rect(xOffset + 0, -bleed, this.size.y, this.size.y + (bleed * 2))
                ellipse(xOffset + (this.size.x / 2), (this.size.y / 2), this.size.y + (bleed * 2), this.size.y + (bleed * 2))
                ellipse(xOffset + 0, (this.size.y / 2), this.size.y + (bleed * 2), this.size.y + (bleed * 2))

                let x = this.size.x / 2
                if (!this.toggleState) x -= (this.size.x / 2)
                fill("white")
                ellipse(xOffset + x, (this.size.y / 2), this.size.y, this.size.y)
            }
    
            if (this.myImage != null && this.text == "")
            {
                let width = this.size.x;
                let height = this.size.x * (this.myImage.height / this.myImage.width)
                
                image(this.myImage, 0, 0, width, height)
            }

            if (this.myImage != null && this.text != "")
            {
                let width = this.size.x;
                let height = this.size.x * (this.myImage.height / this.myImage.width)
                
                image(this.myImage, 0 + (width * 0.15), 0 + (height * 0.15), width * 0.7, height * 0.7)

                textAlign(this.fontAlign, CENTER)
                textSize(this.fontSize)
                fill(this.fontColor)
                noStroke()
                if (this.hover)
                {
                    buttonTextOffset+= (2 * scale.y)
                    if (buttonTextOffset >= (20 * scale.y)) buttonTextOffset = (20 * scale.y)
                    text(this.text, 0, buttonTextOffset + (this.fontSize * 2 * (this.size.y / commonButtonSize)), this.size.x, this.size.y)
                }
                else
                {
                    text(this.text, 0, (5 / scale.y) + (this.fontSize * 2 * (this.size.y / commonButtonSize)), this.size.x, this.size.y)
                }
            }
    
            if (this.text != "" && this.myImage == null)
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
        if (this.visible)
        {
            this.onClick();

            // if (this.fillColor == positiveChargeColor)
            // {
            //     sounds.succeed.play()
               
            // }
            // else
            // {
            if (userData.soundEffects) sounds.click.play()

            // }
            
            createScreens()
            createPopUps()
            updateTimer()
        }
    }
}