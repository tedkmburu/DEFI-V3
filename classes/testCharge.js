class TestCharge extends Charge
{
    constructor(props)
    {
        super(props) // inherited from the Charge class
        this.startingPos = this.pos.copy()
        this.charge = testChargeCharge;

        this.radius = testChargeDiameter / 2;
        this.diameter = testChargeDiameter;

        this.futurePos = []

        if (this.charge > 0) this.color = positiveChargeColor;
        if (this.charge < 0) this.color = negativeChargeColor;
        if (this.charge == 0) this.color = neutralChargeColor;
    }   

    display()
    {
        push();
            stroke(0);
            fill(this.color);
            let x = this.pos.x;
            let y = this.pos.y;
            ellipse(x, y, this.diameter, this.diameter);
        pop();

        if (buildMode) this.displayTrail()
    }

    moveTestCharge()
    {
        let force = netForceAtPoint(this.pos);

        if (force.mag() != Infinity)
        {
            // F  = qE
            // ma = qE
            // a  = (qE)/m
            // m = 1
            // a  = q*E
            this.acc = force.mult(this.charge);
            this.vel.add(this.acc);
            this.pos.add(this.vel);
        }
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

    createTrail()
    {
        this.futurePos = []
        let currentPos = this.pos.copy()
        let currentVel = this.vel.copy()
        let currentAcc = this.acc.copy()

        for (let i = 0; i < 10; i++) 
        {
            let force = netForceAtPoint(currentPos).mult(250);

            currentAcc = force.mult(this.charge);
            currentVel.add(currentAcc);
            currentPos.add(currentVel);       

            this.futurePos.push(currentPos.copy())
        }
    }

    displayTrail()
    {
        this.createTrail()

        this.futurePos.forEach((pos, i) => {
            push();
                noStroke()
                fill("rgba(255, 255, 255, " + (1/i) + ")");
                let x = this.pos.x;
                let y = this.pos.y;
                ellipse(pos.x, pos.y, this.radius, this.radius);
            pop();
        })
    }
}