function navigateTo(nextScreen)
{
    let nextScreenIndex = screens.findIndex(obj => obj.name == nextScreen)
    if (nextScreenIndex == -1) { console.error(nextScreen, " Not Found"); currentScreen = 5 }
    else { currentScreen = nextScreenIndex }

    if (nextScreen == "Home")
    {
        userData.forEach((level, i) => {
            if (level.highScore != null && i < levels.length - 2)
            {
                currentLevel = i + 1
            }
        });
    }
    if (nextScreen == "Game") resetGame()
    
    scrollOffset = 0;
    screens[2].shapes[1].size.x = 1
    screens[2].buttons[0].visible = false;


    if (currentScreen == 3) elapsedTime = 0;

    for (let i = 0; i < charges.length; i++) 
    {
        charges[i].slider.style("visibility", "hidden");
    }
    charges = []
    buildMode = true;

    reloadSavedData()
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
    // screens = []

    screens[0] = createHomeScreen()
    screens[1] = createLevelSelect()
    screens[2] = createLoadingScreen()
    screens[3] = createGameScreen()
    screens[4] = createLevelCompleteScreen()
    screens[5] = createComingSoonScreen()
    screens[6] = createSettingsScreen()
}

// function setScreenName