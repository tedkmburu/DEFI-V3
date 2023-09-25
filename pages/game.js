function createGameScreen()
{
    let screenName = "Game";

    let buttons = []
    let images = []
    let textBoxes = []
    let shapes = []

    buttons = [
        new Button({
            text: "Back",
            myImage: icons.back,
            pos: new p5.Vector(10, 10), 
            fontSize: 18,
            fontAlign: LEFT,
            size: new p5.Vector(50, 50),
            fontColor: 255,
            fillColor: "rgba(0, 0, 0, 0.5)",
            onClick: function(){ navigateTo("Level Select"); },
        }),
        new Button({
            text: "Help",
            myImage: icons.help,
            pos: new p5.Vector(844 - 120, 10), 
            fontSize: 18,
            fontAlign: LEFT,
            size: new p5.Vector(50, 50),
            fontColor: 255,
            fillColor: "rgba(0, 0, 0, 0.5)",
            onClick: function(){ helpMode = !helpMode; },
        }),
        new Button({
            text: "Restart",
            myImage: icons.redo,
            pos: new p5.Vector(844 - 60, 10), 
            fontSize: 18,
            fontAlign: LEFT,
            size: new p5.Vector(50, 50),
            fontColor: 255,
            fillColor: "rgba(0, 0, 0, 0.5)",
            onClick: function(){ resetGame() },
        }),
        new Button({
            text: "Build",
            myImage: (buildMode) ? icons.play : icons.edit,
            pos: new p5.Vector(844 - 60, 390 - 60), 
            fontSize: 18,
            fontAlign: LEFT,
            size: new p5.Vector(50, 50),
            fontColor: 255,
            fillColor: "rgba(0, 0, 0, 0.5)",
            onClick: function()
            { 
                toggleBuildMode()
            },
        }),]

    

    // Set the desired dimensions of the containing div
    const maxWidth = 208.6 * 3; // Set your maximum width here
    const maxHeight = 96.2 * 3; // Set your maximum height here

    // Get the original image dimensions
    const originalWidth = levels[currentLevel].size.x;
    const originalHeight = levels[currentLevel].size.y;

    let imageSize = scaleImageToSize(maxWidth, maxHeight, originalWidth, originalHeight) 
    let imagePos = getScaledImagePos(maxWidth, maxHeight, imageSize)

    images = [
        new myImage({
            pos: new p5.Vector(50, 50).add(imagePos), 
            size: imageSize.copy().mult(0.8),
            myImage: (buildMode) ? levels[currentLevel].buildImage : levels[currentLevel].trackImage ,
        })]

    textBoxes = [
        new TextBox({
            text: millisecondsToString(elapsedTime),
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "white",
            fontSize: 24,
            pos: new p5.Vector(322, 10), 
            size: new p5.Vector(200, 50),
        }),
    ]

    let functions = () => {
        
        updateTrackImage()
        updateTimer()
        displayStars()
        createFieldLines()
        displayCharges()
        updatePlayButton()
        if (!buildMode)
        {
            checkStarsCollisions();
            checkBorderCollisions();
        }
        displayTrackBorder()
        checkWinConditions()
    }

    return new Screen({
        name: screenName,
        backgroundImage: buildMode ? blueprintImage : spaceImage,
        buttons: buttons,
        images: images,
        textBoxes: textBoxes,
        functions: functions
    })
}

function updateTimer()
{
    screens[3].textBoxes[0].text = millisecondsToString(elapsedTime)
    elapsedTime +=  deltaTime
}

function updateTrackImage()
{
    let trackImage = buildMode ? levels[currentLevel].buildImage : levels[currentLevel].playImage;
    screens[3].images[0].myImage = trackImage
}

function millisecondsToString(milliseconds)
{
    if (milliseconds < 0) 
    {
        return "00:00:00.00";
    }

    // Calculate hours, minutes, seconds, and centiseconds
    const centiseconds = Math.floor((milliseconds % 1000) / 10);
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));

    // Format the time components with leading zeros
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedCentiseconds = String(centiseconds).padStart(2, '0');

    // Construct the time string
    const timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedCentiseconds}`;

    return timeString;
}

function drawEquiPotentialLines()
{
    console.log("draw <3");
}

function displayStars()
{
    levels[currentLevel].stars.forEach(star => {
        if (star.visible)
        {
            star.display()
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

    levels[currentLevel].stars.forEach(star => {
        star.angle = 0;
    })

    resetTestCharges()
    resetStars()
}

function toggleHelp()
{

}

function toggleBuildMode()
{
    buildMode =! buildMode;
    
    resetCharges()
    resetStars()
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

function resetStars()
{
    levels[currentLevel].stars.forEach(star => {
        star.visible = true;
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
    screens[currentScreen].buttons[3].myImage = (buildMode) ? icons.play : icons.edit
    screens[currentScreen].buttons[3].text = (buildMode) ? "Play" : "Build";
}

// checks to see if any test charge collides with a star
function checkStarsCollisions()
{
    levels[currentLevel].testCharges.forEach(testCharge => {
        testCharge.checkStarCollisions()
    })
}

// checks to see if any test charge collides with the edge
function checkBorderCollisions()
{
    levels[currentLevel].testCharges.forEach(testCharge => {
        testCharge.checkWallCollision()
    })
}

// used to see the actual borders
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
        // count how many stars are collected
        let starsCollected = 0;
        levels[currentLevel].stars.forEach(star => {
            if (!star.visible)
            {
                starsCollected++;
            }
        })

        // calculate score
        let score = 10000 / ((0.0001 * elapsedTime) + 0.1);
        if (starsCollected > 1) score *= starsCollected
        updateLevelData(currentLevel, score, elapsedTime, starsCollected) 

        // unlock next level
        levels[currentLevel + 1].locked = false;

        // go to the next screen
        navigateTo("Level Complete")
    }
}