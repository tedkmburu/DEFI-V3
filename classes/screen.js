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

        // Set the desired dimensions of the containing div
        const maxWidth = 1920; // Set your maximum width here
        const maxHeight = 1080; // Set your maximum height here

        // Get the original image dimensions
        const originalWidth = this.backgroundImage.width;
        const originalHeight = this.backgroundImage.height;

        let imageSize = scaleImageToSize(1920, 1080, originalWidth, originalHeight) 

        image(this.backgroundImage, 0, 0, imageSize.x, imageSize.y)

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