function createLevelSelect()
{
    let screenName = "Level Select"

    let buttons = []
    let images = []
    let textBoxes = []
    let shapes = []
    
    let buttonSize = new p5.Vector(1080 * 0.08, 1080 * 0.08);

    buttons.push(new Button({
        text: "Back",
        shape: "ellipse",
        myImage: icons.back,
        pos: new p5.Vector(0, 0), 
        fontSize: 36,
        size: buttonSize,
        fontColor: 255,
        fillColor: "rgba(255, 255, 255, 0.25)",
        onClick: function(){ navigateTo("Home"); }
    }))

    shapes.push(new Shape({
        pos: new p5.Vector(0, 0), 
        size: new p5.Vector(1920, 1080 * 0.1),
        fillColor: "rgba(0, 0, 0, 0.5)",
    }))

    let rowHeight =  (1080 / 3) + 200
    let xPos = (1920 / 3) / 4;
    let yPos = 150
    let shapeColor = purpleColor[0];
    let shapeSize = new p5.Vector(720, (1080 / 3) + 150);
    
    for (let i = 0; i < levels.length - 1; i+=2) 
    {
        for (let j = 0; j < 2; j++) 
        {
            
            let index = i + j;

            let x = (j * 1920 / 2) + xPos;
            let y = yPos + 60;
            let shapePos = new p5.Vector(x, y)

            shapes.push(new Shape({
                pos: shapePos.copy(), 
                size: shapeSize,
                fillColor: shapeColor,
            }))

            shapes.push(new Shape({
                pos: shapePos.copy(), 
                size: shapeSize.copy().div(2),
                fillColor: shapeColor,
            }))
        }
        yPos += rowHeight
    }
    
    xPos = ((1920 / 3) / 3) + 40;
    yPos = 250
    

    for (let i = 0; i < levels.length - 1; i+=2) 
    {
        for (let j = 0; j < 2; j++) 
        {
            let index = i + j;
            if (levels[index].locked)
            {
                images.push(new myImage({
                    pos: new p5.Vector((((1920 / 2)) * j) + xPos + 140, yPos + 125), 
                    size: 150,
                    myImage: icons.lock,
                }))
            }
            else
            {

                let numberOfStars = userData[index].mostStars;

                // Set the desired dimensions of the containing div
                const maxWidth = 1920 * 0.25; // Set your maximum width here
                const maxHeight = 1080 * 0.25; // Set your maximum height here

                // Get the original image dimensions
                const originalWidth = levels[index].size.x;
                const originalHeight = levels[index].size.y;

                let imageSize = scaleImageToSize(maxWidth, maxHeight, originalWidth, originalHeight) 
                let imagePos = getScaledImagePos(maxWidth, maxHeight, imageSize)

                if (numberOfStars != 0)
                {
                    // banner
                    images.push(
                        new myImage({
                            pos: new p5.Vector(((1920 / 2) * j) + xPos - 180, yPos), 
                            size: 900,
                            myImage: banner,
                        })
                    )
                }
                

                // track build image
                images.push(new myImage({
                    pos: new p5.Vector(((1920 / 2) * j) + xPos - 50, yPos + 210).add(imagePos), 
                    size: imageSize.x * 0.6,
                    myImage: levels[index].buildImage,
                }))

                let starSize = 90;

                for (let a = 0; a < numberOfStars; a++) 
                {
                    images.push(new myImage({
                        pos: new p5.Vector(((1920 / 2) * j) + xPos + (a * starSize) + 50, yPos + 10), 
                        size: starSize,
                        myImage: icons.star,
                    }))
                }
                for (let a = numberOfStars; a < 5; a++) 
                {
                    images.push(new myImage({
                        pos: new p5.Vector(((1920 / 2) * j) + xPos + (a * starSize) + 50, yPos + 10), 
                        size: starSize,
                        myImage: icons.starEmpty,
                    }))
                }
            }
        }
        yPos += rowHeight
    }

    yPos = 75 - 30


    for (let i = 0; i < levels.length - 1; i+=2) 
    {
        for (let j = 0; j < 2; j++) 
        {
            let index = i + j;
            if (levels[index].locked)
            {
                textBoxes.push(new TextBox({
                    text: "Locked",
                    fillColor: "rgba(0, 0, 0, 0)",
                    fontColor: "white",
                    fontSize: 48,
                    fontAlign: CENTER,
                    pos: new p5.Vector(((1900 / 2) * j) + (420), yPos + 500), 
                    size: new p5.Vector(100, 100),
                }))
            }
            else
            {
                let timeToComplete = millisecondsToString(userData[index].fastestTime)
                let highScore = userData[index].highScore

                textBoxes.push(new TextBox({
                    text: "Level " + (index + 1),
                    fillColor: "rgba(0, 0, 0, 0)",
                    fontColor: "white",
                    fontSize: 60,
                    pos: new p5.Vector(((1920 / 2) * j) + 240, yPos + 330), 
                    size: new p5.Vector(300, 80),
                }))

                if (timeToComplete != "00:00.00")
                {
                    textBoxes.push(new TextBox({
                        text: "Best Time",
                        fillColor: "rgba(0, 0, 0, 0)",
                        fontColor: "white",
                        fontSize: 24,
                        fontAlign: LEFT,
                        pos: new p5.Vector(((1920 / 2) * j)+ 570, yPos + 300), 
                        size: new p5.Vector(300, 100),
                    }))

                    textBoxes.push(new TextBox({
                        text: timeToComplete,
                        fillColor: "rgba(0, 0, 0, 0)",
                        fontColor: "white",
                        fontSize: 48,
                        fontAlign: LEFT,
                        pos: new p5.Vector(((1920 / 2) * j)+ 570, yPos + 336), 
                        size: new p5.Vector(300, 100),
                    }))
                }
                

                if (highScore != null)
                {
                    textBoxes.push(new TextBox({
                        text: "High Score",
                        fillColor: "rgba(0, 0, 0, 0)",
                        fontColor: "white",
                        fontSize: 24,
                        fontAlign: LEFT,
                        pos: new p5.Vector(((1920 / 2) * j) + 570, yPos + 400), 
                        size: new p5.Vector(300, 100),
                    }))
                    textBoxes.push(new TextBox({
                        text: round(highScore),
                        fillColor: "rgba(0, 0, 0, 0)",
                        fontColor: "white",
                        fontSize: 48,
                        fontAlign: LEFT,
                        pos: new p5.Vector(((1920 / 2) * j) + 570, yPos + 436), 
                        size: new p5.Vector(300, 100),
                    }))



                    buttons.push(new Button({
                        shape: "ellipse", 
                        text: "Leaderboard",
                        myImage: icons.leaderboard,
                        pos: new p5.Vector(((1920 / 2) * j) + xPos + 290, yPos + 530), 
                        fontSize: 24,
                        textAlign: CENTER,
                        size: new p5.Vector(100, 100),
                        fillColor: purpleColor[2],
                        fontColor: 255,
                        onClick: function(){ if (!levels[i].locked) { navigateTo("Leaderboard"); currentLevel = i; } }
                    }))
                    buttons.push(new Button({
                        shape: "ellipse", 
                        text: "Retry",
                        myImage: icons.redo,
                        pos: new p5.Vector(((1920 / 2) * j) + xPos + 410, yPos + 530), 
                        fontSize: 24,
                        textAlign: CENTER,
                        size: new p5.Vector(100, 100),
                        fillColor: positiveChargeColor,
                        fontColor: 255,
                        onClick: function(){ if (!levels[i].locked) { navigateTo("Loading Screen"); currentLevel = i; } }
                    }))
                }
                else
                {
                    buttons.push(new Button({
                        shape: "ellipse", 
                        text: "Play",
                        myImage: icons.play,
                        pos: new p5.Vector((j * (1920 / 2)) + xPos + 350, yPos + 400), 
                        fontSize: 48,
                        textAlign: CENTER,
                        size: new p5.Vector(200, 200),
                        fillColor: positiveChargeColor,
                        fontColor: 255,
                        onClick: function(){ if (!levels[i].locked) { navigateTo("Loading Screen"); currentLevel = index; } }
                    }))
                }
            }
        }
        yPos += rowHeight
    }

    return new Screen({
        name: screenName,
        backgroundImage: spaceImage,
        buttons: buttons,
        images: images,
        textBoxes: textBoxes,
        shapes: shapes,
        backgroundAnimation: true,
    })
}