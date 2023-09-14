function createLevelSelect()
{
    let buttons = []
    let images = []
    let textBoxes = []
    let shapes = []
    let yPos = 50

    buttons.push(new Button({
        text: "Back",
        pos: new p5.Vector(10, 10), 
        fontSize: 24,
        textAlign: CENTER,
        size: new p5.Vector(50, 50),
        fontColor: 255,
        fillColor: "rgba(0, 0, 0, 0.5)",
        onClick: function(){ navigateTo("Home"); }
    }))

    

    for (let i = 0; i < levels.length - 1; i+=2) 
    {
        buttons.push(new Button({
            // text: "Track " + (i + 1),
            pos: new p5.Vector(81, yPos), 
            fontSize: 24,
            textAlign: CENTER,
            size: new p5.Vector(300, 175),
            fontColor: 255,
            onClick: function(){ if (!levels[i].locked) { navigateTo("Loading Screen"); currentLevel = i; } }
        }))

        buttons.push(new Button({
            // text: "Track " + (i + 2),
            pos: new p5.Vector(300 + (2 * 81), yPos), 
            fontSize: 24,
            textAlign: CENTER,
            size: new p5.Vector(300, 175),
            fontColor: 255,
            onClick: function(){ if (!levels[i + 1].locked) { navigateTo("Loading Screen"); currentLevel = i + 1; } }
        }))

        shapes.push(new Shape({
            pos: new p5.Vector(81, yPos), 
            size: new p5.Vector(300, 175),
            fillColor: "rgba(0, 0, 0, 0.5)",
        }))

        shapes.push(new Shape({
            pos: new p5.Vector(300 + (2 * 81), yPos), 
            size: new p5.Vector(300, 175),
            fillColor: "rgba(0, 0, 0, 0.5)",
        }))

        yPos+= 200
    }
    
    yPos = 50

    for (let i = 0; i < levels.length - 1; i+=2) 
    {
        for (let j = 0; j < 2; j++) 
        {
            let k = i + j;
            if (levels[k].locked)
            {
                images.push(new myImage({
                    pos: new p5.Vector(81 + (381 * j) + 100, yPos + 30), 
                    size: new p5.Vector(100, 100),
                    myImage: icons.lock,
                }))
            }
            else
            {
                // Set the desired dimensions of the containing div
                const maxWidth = 150; // Set your maximum width here
                const maxHeight = 80; // Set your maximum height here

                // Get the original image dimensions
                const originalWidth = levels[k].size.x;
                const originalHeight = levels[k].size.y;

                let imageSize = scaleImageToSize(maxWidth, maxHeight, originalWidth, originalHeight) 
                let imagePos = getScaledImagePos(maxWidth, maxHeight, imageSize)


                images.push(new myImage({
                    pos: new p5.Vector(81 + (381 * j) + 75, yPos + 45).add(imagePos), 
                    size: imageSize.copy().mult(0.8),
                    myImage: levels[k].buildImage,
                }))

                let numberOfStars = levels[k].starsCollected + 1;
                for (let a = 0; a < numberOfStars; a++) 
                {
                    images.push(new myImage({
                        pos: new p5.Vector(195 + (381 * j) + 75 + (a * 35), yPos + 10), 
                        size: new p5.Vector(30, 30),
                        myImage: icons.star,
                    }))
                }
                for (let a = 0; a < 3; a++) 
                {
                    images.push(new myImage({
                        pos: new p5.Vector(195 + (381 * j) + 75 + (a * 35), yPos + 10), 
                        size: new p5.Vector(30, 30),
                        myImage: icons.starEmpty,
                    }))
                }
            }
        }
        yPos += 200
    }

    yPos = 50


    for (let i = 0; i < levels.length - 1; i+=2) 
    {
        for (let j = 0; j < 2; j++) 
        {
            let k = i + j;
            if (levels[k].locked)
            {
                textBoxes.push(new TextBox({
                    text: "Locked",
                    fillColor: "rgba(0, 0, 0, 0)",
                    fontColor: "white",
                    fontSize: 24,
                    pos: new p5.Vector(81 + (381 * j) + 100, yPos + 0), 
                    size: new p5.Vector(100, 100),
                }))
            }
            else
            {
                let imageScale =  (levels[k].size.y / levels[k].size.x)
                textBoxes.push(new TextBox({
                    text: "Level " + (k + 1),
                    fillColor: "rgba(0, 0, 0, 0)",
                    fontColor: "white",
                    fontSize: 24,
                    pos: new p5.Vector(1 + (381 * j) + 100, yPos + 15), 
                    size: new p5.Vector(150, 24),
                }))

                textBoxes.push(new TextBox({
                    text: "Best Time:\n" + "00:00:00",
                    fillColor: "rgba(0, 0, 0, 0)",
                    fontColor: "white",
                    fontSize: 16,
                    pos: new p5.Vector(0 + (381 * j) + 100, yPos + 130), 
                    size: new p5.Vector(125, 40),
                }))

                textBoxes.push(new TextBox({
                    text: "High Score:\n" + "12:34:56.78",
                    fillColor: "rgba(0, 0, 0, 0)",
                    fontColor: "white",
                    fontSize: 16,
                    pos: new p5.Vector(131 + (381 * j) + 100, yPos + 130), 
                    size: new p5.Vector(125, 40),
                }))
            }
        }
        yPos += 200
    }

    return new Screen({
        name: "Level Select",
        backgroundImage: spaceImage,
        buttons: buttons,
        images: images,
        textBoxes: textBoxes,
        shapes: shapes,
    })
}