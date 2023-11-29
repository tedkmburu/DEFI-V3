"use strict";

function createLoadingScreen()
{
    let screenName = "Loading Screen";

    let buttons = []
    let images = []
    let textBoxes = []
    let shapes = []
    
    

    // load bar
    shapes.push(new Shape({
        pos: new p5.Vector(0, 1090 - 50), 
        size: new p5.Vector(1920, 50), 
        fillColor: "rgba(0, 0, 0, 0.5)",
    }))
    shapes.push(new Shape({
        pos: new p5.Vector(0, 1090 - 50), 
        size: new p5.Vector(0, 50),
        fillColor: "rgba(255, 0, 0, 0.5)",
    }))


    let x = 0;
    let y = 0;

    let sideWidth = 500

    shapes.push(new Shape({
        pos: new p5.Vector(x + 50, y + 100), 
        size: new p5.Vector(1100, 1080 - 200),
        fillColor: "rgba(0, 0, 0, 0.5)",
    }))
    shapes.push(new Shape({
        pos: new p5.Vector(x + 1250, y + 100), 
        size: new p5.Vector(sideWidth, 400),
        fillColor: "rgba(255, 255, 255, 0.75)",
    }))

    images.push(new MyImage({
        pos: new p5.Vector(x + 25, y + 250), 
        size: new p5.Vector(1920, 1080).mult(0.6),
        myImage: levels[currentLevel].buildImage,
    }))
    images.push(new MyImage({
        pos: new p5.Vector(x + 1175, y + 125), 
        size: sideWidth + 150,
        myImage: banner,
    }))

    // missing coins
    for (let i = 0; i < 3; i++) 
    {
        images.push(new MyImage({
            pos: new p5.Vector(x + 1325 + (i * 125), y + 135), 
            size: 100,
            myImage: coinImages.missing,
        }))
    }

    levels[currentLevel].coins.forEach(coin => {
        images.push(new MyImage({
            pos: coin.pos.copy().mult(0.6).add(new p5.Vector(25, 250)), 
            size: testChargeDiameter,
            myImage: coinImages.gold,
        }))
    });

    levels[currentLevel].testCharges.forEach(testCharge => {
        images.push(new MyImage({
            pos: testCharge.pos.copy().mult(0.6).add(new p5.Vector(-50, 230)),
            size: testChargeDiameter * 2,
            myImage: carImages.pos,
            imageMode: CENTER
        }))
    });
    

    // // missing coins
    // for (let i = 0; i < 3; i++) 
    // {
    //     images.push(new MyImage({
    //         pos: new p5.Vector(x + 1325 + (i * 125), y + 135), 
    //         size: 100,
    //         myImage: coinImages.missing,
    //     }))
    // }

    textBoxes.push(new TextBox({
        text: getLevelName(currentLevel),
        pos: new p5.Vector(x + 1250, y + 250),
        size: new p5.Vector(sideWidth, 100),
        fontColor: "black",
        fontSize: 72,
    }))
    textBoxes.push(new TextBox({
        text: "hit the walls",
        pos: new p5.Vector(x + 100, y + 200),
        size: new p5.Vector(1100, 50),
        fontSize: 48,
    }))
    textBoxes.push(new TextBox({
        text: "NEVER",
        pos: new p5.Vector(x - 150, y + 200),
        size: new p5.Vector(1100, 50),
        fontColor: positiveChargeColor,
        fontSize: 48,
    }))



    textBoxes.push(new TextBox({
        text: "finish ",
        pos: new p5.Vector(x + 30, y + 850),
        size: new p5.Vector(1100, 50),
        fontSize: 48,
    }))
    textBoxes.push(new TextBox({
        text: "ASAP",
        pos: new p5.Vector(x + 170, y + 850),
        size: new p5.Vector(1100, 50),
        fontColor: positiveChargeColor,
        fontSize: 48,
    }))



    if (levels[currentLevel].highScore != 0)
    {
        textBoxes.push(new TextBox({
            text: "high score",
            pos: new p5.Vector(x + 1250, y + 350),
            size: new p5.Vector(sideWidth, 50),
            fontColor: "black",
            fontSize: 24,
        }))
        textBoxes.push(new TextBox({
            text: "1234567890",
            pos: new p5.Vector(x + 1250, y + 380),
            size: new p5.Vector(sideWidth, 100),
            fontColor: "black",
            fontSize: 48,
        }))
    }
    else
    {
        textBoxes.push(new TextBox({
            text: "first try",
            pos: new p5.Vector(x + 1250, y + 380),
            size: new p5.Vector(sideWidth, 100),
            fontColor: "black",
            fontSize: 48,
        }))
    }




    buttons.push(new Button({
        text: "back",
        myImage: icons.back,
        pos: new p5.Vector(x + 1250, y + 800), 
        onClick: function(){ navigateTo("Level Select");  }
    }))
    buttons.push(new Button({
        text: "leaderboard", 
        myImage: icons.leaderboard,
        pos: new p5.Vector(x + 1450, y + 800),
        onClick: function(){ navigateTo("Leaderboard"); }
    }))
    buttons.push(new Button({
        text: "play",
        myImage: icons.play,
        fillColor: positiveChargeColor, 
        pos: new p5.Vector(x + 1650, y + 800), 
        visible: false,
        onClick: function(){ navigateTo("Game");  }
    }))

    let myFunctions = () => {
        let loadBarSize = screens[2].shapes[1].size.x
        if (loadBarSize < 1920)
        {
            screens[2].shapes[1].size.x += 20;
            // screens[2].shapes[1].size.x *= 1.1;
        }

        if (loadBarSize >= 1920)
        {
            screens[2].buttons[2].visible = true;
        }

        let testChargeDestination = []

        let testChargeStartPos = screens[currentScreen].images[8].startingPos.copy()
        
        testChargeDestination.push(testChargeStartPos)
        testChargeDestination.push(testChargeStartPos)
        testChargeDestination.push(screens[currentScreen].images[5].pos.copy().add(new p5.Vector(testChargeRadius, testChargeRadius)))
        testChargeDestination.push(screens[currentScreen].images[6].pos.copy().add(new p5.Vector(testChargeRadius, testChargeRadius)))
        testChargeDestination.push(screens[currentScreen].images[7].pos.copy().add(new p5.Vector(testChargeRadius, testChargeRadius)))

        let finishLineSize = levels[currentLevel].finishLine.size.copy().div(2)
        let finishLinPos = levels[currentLevel].finishLine.pos.copy().add(finishLineSize)
        finishLinPos.mult(0.65)
        finishLinPos.y += 250
        testChargeDestination.push(finishLinPos)
        testChargeDestination.push(finishLinPos)


        push()
            noStroke()
            fill(0);

            let pointsToShow = []

            for (let index = 0; index <= 3; index ++)
            {
                let steps = 10;
                for (let i = 0; i <= steps; i++) 
                {
                    let t = i / steps;
                    let x = curvePoint(testChargeDestination[0 + index].x, testChargeDestination[1 + index].x, testChargeDestination[2 + index].x, testChargeDestination[3 + index].x, t);
                    let y = curvePoint(testChargeDestination[0 + index].y, testChargeDestination[1 + index].y, testChargeDestination[2 + index].y, testChargeDestination[3 + index].y, t);
                    // ellipse(x, y, 20, 20);
                    pointsToShow.push({pos: new p5.Vector(x, y), visited: false})
                }
            }



        pop()


        for(let index = 5; index <= 7; index ++)
        {
            let circle1 = {pos: screens[currentScreen].images[8].pos.copy(), radius: testChargeDiameter}
            let circle2 = {pos: screens[currentScreen].images[index].pos.copy(), radius: testChargeDiameter}
    
            if (circleOverlapsCirlce(circle1, circle2))
            {
                
                
                if (screens[currentScreen].images[index].visible && userData.soundEffects)
                {
                    sounds.coins.play()
                    let timeToPlay = 0
                    
                    coinsCollected++;
                    if (index == 5) timeToPlay = 0.5
                    if (index == 6) timeToPlay = 1
                    if (index == 7) timeToPlay = 1.5
                    
                    sounds.coins.jump(timeToPlay, 0.5)
                }
                

                screens[currentScreen].images[index].visible = false


            }
        }


        


        let vel;

        pointsToShow.forEach((point, i) => {
            let circle1 = {pos: screens[currentScreen].images[8].pos.copy(), radius: testChargeDiameter}
            let circle2 = {pos: point.pos.copy(), radius: testChargeDiameter}

            if (circleOverlapsCirlce(circle1, circle2))
            {
                pointsToShow[i].visited = true 
                loadScreenTestChargeIndex = i
            }

            if (!point.visited)
            {
                let testChargePos = circle1.pos.copy()
                let currentTargetPos = pointsToShow[loadScreenTestChargeIndex].pos.copy()
                vel = currentTargetPos.sub(testChargePos)
                
                vel.setMag(0.2)

                screens[currentScreen].images[8].pos.add(vel)

                if (i != pointsToShow.length - 1)
                {
                    screens[currentScreen].images[8].angle = screens[currentScreen].images[8].angle
                }
                else
                {
                    screens[currentScreen].images[8].angle = vel.heading()
                }

                return
            }
            

        })

        
    }

    return new Screen({
        name: screenName,
        backgroundImage: spaceImage,
        buttons: buttons,
        images: images,
        textBoxes: textBoxes,
        shapes: shapes,
        functions: myFunctions,
    })
}