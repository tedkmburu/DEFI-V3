"use strict";

function createLevelCompletePopUp()
{
    let screenName = "Level Complete";

    let buttons = []
    let images = []
    let textBoxes = []
    let shapes = []
    let closeButton = false;

    let xPos = (1920 / 2) - 300
    let yPos = 800

    buttons.push(
        new Button({
            text: "home",
            pos: new p5.Vector((0 * commonButtonSpace) + xPos, yPos), 
            myImage: icons.home, 
            onClick: function(){ navigateTo("Home"); },
        }),
        new Button({
            text: "settings",
            pos: new p5.Vector((1 * commonButtonSpace) + xPos,  yPos), 
            myImage: icons.settings, 
            onClick: function(){ navigateTo("Settings"); },
        }),        
        new Button({
            text: "levels",
            pos: new p5.Vector((2 * commonButtonSpace) + xPos,  yPos), 
            myImage: icons.race, 
            onClick: function(){ navigateTo("Level Select"); },
        })
    )

    xPos = 350
    yPos = 200

    shapes.push(new Shape({
        pos: new p5.Vector(xPos, yPos), 
        size: new p5.Vector(500, 500),
        fillColor: 255,
    }))

    images.push(
        new MyImage({
            pos: new p5.Vector(xPos - 75, yPos + 25), 
            size: 650,
            myImage: banner,
        })
    )

    xPos = 435
    yPos = 205

    let coinValues = []

    levelCompleteData.coinsCollected.forEach((coin, i) => {
        coinValues.push(coin)
    })
    for (let i = coinValues.length; i < 3; i++) 
    {
        coinValues.push(0)
    }

    coinValues.forEach((coin, i) => 
    {
        let coinImage = coinImages.gold;

        if (coin == silverValue) coinImage = coinImages.silver
        else if (coin == bronzeValue) coinImage = coinImages.bronze
        else if (coin == 0) coinImage = coinImages.missing

        images.push(
            new MyImage({
                pos: new p5.Vector(xPos + (i * 120), yPos + 30), 
                size: 100,
                myImage: coinImage,
            })
        )
    })

    // for (let i = coinsCollected; i < 3; i++) {
    //     images.push(
    //         new MyImage({
    //             pos: new p5.Vector(xPos + (i * 120), yPos + 30), 
    //             size: 100,
    //             myImage: coinImages.missing,
    //         })
    //     )
    // }




    images.push(
        new MyImage({
            pos: new p5.Vector(xPos - 35, yPos + 200), 
            size: 400,
            myImage: levels[currentLevel].playImage,
        })
    )

    
    xPos = (1920 / 2) + 0
    
    textBoxes.push(
        new TextBox({
            text: "score",
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "rgba(255, 255, 255, 0.5)",
            fontSize: 36,
            pos: new p5.Vector(xPos, yPos + 50), 
            size: new p5.Vector(600, 40),
        })
    )

    textBoxes.push(
        new TextBox({
            text: 1,
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "white",
            fontSize: 120,
            pos: new p5.Vector(xPos, yPos + 100), 
            size: new p5.Vector(600, 130),
        })
    )





    xPos = (1920 / 2) + 30
    yPos = 500

    buttons.push(
        new Button({
            text: "leaderboard",
            pos: new p5.Vector((0 * commonButtonSpace) + xPos, yPos), 
            fillColor: purpleColor[1],
            myImage: icons.leaderboard, 
            onClick: function(){ navigateTo("Leaderboard"); },
        }),
        new Button({
            text: "retry",
            pos: new p5.Vector((1 * commonButtonSpace) + xPos,  yPos), 
            fillColor: purpleColor[2],
            myImage: icons.redo, 
            onClick: function(){ createGameScreen(); navigateTo("Game"); },
        }),        
        new Button({
            text: "next",
            pos: new p5.Vector((2 * commonButtonSpace) + xPos,  yPos), 
            fillColor: positiveChargeColor,
            myImage: icons.next, 
            onClick: function(){ goToNextLevel(); navigateTo("Game"); },
        }),
    )

    let myFunctions = () => {
        // console.log()
        let scoreToDisplay = round(levelCompleteData.timeToComplete)
        if (popUps[0].textBoxes[1].text < scoreToDisplay)
        {
            if (frameCount % 2 == 0)
            {
                popUps[0].textBoxes[1].text *= 2
            }
        }
        else
        {
            popUps[0].textBoxes[1].text = scoreToDisplay
        }
        
        popUps[0].textBoxes[1].text = round(popUps[0].textBoxes[1].text)
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