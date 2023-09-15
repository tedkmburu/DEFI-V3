class TestCharge extends Charge
{
    constructor(position, charge)
    {
        let canvas = foreGroundCanvas;
        super(position, charge) // inherited from the Charge class

        this.velocity = canvas.createVector(0, 0);
        this.acceleration = canvas.createVector(0, 0);
        this.radius = testChargeRadius; 

        if (this.charge > 0) this.color = positiveChargeColor;
        if (this.charge < 0) this.color = negativeChargeColor;
        if (this.charge == 0) this.color = neutralChargeColor;
    }   

    display()
    {
        let testCharge = this;

        push();
        stroke(0);
            fill(testCharge.color);
            let x = testCharge.position.x;
            let y = testCharge.position.y;
            ellipse(x, y, testChargeDiameter, testChargeDiameter);
        pop();
    }

    move()
    {
        let testCharge = this;
        let force = netForceAtPoint(testCharge.position);

        if (force.mag() != Infinity)
        {
            // F  = qE
            // ma = qE
            // a  = (qE)/m
            // m = 1
            // a  = q*E
            testCharge.acceleration = force.mult(testCharge.charge);
            testCharge.velocity.add(testCharge.acceleration);
            testCharge.position.add(testCharge.velocity);
        }
    }

    moveMetal()
    {
        let force = netForceAtPoint(this.position).div(1000);

        if (force.mag() != Infinity)
        {
            // F  = qE
            // ma = qE
            // a  = (qE)/m
            // m = 1
            // a  = q*E
            this.acceleration = force.mult(this.charge);
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
        }
    }

    brownian(magnitude)
    {
        let rand1 = Math.round(Math.random() * 2) - 1
        let rand2 = Math.round(Math.random() * 2) - 1
        this.position.x += rand1 * magnitude;
        this.position.y += rand2 * magnitude;
    }

    checkWallCollision()
    {
        for (let i = 0; i < walls.length; i++)
        {
            if (collideRectCircle(walls[i].x, walls[i].y, walls[i].width * gridSize, walls[i].height * gridSize, this.position.x, this.position.y, testChargeDiameter))
            {
                this.velocity = createVector(0, 0);
            }
        }
    }


}