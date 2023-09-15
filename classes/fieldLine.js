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
            stroke(255);
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
    }

    display()
    {
        push();
            stroke(255);
            translate(this.position.x, this.position.y)
            rotate(this.direction);
            fill(255);
            triangle(0, 0, -10, -5, -10, 5);
        pop();
    }
}