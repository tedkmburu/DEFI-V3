function createTutorial1PopUp()
{
    let screenName = "Tutorial 1";

    let buttons = []
    let images = []
    let textBoxes = []
    let shapes = []
    let closeButton = false;

    let xPos = (1920 / 2) - 300
    let yPos = 50

    buttons.push(
        new Button({
            text: "skip tutorial",
            shape: "rect",
            fillColor: purpleColor[0],
            size: new p5.Vector(300, 100),
            pos: new p5.Vector((1 * commonButtonSpace) + (1920 / 2) - 300,  825), 
            onClick: function(){ console.log("skip"); },
        }),   
        new Button({
            text: "close",
            pos: new p5.Vector(xPos + 950, yPos), 
            fillColor: positiveChargeColor,
            onClick: function(){ popUpVisible = false; },
        }),        
    )

    xPos = 350
    yPos = 200

    shapes.push(new Shape({
        pos: new p5.Vector(xPos, yPos), 
        size: new p5.Vector(500, 500),
        fillColor: 255,
    }))

    images.push(
        new MyImage({
            pos: new p5.Vector(xPos - 75, yPos + 25), 
            size: 650,
            myImage: banner,
        })
    )

    

    
    xPos =  300

    textBoxes.push(
        new TextBox({
            text: "positive charges repel \n \n negative charges attract \n \n neutral charges have no effect",
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "black",
            fontSize: 36,
            pos: new p5.Vector(xPos, yPos + 50), 
            size: new p5.Vector(600, 530),
        })
    )

    textBoxes.push(
        new TextBox({
            text: "tutorial",
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "white",
            fontSize: 72,
            pos: new p5.Vector(xPos, yPos + 20), 
            size: new p5.Vector(600, 130),
        })
    )



    xPos = 1135
    yPos = 205





    images.push(
        new MyImage({
            pos: new p5.Vector(xPos - 35, yPos + 0), 
            size: 150,
            myImage: tutorialImages[0],
        })
    )

    images.push(
        new MyImage({
            pos: new p5.Vector(xPos - 35, yPos + 175), 
            size: 150,
            myImage: tutorialImages[1],
        })
    )

    images.push(
        new MyImage({
            pos: new p5.Vector(xPos - 35, yPos + 350), 
            size: 150,
            myImage: tutorialImages[2],
        })
    )



    functions = () => {
        
    }

    return new PopUp({
        name: screenName,
        closeButton: closeButton,
        buttons: buttons,
        textBoxes: textBoxes,
        images: images,
        shapes: shapes,
        functions: functions,
        backgroundAnimation: true,
    })
}