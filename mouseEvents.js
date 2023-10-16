function mouseClicked()
{
    console.log("clicked");
    let buttonWasClicked = false; 

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
                print(selectedCharge)
            }
            
            if (charges[i].radius > distanceToCharge)
            {
                charges[i].selected = true;
                
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

        console.log(mouseOverCharge);

        if (currentScreen == 3 && buildMode && !chargeSelected && !mouseOverCharge)
        {
            pos = new p5.Vector(mouseX, mouseY).div(scale);
            charges.push(new PointCharge({pos: pos}))
        }
    }

    if (!buildMode)
    {
        dataToPrint += `new p5.Vector(` + mouseX + `, ` + mouseY + `),
`;
    }

    // console.log(`new p5.Vector(` + mouseX + `, ` + mouseY + `)`);
    console.log(dataToPrint);

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
}


function mouseDragged()
{
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
    if (currentScreen == 1)
    {
        
        if (scrollOffset <= 0)
        {
            scrollOffset -= event.delta
            screens[1].buttons.forEach(button => { button.pos.y -= event.delta })
            screens[1].images.forEach(image => { image.pos.y -= event.delta })
            screens[1].textBoxes.forEach(textBox => { textBox.pos.y -= event.delta })
            screens[1].shapes.forEach(shape => { shape.pos.y -= event.delta })
        } 

        if (scrollOffset > 0)
        {
            scrollOffset = 0
            screens[1].buttons.forEach(button => { button.pos.y = button.startingPos.y })
            screens[1].images.forEach(image => { image.pos.y = image.startingPos.y })
            screens[1].textBoxes.forEach(textBox => { textBox.pos.y = textBox.startingPos.y })
            screens[1].shapes.forEach(shape => { shape.pos.y = shape.startingPos.y })
        }

        let rowHeight = -1 * (160 * (levels.length / 2) + 2080)
        if (scrollOffset < rowHeight)
        {
            scrollOffset = rowHeight

            screens[1].buttons.forEach(button => { button.pos.y = button.startingPos.y + rowHeight })
            screens[1].images.forEach(image => { image.pos.y = image.startingPos.y + rowHeight })
            screens[1].textBoxes.forEach(textBox => { textBox.pos.y = textBox.startingPos.y + rowHeight })
            screens[1].shapes.forEach(shape => { shape.pos.y = shape.startingPos.y + rowHeight })
        }

    }

    trueScrollOffset -= event.delta
}