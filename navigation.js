"use strict";

function navigateTo(nextScreen)
{
    let nextScreenIndex = screens.findIndex(obj => obj.name == nextScreen)
    if (nextScreenIndex == -1) { console.error(nextScreen, " Not Found"); currentScreen = 5 }
    else { currentScreen = nextScreenIndex }

    if (nextScreen == "Home")
    {
        userScoresData.forEach((level, i) => {
            if (level.highScore != 0 && i < levels.length - 2)
            {
                currentLevel = i + 1
            }
        });
    }
    if (nextScreen == "Game") 
    {
        resetGame()
        if (userData.music) sounds.theme.pause()
    }
    else
    {
        if (sounds.theme.isPaused() && userData.music)
        {
            sounds.theme.loop()
        }
    }

    screenOpacity = 1

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
    classCodeInputBox.style.display = "none"
    classCodeInputBox.style.height = (commonButtonSize - 12) + "px"
    classCodeInputBox.style.top = (800 * scale.y) + "px"
    classCodeInputBox.style.left = (1000 * scale.y) + "px"
    classCodeInputBox.style.width = (500 * scale.y) + "px"
    

    screens[0] = createHomeScreen()
    screens[1] = createLevelSelect()
    screens[2] = createLoadingScreen()
    screens[3] = createGameScreen()
    screens[4] = createSettingsScreen()
    // screens[4] = createLevelCompleteScreen()
    screens[5] = createComingSoonScreen()
    screens[6] = createCreditsScreen()
    screens[7] = createLeaderboardScreen()
    

    updatePlayButton()
    displayTrashIcon()

    if (screens[currentScreen].name == "Class")
    {
        classCodeInputBox.style.display = "initial"
    }
    
}

function createPopUps()
{
    userNameInputBox.style.display = "none"
    userNameInputBox.style.height  = (commonButtonSize - 12) + "px"
    userNameInputBox.style.top  = (550 * scale.y) + "px"
    userNameInputBox.style.left  = (450 * scale.y) + "px"
    userNameInputBox.style.width  = (386 * scale.y) + "px"

    popUps[0] = createLevelCompletePopUp()
    popUps[1] = createPausePopUp()
    popUps[2] = createTutorial1PopUp()
    popUps[3] = createTutorial2PopUp()
    popUps[4] = createTutorial3PopUp()

    popUps[5] = createChangeUsernamePopUp()

    if (popUps[currentPopUp].name == "ChangeUsername" && popUpVisible)
    {
        userNameInputBox.style.display = "initial"
    }

    // console.log(userNameInputBox.style.display);
}

// function setScreenName