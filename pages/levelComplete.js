function createLevelCompleteScreen()
{
    let screenName = "Level Complete";

    let buttons = []
    let images = []
    let textBoxes = []
    let shapes = []

    buttons = [
        new Button({
            text: "Leaderboard",
            pos: new p5.Vector(100, 290), 
            fillColor: positiveChargeColor, 
            fontSize: 16,
            size: new p5.Vector(100, 50),
            fontColor: 255,
            onClick: function(){ navigateTo("Leaderboard"); },
        }),
        new Button({
            text: "Replay",
            pos: new p5.Vector(394, 290), 
            fillColor: positiveChargeColor, 
            fontSize: 16,
            size: new p5.Vector(100, 50),
            fontColor: 255,
            onClick: function(){ navigateTo("Game");  },
        }),
        new Button({
            text: "Menu",
            pos: new p5.Vector(544, 290), 
            fillColor: positiveChargeColor, 
            fontSize: 16,
            size: new p5.Vector(100, 50),
            fontColor: 255,
            onClick: function(){ navigateTo("Level Select"); },
        }),
        new Button({
            text: "Next",
            pos: new p5.Vector(694, 290), 
            fillColor: positiveChargeColor, 
            fontSize: 16,
            size: new p5.Vector(100, 50),
            fontColor: 255,
            onClick: function(){ currentLevel++; navigateTo("Game"); },
        }),]

    // images = [
    //     new myImage({
    //         pos: new p5.Vector(50, 50), 
    //         size: new p5.Vector(208.6 * 3, 96.2 * 3),
    //         myImage: homeTrack,
    //     })]

    let numberOfStarsCollected = 1;
    let x = 544;
    let y = 50;

    for (let i = 0; i < numberOfStarsCollected; i++) 
    {
        images.push(new myImage({
            pos: new p5.Vector((50 * i) + x, 50 + y), 
            size: new p5.Vector(50, 50),
            myImage: icons.star,
        }))
    }

    for (let i = numberOfStarsCollected; i < 3; i++) 
    {
        images.push(new myImage({
            pos: new p5.Vector((50 * i) + x, 50 + y), 
            size: new p5.Vector(50, 50),
            myImage: icons.starEmpty,
        }))
    }

    textBoxes = [
        new TextBox({
            text: "Personal Best",
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "white",
            fontSize: 24,
            pos: new p5.Vector(100, 50), 
            size: new p5.Vector(200, 50),
        }),
        new TextBox({
            text: "Highest Score",
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "white",
            fontSize: 16,
            pos: new p5.Vector(100, 100), 
            size: new p5.Vector(200, 25),
        }),
        new TextBox({
            text: round(userData[currentLevel].highScore),
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "white",
            fontSize: 16,
            pos: new p5.Vector(100, 125), 
            size: new p5.Vector(200, 25),
        }),
        new TextBox({
            text: "Fastest Time",
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "white",
            fontSize: 16,
            pos: new p5.Vector(100, 150), 
            size: new p5.Vector(200, 25),
        }),
        new TextBox({
            text: millisecondsToString(round(userData[currentLevel].fastestTime)),
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "white",
            fontSize: 16,
            pos: new p5.Vector(100, 175), 
            size: new p5.Vector(200, 25),
        }),
        new TextBox({
            text: "Excellent",
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "white",
            fontSize: 16,
            pos: new p5.Vector(540, 50), 
            size: new p5.Vector(200, 25),
        }),
        new TextBox({
            text: "Time:",
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "white",
            fontSize: 16,
            pos: new p5.Vector(640, 175), 
            size: new p5.Vector(100, 25),
        }),
        new TextBox({
            text: "Score:",
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "white",
            fontSize: 16,
            pos: new p5.Vector(540, 175), 
            size: new p5.Vector(100, 25),
        }),
        new TextBox({
            text: millisecondsToString(round(levelCompleteData.timeToComplete)),
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "white",
            fontSize: 16,
            pos: new p5.Vector(640, 200), 
            size: new p5.Vector(100, 25),
        }),
        new TextBox({
            text: "12345",
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "white",
            fontSize: 16,
            pos: new p5.Vector(540, 200), 
            size: new p5.Vector(100, 25),
        }),
        
    ]

    return new Screen({
        name: screenName,
        backgroundImage: spaceImage,
        buttons: buttons,
        textBoxes: textBoxes,
        images: images,
    })
}