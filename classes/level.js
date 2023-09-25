class Level
{
    constructor(props)
    {
        this.locked = props.locked || true;
        this.size = new p5.Vector()

        this.playImage = props.playImage
        this.buildImage = props.buildImage

        this.stars = props.stars || [];
        this.testCharges = props.testCharges || [];
        this.border = props.border || [];

        // connects the last peice of the border back to the first piece
        this.border.push(this.border[0])
        
        this.finishLine = props.finishLine || "n/a";
    }

}