function createHomeScreen()
{
    let screenName = "Home"

    let buttons = []
    let images = []
    let textBoxes = []
    let shapes = []

    let size = new p5.Vector(844 / 4, 50)

    buttons = [
        new Button({
            text: "Home",
            pos: new p5.Vector(0, 340), 
            fontSize: 12,
            size: size,
            fontColor: 255,
            fillColor: "rgba(0, 0, 0, 0)",
            onClick: function(){ navigateTo("Home"); },
        }),
        new Button({
            text: "Leaderboard",
            pos: new p5.Vector(211, 340), 
            fontSize: 12,
            size: size,
            fontColor: 255,
            fillColor: "rgba(0, 0, 0, 0.5)",
            onClick: function(){ navigateTo("Leaderboard"); },
        }),
        new Button({
            text: "Help",
            pos: new p5.Vector(633, 340), 
            fontSize: 12,
            size: size,
            fontColor: 255,
            fillColor: "rgba(0, 0, 0, 0.5)",
            onClick: function(){ navigateTo("Help"); },
        }),        new Button({
            text: "Settings",
            pos: new p5.Vector(422, 340), 
            fontSize: 12,
            size: size,
            fontColor: 255,
            fillColor: "rgba(0, 0, 0, 0.5)",
            onClick: function(){ navigateTo("Settings"); },
        }),
        new Button({
            text: "More Levels",
            pos: new p5.Vector(433, 250), 
            fontSize: 12,
            size: new p5.Vector(150, 50),
            fontColor: 255,
            fillColor: "purple",
            onClick: function(){ navigateTo("Level Select"); },
        }),
        new Button({
            text: "Play",
            pos: new p5.Vector(622, 250), 
            fontSize: 12,
            size: new p5.Vector(150, 50),
            fontColor: 255,
            fillColor: "red",
            onClick: function(){ navigateTo("Loading Screen"); },
        }),
        ]

    images = [
        new myImage({
            pos: new p5.Vector(0, 100), 
            size: 844 * 0.6,
            myImage: homeTrack,
        }),
        new myImage({
            pos: new p5.Vector(450, 150), 
            size: 300,
            myImage: levels[currentLevel].playImage,
        })
    ]

    // display stars
    let numberOfStars = 0
    numberOfStars+=userData[currentLevel].mostStars;
    if (userData[currentLevel].fastestTime < firstStarTime) numberOfStars++
    if (userData[currentLevel].fastestTime < secondStarTtime) numberOfStars++

    print(numberOfStars)

    let x = 450;
    let y = 25;

    for (let i = 0; i < 5; i++) 
    {
        if (i < numberOfStars)
        {
            images.push(
                new myImage({
                    pos: new p5.Vector(x + (60 * i), y), 
                    size: 50,
                    myImage: icons.star,
                })
            )
        }  
        else
        {
            images.push(
                new myImage({
                    pos: new p5.Vector(x + (60 * i), y), 
                    size: 50,
                    myImage: icons.starEmpty,
                })
            )
        }  
    }

    shapes.push(new Shape({
        pos: new p5.Vector(400, 50), 
        size: new p5.Vector(400, 270),
        fillColor: "rgba(255, 255, 255, 0.75)",
    }))

    textBoxes.push(
        new TextBox({
            text: "Level " + (currentLevel + 1),
            fillColor: "rgba(0, 0, 0, 0)",
            fontSize: 36,
            pos: new p5.Vector(500, 25 + 50), 
            size: new p5.Vector(200, 40),
        })
    )

    textBoxes.push(
        new TextBox({
            text: "High Score: " + Math.round(userData[currentLevel].highScore),
            fillColor: "rgba(0, 0, 0, 0)",
            fontSize: 18,
            pos: new p5.Vector(400, 25 + 90), 
            size: new p5.Vector(400, 40),
        })
    )

    return new Screen({
        name: screenName,
        backgroundImage: spaceImage,
        buttons: buttons,
        shapes: shapes,
        textBoxes: textBoxes,
        images: images,
        backgroundAnimation: true,
    })
}