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
        edit: loadImage('images/icons/edit.png'),
        redo: loadImage('images/icons/redo.png'),
        settings: loadImage('images/icons/settings.png'),
        soundOff: loadImage('images/icons/soundOff.png'),
        soundOn: loadImage('images/icons/soundOn.png'),
        star: loadImage('images/icons/star.png'),
        starEmpty: loadImage('images/icons/starEmpty.png'),
        };

    scale = new p5.Vector(1, 1, 1)

    createLevels()
}

function setup()
{
    saveData()
    unlockLevels()
    createScreens()
    createCanvas(innerWidth, innerHeight)
}

function draw()
{
    background(0)
    mousePosition = new p5.Vector(mouseX, mouseY)
    
    displayCurrentScreen()
}


// calculate the distance from the line to the center of the circle
// and compare it to the circle's radius. If the distance is less than
// or equal to the radius, the line intersects or is inside the circle
function isLineIntersectingCircle(point1, point2, circle) 
{
    const lineX1 = point1.pos.x;
    const lineY1 = point1.pos.y;
    const lineX2 = point2.pos.x;
    const lineY2 = point2.pos.y;
    const circleX = circle.pos.x;
    const circleY = circle.pos.y;
    const circleRadius = circle.radius;

    // Calculate the squared length of the line segment
    const lineLengthSquared = Math.pow(lineX2 - lineX1, 2) + Math.pow(lineY2 - lineY1, 2);

    // Calculate the vector from the line start to the circle center
    const dx = circleX - lineX1;
    const dy = circleY - lineY1;

    // Calculate the projection of the circle center onto the line
    const t = (dx * (lineX2 - lineX1) + dy * (lineY2 - lineY1)) / lineLengthSquared;

    // Calculate the closest point on the line to the circle center
    const closestX = lineX1 + t * (lineX2 - lineX1);
    const closestY = lineY1 + t * (lineY2 - lineY1);

    // Calculate the squared distance from the circle center to the closest point on the line
    const distanceSquared = Math.pow(circleX - closestX, 2) + Math.pow(circleY - closestY, 2);

    // If the squared distance is less than or equal to the squared radius, the line intersects or is inside the circle
    if (distanceSquared <= Math.pow(circleRadius, 2)) {
        return true;
    }

    return false;
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