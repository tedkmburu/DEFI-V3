function navigateTo(nextScreen)
{
    let nextScreenIndex = screens.findIndex(obj => obj.name == nextScreen)
    if (nextScreenIndex == -1) { console.error(nextScreen, " Not Found"); }
    else { currentScreen = nextScreenIndex }
    
    scrollOffset = 0;
    screens[2].shapes[1].size.x = 1
    screens[2].buttons[0].visible = false;

    if (currentScreen == 3) elapsedTime = 0;
}

function navigateBack()
{
    scrollOffset = 0;
}

function displayCurrentScreen()
{
    screens[currentScreen].display()
}

function createScreens()
{
    screens = []

    screens.push(createHomeScreen())
    screens.push(createLevelSelect())
    screens.push(createLoadingScreen())
    screens.push(createGameScreen())
}