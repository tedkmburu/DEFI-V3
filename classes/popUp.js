function openPopUp(popUpTitle)
{
    popUpVisible = true;
    let popUpIndex = popUps.findIndex(obj => obj.name == popUpTitle)
    if (popUpIndex == -1) { console.error(popUp, " Not Found"); currentScreen = 5;  popUpVisible = false;}
    else { currentPopUp = popUpIndex }
}



class PopUp 
{
    constructor(props)
    {
        this.name = props.name
        this.closeButton = props.closeButton || true;
        this.buttons = props.buttons || []
        this.textBoxes = props.textBoxes || []
        this.images = props.images || []
        this.shapes = props.shapes || []
        this.functions = props.functions
    }

    display()
    {
        push()
            fill("rgba(0, 0, 0, 0.85)")
            rect(0, 0 , 1920, 1080)

            fill(purpleColor[0])
            rect(200, 100, 1520, 880)

            fill("rgba(0, 0, 0, 0.75)")
            rect(250, 150, 1420, 830 - commonButtonSize - 25 - 25) 
        pop()
        
        this.shapes.forEach(shape => { shape.display() });
        this.buttons.forEach(button => { button.display() });
        this.images.forEach(image => { image.display() });
        this.textBoxes.forEach(textBox => { textBox.display() });
        if (this.functions != null) {  this.functions();  }
        
    }
}