"use strict";

function createGameScreen()
{
    let screenName = "Game";

    let buttons = []
    let images = []
    let textBoxes = []
    let shapes = []

    levels[currentLevel].coins.forEach(coin => {
        coin.visible = true;
        coin.value = goldValue;
    })

    createFieldLines()

    levelCompleteData = {coinsCollected: [], timeToComplete: 9999999999999999999999999999999999}

        // shapes.push(new Shape({
    //     pos: new p5.Vector(0, 0), 
    //     size: new p5.Vector(innerWidth * 3, 200),
    //     fillColor: "rgba(0, 0, 0, 0.5)",
    // }))

    let buttonSize = new p5.Vector(150, 150)
    
    buttons = [
        new Button({
            text: "pause",
            shape: "ellipse",
            myImage: icons.pause,
            pos: new p5.Vector(25, 25), 
            fontSize: 36,
            size: buttonSize,
            fillColor: purpleColor[0],
            fontColor: 255,
            onClick: function(){ openPopUp("Pause"); resetCharges() },
        }),
        new Button({
            text: (buildMode) ? "test" : "edit",
            shape: "ellipse",
            fillColor: positiveChargeColor,
            myImage: (buildMode) ? icons.play : icons.edit,
            pos: new p5.Vector(1920 - 225, 1080 - 225), 
            fontSize: 36,
            size: buttonSize,
            fontColor: 255,
            onClick: function() { toggleBuildMode(); },
        }),
        new Button({
            text: "trash",
            shape: "ellipse",
            fillColor: "rgba(0, 0, 0, 0)",
            myImage: icons.trash,
            pos: new p5.Vector(25, 1080 - 225), 
            fontSize: 36,
            size: buttonSize,
            fontColor: 255,
            onClick: function() { },
        })
    ]

    

    

    // Set the desired dimensions of the rectangle containing the track image
    const maxWidth = 1025; // Set your maximum width here
    const maxHeight = 620; // Set your maximum height here

    // Get the original image dimensions
    const originalWidth = levels[currentLevel].size.x;
    const originalHeight = levels[currentLevel].size.y;

    let imageSize = scaleImageToSize(maxWidth, maxHeight, originalWidth, originalHeight) 
    let imagePos = getScaledImagePos(maxWidth, maxHeight, imageSize)
    let trackImageToShow = (buildMode) ? levels[currentLevel].buildImage : levels[currentLevel].playImage

    // console.log(buildMode);
    images = [
        new MyImage({
            pos: new p5.Vector(commonButtonSpace, commonButtonSpace / 2), 
            size: 1920 - (commonButtonSpace * 2),
            myImage: trackImageToShow,
        }),
        new MyImage({
            pos: new p5.Vector(1920 - (commonButtonSize + 40), 0), 
            size: commonButtonSize + 20,
            myImage: ribbon,
        }),
        new MyImage({
            pos: new p5.Vector(1920 - 180, 25), 
            size: commonButtonSize,
            myImage: coinImages.gold,
        }),
        new MyImage({
            pos: new p5.Vector(25 + 75, 1080 - 225 + 70), 
            size: commonButtonSize / 1.5,
            imageMode: CENTER,
            myImage:  icons.trashLid,
        })
    ]

    textBoxes = [
        new TextBox({
            text: millisecondsToString(silverCoinTime),
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "black",
            fontSize: 60,
            pos: new p5.Vector(1920 - 250, 70), 
            size: new p5.Vector(300, 73),
        }),

        new TextBox({
            text: "click anywhere to place a charge",
            fillColor: purpleColor[0],
            strokeColor: purpleColor[4],
            fontColor: "white",
            fontSize: 48,
            fontAlign: CENTER,
            pos: new p5.Vector((1920 / 2) - 200, 25), 
            size: new p5.Vector(400, 150),
        }),

    ]


    let myFunctions = () => {
        
        if (!buildMode)
        {
            checkCoinsCollisions();
            checkBorderCollisions();
        }
        updateTrackImage()
        updateTimer()
        displayCoins()
        displayCharges()

        // if (currentLevel < 2)
        // {
            showTutorial()
        // }
        
        if (gameDevMode)
        {
            displayTrackBorder()
        }
        checkWinConditions()
        updatePlayButton()
    }

    return new Screen({
        name: screenName,
        backgroundImage: buildMode ? blueprintImage : spaceImage,
        buttons: buttons,
        images: images,
        textBoxes: textBoxes,
        shapes: shapes,
        functions: myFunctions
    })
}

function updateTimer()
{
    let timeLeft = 0
    let textToShow = ""
    let coinToShow = coinImages.gold
    if (elapsedTime < silverCoinTime) 
    {
        textToShow = millisecondsToString(silverCoinTime - elapsedTime)
        timeLeft = silverCoinTime - elapsedTime
        coinToShow = coinImages.gold
        
    }
    else if (elapsedTime > silverCoinTime && elapsedTime < bronzeCoinTime) 
    {
        textToShow = millisecondsToString(bronzeCoinTime - elapsedTime)
        timeLeft = bronzeCoinTime - elapsedTime
        coinToShow = coinImages.silver
    }
    else if (elapsedTime > bronzeCoinTime) 
    {
        coinToShow = coinImages.bronze
        timeLeft = 0
        textToShow = ""
    }

    if ((silverCoinTime - elapsedTime < 1000 && coinToShow == coinImages.gold) || 
        (bronzeCoinTime - elapsedTime < 1000 && coinToShow == coinImages.silver))
    {
        screens[3].textBoxes[0].fontColor = positiveChargeColor
    }
    else
    {
        screens[3].textBoxes[0].fontColor = "white"

    }
    screens[3].textBoxes[0].text = textToShow
    screens[3].images[2].myImage = coinToShow

    let coinAngle = (timeLeft / silverCoinTime) * PI * 2


    let coinAngleOffset = (PI / 2)


    // this.pos.x, this.pos.y, this.size.x, this.size.y, this.start, this.stop, this.mode
    

    if (currentScreen == 3)
    {
        new Shape({
            shape: "arc", 
            // 1920 - 180, 25
            pos: new p5.Vector(1815, 100), 
            size: new p5.Vector(commonButtonSize, commonButtonSize),
            strokeColor: "black", 
            start: 0 - coinAngleOffset,
            stop: coinAngle - coinAngleOffset,
        }).display()
    }

    if (!popUpVisible && buildMode)
    {
        elapsedTime += deltaTime
    }

}

function updateTrackImage()
{
    let trackImage = buildMode ? levels[currentLevel].buildImage : levels[currentLevel].playImage;
    screens[3].images[0].myImage = trackImage
}

// Convert milliseconds to seconds and round to the hundredths place
function millisecondsToString(milliseconds)
{    
    if (milliseconds == 1e+34)
    {
        return "99 s";
    }
    else if (milliseconds != null)
    {
        const seconds = (milliseconds / 1000).toFixed(0);
        return seconds.toString() + " s";
    }
    else 
    {
        return "0 s";
    }
}

function displayCoins()
{
    levels[currentLevel].coins.forEach(coin => {
        if (coin.visible)
        {
            coin.display()
        }
    })
}

function resetGame()
{
    charges.forEach(charge => {
        charge.hideSlider()
        charge.selected = false;
        charge.dragging = false;
    })
    

    charges = []
    elapsedTime = 0
    coinsCollected = 0

    resetTestCharges()
    resetCoins()
}

function toggleHelp()
{

}

function toggleBuildMode()
{
    buildMode = !buildMode;
    
    resetCharges()
    resetCoins()
    resetTestCharges()
}



function resetCharges()
{
    charges.forEach(charge =>  {
        charge.hideSlider()
        charge.selected = false;
        charge.dragging = false;
    }) 
}

function resetCoins()
{
    levels[currentLevel].coins.forEach(coin => {
        coin.visible = true;
    })

}

function resetTestCharges()
{
    levels[currentLevel].testCharges.forEach(testCharge => {
        testCharge.pos = testCharge.startingPos.copy()
        testCharge.vel = new p5.Vector(0, 0)
        testCharge.stuck = false
    })
}

function displayCharges()
{
    displayFieldAllLines()
    displayFieldAllLineArrows()

    if (!buildMode) 
    {
        createVelocityArrow();    
    }
    
    displayTestCharges()

    charges.forEach(charge => {
        charge.display()
    })
}

function displayFieldAllLines()
{
    fieldLines.forEach(fieldLine => {
        fieldLine.display()
    })
}

function displayFieldAllLineArrows()
{
    fieldLineArrows.forEach(fieldLineArrow => {
        fieldLineArrow.display()
    })
}

function displayTestCharges()
{
    levels[currentLevel].testCharges.forEach(testCharge => {
        testCharge.display()
        if (!buildMode && !testCharge.stuck) 
        {
            testCharge.moveTestCharge()    
        }
    })

}

// updates the image on the play button
function updatePlayButton()
{
    // change the button visibility
    let showButton = false

    if (charges.length > 0)
    {
        if (charges[0].charge != 0)
        {
            showButton = true
        }
    }

    if (!buildMode)
    {
        showButton = true
    }

    screens[3].buttons[1].visible = showButton

    // change the image and text on the button
    screens[3].buttons[1].myImage = (buildMode) ? icons.play : icons.edit
    screens[3].buttons[1].text = (buildMode) ? "Go!" : "edit";
}

// checks to see if any test charge collides with a star
function checkCoinsCollisions()
{
    levels[currentLevel].testCharges.forEach(testCharge => {
        testCharge.checkCoinCollisions()
    })
}

// checks to see if any test charge collides with the edge
function checkBorderCollisions()
{
    levels[currentLevel].testCharges.forEach(testCharge => {
        testCharge.checkWallCollision()
    })
}

// used to see the actual borders when (gameDevMode == true)
function displayTrackBorder()
{
    push()
        stroke("red")
        fill("rgba(255, 0, 0, 0.4)")
        beginShape();
        levels[currentLevel].border.forEach(point => {
            vertex(point.x, point.y);
        })
        endShape(CLOSE);

        strokeWeight(20)
        let wallIndex = Math.round(trueScrollOffset / 80)
        let numberOfWallPoints = levels[currentLevel].border.length - 1;
        if (wallIndex >= 0 && wallIndex <= numberOfWallPoints)
        {
            let pointPos = levels[currentLevel].border[wallIndex];
            point(pointPos.x, pointPos.y)
        }
    pop()

    let currentFinishLine = levels[currentLevel].finishLine

    push()
        stroke("green")
        fill("rgba(0, 255, 0, 0.4)")
        rect(currentFinishLine.pos.x, currentFinishLine.pos.y, currentFinishLine.size.x, currentFinishLine.size.y)
        rect()
    pop()
}

// checks if all of the test charges are in the finish are
function checkWinConditions()
{
    let currentFinishLine = levels[currentLevel].finishLine

    // check to see if all the test charges are in the finish area
    let testChargeInFinishArea = []
    levels[currentLevel].testCharges.forEach(testCharge => {
        let testChargeIsInFinishArea = circleIsInRect(testCharge, currentFinishLine)
        testChargeInFinishArea.push(testChargeIsInFinishArea)
    })

    // if win condition is true
    if (testChargeInFinishArea.every(isInFinishLine => isInFinishLine === true))
    {
        if (!popUpVisible)
        {
            levelCompleteData.timeToComplete = elapsedTime
            let coinsCollected = []

            for (let i = 0; i < 3; i++) 
            {
                let coin = levels[currentLevel].coins[i]
                if (coin.visible)
                {
                    coinsCollected.push(0)
                }
                else
                {
                    coinsCollected.push(coin.value)
                }
                
                
            }

            console.log("coinsCollected: ", coinsCollected);
                    
            // unlock next level
            levels[currentLevel + 1].locked = false;

            // update popUp with new scores
            popUps[0] = createLevelCompletePopUp()

            sounds.win.play()
            
            openPopUp("Level Complete")

            // check if it's a highscore
            updateLevelData(currentLevel, elapsedTime, coinsCollected) 
        }
        
    }

    if (levelFailed)
    {
        // setTimeout(delayedFunction, 1000);
        // levelFailed = false
        
        outlineTrack()
    }
    if (buildMode)
    {
        levelFailed = false
    }
}


function calculateScore(elapsedTime, coins)
{
    // calculate score
    let score = 10000 / ((0.0001 * elapsedTime) + 0.1);

    coins.forEach(coin => {
        if (coin != 0)
        {
            score *= coin
        }
    })
    return score
}

function createVelocityArrow()
{
    levels[currentLevel].testCharges.forEach(testCharge => {
        let testChargeAcc = testCharge.acc.copy().mult(4000)

        let start = testCharge.pos.copy()
        let end = testCharge.pos.copy().add(testChargeAcc)
        let color = "white"
        let arrowScale = 1;
        createArrow(start, end, color, arrowScale)

        fill(255)
        textSize(36 * scale.x)
        text("force", end.x  + 10, end.y + 10)
    })
}

function outlineTrack()
{
    let borderPoints = levels[currentLevel].border
    
    push();
        noStroke();
        fill("rgba(237, 32, 36, 0.25)")
        beginShape();
            // Exterior part of shape, clockwise winding
                vertex(0, 0);
                vertex(gameWidth - commonButtonSpace - 100, 0);
                vertex(gameWidth - commonButtonSpace - 100, gameHeight);
                vertex(0, gameHeight);

            // Interior part of shape, counter-clockwise winding
            let sideLength = testChargeDiameter * 2
            beginContour();
                vertex(-sideLength + failedTestChargePos.x, -sideLength + failedTestChargePos.y);
                vertex(-sideLength + failedTestChargePos.x, sideLength + failedTestChargePos.y);
                vertex(sideLength + failedTestChargePos.x, sideLength + failedTestChargePos.y);
                vertex(sideLength + failedTestChargePos.x, -sideLength + failedTestChargePos.y);
            endContour();
        endShape(CLOSE);

        beginShape();
            // Exterior part of shape, clockwise winding
                vertex(gameWidth - commonButtonSpace - 100, 0);
                vertex(gameWidth, 0);
                vertex(gameWidth, gameHeight);
                vertex(gameWidth - commonButtonSpace - 100, gameHeight);

            // Interior part of shape, counter-clockwise winding
            sideLength = commonButtonSpace / 2
            let redoButtonPos = screens[3].buttons[1].pos.copy().add(new p5.Vector(75, 75))
            beginContour();
                vertex(-sideLength + redoButtonPos.x, -sideLength + redoButtonPos.y);
                vertex(-sideLength + redoButtonPos.x, sideLength + redoButtonPos.y);
                vertex(sideLength + redoButtonPos.x, sideLength + redoButtonPos.y);
                vertex(sideLength + redoButtonPos.x, -sideLength + redoButtonPos.y);
            endContour();
        endShape(CLOSE);

        sideLength = testChargeDiameter * 2
        noFill()
        stroke("white")
        strokeWeight(20 * scale.x)
        rect(failedTestChargePos.x - sideLength, failedTestChargePos.y - sideLength, sideLength * 2, sideLength * 2)

        sideLength = commonButtonSpace / 2
        noFill()
        stroke("white")
        strokeWeight(20 * scale.x)
        rect(redoButtonPos.x - sideLength, redoButtonPos.y - sideLength, sideLength * 2, sideLength * 2)


        // beginShape();
        // // beginShape(POINTS);
        //     noFill();
            
        //     stroke("rgba(237, 32, 36, 1)");
        //     strokeWeight(5 * scale.x)
        //     vertex(borderPoints[0].x, borderPoints[0].y)

        //     borderPoints.forEach(point => {
        //         vertex(point.x, point.y);
        //     })
        // endShape();
    pop()


    

//     console.log(borderPoints);
}


function showTutorial()
{
    
    let tutorialText = ""
    if (charges.length == 0)
    {
        tutorialText = "click anywhere to place a charge"
        screens[3].textBoxes[1].pos = new p5.Vector((1920 / 2) - 200, 25)
    }







    
    if (currentLevel == 0)
    {
        let xPos = 300
        let yPos = 530
        // let tutorialText = "";

        if (charges.length == 0)
        {
            tutorialText = "place a charge here"
            // console.log(tutorialText);
            // new Shape({
            //     shape: "rect",
            //     pos: new p5.Vector(0, 0),
            //     size: new p5.Vector(1920, 1080),
            //     fillColor: "rgba(0, 0, 0, 0.5)",
            // }).display()
            let circleColor = (frameCount % 60 > 30) ? positiveChargeColor : "rgba(0, 0, 0, 0)"
            new Shape({
                shape: "ellipse",
                pos: new p5.Vector(xPos, yPos),
                size: new p5.Vector(commonButtonSize, commonButtonSize),
                fillColor: circleColor,
                strokeColor: positiveChargeColor,
            }).display()
            new MyImage({
                pos: new p5.Vector(xPos - 20, yPos), 
                size: 100,
                myImage: icons.click,
            }).display()

        }
        else
        {
            let showChargeLocation = false;

            charges.forEach(charge => {
                let chargePos = charge.pos.copy()
                if (chargePos.dist(new p5.Vector(xPos, yPos)) > commonButtonSize)
                {
                    showChargeLocation = true
                }
            })
            if (showChargeLocation)
            {
                new Shape({
                    shape: "ellipse",
                    pos: new p5.Vector(xPos, yPos),
                    size: new p5.Vector(commonButtonSize + 50, commonButtonSize + 50),
                    strokeColor: positiveChargeColor,
                }).display()
            }
            

            let selectedChargeIndex = charges.findIndex(charge => charge.selected === true);

            if (selectedChargeIndex != -1)
            {
                if (charges[selectedChargeIndex].charge != 5) 
                {
                    tutorialText = "set the charge to +5 C"
                    xPos = 300
                    yPos = 900
                }
            }
            if(charges[0].charge == 5) 
            {
                tutorialText = "test your configuration"
                xPos = 1450
                yPos = 1100
            }
        }

        if (!buildMode)
        {
            tutorialText = "you can edit any time"
        }

        if (tutorialText == "")
        {
            screens[3].textBoxes[1].visible = false;
        }

        screens[3].textBoxes[1].text = tutorialText;
        screens[3].textBoxes[1].pos = new p5.Vector(xPos - 200, yPos - 250);
    }
    if (currentLevel == 1)
    {
        let xPos = 300
        let yPos = 320
        let tutorialText = "";

        // new p5.Vector(293, 333),
        // new p5.Vector(1060, 430),

        if (charges.length < 3)
        {
            
            


            
            if (charges.length == 0)
            {
                tutorialText = "place a +5 charge here"
                let circleColor = (frameCount % 60 > 30) ? positiveChargeColor : "rgba(255, 255, 255, 0)"
                new Shape({
                    shape: "ellipse",
                    pos: new p5.Vector(xPos, yPos),
                    size: new p5.Vector(commonButtonSize, commonButtonSize),
                    fillColor: circleColor,
                    strokeColor: positiveChargeColor,
                }).display()
                
            }
            else if(charges.length == 1)
            {
                let charge1Pos = charges[0].pos.copy()
                let chargeToCircleDist = charge1Pos.dist(new p5.Vector(xPos, yPos))            
                if (chargeToCircleDist > chargeDiameter)
                {
                    tutorialText = "place a +5 charge here"
                    let circleColor = (frameCount % 60 > 30) ? positiveChargeColor : "rgba(255, 255, 255, 0)"
                    new Shape({
                        shape: "ellipse",
                        pos: new p5.Vector(xPos, yPos),
                        size: new p5.Vector(commonButtonSize, commonButtonSize),
                        fillColor: circleColor,
                        strokeColor: positiveChargeColor,
                    }).display()
                }
                if (charges[0].charge != 5)
                {
                    tutorialText = "place a +5 charge here"
                }

                if (chargeToCircleDist < chargeDiameter && charges[0].charge == 5)
                {
                    xPos = 1080
                    yPos = 430

                    if (charges.length == 2)
                    {
                        let charge2Pos = charges[1].pos.copy()
                        let chargeToCircleDist = charge2Pos.dist(new p5.Vector(xPos, yPos))            
                        if (chargeToCircleDist > chargeDiameter)
                        {
                            tutorialText = "place a -3 charge here"
                            
                            let circleColor = (frameCount % 60 > 30) ? positiveChargeColor : "rgba(255, 255, 255, 0)"
                            new Shape({
                                shape: "ellipse",
                                pos: new p5.Vector(xPos, yPos),
                                size: new p5.Vector(commonButtonSize, commonButtonSize),
                                fillColor: circleColor,
                                strokeColor: positiveChargeColor,
                            }).display()
                        }
                        if (charges[1].charge != -3)
                        {
                            tutorialText = "place a -3 charge here"
                        }
                    }
                    else
                    {
                        tutorialText = "place a -3 charge here"
                        let circleColor = (frameCount % 60 > 30) ? negativeChargeColor : "rgba(255, 255, 255, 0)"
                        new Shape({
                            shape: "ellipse",
                            pos: new p5.Vector(xPos, yPos),
                            size: new p5.Vector(commonButtonSize, commonButtonSize),
                            fillColor: circleColor,
                            strokeColor: negativeChargeColor,
                        }).display()
                    }

                    


                    



                    // new TextBox({
                    //     text: "place a -3 charge here",
                    //     fillColor: purpleColor[0],
                    //     strokeColor: purpleColor[4],
                    //     fontColor: "white",
                    //     fontSize: 48,
                    //     fontAlign: CENTER,
                    //     pos: new p5.Vector(xPos2 - 200, yPos2 - 250), 
                    //     size: new p5.Vector(400, 150),
                    // }).display()

                    // circleColor = (frameCount % 60 > 30) ? negativeChargeColor : "rgba(255, 255, 255, 0)"
                    // new Shape({
                    //     shape: "ellipse",
                    //     pos: new p5.Vector(xPos2, yPos2),
                    //     size: new p5.Vector(commonButtonSize, commonButtonSize),
                    //     fillColor: circleColor,
                    //     strokeColor: negativeChargeColor,
                    // }).display()
                }
            }

           
            if (charges.length == 2)
            {
                xPos = 1080
                yPos = 430

                let charge2Pos = charges[1].pos.copy()
                let chargeToCircleDist = charge2Pos.dist(new p5.Vector(xPos, yPos))   
                  


                if (chargeToCircleDist > chargeDiameter)
                {
                    tutorialText = "place a -3 charge here"
                    let circleColor = (frameCount % 60 > 30) ? negativeChargeColor : "rgba(255, 255, 255, 0)"
                    new Shape({
                        shape: "ellipse",
                        pos: new p5.Vector(xPos, yPos),
                        size: new p5.Vector(commonButtonSize, commonButtonSize),
                        fillColor: circleColor,
                        strokeColor: negativeChargeColor,
                    }).display()
                }
                if (charges[1].charge != -3)
                {
                    tutorialText = "place a -3 charge here"
                }
                if (chargeToCircleDist < chargeDiameter && charges[1].charge == -3)
                {
                    tutorialText = "test your configuration"
                    xPos = 1450
                    yPos = 1100
                }
                // let xPos2 = 1060
                // let yPos2 = 430
                // new TextBox({
                //     text: "place a -3 charge here",
                //     fillColor: purpleColor[0],
                //     strokeColor: purpleColor[4],
                //     fontColor: "white",
                //     fontSize: 48,
                //     fontAlign: CENTER,
                //     pos: new p5.Vector(xPos2 - 200, yPos2 - 250), 
                //     size: new p5.Vector(400, 150),
                // }).display()
                // let charge2Pos = charges[0].pos.copy()
                // chargeToCircleDist = charge2Pos.dist(new p5.Vector(xPos, yPos))            
                // if (chargeToCircleDist > chargeDiameter)
                // {
                //     circleColor = (frameCount % 60 > 30) ? negativeChargeColor : "rgba(255, 255, 255, 0)"
                //     new Shape({
                //         shape: "ellipse",
                //         pos: new p5.Vector(xPos2, yPos2),
                //         size: new p5.Vector(commonButtonSize, commonButtonSize),
                //         fillColor: circleColor,
                //         strokeColor: negativeChargeColor,
                //     }).display()
                // }
            }
            

        }
        else
        {
            let selectedChargeIndex = charges.findIndex(charge => charge.selected === true);

            if (selectedChargeIndex != -1)
            {
                if (charges[selectedChargeIndex].charge != 5) 
                {
                    tutorialText = "set the charge to +5 C"
                    xPos = 300
                    yPos = 700
                }
            }
            if(charges[0].charge == 5) 
            {
                tutorialText = "test your configuration"
                xPos = 1450
                yPos = 1100
            }
        }

        if (!buildMode)
        {
            tutorialText = "you can edit any time"
        }

        
        screens[3].textBoxes[1].pos = new p5.Vector(xPos - 200, yPos - 250);
    }

    if (currentLevel > 1)
    {
        tutorialText = ""
    }
    
    if (tutorialText == "")
    {
        screens[3].textBoxes[1].visible = false;
    }

    screens[3].textBoxes[1].text = tutorialText;
    // console.log("final tutorialText: ", tutorialText);
}

function displayTrashIcon()
{
    let buttonVisibility = false;
    let lidAngle = 0
    if (charges.some(charge => charge.dragging === true))
    {
        buttonVisibility = true
        lidAngle += ((Math.cos(frameCount * 2)) / 8)
        screens[3].images[3].pos = screens[3].images[3].startingPos.copy().sub(new p5.Vector(0, 5))


    }
    else
    {
        screens[3].images[3].pos = screens[3].images[3].startingPos.copy()

    }

    // buttonVisibility = true

    screens[3].buttons[2].visible = buttonVisibility
    screens[3].images[3].visible = buttonVisibility
    screens[3].images[3].angle = lidAngle
}

// :todo

// track walls should light up(neon) when test charge hits them


// credits: 
//      font awesome
//      <a href="https://www.freepik.com/free-vector/yellow-banner-sticker-blank-vector-simple-clipart-set_18233834.htm#query=banner&position=1&from_view=keyword&track=sph">Image by rawpixel.com</a> on Freepik