function saveData()
{
    let gameProgress = []

    levels.forEach(level => {
        gameProgress.push({
            highScore: null,
            fastestTime: null,
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

function updateLevelData(level, score, timeToComplete, coinsCollected) 
{
    
    let userData = JSON.parse(localStorage.getItem(GAME_DATA_KEY));

    if (userData[level].highScore == null) 
    {
        userData[level].highScore = 0;
        userData[level].timeToComplete = null;
        userData[level].coins = [0, 0, 0]
    }
    else if(userData[level].highScore < score)
    {
        userData[level].highScore = score;
        userData[level].timeToComplete = timeToComplete;
        userData[level].coins = coinsCollected
    }

    // Save the updated user data to LocalStorage
    localStorage.setItem(GAME_DATA_KEY, JSON.stringify(userData));
}