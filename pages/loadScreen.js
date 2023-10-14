function createLoadingScreen()
{
    let screenName = "Loading Screen";

    let buttons = []
    let images = []
    let textBoxes = []
    let shapes = []

    let buttonSize = new p5.Vector(150, 150)
    
    buttons = [
        new Button({
            text: "Play",
            myImage: icons.play,
            shape: "ellipse",
            visible: false,
            pos: new p5.Vector(1720, 820), 
            fontSize: 36,
            fillColor: positiveChargeColor,
            size: buttonSize.copy(),
            fontColor: 255,
            onClick: function(){ navigateTo("Game"); },
        }),
        new Button({
            text: "Levels",
            myImage: icons.race,
            shape: "ellipse",
            pos: new p5.Vector(1520, 820), 
            fontSize: 36,
            fillColor: purpleColor[2],
            size: buttonSize.copy(),
            fontColor: 255,
            onClick: function(){ navigateTo("Level Select"); },
        }),
        new Button({
            text: "Home",
            myImage: icons.home,
            shape: "ellipse",
            pos: new p5.Vector(1320, 820), 
            fontSize: 36,
            fillColor: purpleColor[1],
            size: buttonSize.copy(),
            fontColor: 255,
            onClick: function(){ navigateTo("Home"); },
        }),
        new Button({
            text: "Back",
            shape: "ellipse",
            myImage: icons.back,
            pos: new p5.Vector(0, 0), 
            fontSize: 36,
            size: new p5.Vector(150, 150),
            fontColor: 255,
            onClick: function(){ navigateTo("Level Select"); }
        })
    ]

    // Set the desired dimensions of the containing div
    const maxWidth = 1920 * 0.65; // Set your maximum width here
    const maxHeight = (1080 * 0.65) + 100; // Set your maximum height here

    // Get the original image dimensions
    const originalWidth = levels[currentLevel].size.x;
    const originalHeight = levels[currentLevel].size.y;

    let imageSize = scaleImageToSize(maxWidth, maxHeight, originalWidth, originalHeight) 
    let imagePos = getScaledImagePos(maxWidth, maxHeight, imageSize)

    let starPositions = []
    levels[currentLevel].stars.forEach(star => {
        starPositions.push(star.pos.copy().sub(50, -30))
    })

    let starSize = 50 * scale.x;

    console.log("stars: " , starPositions);

    images = [
        new myImage({
            pos: new p5.Vector(25, 105).add(imagePos), 
            size: imageSize.x * 0.8,
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

    // display stars
    let numberOfStars = 0
    numberOfStars+=userData[currentLevel].mostStars;
    if (userData[currentLevel].fastestTime < firstStarTime) numberOfStars++
    if (userData[currentLevel].fastestTime < secondStarTtime) numberOfStars++

    print(numberOfStars)

    let x = 180;
    let y = 75;

    for (let i = 0; i < 5; i++) 
    {
        if (i < numberOfStars)
        {
            images.push(
                new myImage({
                    pos: new p5.Vector(x + (60 * i), y), 
                    size: 50,
                    myImage: icons.star,
                })
            )
        }  
        else
        {
            images.push(
                new myImage({
                    pos: new p5.Vector(x + (60 * i), y), 
                    size: 50,
                    myImage: icons.starEmpty,
                })
            )
        }  
    }

    textBoxes = [
        new TextBox({
            text: "Goals: \n\nCollect each star \nFinish in less than 30s \nFinish in less than 10s",
            fontSize: 36,
            fontAlign: LEFT,
            pos: new p5.Vector(1350, 200), 
            size: new p5.Vector(460, 460),
        }),
        ]

    shapes = [
        // behind progress bar
        new Shape({
            shape: "rect",
            fillColor: "rgba(0, 0, 0, 0.5)",
            pos: new p5.Vector(0, innerHeight - 50), 
            size: new p5.Vector(innerWidth, 50),
        }),
        new Shape({
            shape: "rect",
            fillColor: 255,
            pos: new p5.Vector(0, innerHeight - 50), 
            size: new p5.Vector(1, 50),
        }),
        // behind track
        new Shape({
            shape: "rect",
            fillColor: "rgba(0, 0, 0, 0.5)",
            pos: new p5.Vector(35, 200), 
            size: new p5.Vector(maxWidth, maxHeight),
        }),
        // header
        new Shape({
            pos: new p5.Vector(0, 0), 
            size: new p5.Vector(innerWidth, 170),
            fillColor: "rgba(0, 0, 0, 0.5)",
        }),
        // behind text
        new TextBox({
            fillColor: "rgba(255, 255, 255, 0.9)",
            pos: new p5.Vector(1310, 200), 
            size: new p5.Vector(570, 600),
        }),
    ]

    levels[currentLevel].testCharges.forEach(testCharge => {
        shapes.push(
            new Shape({
                shape: "ellipse",
                pos: testCharge.pos.copy().sub(40, -40), 
                size: new p5.Vector(testChargeDiameter, testChargeDiameter),
                fillColor: positiveChargeColor,
                
            })
        )
    })

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
        backgroundAnimation: true,
    })
}