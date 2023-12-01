"use strict";

function openPopUp(popUpTitle)
{
    popUpVisible = true;
    let popUpIndex = popUps.findIndex(obj => obj.name == popUpTitle)
    if (popUpIndex == -1) { console.error(popUpTitle, " Not Found"); currentScreen = 5;  popUpVisible = false;}
    else { currentPopUp = popUpIndex }

    console.log(("openPopUp"));
}



class PopUp 
{
    constructor(props)
    {
        this.name = props.name
        this.closeButton = (props.closeButton == null) ? true : false;
        this.buttons = props.buttons || []
        this.textBoxes = props.textBoxes || []
        this.images = props.images || []
        this.shapes = props.shapes || []
        this.functions = props.functions || null

        if (this.closeButton)
        {
            this.buttons.push(new Button({
                text: "close",
                pos: new p5.Vector(1600,  75), 
                fillColor: positiveChargeColor,
                myImage: icons.close, 
                onClick: function(){ popUpVisible = false; },
            }),)
        }
    }

    display()
    {
        push()
            fill("rgba(0, 0, 0, 0.85)")
            rect(0, 0 , 1920 * scale.x, 1080 * scale.y)

            fill(purpleColor[0])
            rect(200 * scale.x, 100 * scale.y, 1520 * scale.x, 880 * scale.y)

            fill("rgba(0, 0, 0, 0.75)")
            rect(250 * scale.x, 150 * scale.y, 1420 * scale.x, (830 - commonButtonSize - 50) * scale.y) 
        pop()
        
        this.shapes.forEach(shape => { shape.display() });
        this.buttons.forEach(button => { button.display() });
        this.images.forEach(image => { image.display() });
        this.textBoxes.forEach(textBox => { textBox.display() });
        if (this.functions != null) {  this.functions();  }
        
    }
}