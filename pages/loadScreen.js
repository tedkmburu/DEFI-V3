"use strict";

function createLoadingScreen()
{
    let screenName = "Loading Screen";

    let buttons = []
    let images = []
    let textBoxes = []
    let shapes = []
    
    

    // load bar
    shapes.push(new Shape({
        pos: new p5.Vector(0, 1090 - 50), 
        size: new p5.Vector(1920, 50), 
        fillColor: "rgba(0, 0, 0, 0.5)",
    }))
    shapes.push(new Shape({
        pos: new p5.Vector(0, 1090 - 50), 
        size: new p5.Vector(0, 50),
        fillColor: "white",
    }))


    let x = 0;
    let y = 0;

    let sideWidth = 500

    shapes.push(new Shape({
        pos: new p5.Vector(x + 50, y + 100), 
        size: new p5.Vector(1100, 1080 - 200),
        fillColor: "rgba(0, 0, 0, 0.5)",
    }))
    shapes.push(new Shape({
        pos: new p5.Vector(x + 1250, y + 100), 
        size: new p5.Vector(sideWidth, 400),
        fillColor: "rgba(255, 255, 255, 0.75)",
    }))

    images.push(new MyImage({
        pos: new p5.Vector(x + 100, y + 300), 
        size: new p5.Vector(1000, 1080 - 600),
        myImage: levels[currentLevel].buildImage,
    }))
    images.push(new MyImage({
        pos: new p5.Vector(x + 1175, y + 125), 
        size: sideWidth + 150,
        myImage: banner,
    }))

    // coins
    for (let i = 0; i < 3; i++) 
    {
        images.push(new MyImage({
            pos: new p5.Vector(x + 1325 + (i * 125), y + 135), 
            size: 100,
            myImage: coinImages.missing,
        }))
        
    }

    textBoxes.push(new TextBox({
        text: getLevelName(currentLevel),
        pos: new p5.Vector(x + 1250, y + 250),
        size: new p5.Vector(sideWidth, 100),
        fontColor: "black",
        fontSize: 72,
    }))
    textBoxes.push(new TextBox({
        text: "test charges should                 hit the walls",
        pos: new p5.Vector(x + 50, y + 200),
        size: new p5.Vector(1100, 50),
        fontSize: 48,
    }))
    textBoxes.push(new TextBox({
        text: "NEVER",
        pos: new p5.Vector(x + 140, y + 200),
        size: new p5.Vector(1100, 50),
        fontColor: positiveChargeColor,
        fontSize: 48,
    }))



    textBoxes.push(new TextBox({
        text: "finish ",
        pos: new p5.Vector(x + 30, y + 850),
        size: new p5.Vector(1100, 50),
        fontSize: 48,
    }))
    textBoxes.push(new TextBox({
        text: "ASAP",
        pos: new p5.Vector(x + 170, y + 850),
        size: new p5.Vector(1100, 50),
        fontColor: positiveChargeColor,
        fontSize: 48,
    }))



    if (levels[currentLevel].highscore != null)
    {
        
        textBoxes.push(new TextBox({
            text: "high score",
            pos: new p5.Vector(x + 1250, y + 350),
            size: new p5.Vector(sideWidth, 50),
            fontColor: "black",
            fontSize: 24,
        }))
        textBoxes.push(new TextBox({
            text: "1234567890",
            pos: new p5.Vector(x + 1250, y + 380),
            size: new p5.Vector(sideWidth, 100),
            fontColor: "black",
            fontSize: 48,
        }))
    }
    else
    {
        textBoxes.push(new TextBox({
            text: "first try",
            pos: new p5.Vector(x + 1250, y + 380),
            size: new p5.Vector(sideWidth, 100),
            fontColor: "black",
            fontSize: 48,
        }))
    }




    buttons.push(new Button({
        text: "back",
        myImage: icons.back,
        pos: new p5.Vector(x + 1250, y + 800), 
        onClick: function(){ navigateTo("Level Select");  }
    }))
    buttons.push(new Button({
        text: "leaderboard", 
        myImage: icons.leaderboard,
        pos: new p5.Vector(x + 1450, y + 800),
        onClick: function(){ navigateTo("Leaderboard"); }
    }))
    buttons.push(new Button({
        text: "play",
        myImage: icons.play,
        fillColor: positiveChargeColor, 
        pos: new p5.Vector(x + 1650, y + 800), 
        visible: false,
        onClick: function(){ navigateTo("Game");  }
    }))

    let myFunctions = () => {
        let loadBarSize = screens[2].shapes[1].size.x
        if (loadBarSize < 1920)
        {
            screens[2].shapes[1].size.x += 1;
            screens[2].shapes[1].size.x *= 1.1;
        }

        if (loadBarSize >= 1920)
        {
            screens[2].buttons[2].visible = true;
        }
    }

    return new Screen({
        name: screenName,
        backgroundImage: spaceImage,
        buttons: buttons,
        images: images,
        textBoxes: textBoxes,
        shapes: shapes,
        functions: myFunctions,
        backgroundAnimation: true,
    })
}