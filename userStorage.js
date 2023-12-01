"use strict";

function saveData()
{
    let gameProgress = []

    levels.forEach(level => {
        gameProgress.push({
            highScore: 0,
            fastestTime: 0,
            coins: [0, 0, 0],
            charges: []
        })
    })
    
    // load whatever saved data into this variable
    userScoresData = JSON.parse(localStorage.getItem(GAME_DATA_KEY));
    userData = JSON.parse(localStorage.getItem(USER_DATA_KEY));
    
    if (!userScoresData || localStorage[GAME_DATA_KEY] == undefined ) // if there is no saved data, save the default data in gameProgress
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

function reloadSavedData()
{
    userData = JSON.parse(localStorage.getItem(USER_DATA_KEY));
    userScoresData = JSON.parse(localStorage.getItem(GAME_DATA_KEY));
}


function updateLevelData(level, timeToComplete, coinsCollected) 
{
    let score = calculateScore(timeToComplete, coinsCollected)
    let userScoresData = JSON.parse(localStorage.getItem(GAME_DATA_KEY));

    if(userScoresData[level].highScore < score)
    {
        userScoresData[level].highScore = score;
        userScoresData[level].timeToComplete = timeToComplete;
        userScoresData[level].coins = coinsCollected
    }

    // Save the updated user data to LocalStorage
    localStorage.setItem(GAME_DATA_KEY, JSON.stringify(userScoresData));
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));

    levelCompleteData = {coinsCollected: coinsCollected, timeToComplete: timeToComplete}
}

function reloadUserData()
{
    userNameInputBox.placeholder = userData.username
    classCodeInputBox.placeholder = userData.classCode
}


function changeClassCode()
{
    userData.classCode = classCodeInputBox.value;
    classCodeInputBox.placeholder = userData.classCode
    classCodeInputBox.value = ""
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    reloadUserData()
}

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