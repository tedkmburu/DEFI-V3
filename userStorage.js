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
    userData = JSON.parse(localStorage.getItem(GAME_DATA_KEY));
    
    if (!userData) // if there is no saved data, save the default data in gameProgress
    {
        userData = gameProgress; // Initialize with default values
        localStorage.setItem(GAME_DATA_KEY, JSON.stringify(userData));
    }
}

function reloadSavedData()
{
    userData = JSON.parse(localStorage.getItem(GAME_DATA_KEY));
}


function updateLevelData(level, timeToComplete, coinsCollected) 
{
    let score = calculateScore(timeToComplete, coinsCollected)
    let userData = JSON.parse(localStorage.getItem(GAME_DATA_KEY));

    if(userData[level].highScore < score)
    {
        userData[level].highScore = score;
        userData[level].timeToComplete = timeToComplete;
        userData[level].coins = coinsCollected
    }

    // Save the updated user data to LocalStorage
    localStorage.setItem(GAME_DATA_KEY, JSON.stringify(userData));

    levelCompleteData = {coinsCollected: coinsCollected, timeToComplete: timeToComplete}
}