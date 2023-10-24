function createLevelCompleteScreen()
{
    let screenName = "Level Complete";

    let buttons = []
    let images = []
    let textBoxes = []
    let shapes = []


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