"use strict";

class Screen 
{
    constructor(props)
    {
        this.name = props.name
        this.backgroundImage = props.backgroundImage || spaceImage;
        this.backgroundAnimation = props.backgroundAnimation || true;
        this.buttons = props.buttons || []
        this.textBoxes = props.textBoxes || []
        this.images = props.images || []
        this.shapes = props.shapes || []
        this.functions = props.functions || null
    }

    display()
    {
        let screen = this;

        new MyImage({
            myImage: this.backgroundImage,
            pos: new p5.Vector(0, 0),
            size: new p5.Vector(1920, 1080),
        }).display()

        if(this.backgroundAnimation)
        {
            animations[0].display()
        }
        
        this.shapes.forEach(shape => { shape.display() });
        this.buttons.forEach(button => { button.display() });
        this.images.forEach(image => { image.display() });
        this.textBoxes.forEach(textBox => { textBox.display() });
        if (screen.functions != null) {  screen.functions();  }

        push()
            fill("rgba(0, 0, 0, " + screenOpacity + ")")
            rect(0, 0, 1920, 1080)
            
            fill("black")
            rect(1920 * scale.x, 0, innerWidth, innerHeight)
            rect(0, 1080 * scale.y, innerWidth, innerHeight)
        pop()

        
        

        if (screenOpacity >= 0.1) screenOpacity -= 0.1

        if (screenOpacity < 0.01) screenOpacity = 0
    }
}