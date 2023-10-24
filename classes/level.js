class Level
{
    constructor(props)
    {
        this.locked = props.locked || true;
        this.size = new p5.Vector()

        this.playImage = props.playImage
        this.buildImage = props.buildImage

        this.coins = props.coins || [0, 0, 0];
        this.testCharges = props.testCharges || [];
        this.border = props.border || [];

        this.border.forEach(point => {
            point.mult(scale)
        });

        // connects the last peice of the border back to the first piece
        this.border.push(this.border[0])
        
        this.finishLine = props.finishLine || "n/a";
        this.finishLine = {pos: this.finishLine.pos.mult(scale), size:  this.finishLine.size.mult(scale)}
        
    }

}