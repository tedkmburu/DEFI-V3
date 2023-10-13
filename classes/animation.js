
function createAnimations()
{
    let maxOpacity = 0.25
    let shapes = []
    let chargeColors = ["rgba(235, 83, 83, 0.5)", "rgba(24, 116, 152, 0.5)"]

    shapes.push(new Shape({
        shape: "ellipse",
        pos: new p5.Vector(random(0, innerWidth / 4), random(innerHeight / 4, 3 * innerHeight / 4)),
        size: new p5.Vector(chargeDiameter, chargeDiameter),
        fillColor: chargeColors[0],
        frameCount: random(0, 100),
        countFrames: true
    }))

    shapes.push(new Shape({
        shape: "ellipse",
        pos: new p5.Vector(random(3 * innerWidth / 4, innerWidth), random(innerHeight / 4, 3 * innerHeight / 4)),
        size: new p5.Vector(chargeDiameter, chargeDiameter),
        fillColor: chargeColors[1],
        frameCount: random(0, 100),
        countFrames: true
    }))


    
    let pos = new p5.Vector(random(0, innerWidth), random(0, innerHeight))
    let color = "rgba(255, 0, 0, " + maxOpacity + ")" 
    let size = new p5.Vector(10, 10)
    let velMag = 0.5

    
    

    for (let i = 0; i < 50; i++) 
    {
        // size = new p5.Vector(random(0, 10), random(0, 10))
        shapes.push(new Shape({
            shape: "ellipse",
            pos: new p5.Vector(random(innerHeight / 6, innerWidth / 4), random(1 * innerHeight / 4, 3 * innerHeight / 4)),
            vel: new p5.Vector(random(-velMag, velMag), random(-velMag, velMag)),
            size: size,
            fillColor: color,
            frameCount: random(0, 500),
            countFrames: true
        }))
    }

    functions = () => {
        // print(animations[0])
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


        animations[0].shapes.forEach(shape => {
            if (shape.size.x == 10 )
            {
                let opacity = maxOpacity - (shape.frameCount / 500)

                let distanceToCharges = []

                
                groupOfCharges.forEach(charge => {
                    let touchingCharge = p5.Vector.dist(shape.pos, charge.pos) < chargeDiameter 
                   
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
                    shape.fillColor = "rgba(255, 0, 0, " + opacity + ")" 

                    let force = netForceAtPointFromCharges(shape.pos.copy(), groupOfCharges);

                    if (force.mag() != Infinity)
                    {
                        shape.acc = force.mult(testChargeCharge).mult(scale);
                    }
                }
                else
                {
                    shape.acc = new p5.Vector(0, 0)
                    shape.pos = new p5.Vector(random(0, innerWidth), random(0, innerHeight))
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
        functions: functions,
        loop: true,
    })
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
        this.functions = props.functions
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