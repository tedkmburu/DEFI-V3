"use strict";

function createCreditsScreen()
{
    let screenName = "Credits"

    let buttons = []
    let images = []
    let textBoxes = []
    let shapes = []

    let size = new p5.Vector(150, 150)
    let xPos = 50;
    let yPos = gameHeight - size.y - 100

    buttons = [
        new Button({
            text: "Back",
            myImage: icons.back,
            pos: new p5.Vector(25, 25), 
            onClick: function(){ navigateTo("Home"); }
        }),
    ]

    images = [
        new MyImage({
            pos: new p5.Vector(815, 125), 
            size: 1060,
            myImage: banner,
        }),
        new MyImage({
            pos: new p5.Vector(1000, 175), 
            size: 100,
            myImage: icons.gradCap,
        }),
        new MyImage({
            pos: new p5.Vector(1550, 175), 
            size: 100,
            myImage: icons.usersRectangle,
        }),
        new MyImage({
            pos: new p5.Vector(1050, 700), 
            size: 300,
            myImage: icons.iclogo,
        }),
        new MyImage({
            pos: new p5.Vector(1400, 700), 
            size: 205,
            myImage: icons.summerScholars,
        }),]

    
    let x = 1070;
    let y = 140;

   
    shapes.push(new Shape({
        pos: new p5.Vector((gameWidth / 1.9) - 100, 50), 
        size: new p5.Vector(gameWidth / 2.25, 1080 - 100),
        fillColor: "rgba(255, 255, 255, 1)",
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
            text: "credits",
            fillColor: "rgba(0, 0, 0, 0)",
            fontSize: 72,
            pos: new p5.Vector(850, 125), 
            size: new p5.Vector(gameWidth / 2, 200),
        })
    )

    x = 350
    textBoxes.push(
        new TextBox({
            text: "This game was first imagined as a project for the Ithaca College Summer Scholars program. It began as a joined project between the Department of Computer Science and the Department of Phyiscs & Astronomy. Since then, more students have contributed to the project. ",
            fillColor: "rgba(0, 0, 0, 0)",
            fontSize: 36,
            pos: new p5.Vector(x + 600, 320), 
            size: new p5.Vector(775, 370),
            fontColor: "black",
            fontAlign: LEFT
        }),
        new TextBox({
            text: "Project Advisors: \n Dr. Colleen Countryman \n Dr. John Barr \n\n Original Team: \n asdf asdf \n asdf asdf \n asdf asdf \n asdf asdf \n  \n The version of the game you are playing now was created by Ted Mburu with sound design from Corey Stark",
            fillColor: "rgba(0, 0, 0, 0)",
            fontSize: 36,
            pos: new p5.Vector(x - 150, 200), 
            size: new p5.Vector(675, 800),
            fontColor: "white",
            fontAlign: LEFT
        }),
    )
    
    // console.log("style: ", classCodeInputBox.style);

    return new Screen({
        name: screenName,
        backgroundImage: spaceImage,
        buttons: buttons,
        shapes: shapes,
        textBoxes: textBoxes,
        images: images,
    })
}