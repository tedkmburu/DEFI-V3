class PointCharge extends Charge
{
    constructor(props)
    {
        super(props)

        this.radius = chargeRadius;

        this.selected = true;
        this.dragging = false;

        this.slider = createSlider(-5, 5, this.charge, 1);
        this.slider.style("zIndex", "999");
        this.slider.style("visibility", "visible");
        this.slider.input( function(){  createFieldLines();  } ); // recalculate everything that's displayed on screen
        this.slider.changed( function(){  createFieldLines();  } ); // recalculate everything that's displayed on screen
    }

    display()
    {
        let pointCharge = this;

        if (pointCharge.selected)
        {
            pointCharge.slider.position(pointCharge.pos.x - 75, pointCharge.pos.y + chargeRadius + 10, "fixed");
            pointCharge.charge = pointCharge.slider.value();
        }

        if (pointCharge.dragging)
        {
            pointCharge.slider.value();
            this.slider.style("visibility", "hidden");
        }

        // if a charge is no longer being dragged and is over the trash can, it will be removed
        if (!pointCharge.dragging && pointCharge.pos.x < 100 && pointCharge.pos.y > innerHeight - 100)
        {         
            pointCharge.remove();
            createFieldLines();
        }

        push();
            if (pointCharge.selected) // if the charge has been selected, create a white stroke around it and display its slider
            {
                stroke(255);
                pointCharge.slider.style("visibility", "visible");
            }
            else
            {
                stroke(0);
                pointCharge.slider.style("visibility", "hidden");
            }

            // set the fill color of the charge
            let fillColor;
            if (pointCharge.charge == 0) fillColor = neutralChargeColor;
            if (pointCharge.charge > 0) fillColor = positiveChargeColor;
            if (pointCharge.charge < 0) fillColor = negativeChargeColor;

            // draw the circle
            fill(fillColor);
            ellipse(pointCharge.pos.x, pointCharge.pos.y, chargeDiameter, chargeDiameter);

            // write down the charge of the point charge ontop of it
            textSize(16);
            // textFont(buttonFont);
            fill("white");
            noStroke();
            if (pointCharge.charge > 0) // if the charge > 0, add a "+" sign before the number 
            {
                let chargeStringLength = pointCharge.charge.toString().length + 1.5;
                let chargeToShow = "+" + pointCharge.charge.toString(); 
                let textPosX = pointCharge.pos.x - (chargeStringLength * 4);
                let textPosY = pointCharge.pos.y + 7;

                text(chargeToShow, textPosX, textPosY);
            }
            else
            {
                let chargeStringLength = pointCharge.charge.toString().length;
                let textPosX = pointCharge.pos.x - (chargeStringLength * 4);
                let textPosY = pointCharge.pos.y + 7;
                
                text(pointCharge.charge, textPosX, textPosY);
            }
        pop();
        
    }

    remove()
    {
        let i = charges.findIndex(charge => charge.selected === true);

        charges[i].slider.remove();
        charges.splice(i,1);
    }
}