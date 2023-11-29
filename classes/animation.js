"use strict";

function createAnimations()
{
    let maxOpacity = 0.12
    let shapes = []
    let chargeColors = ["rgba(237, 32, 36, " + maxOpacity + ")", "rgba(46, 76, 160, " + maxOpacity + ")"]

    let randX = random(0, innerWidth / 2)
    let randY = random(0, innerHeight)

    

    shapes.push(new Shape({
        shape: "ellipse",
        pos: new p5.Vector(randX, randY),
        size: new p5.Vector(chargeDiameter, chargeDiameter),
        fillColor: chargeColors[0],
        frameCount: random(0, 100),
        countFrames: true
    }))
        
    randX = random(innerWidth / 2, 1920)
    randY = random(0, innerHeight)
    
    shapes.push(new Shape({
        shape: "ellipse",
        pos: new p5.Vector(randX, randY),
        size: new p5.Vector(chargeDiameter, chargeDiameter),
        fillColor: chargeColors[1],
        frameCount: random(0, 100),
        countFrames: true
    }))


    
    let pos = new p5.Vector(random(0, innerWidth), random(0, innerHeight))
    let color = "rgba(237, 32, 36, " + maxOpacity + ")" 
    let size = new p5.Vector(testChargeDiameter, testChargeDiameter)
    let velMag = 0

    let createNewTestCharge = () => {
        shapes.push(new Shape({
            shape: "ellipse",
            pos: new p5.Vector(random(0, 1920), random(0, 1080)),
            size: size,
            fillColor: color,
            frameCount: random(0, 2000 * maxOpacity),
            countFrames: true
        }))
    }
    

    for (let i = 0; i < 20; i++) 
    {
        createNewTestCharge()
    }

    let myFunctions = () => {
        let groupOfCharges = [
            {
                charge: 5,
                pos: animations[0].shapes[0].pos,
            },
            {
                charge: -5,
                pos: animations[0].shapes[1].pos,
            }
        ]

        if (mouseIsPressed == true)
        {
            shapes.push(new Shape({
                shape: "ellipse",
                pos: mousePosition,
                size: size,
                fillColor: color,
                frameCount: random(0, 2000 * maxOpacity),
                countFrames: true
            }))
        }

        if (animations[0].shapes.length > 100)
        {
            animations[0].shapes.splice(4, 1);
        }


        animations[0].shapes.forEach((shape, i) => {
            if (i > 1)
            {
                let opacity = maxOpacity - (shape.frameCount / 2000)

                let distanceToCharges = []

                
                groupOfCharges.forEach(charge => {
                    let touchingCharge = p5.Vector.dist(shape.pos, charge.pos) < chargeRadius 
                   
                    distanceToCharges.push(touchingCharge)
                })

                let rect = {
                    pos: new p5.Vector(0, 0), 
                    size: new p5.Vector(innerWidth, innerHeight)
                }
                let shapeIsOnScreen = isPointInRectangle(shape.pos, rect)
                if (distanceToCharges[0] || distanceToCharges[1] || !shapeIsOnScreen)
                {
                    opacity = 0
                    shape.frameCount = 0
                }

            

                if (opacity > 0) 
                {
                    shape.fillColor = "rgba(201, 72, 59, " + opacity + ")" 

                    let force = netForceAtPointFromCharges(shape.pos.copy(), groupOfCharges);

                    if (force.mag() != Infinity)
                    {
                        shape.acc = force.mult(testChargeCharge).mult(scale);
                    }
                }
                else
                {

                    shape.acc = new p5.Vector(0, 0)
                    shape.pos = new p5.Vector(random(0, 1920), random(0, 1080)),
                    shape.vel =  new p5.Vector(random(-velMag, velMag), random(-velMag, velMag))
                    shape.fillColor = color
                    shape.frameCount = 0
                } 
                
                
            }
        })
    }


    animations[0] = new Animation({
        name: "background",
        textBoxes: [],
        images: [],
        shapes: shapes,
        functions: myFunctions,
        loop: true,
    })


    // animations[1] = new Animation({
    //     name: "retry",
    //     textBoxes: [],
    //     images: [],
    //     shapes: shapes,
    //     functions: functions,
    //     loop: false,
    // })
}


class Animation extends Particle
{
    constructor(props)
    {
        super(props)
        this.name = props.name
        this.pos = this.pos.mult(scale) || new p5.Vector(innerWidth, innerHeight).div(2)
        this.backgroundImage = props.backgroundImage || null;
        this.textBoxes = props.textBoxes || []
        this.images = props.images || []
        this.shapes = props.shapes || []
        this.functions = props.functions || null
        this.loop = props.loop || false;
    }

    display()
    {
        if (this.backgroundImage != null) {  image(this.backgroundImage, 0, 0, innerWidth, innerHeight)  }

        this.shapes.forEach(shape => { 
            shape.move(); 
            shape.display(); 
        });
        this.images.forEach(image => { image.display() });
        this.textBoxes.forEach(textBox => { textBox.display() });

        // loop infinetly if the animation allows, if not, trigger only when frameCount = 0
        if (this.functions != null) 
        {  
            if (this.frameCount == 0 && !this.loop) 
            {
                this.functions();  
            }
            if (this.loop)
            {
                this.functions();
            }
        }

        if (gameDevMode)
        {
            
        }

        if (this.countFrames) { this.frameCount++ }
    }
}