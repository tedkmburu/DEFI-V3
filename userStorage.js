function saveData()
{
    let gameProgress = []

    levels.forEach(level => {
        gameProgress.push({
            highScore: null,
            fastestTime: null,
            mostStars: 0,
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

function updateLevelData(level, score, timeToComplete, starsCollected) 
{
    let userData = JSON.parse(localStorage.getItem(GAME_DATA_KEY));

    if (userData[level].highScore == null) userData[level].highScore = score;
    if (userData[level].fastestTime ==  null) userData[level].fastestTime = timeToComplete;
    if (userData[level].mostStars == 0) userData[level].mostStars = starsCollected;

    if (userData[level].highScore < score) userData[level].highScore = score;
    if (userData[level].fastestTime > timeToComplete) userData[level].fastestTime = timeToComplete;
    if (userData[level].mostStars < starsCollected) userData[level].mostStars = starsCollected;

    // Save the updated user data to LocalStorage
    localStorage.setItem(GAME_DATA_KEY, JSON.stringify(userData));

    levelCompleteData = {level: level, score: score, starsCollected: starsCollected, timeToComplete: elapsedTime}
}