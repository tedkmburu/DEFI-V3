"use strict";

function createPausePopUp()
{
    let screenName = "Pause";

    let buttons = []
    let images = []
    let textBoxes = []
    let shapes = []
    let closeButton = false;

    let xPos = (1920 / 2) - (75)
    let yPos = 800

    buttons.push(
        
        new Button({
            text: "settings",
            pos: new p5.Vector((-0.5 * commonButtonSpace) + xPos,  yPos), 
            myImage: icons.settings, 
            onClick: function(){ navigateTo("Settings"); },
        }),        
              
        new Button({
            text: "help",
            pos: new p5.Vector((0.5 * commonButtonSpace) + xPos,  yPos), 
            myImage: icons.help, 
            onClick: function(){  },
        }),    
    )

    yPos = 550
    xPos = (1920 / 2) + 350

    buttons.push(
        new Button({
            text: "home",
            pos: new p5.Vector((-0.5 * commonButtonSpace) + xPos,  yPos), 
            myImage: icons.home, 
            onClick: function(){ navigateTo("Home"); },
        }),  
        new Button({
            text: "restart",
            pos: new p5.Vector((0.5 * commonButtonSpace) + xPos, yPos), 
            myImage: icons.redo, 
            onClick: function(){ navigateTo("Game"); },
        }),
        new Button({
            text: "resume",
            fillColor: positiveChargeColor,
            pos: new p5.Vector((0 * commonButtonSpace) + xPos - 75,  yPos - (commonButtonSize * 2) - 25), 
            size: new p5.Vector(commonButtonSize, commonButtonSize).mult(2),
            myImage: icons.play, 
            onClick: function(){ popUpVisible = false },
        })
    )

    xPos = 400
    yPos = 200

    shapes.push(new Shape({
        pos: new p5.Vector(xPos, yPos), 
        size: new p5.Vector(650, 500),
        fillColor: 255,
    }))

    images.push(
        new MyImage({
            pos: new p5.Vector(xPos - 100, yPos + 25), 
            size: 850,
            myImage: banner,
        })
    )

    xPos = 435
    yPos = 205

    // let coinValues = []

    // levelCompleteData.coinsCollected.forEach((coin, i) => {
    //     coinValues.push(coin)
    // })
    // for (let i = coinValues.length; i < 3; i++) 
    // {
    //     coinValues.push(0)
    // }

    // coinValues.forEach((coin, i) => 
    // {
    //     let coinImage = coinImages.gold;

    //     if (coin == silverValue) coinImage = coinImages.silver
    //     else if (coin == bronzeValue) coinImage = coinImages.bronze
    //     else if (coin == 0) coinImage = coinImages.missing

    //     images.push(
    //         new MyImage({
    //             pos: new p5.Vector(xPos + (i * 120), yPos + 30), 
    //             size: 100,
    //             myImage: coinImage,
    //         })
    //     )
    // })

    // for (let i = coinsCollected; i < 3; i++) {
    //     images.push(
    //         new MyImage({
    //             pos: new p5.Vector(xPos + (i * 120), yPos + 30), 
    //             size: 100,
    //             myImage: coinImages.missing,
    //         })
    //     )
    // }




    // images.push(
    //     new MyImage({
    //         pos: new p5.Vector(xPos - 35, yPos + 200), 
    //         size: 400,
    //         myImage: levels[currentLevel].playImage,
    //     })
    // )

    
    xPos = (1920 / 2) + 0
    yPos = 225
    
    

    textBoxes.push(
        new TextBox({
            text: "paused",
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "white",
            fontSize: 72,
            pos: new p5.Vector(300, yPos), 
            size: new p5.Vector(800, 170),
        })
    )

    textBoxes.push(
        new TextBox({
            text: "1. place charges ",
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "black",
            fontAlign: LEFT,
            fontSize: 48,
            pos: new p5.Vector(500, yPos + 200), 
            size: new p5.Vector(550, 50),
        })
    )
    textBoxes.push(
        new TextBox({
            text: "2. 'test' your build",
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "black",
            fontAlign: LEFT,
            fontSize: 48,
            pos: new p5.Vector(500, yPos + 260), 
            size: new p5.Vector(550, 50),
        })
    )

    // textBoxes.push(
    //     new TextBox({
    //         text: "test charges should",
    //         fillColor: "rgba(0, 0, 0, 0)",
    //         fontColor: "white",
    //         fontSize: 72,
    //         pos: new p5.Vector(0, yPos), 
    //         size: new p5.Vector(1920, 130),
    //     })
    // )

    // textBoxes.push(
    //     new TextBox({
    //         text: "NEVER",
    //         fillColor: "rgba(0, 0, 0, 0)",
    //         fontColor: positiveChargeColor,
    //         fontSize: 72,
    //         pos: new p5.Vector(780, yPos), 
    //         size: new p5.Vector(600, 130),
    //     })
    // )

    // textBoxes.push(
    //     new TextBox({
    //         text: "hit the walls",
    //         fillColor: "rgba(0, 0, 0, 0)",
    //         fontColor: "white",
    //         fontSize: 72,
    //         pos: new p5.Vector(0, yPos), 
    //         size: new p5.Vector(1920, 130),
    //     })
    // )





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
        backgroundAnimation: true,
    })
}