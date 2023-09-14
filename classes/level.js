class Level
{
    constructor(props)
    {
        this.locked = props.locked || false;
        this.starsCollected = props.starsCollected || 0;
        this.bestTime = props.bestTime || "n/a";
        this.highScore = props.highScore || 0;
        this.size = new p5.Vector()

        this.playImage = props.playImage
        this.buildImage = props.buildImage

        this.stars = props.stars || [];
    }

}