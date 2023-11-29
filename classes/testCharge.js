"use strict";

class TestCharge extends Charge
{
    constructor(props)
    {
        super(props) // inherited from the Charge class
        this.startingPos = this.pos.copy()
        this.path = [this.startingPos]
        this.charge = testChargeCharge;

        this.radius = testChargeRadius * scale.x;
        this.diameter = testChargeDiameter * scale.x;

        this.stuck = false; 

        this.futurePos = []

        if (this.charge > 0) this.color = positiveChargeColor;
        if (this.charge < 0) this.color = negativeChargeColor;
        if (this.charge == 0) this.color = neutralChargeColor;
    }   

    display()
    {
        if (buildMode) 
        {
            this.displayTrail()
            this.path = [this.startingPos]
        }
        else 
        {
            if (frameCount % 10 == 0)
            {
                this.path.push(this.pos.copy())
            }

            push();
                noFill();
                stroke("rgba(255, 255, 255, 0.5)");
                strokeWeight(this.radius / 2)
                point(this.startingPos.x, this.startingPos.y)
                this.path.forEach(pos => {
                    point(pos.x, pos.y);
                })
            pop()
        }

        push();
            stroke(0);
            fill(this.color);
            let x = this.pos.x;
            let y = this.pos.y;
            ellipse(x, y, this.diameter, this.diameter);
        pop();

        push()
            translate(this.pos.x, this.pos.y)
            let netForceAtStart = netForceAtPoint(this.pos)
            let startingAngle = (netForceAtStart.mag() == 0) ? 0 : netForceAtStart.heading()
            this.angle = (this.vel.mag() == 0) ? startingAngle : this.vel.heading()
            rotate(this.angle)
            
            let imageToShow = this.charge > 0 ? carImages.pos : carImages.neg
            image(imageToShow, -(testChargeRadius * 4), -(testChargeRadius * 2), (testChargeDiameter * 4) * scale.x, (testChargeRadius * 4) * scale.y)
        pop()

        // carImages

        if (this.countFrames) { this.frameCount++ }
        
    }

    moveTestCharge()
    {
        let force = netForceAtPoint(this.pos);
        
        let currentFinishLine = levels[currentLevel].finishLine
        let testChargeIsInFinishArea = circleIsInRect(this, currentFinishLine)

        if (force.mag() != Infinity && !testChargeIsInFinishArea)
        {
            // F  = qE
            // ma = qE
            // a  = (qE)/m
            // m = 1
            // a  = q*E
            this.acc = force.mult(this.charge).mult(scale);
            this.vel.add(this.acc);
            this.pos.add(this.vel);
        }
    }

    checkWallCollision()
    {
        for (let i = 0; i < levels[currentLevel].border.length - 1; i++) 
        {
            let point1 = {pos: levels[currentLevel].border[i]};
            let point2 = {pos: levels[currentLevel].border[i + 1]};

            if (isLineIntersectingCircle(point1, point2, this) && !this.stuck)
            {
                this.stuck = true
                console.log("Hit the wall!");
                failedTestChargePos = this.pos.copy()
                levelFailed = true
                sounds.fail.play()
            }
        }

    }

    createTrail()
    {
        this.futurePos = []
        let currentPos = this.pos.copy()
        let currentVel = this.vel.copy()
        let currentAcc = this.acc.copy()

        for (let i = 0; i < 100; i++) 
        {
            let force = netForceAtPoint(currentPos).mult(10);

            currentAcc = force.mult(this.charge);
            currentVel.add(currentAcc);
            currentPos.add(currentVel);       

            if (i % 10 == 0)
            {
                this.futurePos.push(currentPos.copy())
            }

            for (let i = 0; i < levels[currentLevel].border.length - 1; i++) 
            {
                let point1 = {pos: levels[currentLevel].border[i]};
                let point2 = {pos: levels[currentLevel].border[i + 1]};
                let futurePosPoint = {pos: currentPos, radius: testChargeRadius}

                if (isLineIntersectingCircle(point1, point2, futurePosPoint))
                {
                    return false
                }
            }
        }
    }

    displayTrail()
    {
        this.createTrail()

       

        this.futurePos.forEach((pos, i) => {


            
















            
            let opacity = (this.pos.dist(pos) < trailLength) ? 1 : 0;

            

            if (opacity == 1)
            {
                opacity = (this.futurePos.length / (i * 50))
            }

            if (currentLevel < 1) opacity = 1

            push();
                noStroke()
                fill("rgba(255, 255, 255, " + opacity + ")");
                let x = pos.x;
                let y = pos.y;
                ellipse(x, y, this.radius, this.radius);
            pop();
        })
        
    }

    checkCoinCollisions()
    {
        for (let i = 0; i < 3; i++) 
        {
            let coin = levels[currentLevel].coins[i]
            if (circleOverlapsCirlce(this, coin))
            {
                if (coin.visible)
                {
                    levelCompleteData.coinsCollected.push(coin.value)
                    
                    if (userData.soundEffects)
                    {
                        sounds.coins.play()
                        let timeToPlay = 0
                        
                        coinsCollected++;
                        if (coinsCollected == 1) timeToPlay = 0.5
                        if (coinsCollected == 2) timeToPlay = 1
                        if (coinsCollected == 3) timeToPlay = 1.5
                        
                        sounds.coins.jump(timeToPlay, 0.5)
                    }
                }

                levels[currentLevel].coins[i].visible = false; 

                // console.log(levels[currentLevel].coins);
            }
        }
    }
}