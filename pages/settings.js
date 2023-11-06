"use strict";

function createSettingsScreen()
{
    let screenName = "Settings"

    let buttons = []
    let images = []
    let textBoxes = []
    let shapes = []

    let size = new p5.Vector(150, 150)
    let xPos = 50;
    let yPos = gameHeight - size.y - 100

    buttons = [
        new Button({
            text: "Home",
            shape: "ellipse",
            pos: new p5.Vector(xPos, yPos), 
            fontSize: 36,
            size: size,
            fontColor: 255,
            fillColor: purpleColor[1],
            myImage: icons.home, 
            onClick: function(){ navigateTo("Home"); },
        }),
        new Button({
            text: "Leaderboard",
            shape: "ellipse",
            pos: new p5.Vector((1 * commonButtonSpace) + xPos, yPos), 
            fontSize: 36,
            size: size,
            fontColor: 255,
            fillColor: purpleColor[1],
            myImage: icons.leaderboard, 
            onClick: function(){ navigateTo("Leaderboard"); },
        }),
        new Button({
            text: "Help",
            shape: "ellipse",
            pos: new p5.Vector((2 * commonButtonSpace) + xPos,  yPos), 
            fontSize: 36,
            size: size,
            fontColor: 255,
            fillColor: purpleColor[2],
            myImage: icons.help, 
            onClick: function(){ navigateTo("Help"); },
        }),        new Button({
            text: "Settings",
            shape: "ellipse",
            pos: new p5.Vector((3 * commonButtonSpace) + xPos,  yPos), 
            fontSize: 36,
            size: size,
            fontColor: 255,
            fillColor: purpleColor[3],
            myImage: icons.settings, 
            onClick: function(){ navigateTo("Settings"); },
        }),
        new Button({
            text: "More Levels",
            pos: new p5.Vector(1920 - 950, 830), 
            fontSize: 48,
            size: new p5.Vector(350, 150),
            fontColor: 255,
            fillColor: purpleColor[4],
            onClick: function(){ navigateTo("Level Select"); },
        }),
        new Button({
            text: "Play",
            pos: new p5.Vector(1920 - 550, 830), 
            fontSize: 48,
            size: new p5.Vector(350, 150),
            fontColor: 255,
            fillColor: "red",
            onClick: function(){ navigateTo("Loading Screen"); console.log("fads"); },
        }),
        ]

    images = [
        new MyImage({
            pos: new p5.Vector(0, 200), 
            size: 1920 * 0.6,
            myImage: homeTrack,
        }),
        new MyImage({
            pos: new p5.Vector(815, 125), 
            size: 1060,
            myImage: banner,
        }),
        new MyImage({
            pos: new p5.Vector(970, 400), 
            size: new p5.Vector(750, 400),
            myImage: levels[currentLevel].playImage,
        })
    ]

    

    
    let x = 1070;
    let y = 140;

   
    shapes.push(new Shape({
        pos: new p5.Vector((gameWidth / 1.9) - 100, 50), 
        size: new p5.Vector(gameWidth / 2.25, 1080 - 100),
        fillColor: "rgba(255, 255, 255, 0.75)",
    }))

    if (gameDevMode)
    {
        shapes.push(
            new Shape({
                pos: new p5.Vector(970, 400), 
                size: new p5.Vector(750, 400),
                fillColor: "rgba(0, 0, 0, 0.25)",
            })
        )
    }

    textBoxes.push(
        new TextBox({
            text: getLevelName(currentLevel),
            fillColor: "rgba(0, 0, 0, 0)",
            fontSize: 72,
            pos: new p5.Vector(850, 205), 
            size: new p5.Vector(gameWidth / 2, 200),
        })
    )

    textBoxes.push(
        new TextBox({
            text: "High Score: " + Math.round(userData[currentLevel].highScore),
            fillColor: "rgba(0, 0, 0, 0)",
            fontSize: 48,
            pos: new p5.Vector(850, 260), 
            size: new p5.Vector(gameWidth / 2, 200),
        })
    )

    return new Screen({
        name: screenName,
        backgroundImage: spaceImage,
        buttons: buttons,
        shapes: shapes,
        textBoxes: textBoxes,
        images: images,
        backgroundAnimation: true,
    })
}