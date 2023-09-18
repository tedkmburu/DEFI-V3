function createGameScreen()
{

    let buttons = [
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

    let images = [
        new myImage({
            pos: new p5.Vector(50, 50).add(imagePos), 
            size: imageSize.copy().mult(0.8),
            myImage: (buildMode) ? levels[currentLevel].buildImage : levels[currentLevel].trackImage ,
        })]

    let textBoxes = [
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
        if (!buildMode) checkStarCollisions()
    }

    testCharges = []
    for (let i = 0; i < levels[currentLevel].testChargeStartingPos.length; i++) 
    {
        let testChargePos = levels[currentLevel].testChargeStartingPos[i].copy()
        testCharges.push(new TestCharge({pos: testChargePos}))
    }

    return new Screen({
        name: "Game",
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
    levels[currentLevel].stars[0].display()
    levels[currentLevel].stars[1].display()
    levels[currentLevel].stars[2].display()
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
    testCharges.forEach(testCharge => {
        testCharge.pos = testCharge.startingPos.copy()
        testCharge.vel = new p5.Vector(0, 0)
    })
}

function displayCharges()
{
    displayFieldLines()
    displayFieldLineArrows()
    displayTestCharges()

    charges.forEach(charge => {
        charge.display()
    })
}

function displayFieldLines()
{
    fieldLines.forEach(fieldLine => {
        fieldLine.display()
    })
}

function displayFieldLineArrows()
{
    fieldLineArrows.forEach(fieldLineArrow => {
        fieldLineArrow.display()
    })
}

function displayTestCharges()
{
    testCharges.forEach(testCharge => {
        testCharge.display()
        if (!buildMode) 
        {
            testCharge.moveTestCharge()    
        }
    })
}

function updatePlayButton()
{
    screens[currentScreen].buttons[3].myImage = (buildMode) ? icons.play : icons.edit
    screens[currentScreen].buttons[3].text = (buildMode) ? "Play" : "Build";
}

function checkStarCollisions()
{
    testCharges.forEach(testCharge => {
        
        for (let i = 0; i < 3; i++) 
        {
            if (circleOverlapsCirlce(testCharge, levels[currentLevel].stars[i]))
            {
                levels[currentLevel].stars[i].visible = false; 
            }
        }
    })
}