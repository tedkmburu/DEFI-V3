"use strict";

function createChangeUsernamePopUp()
{
    let screenName = "ChangeUsername";

    let buttons = []
    let images = []
    let textBoxes = []
    let shapes = []
    let closeButton = true;

    let xPos = (1920 / 2) - (75)
    let yPos = 800

    buttons.push(
        
        new Button({
            text: "home",
            pos: new p5.Vector((-0.5 * commonButtonSpace) + xPos,  yPos), 
            myImage: icons.home, 
            onClick: function(){ navigateTo("Home"); },
        }),        
              
        new Button({
            text: "leaderboard",
            pos: new p5.Vector((0.5 * commonButtonSpace) + xPos,  yPos), 
            myImage: icons.leaderboard, 
            onClick: function(){ navigateTo("Leaderboard"); },
        }),    
    )

    yPos = 550
    xPos = (1920 / 2) + 350

    buttons.push(
        new Button({
            text: "save",
            shape: "rect",
            myImage: icons.save,
            fillColor: "#6CA468",
            fontColor: "black",
            pos: new p5.Vector(1100, 565), 
            onClick: function(){ updateUserName(); }
        }),
        //  
    )

    xPos = 400
    yPos = 200

    shapes.push(new Shape({
        pos: new p5.Vector(xPos, yPos), 
        size: new p5.Vector(1130, 550),
        fillColor: 255,
    }))

    images.push(
        new MyImage({
            pos: new p5.Vector(xPos - 100, yPos + 25), 
            size: 1325,
            myImage: bigBanner,
        })
    )
    // images.push(new MyImage({
    //     pos: new p5.Vector(1150, 300),
    //     myImage: icons.leaderboard,
    //     size: 400,
    // }))

    
    xPos = (1920 / 2) + 0
    yPos = 225
    
    
    

    textBoxes.push(
        new TextBox({
            text: "set username",
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "white",
            fontSize: 72,
            pos: new p5.Vector(350, yPos), 
            size: new p5.Vector(1220, 130),
        })
    )
    textBoxes.push(
        new TextBox({
            text: "if you do not set a username, your scores will not be visible on leaderboards",
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "black",
            fontSize: 48,
            pos: new p5.Vector(425, yPos + 150), 
            size: new p5.Vector(1080, 200),
        })
    )

    xPos = (1920 / 2) + 30
    yPos = 500

    let myFunctions = () => {
        
    }

    return new PopUp({
        name: screenName,
        closeButton: closeButton,
        buttons: buttons,
        textBoxes: textBoxes,
        images: images,
        shapes: shapes,
        functions: myFunctions,
    })
}