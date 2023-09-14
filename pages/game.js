function createGameScreen()
{

    let buttons = [
        new Button({
            text: "Back",
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
            pos: new p5.Vector(844 - 60, 390 - 60), 
            fontSize: 18,
            fontAlign: LEFT,
            size: new p5.Vector(50, 50),
            fontColor: 255,
            fillColor: "rgba(0, 0, 0, 0.5)",
            onClick: function(){ buildMode =! buildMode },
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
            myImage: levels[currentLevel].buildImage,
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

function displayStars()
{
    // console.log(levels[currentLevel].stars);
    
    levels[currentLevel].stars[0].display()
    levels[currentLevel].stars[1].display()
    levels[currentLevel].stars[2].display()
    
}

function resetGame()
{

}

function toggleHelp()
{

}