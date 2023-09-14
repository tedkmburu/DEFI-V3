class Screen 
{
    constructor(props)
    {
        this.name = props.name
        this.backgroundImage = props.backgroundImage || spaceImage;
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
        
        this.shapes.forEach(shape => { shape.display() });
        this.images.forEach(image => { image.display() });
        this.buttons.forEach(button => { button.display() });
        this.textBoxes.forEach(textBox => { textBox.display() });
        
        if (screen.functions != null) {  screen.functions();  }

        this.update()
    }

    update()
    {
        // console.log(screens[1].buttons[1].visible);
    }
}