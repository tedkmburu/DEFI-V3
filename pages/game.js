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

    





    shapes.push(new Shape({
        pos: new p5.Vector(0, 0), 
        size: new p5.Vector(innerWidth * 3, 200),
        fillColor: "rgba(0, 0, 0, 0.5)",
    }))

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
            onClick: function(){ navigateTo("Level Select"); },
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
            fillColor: purpleColor[0],
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
            pos: new p5.Vector(400, 220), 
            size: new p5.Vector(maxWidth, maxHeight),
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
        })]


    textBoxes = [
        new TextBox({
            text: millisecondsToString(silverCoinTime),
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "black",
            fontSize: 60,
            pos: new p5.Vector(1920 - 200, 70), 
            size: new p5.Vector(200, 73),
        }),
        
    ]

    let functions = () => {
        
        updateTrackImage()
        updateTimer()
        displayCoins()
        displayCharges()
        if (!buildMode)
        {
            checkCoinsCollisions();
            checkBorderCollisions();
        }
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
        functions: functions
    })
}

function updateTimer()
{
    
    let textToShow = ""
    let coinToShow = coinImages.gold
    if (elapsedTime < silverCoinTime) 
    {
        textToShow = millisecondsToString(silverCoinTime - elapsedTime)
        coinToShow = coinImages.gold
        
    }
    else if (elapsedTime > silverCoinTime && elapsedTime < bronzeCoinTime) 
    {
        textToShow = millisecondsToString(bronzeCoinTime - elapsedTime)
        coinToShow = coinImages.silver
    }
    else if (elapsedTime > bronzeCoinTime) 
    {
        coinToShow = coinImages.bronze
        textToShow = ""
    }
    screens[3].textBoxes[0].text = textToShow
    screens[3].images[2].myImage = coinToShow

    if (!popUpVisible)
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
        return "12.34 s";
    }
    else if (milliseconds != null)
    {
        const seconds = (milliseconds / 1000).toFixed(1);
        return seconds.toString() + " s";
    }
    else 
    {
        return "0.00 s";
    }
}

function drawEquiPotentialLines()
{
    console.log("draw <3");
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
    screens[3].buttons[1].myImage = (buildMode) ? icons.play : icons.edit
    screens[3].buttons[1].text = (buildMode) ? "test" : "edit";
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
            coinsCollected = []

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

            // go to the next screen
            popUps[0] = createLevelCompletePopUp()
            
            openPopUp("Level Complete")

            // check if it's a highscore
            updateLevelData(currentLevel, elapsedTime, coinsCollected) 
        }
        
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



// :todo

// track walls should light up(neon) when test charge hits them


// credits: 
//      font awesome
//      <a href="https://www.freepik.com/free-vector/yellow-banner-sticker-blank-vector-simple-clipart-set_18233834.htm#query=banner&position=1&from_view=keyword&track=sph">Image by rawpixel.com</a> on Freepik