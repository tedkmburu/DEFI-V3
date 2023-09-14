
function preload() 
{
    spaceImage = loadImage('images/background.png');
    blueprintImage = loadImage('images/blueprint.png');
    homeTrack = loadImage('images/homeTrack.png');

    icons = {
        back: loadImage('images/icons/back.png'),
        help: loadImage('images/icons/help.png'),
        info: loadImage('images/icons/info.png'),
        lock: loadImage('images/icons/lock.png'),
        play: loadImage('images/icons/play.png'),
        redo: loadImage('images/icons/redo.png'),
        settings: loadImage('images/icons/settings.png'),
        soundOff: loadImage('images/icons/soundOff.png'),
        soundOn: loadImage('images/icons/soundOn.png'),
        star: loadImage('images/icons/star.png'),
        starEmpty: loadImage('images/icons/starEmpty.png'),
        // back: loadImage('images/icons/homeTrack.png'),
        };


    scale = new p5.Vector(1, 1, 1)


    createLevels()
    
}

function setup()
{
    currentScreen = 3;
    unlockLevels()
    createScreens()
    createCanvas(innerWidth, innerHeight)
}

function draw()
{
    background(0)
    displayCurrentScreen()
    mousePosition = new p5.Vector(mouseX, mouseY)
}

function mouseClicked()
{
    let buttonWasClicked = false; 

    screens[currentScreen].buttons.forEach(button => {
        if (isPointInRectangle(mousePosition, button))
        {
            buttonWasClicked = true;
            button.clicked()
        }
    });

    if (!buttonWasClicked)
    {
        if (currentScreen == 3 && buildMode)
        {
            console.log("new charge");
        }
    }
}

function mouseWheel(event) 
{
    
    // console.log(scrollOffset);
    
    if (currentScreen == 1)
    {
        scrollOffset -= event.delta
        screens[1].buttons[0].pos.y += event.delta
        screens[1].buttons.forEach(button => { button.pos.y -= event.delta })
        screens[1].images.forEach(image => { image.pos.y -= event.delta })
        screens[1].textBoxes.forEach(textBox => { textBox.pos.y -= event.delta })
        screens[1].shapes.forEach(shape => { shape.pos.y -= event.delta })
    }
    // pos += event.delta;
}


function isPointInRectangle(point, rect) 
{
    // Check if the point is within the rectangle's boundaries.
    if (
      point.x >= rect.pos.x &&
      point.x <= rect.pos.x + rect.size.x &&
      point.y >= rect.pos.y &&
      point.y <= rect.pos.y + rect.size.y
    ) {
      return true; // The point is inside the rectangle.
    } else {
      return false; // The point is outside the rectangle.
    }
}

function scaleImageToSize(maxWidth, maxHeight, originalWidth, originalHeight)
{
    // Calculate the scaling factor for both width and height
    const widthScale = maxWidth / originalWidth;
    const heightScale = maxHeight / originalHeight;

    // Use the minimum scale to maintain the aspect ratio
    const imageScale = Math.min(widthScale, heightScale);

    // Calculate the new dimensions
    const newWidth = originalWidth * imageScale;
    const newHeight = originalHeight * imageScale;

    return new p5.Vector(newWidth, newHeight);
}

function getScaledImagePos(maxWidth, maxHeight, imageSize)
{
    let myImageSize = imageSize.copy()
    let maxSize = new p5.Vector(maxWidth, maxHeight)
    let posWithOffset = maxSize.sub(myImageSize.copy().mult(0.8)).div(2)
    return posWithOffset
}