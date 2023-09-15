
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