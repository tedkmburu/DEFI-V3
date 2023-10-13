function createHomeScreen()
{
    let screenName = "Home"

    let buttons = []
    let images = []
    let textBoxes = []
    let shapes = []

    let size = new p5.Vector(innerWidth / 4, 50)

    buttons = [
        new Button({
            text: "Home",
            pos: new p5.Vector(0, 340), 
            fontSize: 12,
            size: size,
            fontColor: 255,
            onClick: function(){ navigateTo("Level Select"); },
        }),
        new Button({
            text: "Leaderboard",
            pos: new p5.Vector(211, 340), 
            fontSize: 12,
            size: size,
            fontColor: 255,
            onClick: function(){ navigateTo("Leaderboard"); },
        }),
        new Button({
            text: "Help",
            pos: new p5.Vector(633, 340), 
            fontSize: 12,
            size: size,
            fontColor: 255,
            onClick: function(){ navigateTo("Help"); },
        }),        new Button({
            text: "Settings",
            pos: new p5.Vector(422, 340), 
            fontSize: 12,
            size: size,
            fontColor: 255,
            onClick: function(){ navigateTo("Settings"); },
        }),
        ]

    images = [
        new myImage({
            pos: new p5.Vector(50, 50), 
            size: new p5.Vector(208.6 * 3, 96.2 * 3),
            myImage: homeTrack,
        })]

    return new Screen({
        name: screenName,
        backgroundImage: spaceImage,
        buttons: buttons,
        images: images,
        backgroundAnimation: true,
    })
}