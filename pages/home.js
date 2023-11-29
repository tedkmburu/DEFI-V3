"use strict";

function createHomeScreen()
{
    let screenName = "Home"

    let buttons = []
    let images = []
    let textBoxes = []
    let shapes = []

    let size = new p5.Vector(150, 150)
    let xPos = 50;
    let yPos = gameHeight - size.y - 100

    buttons = [
        new Button({
            text: "class",
            pos: new p5.Vector((3 * commonButtonSpace) + xPos, yPos), 
            fillColor: purpleColor[0],
            myImage: icons.usersRectangle, 
            onClick: function(){ navigateTo("Class"); },
        }),
        new Button({
            text: "leaderboard",
            pos: new p5.Vector((0 * commonButtonSpace) + xPos, yPos), 
            fillColor: purpleColor[1],
            myImage: icons.leaderboard, 
            onClick: function(){ navigateTo("Leaderboard"); },
        }),
        new Button({
            text: "help",
            pos: new p5.Vector((1 * commonButtonSpace) + xPos,  yPos), 
            fillColor: purpleColor[2],
            myImage: icons.help, 
            onClick: function(){ navigateTo("Help"); },
        }),        
        new Button({
            text: "teacher",
            pos: new p5.Vector((2 * commonButtonSpace) + xPos,  yPos), 
            fillColor: purpleColor[3],
            myImage: icons.classroom, 
            onClick: function(){ navigateTo("Settings"); },
        }),




        new Button({
            text: "more levels",
            shape: "rect",
            pos: new p5.Vector(1920 - 950, 830), 
            fontSize: 48,
            size: new p5.Vector(350, 150),
            fillColor: purpleColor[4],
            onClick: function(){ navigateTo("Level Select"); },
        }),
        new Button({
            text: "play",
            shape: "rect",
            pos: new p5.Vector(1920 - 550, 830), 
            fontSize: 48,
            size: new p5.Vector(350, 150),
            fillColor: positiveChargeColor,
            onClick: function(){ navigateTo("Loading Screen");},
        }),




        new Button({
            shape: "toggle",
            pos: new p5.Vector(1600, 105),
            size: new p5.Vector(100, 50),
            toggleState: userData.soundEffects,
            onClick: function()
            { 
                userData.soundEffects = !userData.soundEffects  
                localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
            }
        }),
        new Button({
            shape: "toggle",
            pos: new p5.Vector(1135, 105),
            size: new p5.Vector(100, 50),
            toggleState: userData.music,
            onClick: function()
            { 
                userData.music = !userData.music  
                localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
                if (userData.music) sounds.theme.loop()
                else { sounds.theme.pause() }
                // reloadSavedData()

            }
        }),
        ]

    images = [
        new MyImage({
            pos: new p5.Vector(0, 200), 
            size: 1920 * 0.6,
            myImage: homeTrack,
        }),
        new MyImage({
            pos: new p5.Vector(815, 200), 
            size: 1060,
            myImage: banner,
        }),
        new MyImage({
            pos: new p5.Vector(970, 400), 
            size: new p5.Vector(750, 400),
            myImage: levels[currentLevel].playImage,
        })
    ]



    let x = 1100;
    let y = 120;




    images.push(
        new MyImage({
            pos: new p5.Vector(x - 175, y + (commonButtonSize / 2) + 25), 
            size: commonButtonSize,
            myImage: coinImages.gold,
        })
    )

    images.push(
        new MyImage({
            pos: new p5.Vector(x + 500, y + (commonButtonSize / 2) + 25), 
            size: commonButtonSize,
            myImage: coinImages.gold,
        })
    )
    
    // // display coins
    // let coins = userScoresData[currentLevel].coins;
    // coins.forEach((coin, i) => {
    //     if (coin == 0) 
    //     {
    //         images.push(
    //             new MyImage({
    //                 pos: new p5.Vector(x + ((commonButtonSize + 20) * i), y), 
    //                 size: commonButtonSize,
    //                 myImage: coinImages.missing,
    //             })
    //         )
    //     }
    //     if (coin == 1) 
    //     {
    //         images.push(
    //             new MyImage({
    //                 pos: new p5.Vector(x + ((commonButtonSize + 20) * i), y), 
    //                 size: commonButtonSize,
    //                 myImage: coinImages.bronze,
    //             })
    //         )
    //     }
    //     if (coin == 2) 
    //     {
    //         images.push(
    //             new MyImage({
    //                 pos: new p5.Vector(x + ((commonButtonSize + 20) * i), y), 
    //                 size: commonButtonSize,
    //                 myImage: coinImages.silver,
    //             })
    //         )
    //     }
    //     if (coin == 3) 
    //     {
    //         images.push(
    //             new MyImage({
    //                 pos: new p5.Vector(x + ((commonButtonSize + 20) * i), y), 
    //                 size: commonButtonSize,
    //                 myImage: coinImages.gold,
    //             })
    //         )
    //     }
    // });
    


    shapes.push(new Shape({
        pos: new p5.Vector((gameWidth / 1.9) - 93, 50), 
        size: new p5.Vector(gameWidth / 2.25, 1080 - 100),
        fillColor: "rgba(255, 255, 255, 0.75)",
    }))

    if (gameDevMode)
    {
        shapes.push(
            new Shape({
                pos: new p5.Vector(970, 400), 
                size: new p5.Vector(750, 400),
                fillColor: "rgba(0, 0, 0, 0.25)",
            })
        )
    }

    textBoxes.push(
        new TextBox({
            text: getLevelName(currentLevel),
            fillColor: "rgba(0, 0, 0, 0)",
            fontSize: 100,
            fontColor: "white",
            pos: new p5.Vector(865, 195), 
            size: new p5.Vector(gameWidth / 2, 200),
        }),
        new TextBox({
            text: "music:",
            fillColor: "rgba(0, 0, 0, 0)",
            fontSize: 42,
            fontColor: "black",
            pos: new p5.Vector(1000, 100), 
            size: new p5.Vector(120, 60),
        }),
        new TextBox({
            text: "sound effects:",
            fillColor: "rgba(0, 0, 0, 0)",
            fontSize: 42,
            fontColor: "black",
            pos: new p5.Vector(1315, 100), 
            size: new p5.Vector(280, 60),
        })
    )


    return new Screen({
        name: screenName,
        backgroundImage: spaceImage,
        buttons: buttons,
        shapes: shapes,
        textBoxes: textBoxes,
        images: images,
    })
}