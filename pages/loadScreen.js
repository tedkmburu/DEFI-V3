function createLoadingScreen()
{
    let screenName = "Loading Screen";

    let buttons = []
    let images = []
    let textBoxes = []
    let shapes = []
    
    buttons = [
        new Button({
            text: "Play >",
            visible: false,
            pos: new p5.Vector(625, 300), 
            fontSize: 36,
            fontAlign: CENTER,
            fillColor: "red",
            size: new p5.Vector(200, 50),
            fontColor: 255,
            onClick: function(){ navigateTo("Game"); },
        }),
        new Button({
            text: "Back",
            myImage: icons.back,
            pos: new p5.Vector(10, 10), 
            fontSize: 24,
            textAlign: CENTER,
            size: new p5.Vector(50, 50),
            fontColor: 255,
            fillColor: "rgba(0, 0, 0, 0.5)",
            onClick: function(){ navigateTo("Level Select"); }
        })
    ]

    // Set the desired dimensions of the containing div
    const maxWidth = 525; // Set your maximum width here
    const maxHeight = 300; // Set your maximum height here

    // Get the original image dimensions
    const originalWidth = levels[currentLevel].size.x;
    const originalHeight = levels[currentLevel].size.y;

    let imageSize = scaleImageToSize(maxWidth, maxHeight, originalWidth, originalHeight) 
    let imagePos = getScaledImagePos(maxWidth, maxHeight, imageSize)

    let starPositions = []
    levels[currentLevel].stars.forEach(star => {
        starPositions.push(star.pos.copy())
    })

    let starSize = new p5.Vector(20, 20).mult(scale).mult(0.8);

    console.log("stars: " , starPositions);

    images = [
        new myImage({
            pos: new p5.Vector(75, 50).add(imagePos), 
            size: imageSize.copy().mult(0.8),
            myImage: levels[currentLevel].buildImage,
        }),
        new myImage({
            pos: starPositions[0], 
            size: starSize,
            myImage: icons.star,
        }),
        new myImage({
            pos: starPositions[1], 
            size: starSize,
            myImage: icons.star,
        }),
        new myImage({
            pos: starPositions[2], 
            size: starSize,
            myImage: icons.star,
        }),
    ]

    textBoxes = [
        new TextBox({
            text: "1. Collect all the stars \n 2. as fast as possible \n 3. don't hit the walls",
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "white",
            fontSize: 16,
            pos: new p5.Vector(625, 50), 
            size: new p5.Vector(200, 240),
        }),
        ]

    shapes = [
        new Shape({
            shape: "rect",
            fillColor: "rgba(0, 0, 0, 0.5)",
            pos: new p5.Vector(0, 380), 
            size: new p5.Vector(innerWidth, 10),
        }),
        new Shape({
            shape: "rect",
            fillColor: 255,
            pos: new p5.Vector(0, 380), 
            size: new p5.Vector(1, 10),
        }),
        new Shape({
            shape: "rect",
            fillColor: "rgba(0, 0, 0, 0.5)",
            pos: new p5.Vector(75, 50), 
            size: new p5.Vector(maxWidth, maxHeight),
        }),
    ]

    functions = () => {
        let loadBarSize = screens[2].shapes[1].size.x
        if (loadBarSize < innerWidth)
        {
            screens[2].shapes[1].size.x += 1;
            screens[2].shapes[1].size.x *= 1.1;
        }

        if (loadBarSize >= innerWidth)
        {
            screens[2].buttons[0].visible = true;
        }
    }

    return new Screen({
        name: screenName,
        backgroundImage: spaceImage,
        buttons: buttons,
        images: images,
        textBoxes: textBoxes,
        shapes: shapes,
        functions: functions,
    })
}