"use strict";

function createSettingsScreen()
{
    let screenName = "Class"

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
        new Button({
            text: "save",
            shape: "rect",
            myImage: icons.save,
            fillColor: "#6CA468",
            fontColor: "black",
            pos: new p5.Vector(1510, 800), 
            onClick: function(){ changeClassCode() }
        }),]

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
        }),]

    

    
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
            text: "join a class",
            fillColor: "rgba(0, 0, 0, 0)",
            fontSize: 72,
            pos: new p5.Vector(850, 125), 
            size: new p5.Vector(gameWidth / 2, 200),
        })
    )

    x = 350
    textBoxes.push(
        new TextBox({
            text: "teachers can create a join code for their students on our website. students with the same join code will see eachother's scores in the leaderboard.",
            fillColor: "rgba(0, 0, 0, 0)",
            fontSize: 48,
            pos: new p5.Vector(x + 600, 280), 
            size: new p5.Vector(775, 500),
            fontColor: "black",
            fontAlign: LEFT
        })
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

