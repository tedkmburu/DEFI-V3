function createLoadingScreen()
{
    let screenName = "Loading Screen";

    let buttons = []
    let images = []
    let textBoxes = []
    let shapes = []
    
    buttons = [
        new Button({
            text: "Begin!",
            visible: false,
            pos: new p5.Vector(600, 314), 
            fontSize: 24,
            fontAlign: CENTER,
            fillColor: positiveChargeColor,
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
            onClick: function(){ navigateTo("Level Select"); }
        })
    ]

    // Set the desired dimensions of the containing div
    const maxWidth = 844 * 0.65; // Set your maximum width here
    const maxHeight = 390 * 0.65; // Set your maximum height here

    // Get the original image dimensions
    const originalWidth = levels[currentLevel].size.x;
    const originalHeight = levels[currentLevel].size.y;

    let imageSize = scaleImageToSize(maxWidth, maxHeight, originalWidth, originalHeight) 
    let imagePos = getScaledImagePos(maxWidth, maxHeight, imageSize)

    let starPositions = []
    levels[currentLevel].stars.forEach(star => {
        starPositions.push(star.pos.copy().sub(50, -30))
    })

    let starSize = 20 * scale.x * 0.7;

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
            fontSize: 16,
            fontAlign: LEFT,
            pos: new p5.Vector(630, 110), 
            size: new p5.Vector(170, 190),
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
            pos: new p5.Vector(35, 110), 
            size: new p5.Vector(maxWidth, maxHeight),
        }),
        new Shape({
            pos: new p5.Vector(0, 0), 
            size: new p5.Vector(innerWidth, 70),
            fillColor: "rgba(0, 0, 0, 0.5)",
        }),
        new TextBox({
            fillColor: "rgba(255, 255, 255, 0.9)",
            pos: new p5.Vector(600, 110), 
            size: new p5.Vector(200, 190),
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