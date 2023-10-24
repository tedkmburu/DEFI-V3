class Coin extends Particle
{
    constructor(props)
    {
        super(props)
        
        this.radius = coinRadius * scale.x; 
        this.diameter = this.radius * 2;
        this.size = props.size || new p5.Vector(this.diameter, this.diameter);
        this.size = this.size.copy().mult(scale);
        this.visible = true;
        this.omega = coinOmega;
        this.value = props.value || goldValue;
    }

    display()
    {
        this.move()

        if (this.visible)
        {
            push()
                if (gameDevMode) 
                {
                    fill("yellow")
                    noStroke()
                    ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter)
                }

                translate(this.pos.x, this.pos.y)
                rotate(this.angle)
                imageMode(CENTER)

                if (this.value == goldValue) image(coinImages.gold, 0, 0, this.size.x, this.size.y)
                else if (this.value == silverValue) image(coinImages.silver, 0, 0, this.size.x, this.size.y)
                else if (this.value == bronzeValue) image(coinImages.bronze, 0, 0, this.size.x, this.size.y)
                else image(coinImages.missing, 0, 0, this.size.x, this.size.y)
                

            pop()

            if (elapsedTime > silverCoinTime)
            {
                this.value = silverValue
            }
            if (elapsedTime > bronzeCoinTime)
            {
                this.value = bronzeValue
            }
        }

        if (this.countFrames) { this.frameCount++ }
    }
}