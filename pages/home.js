function createHomeScreen()
{
    buttons = [
        new Button({
            text: "PLAY",
            pos: new p5.Vector(550, 50), 
            fontSize: 36,
            fontAlign: LEFT,
            size: new p5.Vector(300, 50),
            fontColor: 255,
            onClick: function(){ navigateTo("Level Select"); },
        }),
        new Button({
            text: "LEADERBOARD",
            pos: new p5.Vector(550, 125), 
            fontSize: 36,
            fontAlign: LEFT,
            size: new p5.Vector(300, 50),
            fontColor: 255,
            onClick: function(){ navigateTo("Leaderboard"); },
        }),
        new Button({
            text: "SETTINGS",
            pos: new p5.Vector(550, 200), 
            fontSize: 36,
            fontAlign: LEFT,
            size: new p5.Vector(300, 50),
            fontColor: 255,
            onClick: function(){ navigateTo("Settings"); },
        }),
        new Button({
            text: "HELP",
            pos: new p5.Vector(550, 275), 
            fontSize: 36,
            fontAlign: LEFT,
            size: new p5.Vector(300, 50),
            fontColor: 255,
            onClick: function(){ navigateTo("Help"); },
        }),]

    images = [
        new myImage({
            pos: new p5.Vector(50, 50), 
            size: new p5.Vector(208.6 * 3, 96.2 * 3),
            myImage: homeTrack,
        })]

    return new Screen({
        name: "Home",
        backgroundImage: spaceImage,
        buttons: buttons,
        images: images,
    })
}