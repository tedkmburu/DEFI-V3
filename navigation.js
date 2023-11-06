"use strict";

function navigateTo(nextScreen)
{
    let nextScreenIndex = screens.findIndex(obj => obj.name == nextScreen)
    if (nextScreenIndex == -1) { console.error(nextScreen, " Not Found"); currentScreen = 5 }
    else { currentScreen = nextScreenIndex }

    if (nextScreen == "Home")
    {
        userData.forEach((level, i) => {
            if (level.highScore != 0 && i < levels.length - 2)
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

function goToNextLevel()
{
    if (currentLevel < levels.length - 1)
    {
        currentLevel++;
        navigateTo("Game")
    }
    else
    {
        navigateTo("Home")
    }
    
}

function displayCurrentScreen()
{
    screens[currentScreen].display()
}

function displayCurrentPopUp()
{
    if (popUpVisible)
    {
        popUps[currentPopUp].display()
    }
}

function createScreens()
{
    screens[0] = createHomeScreen()
    screens[1] = createLevelSelect()
    screens[2] = createLoadingScreen()
    screens[3] = createGameScreen()
    // screens[4] = createLevelCompleteScreen()
    screens[5] = createComingSoonScreen()
    screens[6] = createSettingsScreen()

    updatePlayButton()
}

function createPopUps()
{
    popUps[0] = createLevelCompletePopUp()
    popUps[1] = createPausePopUp()
    popUps[2] = createTutorial1PopUp()
    popUps[3] = createTutorial2PopUp()
    popUps[4] = createTutorial3PopUp()
}

// function setScreenName