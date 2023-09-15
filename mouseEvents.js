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
        charges.forEach(charge => {charge.dragging = false; charge.selected = false;} )
        
        let chargeSelected = false; 

        for (let i = 0; i < charges.length; i++) 
        {
            let distanceToCharge = charges[i].pos.dist(mousePosition)
            
            if (chargeRadius > distanceToCharge)
            {
                charges[i].selected = true;
                chargeSelected = true; 
                charges[i].slider.style("visibility", "visible");
            }
            else
            {
                charges[i].slider.style("visibility", "hidden");
                charges[i].selected = false;
            }
            
        }

        if (currentScreen == 3 && buildMode && !chargeSelected)
        {
            charges.push(new PointCharge({}))
        }
    }
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
}


function mouseDragged()
{
    let noChargeIsBeingDragged = !charges.some(charge => charge.dragging) // this will be true if no charge is currently being dragged.
    if (noChargeIsBeingDragged) // if no charge is being dragged, check if the mouse is over a charge and is dragging
    {
        charges.forEach(charge => {
            let distanceToCharge = charge.pos.dist(mousePosition)

            if (chargeRadius > distanceToCharge) charge.dragging = true;  // if the mouse is hovering over a charge while it's being dragged, set it's dragging property to true
            else charge.dragging = false;
        })
    }

    let chargeToMove = charges.find(charge => charge.dragging) // this searches the charges array and finds the first charge with a true dragging property and sets it equal to the variable

    if (chargeToMove != undefined)
    {
        chargeToMove.pos = mousePosition.copy();
        chargeToMove.selected = true
        console.log("moce");
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
    if (currentScreen == 1)
    {
        scrollOffset -= event.delta
        screens[1].buttons[0].pos.y += event.delta
        screens[1].buttons.forEach(button => { button.pos.y -= event.delta })
        screens[1].images.forEach(image => { image.pos.y -= event.delta })
        screens[1].textBoxes.forEach(textBox => { textBox.pos.y -= event.delta })
        screens[1].shapes.forEach(shape => { shape.pos.y -= event.delta })
    }
}