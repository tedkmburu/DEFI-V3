"use strict";

function playSound(value)
{
    console.log(value);
    if (userData.soundEffects)
    {
        if (value == -1) sounds.charge0.play()
        if (value == -2) sounds.charge1.play()
        if (value == -3) sounds.charge2.play()
        if (value == -4) sounds.charge3.play()
        if (value == -5) sounds.charge4.play()
        if (value == 0) sounds.charge5.play()
        if (value == 1) sounds.charge6.play()
        if (value == 2) sounds.charge7.play()
        if (value == 3) sounds.charge8.play()
        if (value == 4) sounds.charge9.play()
        if (value == 5) sounds.charge10.play()

        console.log("play sound slider");
    }
}

class PointCharge extends Charge
{
    constructor(props)
    {
        super(props)

        this.radius = chargeRadius * scale.x;
        this.diameter = this.radius * 2 ;

        this.selected = true;
        this.dragging = false;

        this.slider = createSlider(-5, 5, this.charge, 1);
        this.slider.style("zIndex", "999");
        // this.slider.style("width", "200px");
        this.showSlider();
        this.slider.input( function(){  createFieldLines(); playSound(this.value())  } ); // recalculate everything that's displayed on screen
        this.slider.changed( function(){  createFieldLines();   } ); // recalculate everything that's displayed on screen
    }

    display()
    {
        let pointCharge = this;
        this.slider.position(this.pos.x - 75, this.pos.y + this.radius + 10, "fixed");

        if (this.selected && !this.dragging)
        {
            this.showSlider();
            
            
            this.charge = this.slider.value();
        }
        else if (this.dragging)
        {
            this.hideSlider();
            createFieldLines()
        }
        else
        {
            this.hideSlider();
        }

        // if a charge is no longer being dragged and is over the trash can, it will be removed
        if (!this.dragging && this.pos.x < commonButtonSpace && this.pos.y > innerHeight - commonButtonSpace)
        {         
            pointCharge.remove();
            createFieldLines();
        }

        push();
            strokeWeight(5 * scale.x)
            if (pointCharge.selected) // if the charge has been selected, create a white stroke around it and display its slider
            {
                stroke(255);
                // pointCharge.slider.style("visibility", "visible");
            }
            else
            {
                noStroke()
                // pointCharge.slider.style("visibility", "hidden");
            }

            // set the fill color of the charge
            let fillColor;
            if (pointCharge.charge == 0) fillColor = neutralChargeColor;
            if (pointCharge.charge > 0) fillColor = positiveChargeColor;
            if (pointCharge.charge < 0) fillColor = negativeChargeColor;

            // draw the circle
            fill(fillColor);
            ellipse(pointCharge.pos.x, pointCharge.pos.y, this.diameter, this.diameter);

            // write down the charge of the point charge ontop of it
            textSize(72 * scale.x);
            // textFont(buttonFont);
            fill("white");
            noStroke();

            let chargeStringLength = pointCharge.charge.toString().length;
            let chargeToShow = "";
            if (pointCharge.charge > 0) { chargeToShow = "+"; chargeStringLength++ }
            chargeToShow = chargeToShow + pointCharge.charge.toString(); 

            let textPosX = pointCharge.pos.x - (chargeStringLength * (17 * scale.x));
            let textPosY = pointCharge.pos.y + ((72 * scale.x) / 3);
            
            text(chargeToShow, textPosX, textPosY);
        pop();  

        if (this.countFrames) { this.frameCount++ }
    }

    remove()
    {
        let i = charges.findIndex(charge => charge.selected === true);

        charges[i].slider.remove();
        charges.splice(i,1);
    }

    hideSlider()
    {
        this.slider.style("visibility", "hidden");
    }

    showSlider()
    {
        this.slider.style("visibility", "visible");
    }
}