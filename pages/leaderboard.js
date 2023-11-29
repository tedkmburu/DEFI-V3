"use strict";

function getRandomName() {
    // Array of first names
    const firstNames = [
        'John', 'Emma', 'Ahmed', 'Sofia', 'Yuki', 'Maria', 'Liam', 'Aisha', 'Carlos', 'Mei'
        // Add more names as needed
    ];

    // Array of last names
    const lastNames = [
        'Smith', 'Garcia', 'Kim', 'Patel', 'Ito', 'Silva', 'Jones', 'Lee', 'Wang', 'Rodriguez'
        // Add more names as needed
    ];

    // Randomly select a first name and a last name
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    // Concatenate the first and last names and return the result
    return `${randomFirstName} ${randomLastName}`;
}

function getRandomPhysicsCourse() {
    // Array of diverse physics course names
    const courseNames = [
        'Intro', 'Mech', 'Quant', 'Elec', 'Thermo',
        'Stat', 'Nuke', 'Astro', 'Opti', 'Solid'
        // Add more abbreviated course names as needed
    ];

    // Array of course numbers
    const courseNumbers = Array.from({ length: 10 }, (_, index) => 100 + index);

    // Randomly select a course name, course number, and year
    const randomCourseNumber = courseNumbers[Math.floor(Math.random() * courseNumbers.length)];
    const randomYear = 2020 + Math.floor(Math.random() * 5); // Random year between 2020 and 2024

    // Format the course information and return the result
    return `PHYS ${randomCourseNumber} ${randomYear}`;
}

function createLeaderboardScreen()
{
    let screenName = "Leaderboard"

    let buttons = []
    let images = []
    let textBoxes = []
    let shapes = []

    let size = new p5.Vector(150, 150)
    let xPos = 50;
    let yPos = gameHeight - size.y - 100

    buttons = [
        new Button({
            text: "Back",
            myImage: icons.back,
            pos: new p5.Vector(25, 25), 
            onClick: function(){ navigateTo("Home"); }
        }),
        new Button({
            text: " ",
            myImage: icons.back,
            size: new p5.Vector(75, 75),
            pos: new p5.Vector(850, 215), 
            onClick: function(){ currentLevel--; navigateTo("Leaderboard"); }
        }),
        new Button({
            text: " ",
            myImage: icons.next,
            size: new p5.Vector(75, 75),
            pos: new p5.Vector(1150, 215), 
            onClick: function(){ currentLevel++; navigateTo("Leaderboard"); }
        }),]

    images = [
        new MyImage({
            pos: new p5.Vector(210, 50), 
            size: 1665,
            myImage: bigBanner,
        }),
        // new MyImage({
        //     pos: new p5.Vector(1000, 175), 
        //     size: 100,
        //     myImage: icons.gradCap,
        // }),
        // new MyImage({
        //     pos: new p5.Vector(1550, 175), 
        //     size: 100,
        //     myImage: icons.usersRectangle,
        // }),
    ]

    

    
    let x = 1070;
    let y = 140;

   
    shapes.push(new Shape({
        pos: new p5.Vector((gameWidth / 1.9) - 720, 25), 
        size: new p5.Vector((gameWidth / 2.25) + 650, 2280),
        fillColor: "rgba(255, 255, 255, 0.75)",
    }))


    textBoxes.push(
        new TextBox({
            text: "leaderboard",
            fillColor: "rgba(0, 0, 0, 0)",
            fontSize: 72,
            pos: new p5.Vector(270, 50),
            size: new p5.Vector(1550, 160),
        })
    )

    x = 350 
    textBoxes.push(
        new TextBox({ 
            text: getLevelName(currentLevel), 
            fillColor: "rgba(0, 0, 0, 0)", 
            fontSize: 48, 
            pos: new p5.Vector(300, 220), 
            size: new p5.Vector(1480, 80), 
            fontColor: "black", 
            fontAlign: CENTER 
        })
    ) 

    let leaderboardData = []

    for (let i = 0; i < levels.length; i++) 
    {
        leaderboardData[i] = []

        for (let j = 0; j < 25; j++) 
        {
            leaderboardData[i][j] = {
                username: getRandomName(), 
                classCode: getRandomPhysicsCourse(),
                score: 777 * (26 - j) + round(random() * 200)
            }
        }
        // const element = array[i];
    }

    leaderboardData[currentLevel].forEach((row, i) => {
        y = 300 + (80 * i) + scrollOffset
        textBoxes.push( 
            new TextBox({ 
                text: (i + 1) + ".", 
                fillColor: "rgba(0, 0, 0, 0)", 
                fontSize: 48, 
                pos: new p5.Vector(300, y), 
                size: new p5.Vector(100, 80), 
                fontColor: "black", 
                fontAlign: CENTER 
            }),
            new TextBox({ 
                text: row.username, 
                fillColor: "rgba(0, 0, 0, 0)", 
                fontSize: 48, 
                pos: new p5.Vector(400, y), 
                size: new p5.Vector(600, 80), 
                fontColor: "black", 
                fontAlign: CENTER 
            }),
            new TextBox({ 
                text: row.classCode, 
                fillColor: "rgba(0, 0, 0, 0)", 
                fontSize: 48, 
                pos: new p5.Vector(1000, y), 
                size: new p5.Vector(500, 80), 
                fontColor: "black", 
                fontAlign: CENTER 
            }),
            new TextBox({ 
                text: row.score, 
                fillColor: "rgba(0, 0, 0, 0)", 
                fontSize: 48, 
                pos: new p5.Vector(1500, y), 
                size: new p5.Vector(275, 80), 
                fontColor: "black", 
                fontAlign: CENTER 
            }),
        )

        if (i % 2 == 0)
        {
            shapes.push(
                new Shape({
                    pos: new p5.Vector((gameWidth / 1.9) - 720, y), 
                    size: new p5.Vector((gameWidth / 2.25) + 650, 80),
                    fillColor: "rgba(255, 255, 255, 0.75)",
                })
            )
        }
    })

    for (let i = 0; i < 25; i++) 
    { 
        
    }
    
    // console.log("style: ", classCodeInputBox.style);

    return new Screen({
        name: screenName,
        backgroundImage: spaceImage,
        buttons: buttons,
        shapes: shapes,
        textBoxes: textBoxes,
        images: images,
    })
}

