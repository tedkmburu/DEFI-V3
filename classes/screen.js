class Screen 
{
    constructor(props)
    {
        this.name = props.name
        this.backgroundImage = props.backgroundImage || spaceImage;
        this.backgroundAnimation = props.backgroundAnimation || false;
        this.buttons = props.buttons || []
        this.textBoxes = props.textBoxes || []
        this.images = props.images || []
        this.shapes = props.shapes || []
        this.functions = props.functions
    }

    display()
    {
        let screen = this;

        image(this.backgroundImage, 0, 0, innerWidth, innerHeight)

        if(this.backgroundAnimation)
        {
            animations[0].display()
        }
        
        this.shapes.forEach(shape => { shape.display() });
        this.buttons.forEach(button => { button.display() });
        this.images.forEach(image => { image.display() });
        this.textBoxes.forEach(textBox => { textBox.display() });
        if (screen.functions != null) {  screen.functions();  }

        if (gameDevMode)
        {
            push()
                // let fps = frameCount / (performance.now() / 1000)
                textSize(24)
                text(Math.round(frameRate()), 10, innerHeight - 30)
            pop()

            
        }
    }
}