"use strict";

class FieldLine
{
    constructor(fieldLinePoints)
    {
        this.fieldLinePoints = fieldLinePoints;
    }
    
    display()
    {
        push();
        beginShape();
        // beginShape(POINTS);
            noFill();
            
            if (buildMode) stroke("rgba(255, 255, 255, 0.5)");
            else           stroke("rgba(255, 255, 255, 1)");
            strokeWeight(5 * scale.x)
            vertex(this.fieldLinePoints[0].x, this.fieldLinePoints[0].y)
            this.fieldLinePoints.forEach(point => {
                curveVertex(point.x, point.y);
            })
        endShape();
        pop()
    }
}



class FieldLineArrow
{
    constructor(position, direction)
    {
        this.position = position;
        this.direction = direction;
        this.size = 10
    }

    display()
    {
        push();
            translate(this.position.x, this.position.y)
            rotate(this.direction);
            if (buildMode) 
            {
                stroke("AA90C3")
                fill("AA90C3");
            }
            else           
            {
                stroke(255);
                fill(255);
            }
            triangle(0, 0, -this.size * 2, -this.size, -this.size * 2, this.size);
        pop();
    }
}