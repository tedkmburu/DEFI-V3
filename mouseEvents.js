"use strict";

function mouseClicked()
{
    let buttonWasClicked = false; 

    if (popUpVisible)
    {
        popUps[currentPopUp].buttons.forEach(button => {
            if (isPointInRectangle(mousePosition, button))
            {
                buttonWasClicked = true;
                popUpVisible =  false;
                button.clicked()
                
            }
        });
        
    }
    else 
    {
        screens[currentScreen].buttons.forEach(button => {
            if (isPointInRectangle(mousePosition, button))
            {
                buttonWasClicked = true;
                button.clicked()
            }
        });

        let selectedCharge;

        if (!buttonWasClicked && buildMode)
        {
            charges.forEach(charge => {charge.dragging = false; charge.selected = false;} )
            
            let chargeSelected = false; 

            for (let i = 0; i < charges.length; i++) 
            {
                let distanceToCharge = charges[i].pos.dist(mousePosition)

                if (charges[i].selected)
                {
                    selectedCharge = charges[i]; 
                    print(":todo")
                }
                
                if (charges[i].radius > distanceToCharge)
                {
                    charges[i].selected = true;
                    createFieldLines()
                    
                    charges[i].slider.style("visibility", "visible");
                    selectedCharge = charges[i]
                }
                else
                {
                    charges[i].slider.style("visibility", "hidden");
                    charges[i].selected = false;
                }
                
            }

            let mouseOverCharge = charges.some(charge => {
                let distanceToCharge = mousePosition.copy().dist(charge.pos)
                if (distanceToCharge < charge.diameter * 1.5)
                {
                    return true;
                }
            })

            if (currentScreen == 3 && buildMode && !chargeSelected && !mouseOverCharge)
            {
                let pos = new p5.Vector(mouseX, mouseY).div(scale);
                charges.push(new PointCharge({pos: pos}))
            }
        }

        if (!buildMode)
        {
            dataToPrint += `new p5.Vector(` + mouseX + `, ` + mouseY + `),
    `;
        }
    }

    if (currentScreen != 3)
    {
        let color = "rgba(237, 32, 36, 0.12)" 
        let size = new p5.Vector(testChargeDiameter, testChargeDiameter)

        animations[0].shapes.push(new Shape({
            shape: "ellipse",
            pos: mousePosition.copy().mult(2),
            size: size,
            fillColor: color,
            frameCount: random(0, 2000 * 0.12),
            countFrames: true
        }))
    }
    

    

    

    // console.log(`new p5.Vector(` + mouseX + `, ` + mouseY + `)`);
    // console.log(dataToPrint);

    // let working = isPointInRectangle(mousePosition, {
    //     pos: new p5.Vector(1920 - 550, 830),
    //     size: new p5.Vector(350, 150)
    // }) 

    // console.log(`new p5.Vector(` + mouseX + `, ` + mouseY + `)`);

}


function mouseReleased()
{
    
    charges.forEach(charge => { 
        // if (charge.selected && charge.dragging)
        // {
        //     charge.selected = false
        // }
        charge.dragging = false;
     })
     displayTrashIcon()
}

function mouseMoved()
{
    let buttonHover

    cursor('default')
    if (popUpVisible)
    {
        popUps[currentPopUp].buttons.forEach(button => {
            button.hover = isPointInRectangle(mousePosition, button)
            if (button.hover)
            {
                cursor('pointer')
                buttonHover = true
            }
        });
    }
    else 
    {
        screens[currentScreen].buttons.forEach(button => {
            button.hover = isPointInRectangle(mousePosition, button)
            if (button.hover)
            {
                cursor('pointer')
                buttonHover = true
            }
            
        });
    }

    if (!buttonHover)
    {
        buttonTextOffset = 0
    }
}

function mouseDragged()
{
    displayTrashIcon()

    let noChargeIsBeingDragged = !charges.some(charge => charge.dragging) // this will be true if no charge is currently being dragged.
    if (noChargeIsBeingDragged && buildMode) // if no charge is being dragged, check if the mouse is over a charge and is dragging
    {
        charges.forEach(charge => {
            let distanceToCharge = charge.pos.dist(mousePosition)

            if (charge.radius > distanceToCharge) charge.dragging = true;  // if the mouse is hovering over a charge while it's being dragged, set it's dragging property to true
            else charge.dragging = false;
        })
    }

    let chargeToMove = charges.find(charge => charge.dragging) // this searches the charges array and finds the first charge with a true dragging property and sets it equal to the variable

    if (chargeToMove != undefined && buildMode)
    {
        chargeToMove.pos = mousePosition.copy();
        chargeToMove.selected = true
        // console.log("moce");
    }

    // charges.forEach(charge => {
    //     if (charge.selected)
    //     {
    //         // let notDraggingSlider = true;
    //         // let rectPosition = charge.pos.copy();
    //         // let rectSize = new p5.Vector(0, 0);

    //         // if (isPointInRectangle(mousePosition, {pos: rectPosition, size: rectSize}) )
    //         // {
    //         //     notDraggingSlider = false
    //         // }
    //         let distanceToCharge = charge.pos.dist(mousePosition)
            
    //         if (chargeRadius > distanceToCharge)
    //         {
    //             charge.pos = mousePosition.copy()
    //             charge.dragging = true;
    //         }
    //         else
    //         {
    //             charge.dragging = false;
    //         }
    //     }
    // })
}

function mouseWheel(event) 
{
    if (screens[currentScreen].name == "Level Select")
    {
        
        if (scrollOffset <= 0)
        {
            scrollOffset -= event.delta
            screens[1].buttons.forEach(button => { button.pos.x -= event.delta })
            screens[1].images.forEach(image => { image.pos.x -= event.delta })
            screens[1].textBoxes.forEach(textBox => { textBox.pos.x -= event.delta })
            screens[1].shapes.forEach(shape => { shape.pos.x -= event.delta })
        } 

        if (scrollOffset > 0)
        {
            scrollOffset = 0
            screens[1].buttons.forEach(button => { button.pos.x = button.startingPos.x })
            screens[1].images.forEach(image => { image.pos.x = image.startingPos.x })
            screens[1].textBoxes.forEach(textBox => { textBox.pos.x = textBox.startingPos.x })
            screens[1].shapes.forEach(shape => { shape.pos.x = shape.startingPos.x })
        }

        let rowHeight = -1 * (160 * (levels.length / 2) + 10080)
        if (scrollOffset < rowHeight)
        {
            scrollOffset = rowHeight

            screens[1].buttons.forEach(button => { button.pos.x = button.startingPos.x + rowHeight })
            screens[1].images.forEach(image => { image.pos.x = image.startingPos.x + rowHeight })
            screens[1].textBoxes.forEach(textBox => { textBox.pos.x = textBox.startingPos.x + rowHeight })
            screens[1].shapes.forEach(shape => { shape.pos.x = shape.startingPos.x + rowHeight })
        }

    }

    if (screens[currentScreen].name == "Leaderboard")
    {
        
        if (scrollOffset <= 0)
        {
            scrollOffset -= event.delta
            screens[7].buttons.forEach(button => { button.pos.y -= event.delta })
            screens[7].images.forEach(image => { image.pos.y -= event.delta })
            screens[7].textBoxes.forEach(textBox => { textBox.pos.y -= event.delta })
            screens[7].shapes.forEach(shape => { shape.pos.y -= event.delta })
        } 

        if (scrollOffset > 0)
        {
            scrollOffset = 0
            screens[7].buttons.forEach(button => { button.pos.y = button.startingPos.y })
            screens[7].images.forEach(image => { image.pos.y = image.startingPos.y })
            screens[7].textBoxes.forEach(textBox => { textBox.pos.y = textBox.startingPos.y })
            screens[7].shapes.forEach(shape => { shape.pos.y = shape.startingPos.y })
        }

        let rowHeight = -1 * (160 * (levels.length / 2) + 10080)
        if (scrollOffset < rowHeight)
        {
            scrollOffset = rowHeight

            screens[7].buttons.forEach(button => { button.pos.y = button.startingPos.y + rowHeight })
            screens[7].images.forEach(image => { image.pos.y = image.startingPos.y + rowHeight })
            screens[7].textBoxes.forEach(textBox => { textBox.pos.y = textBox.startingPos.y + rowHeight })
            screens[7].shapes.forEach(shape => { shape.pos.y = shape.startingPos.y + rowHeight })
        }

    }

    trueScrollOffset -= event.delta
}