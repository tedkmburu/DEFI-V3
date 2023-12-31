"use strict";

function preload() 
{
    classCodeInputBox = document.getElementById("classCode")
    userNameInputBox = document.getElementById("userName")

    

    sounds = {
        theme: loadSound('sounds/Theme_1_11-17.wav'),
        click: loadSound('sounds/General_Click_11-17.wav'),
        fail: loadSound('sounds/Test_Failed_11-17.wav'),
        succeed: loadSound('sounds/Test_Succeed_11-17.wav'),
        win: loadSound('sounds/Scoreboard_Short_11-17.wav'),
        coins: loadSound('sounds/Collecting_Points_11-17.wav'),
        charge0: loadSound('sounds/Changing_Charge_-1_11-17.wav'),
        charge1: loadSound('sounds/Changing_Charge_-2_11-17.wav'),
        charge2: loadSound('sounds/Changing_Charge_-3_11-17.wav'),
        charge3: loadSound('sounds/Changing_Charge_-4_11-17.wav'),
        charge4: loadSound('sounds/Changing_Charge_-5_11-17.wav'),
        charge5: loadSound('sounds/Changing_Charge_+0_11-17.wav'),
        charge6: loadSound('sounds/Changing_Charge_+1_11-17.wav'),
        charge7: loadSound('sounds/Changing_Charge_+2_11-17.wav'),
        charge8: loadSound('sounds/Changing_Charge_+3_11-17.wav'),
        charge9: loadSound('sounds/Changing_Charge_+4_11-17.wav'),
        charge10: loadSound('sounds/Changing_Charge_+5_11-17.wav'),
        
    }

    sounds.theme.setVolume(0.15)

    spaceImage = loadImage('images/light.png');
    blueprintImage = loadImage('images/dark.png');
    homeTrack = loadImage('images/homeTrack.png');
    banner = loadImage('images/banner.png')
    bigBanner = loadImage('images/bigBanner.png')
    ribbon = loadImage('images/ribbon.png')
    stamp = loadImage('images/stamp.svg')

    coinImages = {
        gold: loadImage('images/coin (1).png'),
        silver: loadImage('images/coin (2).png'),
        bronze: loadImage('images/coin (3).png'),
        missing: loadImage('images/coin (4).png'),
    }

    tutorialImages = [
        loadImage('images/tutorial/tutorial (1).png'),
        loadImage('images/tutorial/tutorial (2).png'),
        loadImage('images/tutorial/tutorial (3).png'),
        loadImage('images/tutorial/tutorial (4).png'),
    ]

    carImages = {
        pos: loadImage('images/carPos.png'),
        neg: loadImage('images/carNeg.png'),
    }

    icons = {
        back: loadImage('images/icons/arrow-left-solid.svg'),
        help: loadImage('images/icons/circle-question-solid.svg'),
        info: loadImage('images/icons/circle-info-solid.svg'),
        lock: loadImage('images/icons/lock-solid.svg'),
        play: loadImage('images/icons/play-solid.svg'),
        edit: loadImage('images/icons/screwdriver-wrench-solid.svg'),
        redo: loadImage('images/icons/arrow-rotate-right-solid.svg'),
        settings: loadImage('images/icons/gear-solid.svg'),
        soundOff: loadImage('images/icons/volume-xmark-solid.svg'),
        soundOn: loadImage('images/icons/volume-high-solid.svg'),
        star: loadImage('images/icons/star-solid.svg'),
        starEmpty: loadImage('images/icons/star-regular.svg'),
        leaderboard: loadImage('images/icons/ranking-star-solid.svg'),
        home: loadImage('images/icons/house-solid.svg'),
        race: loadImage('images/icons/flag-checkered-solid.svg'),
        pause: loadImage('images/icons/pause-solid.svg'),
        next: loadImage('images/icons/arrow-right-solid.svg'),
        trash: loadImage('images/icons/trash-can-solid.svg'),
        trashLid: loadImage('images/icons/trash-lid-solid.svg'),
        classroom: loadImage('images/icons/chalkboard-user-solid.svg'),
        click: loadImage('images/icons/arrow-pointer-solid.svg'),
        gradCap: loadImage('images/icons/graduation-cap-solid.svg'),
        usersRectangle: loadImage('images/icons/users-rectangle-solid.svg'),
        save: loadImage('images/icons/floppy-disk-solid.svg'),
        oldScreenshot: loadImage('images/icons/screenshot.png'),
        iclogo: loadImage('images/icons/iclogo.png'),
        summerScholars: loadImage('images/icons/summerscholars.png'),
        close: loadImage('images/icons/circle-xmark-regular.svg'),
        };

    setScale()
    

    createLevels()

    saveData()

    
    unlockLevels()

    createAnimations()
}

function setup()
{
    createScreens()
    createPopUps()
    createCanvas(innerWidth, innerHeight)
    reloadUserData()

    // sounds.theme.play()
   
    if (userData.music) sounds.theme.loop()
    
    // console.log("height: ", classCodeInputBox.style.height);
}

function draw()
{
    background(purpleColor[0])
    mousePosition = new p5.Vector(mouseX, mouseY)
    
    displayCurrentScreen()
    displayCurrentPopUp()
    

    
    if (frameCount % 30 == 0)
    {
        currentFPS = Math.round(frameRate())
    }
    push()
        textSize(24)
        fill(255)
        text("fps: " + currentFPS, 0,  24)
    pop()
}

function setScale()
{
    const originalWidth = 1920;
    const originalHeight = 1080;

    scale = scaleImageToSize(innerWidth, innerHeight, originalWidth, originalHeight)
    scale.div(new p5.Vector(originalWidth, originalHeight))
}

// calculate the distance from the line to the center of the circle
// and compare it to the circle's radius. If the distance is less than
// or equal to the radius, the line intersects or is inside the circle
function isLineIntersectingCircle(point1, point2, circle) 
{
    const x1 = point1.pos.x;
    const y1 = point1.pos.y;
    const x2 = point2.pos.x;
    const y2 = point2.pos.y;
    const circleX = circle.pos.x;
    const circleY = circle.pos.y;
    const circleRadius = circle.radius;

    // Calculate the length of the line segment
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    // Calculate the unit vector along the line segment
    const unitX = (x2 - x1) / length;
    const unitY = (y2 - y1) / length;

    // Iterate over points along the line segment
    for (let t = 0; t <= length; t++) {
        const pointX = x1 + t * unitX;
        const pointY = y1 + t * unitY;

        // Calculate the distance from the current point to the circle's center
        const distance = Math.sqrt((pointX - circleX) ** 2 + (pointY - circleY) ** 2);

        // Check if the point is inside the circle
        if (distance <= circleRadius) {
            return true; // At least one point is inside the circle
        }
    }

    return false; // No points within the line segment are inside the circle
}

function circleOverlapsCirlce(circle1, circle2)
{
    let circle1Pos = circle1.pos.copy();
    let circle2Pos = circle2.pos.copy();

    let distanceBetweenCircles = circle1Pos.dist(circle2Pos)
    let minimumDistance = circle1.radius + circle2.radius; 

    if (distanceBetweenCircles > minimumDistance) return false;
    else return true;
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

function circleIsInRect(circle, rect) 
{
    // Calculate the distance between the circle's center and the rectangle's center
    const deltaX = Math.abs(circle.pos.x - (rect.pos.x + rect.size.x / 2));
    const deltaY = Math.abs(circle.pos.y - (rect.pos.y + rect.size.y / 2));

    // Check if the circle's center is inside the rectangle based on its dimensions
    if (deltaX <= (rect.size.x / 2) && deltaY <= (rect.size.y / 2)) 
    {
        // The circle's center is inside the rectangle's boundaries
        // Now, check if the entire circle is inside the rectangle
        if (deltaX <= (rect.size.x / 2 - circle.radius) && deltaY <= (rect.size.y / 2 - circle.radius)) 
        {
            return true; // The circle is completely inside the rectangle
        }
    }
    return false; // The circle is not inside the rectangle or partially inside
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
    let posWithOffset = maxSize.sub(myImageSize.copy()).div(2)
    return posWithOffset
}

function createFieldLines()
{
    noPositiveCharges = !charges.some(charge => charge.charge > 0); // if a positive charge exists, this will be false

    fieldLines = [];
    fieldLineArrows = []

    charges.forEach(charge => {

        let radius = chargeRadius / 2;
        let times = Math.abs(charge.charge) * fieldLinesPerCoulomb;
        let origin = charge.pos;

        let point = createVector(radius,radius);
        for (let a = 0; a < times; a++)
        {
            let startingPosition = createVector(point.x + origin.x, point.y + origin.y)
            getFieldLinePoints(startingPosition);

            point.rotate((2 * Math.PI) / times);
        }
        
    });
}




function getFieldLinePoints(startingPosition, numberOfLoops, listOfPoints)
{
    // let minVectorSize = 3;
    // let maxVectorSize = chargeRadius;
    let vectorMag;

    if (listOfPoints == undefined) // only true the first time this funciton runs
    {
        listOfPoints = [];
        numberOfLoops = 0; 
        vectorMag = chargeRadius;
    }
    else
    {
        // let previousPosition = listOfPoints[listOfPoints.length - 1];
        // let angleBetweenPoints =  Math.abs( startingPosition.angleBetween(previousPosition) ) * (180 / Math.PI) ;
        // let angleBetweenPoints =  Math.abs( myAngleBetween(startingPosition, previousPosition) );
        // console.log(angleBetweenPoints);
        // vectorMag = Math.round(maxVectorSize * Math.pow(2, angleBetweenPoints));
        vectorMag = chargeRadius;

        // console.log(numberOfLoops);
        if (numberOfLoops < 10)
        {
            vectorMag = chargeRadius / 4;
        }
        // vectorMag = 1000 / angleBetweenPoints ;

        // console.log(vectorMag);

        // if (vectorMag > maxVectorSize) vectorMag = maxVectorSize;
        // if (vectorMag < minVectorSize) vectorMag = minVectorSize;
    }

    listOfPoints.push(startingPosition);

    let forceVector = netForceAtPoint(startingPosition).setMag(vectorMag);
    if (noPositiveCharges) 
    {
        forceVector.mult(-1);
    }

    let forceVectorFinalPosition = p5.Vector.add(forceVector, startingPosition);

    if (numberOfLoops % 7 == 0 && numberOfLoops > 6) 
    {
        let arrowPosition = startingPosition;
        let arrowAngle = noPositiveCharges ? forceVector.mult(-1).heading() : forceVector.heading();

        fieldLineArrows.push(new FieldLineArrow(arrowPosition, arrowAngle));
    }

    let distanceToCharges = [];
    charges.forEach(charge => {
        let finalPositionToChargeDistance = p5.Vector.dist(startingPosition, charge.pos);
        distanceToCharges.push(finalPositionToChargeDistance);
    })
    let closestChargeDistance = Math.min(...distanceToCharges)

    let index = distanceToCharges.indexOf(closestChargeDistance);

    if (closestChargeDistance > chargeRadius / 2 && numberOfLoops < 110) 
    {
        getFieldLinePoints(forceVectorFinalPosition, numberOfLoops + 1, listOfPoints);
    }
    else if (closestChargeDistance < chargeRadius / 2 && charges[index].charge == 0)
    {
        getFieldLinePoints(forceVectorFinalPosition, numberOfLoops + 1, listOfPoints);
    }
    else if (closestChargeDistance < chargeRadius / 2 && charges[index].charge != 0)
    {
        listOfPoints.push(charges[index].pos);
        fieldLines.push(new FieldLine(listOfPoints));
    }
    else
    {
        fieldLines.push(new FieldLine(listOfPoints));
    }
}

function netForceAtPointFromCharges(position, groupOfCharges)
{
    let finalVector = createVector(0, 0);

    // these are all the pointcharges
    groupOfCharges.forEach(charge => {
        
        //F = KQ / (r^2)
        let kq = charge.charge  * k;
        let r = p5.Vector.dist(position, charge.pos) / 10;

        if (r < 0.5) r = 0.5
        
        let rSquared = Math.pow(r,2);
        let force = kq / rSquared;

        let theta = p5.Vector.sub(charge.pos, position).heading();
        let forceX = force * Math.cos(theta);
        let forceY = force * Math.sin(theta);

        let forceVectors = createVector(forceX, forceY).mult(-1);

        finalVector.add(forceVectors);
    });

    return finalVector;
}

function netForceAtPoint(position) // given a vector, it will return the net force at that point as a vector
{
  let finalVector = createVector(0, 0);

  // these are all the pointcharges
  charges.forEach(charge => {
      
    //F = KQ / (r^2)
    let kq = charge.charge  * k;
    let r = p5.Vector.dist(position, charge.pos) / 10;

    if (r < 0.5) r = 0.5
    
    let rSquared = Math.pow(r,2);
    let force = kq / rSquared;

    let theta = p5.Vector.sub(charge.pos, position).heading();
    let forceX = force * Math.cos(theta);
    let forceY = force * Math.sin(theta);

    let forceVectors = createVector(forceX, forceY).mult(-1);

    finalVector.add(forceVectors);
  });

  return finalVector;
}

function voltageAtPoint(position) // given a vector, it will return the voltage at that point
{
  let finalVoltage = 0;

  // these are all the pointcharges
  charges.forEach(charge => {
      
    //F = KQ / (r^2)
    let kq = charge.charge  * k;
    let r = p5.Vector.dist(position, charge.pos) / 10;

    if (r < 0.5) r = 0.5
    
    let voltage = kq / r;

    finalVoltage += voltage;
  });

  return finalVoltage;
}


function getRandomStarPhrase()
{
    let index = round(random(0, starPhrases.length - 1))
    return starPhrases[index]
}

function getRandomTimePhrase()
{
    let index = round(random(0, timePhrases.length - 1))
    return timePhrases[index]
}

function createVoltageGradient()
{
    let voltage = []


    for (let x = 0; x < 10; x++) 
    {
        voltage[x] = []
        for (let y = 0; y < 10; y++) 
        {
            voltage[x][y] = voltageAtPoint(new p5.Vector(x * voltageDefinition, y * voltageDefinition))
        }   
    }

    
    // console.log(voltage);




}

function displayVoltageGradient()
{
    createVoltageGradient()

    for (let x = 0; x < 10; x++) 
    {
        for (let y = 0; y < 10; y++) 
        {
            
        }   
    }
}

function getLevelName(levelIndex)
{
    if (levelIndex < 3)
    {
        return "tutorial #" + (levelIndex + 1)
    }
    else
    {
        return "level " + (levelIndex - 2)
    }
}

function createArrow(start, end, color, scale)
{
    // Calculate the difference in coordinates
    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;

    // Calculate the angle in radians using Math.atan2
    const radians = Math.atan2(deltaY, deltaX);

    // Convert radians to degrees
    const angle = radians * (180 / Math.PI);
    
    push();
        angleMode(DEGREES)
        stroke(color);
        strokeWeight(scale * 4);
        noFill();
        line(start.x, start.y, end.x, end.y);

        translate(end.x, end.y)
            rotate(angle);
            fill(color);

        triangle(0, 0, -10 * scale, -5 * scale, -10 * scale, 5 * scale);
        angleMode(RADIANS)
        
    pop();
}

function windowResized() 
{
    resizeCanvas(windowWidth, windowHeight);
    setScale()
    createScreens()
    createPopUps()
    console.log("resize");
}

function openLinkInNewTab(url) {
    window.open(url, '_blank');
  }