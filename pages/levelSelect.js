function createLevelSelect()
{
    let screenName = "Level Select"

    let buttons = [] 
    let images = []
    let textBoxes = []
    let shapes = []
    
    let buttonSize = new p5.Vector(150, 150);

    let x = 200;
    let y = 225;
    let shapeWidth = 700

    levels.forEach((level, i) => {

        shapes.push(new Shape({
            pos: new p5.Vector(x, y), 
            size: new p5.Vector(shapeWidth, 800),
            fillColor: purpleColor[0],
        }))
        shapes.push(new Shape({
            pos: new p5.Vector(x + 25, y + 25), 
            size: new p5.Vector(shapeWidth - 50, 600 - 25),
            fillColor: "rgba(0, 0, 0, 0.75)",
        }))
    
    
    
        
    
    
    
        if (level.highScore != 0)
        {
            buttons.push(new Button({
                text: "leaderboard",
                myImage: icons.leaderboard,
                pos: new p5.Vector(x + 200, y + 625), 
                onClick: function(){ currentLevel = i; navigateTo("Leaderboard");  }
            }))
            buttons.push(new Button({
                text: "retry", 
                myImage: icons.redo,
                pos: new p5.Vector(x + 375, y + 625),
                fillColor: positiveChargeColor, 
                onClick: function(){ currentLevel = i; navigateTo("Loading Screen"); }
            }))

            let imagePos

            images.push(new MyImage({
                pos: new p5.Vector(x + 50, y + 325), 
                size: new p5.Vector(shapeWidth - 100, 250),
                myImage: levels[i].buildImage,
            }))
            // console.log("max: new p5.Vector(" + (shapeWidth - 100) + ", 100) current:" + images[0].size);
            images.push(new MyImage({
                pos: new p5.Vector(x - 100, y + 50), 
                size: shapeWidth + 200,
                myImage: banner,
            }))

            // display coins
            // console.log("level.collectedCoins: ", level.collectedCoins);
            level.collectedCoins.forEach((coin, coinIndex) => {
                // console.log(coin);

                let coinImage = coinImages.gold
                if (coin == silverValue) coinImage = coinImages.silver
                if (coin == bronzeValue) coinImage = coinImages.bronze
                if (coin == 0) coinImage = coinImages.missing

                images.push(
                    new MyImage({
                        pos: new p5.Vector(x + (150 * coinIndex) + 130,  y + 75), 
                        size: 125,
                        myImage: coinImage,
                    })
                )
            })

            // images.push(new MyImage({
            //     pos: new p5.Vector(x + 125, y + 75), 
            //     size: 125,
            //     myImage: coinImages.missing,
            // }))
            // images.push(new MyImage({
            //     pos: new p5.Vector(x + 275, y + 75), 
            //     size: 125,
            //     myImage: coinImages.missing,
            // }))
            // images.push(new MyImage({
            //     pos: new p5.Vector(x + 425, y + 75), 
            //     size: 125,
            //     myImage: coinImages.missing,
            // }))


        
            textBoxes.push(new TextBox({
                text: getLevelName(i),
                pos: new p5.Vector(x, y + 230),
                size: new p5.Vector(400, 80),
                fontAlign: RIGHT,
                fontSize: 75,
            }))
            textBoxes.push(new TextBox({
                text: "high score",
                pos: new p5.Vector((shapeWidth / 2) + x + 100, y + 225),
                size: new p5.Vector(275, 30),
                fontColor: 100,
                fontAlign: LEFT,
                fontSize: 24,
            }))
            // console.log("level.highscore: ", level);
            textBoxes.push(new TextBox({
                text: Math.round(level.highScore),
                pos: new p5.Vector((shapeWidth / 2) + x + 100, y + 255),
                size: new p5.Vector(275, 50),
                fontAlign: LEFT,
                fontSize: 48,
            }))
        }











        else if (!level.locked)
        {
            buttons.push(new Button({
                text: "play", 
                myImage: icons.play,
                pos: new p5.Vector(x + 275, y + 625),
                fillColor: positiveChargeColor, 
                onClick: function(){ currentLevel = i; navigateTo("Loading Screen"); }
            }))



            images.push(new MyImage({
                pos: new p5.Vector(x + 50, y + 325), 
                size: new p5.Vector(shapeWidth - 100, 250),
                myImage: levels[i].buildImage,
            }))
            images.push(new MyImage({
                pos: new p5.Vector(x - 100, y + 50), 
                size: shapeWidth + 200,
                myImage: banner,
            }))



            // display coins
            level.collectedCoins.forEach((coin, coinIndex) => {
                // console.log(coin);

                let coinImage = coinImages.gold
                if (coin == silverValue) coinImage = coinImages.silver
                if (coin == bronzeValue) coinImage = coinImages.bronze
                if (coin == 0) coinImage = coinImages.missing

                images.push(
                    new MyImage({
                        pos: new p5.Vector(x + (150 * coinIndex) + 130,  y + 75), 
                        size: 125,
                        myImage: coinImage,
                    })
                )
            })




            // let coins = userData[i].coins;
            // coins.forEach((coin, coinIndex) => {
            //     if (coin == 0) 
            //     {
                    // images.push(
                    //     new MyImage({
                    //         pos: new p5.Vector(x + (110 * coinIndex),  y + 75), 
                    //         size: 125,
                    //         myImage: coinImages.missing,
                    //     })
                    // )
            //     }
            //     if (coin == 1) 
            //     {
            //         images.push(
            //             new MyImage({
            //                 pos: new p5.Vector(x + (150 * coinIndex),  y + 75), 
            //                 size: 125,
            //                 myImage: coinImages.bronze,
            //             })
            //         )
            //     }
            //     if (coin == 2) 
            //     {
            //         images.push(
            //             new MyImage({
            //                 pos: new p5.Vector(x + (150 * coinIndex),  y + 75), 
            //                 size: 125,
            //                 myImage: coinImages.silver,
            //             })
            //         )
            //     }
            //     if (coin == 3) 
            //     {
            //         images.push(
            //             new MyImage({
            //                 pos: new p5.Vector(x + (150 * coinIndex),  y + 75), 
            //                 size: 125,
            //                 myImage: coinImages.gold,
            //             })
            //         )
            //     }
            // });





            // images.push(new MyImage({
            //     pos: new p5.Vector(x + 125, y + 75), 
            //     size: 125,
            //     myImage: coinImages.missing,
            // }))
            // images.push(new MyImage({
            //     pos: new p5.Vector(x + 275, y + 75), 
            //     size: 125,
            //     myImage: coinImages.missing,
            // }))
            // images.push(new MyImage({
            //     pos: new p5.Vector(x + 425, y + 75), 
            //     size: 125,
            //     myImage: coinImages.missing,
            // }))


        
            textBoxes.push(new TextBox({
                text: getLevelName(i),
                pos: new p5.Vector(x, y + 230),
                size: new p5.Vector(shapeWidth, 100),
                fontAlign: CENTER,
                fontSize: 72,
            }))
        }














        else
        {
            images.push(new MyImage({
                pos: new p5.Vector(x + 200, y + 100), 
                size: 300,
                myImage: icons.lock,
            }))
            textBoxes.push(new TextBox({
                text: "Locked",
                pos: new p5.Vector(x, y + 450),
                size: new p5.Vector(shapeWidth, 100),
                fontSize: 90,
            }))
        }
        
    
    
    
        

        x += (shapeWidth) + 250
    })

    








    buttons.push(new Button({
        text: "Back",
        myImage: icons.back,
        pos: new p5.Vector(25, 25), 
        onClick: function(){ navigateTo("Home"); }
    }))
    shapes.push(new Shape({
        pos: new p5.Vector(0, 0), 
        size: new p5.Vector(innerWidth * 3, 200),
        fillColor: "rgba(0, 0, 0, 0.5)",
    }))

    return new Screen({
        name: screenName,
        backgroundImage: spaceImage,
        buttons: buttons,
        images: images,
        textBoxes: textBoxes,
        shapes: shapes,
        backgroundAnimation: true,
    })
}