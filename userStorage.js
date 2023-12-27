"use strict";

function saveData()
{
    let gameProgress = []

    // make defualt values
    levels.forEach(level => {
        gameProgress.push({
            highScore: 0,
            fastestTime: 0,
            coins: [0, 0, 0],
            charges: []
        })
    })
    
    // get whatever data is stored on the device and assign it to global variable 
    reloadSavedData()
    
    // if there is no saved data, save the default data in gameProgress
    if (!userScoresData || localStorage[GAME_DATA_KEY] == undefined ) 
    {
        localStorage.clear()
        userData = {username: "enter username", classCode: "enter class code", volume: 1, soundEffects: true, music: true, sendScores: true}
        userScoresData = gameProgress; // Initialize with default values
        localStorage.setItem(GAME_DATA_KEY, JSON.stringify(userScoresData));
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
        
        console.log("v3.1");

        createPopUps()

        openPopUp("ChangeUsername")
        popUpVisible = true;
    }
}

// load data from device to the game
function reloadSavedData()
{
    userData = JSON.parse(localStorage.getItem(USER_DATA_KEY));
    userScoresData = JSON.parse(localStorage.getItem(GAME_DATA_KEY));
}

// update the user data that is stored on the device
function updateLevelData(level, timeToComplete, coinsCollected) 
{
    let score = calculateScore(timeToComplete, coinsCollected)
    let userScoresData = JSON.parse(localStorage.getItem(GAME_DATA_KEY));

    // if they have a high score, update that score in their storage
    if(userScoresData[level].highScore < score)
    {
        userScoresData[level].highScore = score;
        userScoresData[level].timeToComplete = timeToComplete;
        userScoresData[level].coins = coinsCollected
    }

    // Save the updated user data to LocalStorage
    localStorage.setItem(GAME_DATA_KEY, JSON.stringify(userScoresData));
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));

    // this will be stored on the "Level Complete" Screen
    levelCompleteData = {coinsCollected: coinsCollected, timeToComplete: timeToComplete}
}

// set the input box placeholders to match the saved data
function reloadUserData()
{
    userNameInputBox.placeholder = userData.username
    classCodeInputBox.placeholder = userData.classCode
}

// change the classCode that is stored on the device
function changeClassCode()
{
    userData.classCode = classCodeInputBox.value;
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));

    // change the placeholder and clear the text
    classCodeInputBox.placeholder = userData.classCode
    classCodeInputBox.value = ""
    reloadUserData()
}

// check if names contain profanity
// if not, save them, 
// else prompt the user to change it
function updateUserName()
{
    if (!includesProfanity(userNameInputBox.value))
    {
        userData.username = userNameInputBox.value;
        userNameInputBox.placeholder = userData.username
        userNameInputBox.value = ""
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
        reloadUserData()
        popUpVisible =  false;
    }
    else
    {
        userNameInputBox.style.border = "5px solid red";
        userNameInputBox.placeholder = "enter username"
        userNameInputBox.value = ""
        popUps[5].textBoxes[1].text = "be nice :)";
        popUpVisible =  true;
    }
    
}