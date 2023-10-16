function createLevelCompleteScreen()
{
    let screenName = "Level Complete";

    let buttons = []
    let images = []
    let textBoxes = []
    let shapes = []

    shapes.push(new Shape({
        pos: new p5.Vector(100, 100), 
        size: new p5.Vector((1920 / 2) - 200, 1080 - 200),
        fillColor: "rgba(0, 0, 0, 0.5)",
    }))

    shapes.push(new Shape({
        pos: new p5.Vector(1920 / 2, 100), 
        size: new p5.Vector((1920 / 2) - 100, 1080 - 400),
        fillColor: "rgba(255, 255, 255, 0.75)",
    }))

    buttons = [
        new Button({
            text: "Leaderboard",
            shape: "ellipse",
            myImage: icons.leaderboard,
            pos: new p5.Vector(1920 - 900, 1080 - 250), 
            fillColor: purpleColor[0], 
            fontSize: 36,
            size: new p5.Vector(150, 150),
            fontColor: 255,
            onClick: function(){ navigateTo("Leaderboard"); },
        }),
        new Button({
            text: "Replay",
            shape: "ellipse",
            myImage: icons.redo,
            pos: new p5.Vector(1920 - 700, 1080 - 250), 
            fillColor: purpleColor[1], 
            fontSize: 36,
            size: new p5.Vector(150, 150),
            fontColor: 255,
            onClick: function(){ navigateTo("Game");  },
        }),
        new Button({
            text: "Levels",
            shape: "ellipse",
            myImage: icons.race,
            pos: new p5.Vector(1920 - 500, 1080 - 250), 
            fillColor: purpleColor[2], 
            fontSize: 36,
            size: new p5.Vector(150, 150),
            fontColor: 255,
            onClick: function(){ navigateTo("Level Select"); },
        }),
        new Button({
            text: "Next",
            shape: "ellipse",
            myImage: icons.next,
            pos: new p5.Vector(1920 - 300, 1080 - 250), 
            fillColor: positiveChargeColor, 
            fontSize: 36,
            size: new p5.Vector(150, 150),
            fontColor: 255,
            onClick: function(){ currentLevel++; navigateTo("Game"); },
        }),]

    // images = [
    //     new myImage({
    //         pos: new p5.Vector(50, 50), 
    //         size: 208.6 * 3,
    //         myImage: homeTrack,
    //     })]

    let numberOfStarsCollected = levelCompleteData.starsCollected;
    if (levelCompleteData.timeToComplete < firstStarTime) numberOfStarsCollected++
    if (levelCompleteData.timeToComplete < secondStarTime) numberOfStarsCollected++    
    

    let x = 10;
    let y = 500;
    let bannerWidth = 950;
    // banners
    images.push(new myImage({
        pos: new p5.Vector(x, y), 
        size: bannerWidth,
        myImage: banner,
    }))
    images.push(new myImage({
        pos: new p5.Vector(x, y + 200),
        size: bannerWidth,
        myImage: banner,
    }))


    
    x = 544;
    y = 50;

    // yellow stars
    for (let i = 0; i < numberOfStarsCollected; i++) 
    {
        images.push(new myImage({
            pos: new p5.Vector((50 * i) + x, 50 + y), 
            size: 50,
            myImage: icons.star,
        }))
    }
    // empty stars
    for (let i = numberOfStarsCollected; i < 5; i++) 
    {
        images.push(new myImage({
            pos: new p5.Vector((50 * i) + x, 50 + y), 
            size: 50,
            myImage: icons.starEmpty,
        }))
    }


    textBoxes = [
        new TextBox({
            text: "Personal Best",
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "white",
            fontSize: 24,
            pos: new p5.Vector(100, 100), 
            size: new p5.Vector(350, 50),
        }),
        new TextBox({
            text: "Highest Score",
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "white",
            fontSize: 16,
            pos: new p5.Vector(100, 150), 
            size: new p5.Vector(350, 25),
        }),
        new TextBox({
            text: round(userData[currentLevel].highScore),
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "white",
            fontSize: 16,
            pos: new p5.Vector(100, 175), 
            size: new p5.Vector(350, 25),
        }),
        new TextBox({
            text: "Fastest Time",
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "white",
            fontSize: 16,
            pos: new p5.Vector(100, 200), 
            size: new p5.Vector(350, 25),
        }),
        new TextBox({
            text: millisecondsToString(userData[currentLevel].fastestTime),
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "white",
            fontSize: 16,
            pos: new p5.Vector(100, 225), 
            size: new p5.Vector(350, 25),
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
            fontSize: 36,
            pos: new p5.Vector(130, 430), 
            size: new p5.Vector(700, 100),
        }),
        new TextBox({
            text: "Score:",
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "white",
            fontSize: 36,
            pos: new p5.Vector(130, 630), 
            size: new p5.Vector(700, 100),
        }),
        new TextBox({
            text: millisecondsToString(levelCompleteData.timeToComplete) + " s",
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "white",
            fontSize: 72,
            pos: new p5.Vector(130, 505), 
            size: new p5.Vector(700, 100),
        }),
        new TextBox({
            text: round(levelCompleteData.score + 12345678),
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "white",
            fontSize: 72,
            pos: new p5.Vector(130, 705), 
            size: new p5.Vector(700, 100),
        }),
        new TextBox({
            text: getRandomStarPhrase(),
            fillColor: "rgba(0, 0, 0, 0)",
            fontColor: "white",
            fontSize: 24,
            pos: new p5.Vector(130, 605), 
            size: new p5.Vector(700, 100),
        }),
    ]

    if (levelCompleteData.timeToComplete < secondStarTime || levelCompleteData.timeToComplete == 1e+34)
    {
        textBoxes.push(new TextBox({
            text: getRandomTimePhrase(),
            fillColor: "rgba(0, 0, 0, 0.5)",
            fontColor: "white",
            fontSize: 24,
            pos: new p5.Vector(100, 555), 
            size: new p5.Vector(200, 200),
            angle: -0.785398,
        }))
    }

    return new Screen({
        name: screenName,
        backgroundImage: spaceImage,
        buttons: buttons,
        textBoxes: textBoxes,
        images: images,
        shapes: shapes,
        backgroundAnimation: true,
    })
}