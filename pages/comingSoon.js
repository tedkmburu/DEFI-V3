function createComingSoonScreen()
{
    let screenName = "Coming Soon"

    let buttons = []
    let images = []
    let textBoxes = []
    let shapes = []


    textBoxes = [
        new TextBox({
            text: "Coming Soon",
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "white",
            fontSize: 72,
            pos: new p5.Vector(0, 0), 
            size: new p5.Vector(1920, 1080),
        }),
    
    ]

    buttons = [
        new Button({
            text: "Back",
            shape: "ellipse",
            myImage: icons.back,
            pos: new p5.Vector(25, 25), 
            size: new p5.Vector(150, 150),
            fontSize: 36,
            fontColor: 255,
            fillColor: purpleColor[1],
            onClick: function(){ navigateTo("Home"); },
        }),
    ]


    return new Screen({
        name: screenName,
        backgroundImage: spaceImage,
        buttons: buttons,
        textBoxes: textBoxes,
        images: images,
        backgroundAnimation: true,
    })
}