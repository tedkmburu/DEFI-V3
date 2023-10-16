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
            pos: new p5.Vector(1720 - 50, 820), 
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
            pos: new p5.Vector(1520 - 50, 820), 
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
            pos: new p5.Vector(1320 - 50, 820), 
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
            fillColor: purpleColor[0],
            pos: new p5.Vector(0, 0), 
            fontSize: 36,
            size: new p5.Vector(150, 150),
            fontColor: 255,
            onClick: function(){ navigateTo("Level Select"); }
        })
    ]

    // Set the desired dimensions of the containing div
    const maxWidth = 1920 * 0.6; // Set your maximum width here
    const maxHeight = (1080 * 0.6) + 130; // Set your maximum height here

    // Get the original image dimensions
    const originalWidth = levels[currentLevel].size.x;
    const originalHeight = levels[currentLevel].size.y;

    let imageSize = scaleImageToSize(maxWidth, maxHeight, originalWidth, originalHeight).mult(0.7)
    let imagePos = getScaledImagePos(maxWidth, maxHeight, imageSize)

    let starPositions = []
    levels[currentLevel].stars.forEach(star => {
        let starPosition = star.pos.copy().mult(scale)
        starPosition.mult(0.7)
        starPosition.add(imagePos.copy().div(1))
        // starPosition.add(new p5.Vector(-150, 50))
        // starPosition.add(new p5.Vector(-60, 50))
        starPositions.push(starPosition)
    })

    let starSize = 40 * scale.x;

    images = [
        new myImage({
            pos: new p5.Vector(0, 200).add(imagePos), 
            size: imageSize.copy(),
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
        new myImage({
            pos: new p5.Vector(1200, 230), 
            size: 700,
            myImage: banner,
        })
    ]

    // display stars
    let numberOfStars = 0
    numberOfStars+=userData[currentLevel].mostStars;
    if (userData[currentLevel].fastestTime != null)
    {
        if (userData[currentLevel].fastestTime < firstStarTime) numberOfStars++
        if (userData[currentLevel].fastestTime < secondStarTtime) numberOfStars++
    }
    

    // print(numberOfStars)

    let x = 1300;
    let y = 235;

    for (let i = 0; i < 5; i++) 
    {
        if (i < numberOfStars)
        {
            images.push(
                new myImage({
                    pos: new p5.Vector(x + (100 * i), y), 
                    size: 75,
                    myImage: icons.star,
                })
            )
        }  
        else
        {
            images.push(
                new myImage({
                    pos: new p5.Vector(x + (100 * i), y), 
                    size: 75,
                    myImage: icons.starEmpty,
                })
            )
        }  
    }

    textBoxes = [
        new TextBox({
            text: "Guide the test charge through the track by creating an electric field. \n\n Test charge should never hit the walls!",
            fontSize: 36,
            fontAlign: LEFT,
            fillColor: "rgba(0, 0, 0, 0)",
            pos: new p5.Vector(1300, 300), 
            size: new p5.Vector(460, 460),
        }),
        ]

    shapes = [
        // behind progress bar
        new Shape({
            shape: "rect",
            fillColor: "rgba(0, 0, 0, 0.5)",
            pos: new p5.Vector(0, 1080 - 50), 
            size: new p5.Vector(1920, 50),
        }),
        // progress bar
        new Shape({
            shape: "rect",
            fillColor: 255,
            pos: new p5.Vector(0, 1080 - 50), 
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
            size: new p5.Vector(1920, 170),
            fillColor: "rgba(0, 0, 0, 0.5)",
        }),
        // behind text
        new TextBox({
            fillColor: "rgba(255, 255, 255, 0.9)",
            pos: new p5.Vector(1310 - 50, 200), 
            size: new p5.Vector(570, 600),
        }),
    ]

    levels[currentLevel].testCharges.forEach(testCharge => {
        let testChargePos = testCharge.pos.copy().mult(0.6)
        testChargePos.add(-50, 270)
        shapes.push(
            new Shape({
                shape: "ellipse",
                pos: testChargePos, 
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