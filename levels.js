function createLevels()
{
    let trackImages = [ 
        {play: loadImage('images/tracks/lv1.png'), build: loadImage('images/tracks/lv1build.png')},
        {play: loadImage('images/tracks/lv2.png'), build: loadImage('images/tracks/lv2build.png')},
        {play: loadImage('images/tracks/lv3.png'), build: loadImage('images/tracks/lv3build.png')},
        {play: loadImage('images/tracks/lv4.png'), build: loadImage('images/tracks/lv4build.png')},
        {play: loadImage('images/tracks/lv5.png'), build: loadImage('images/tracks/lv5build.png')},
        
        {play: loadImage('images/tracks/lv7.png'), build: loadImage('images/tracks/lv7build.png')},
        {play: loadImage('images/tracks/lv8.png'), build: loadImage('images/tracks/lv8build.png')},
        {play: loadImage('images/tracks/lv9.png'), build: loadImage('images/tracks/lv9build.png')},
        {play: loadImage('images/tracks/lv10.png'), build: loadImage('images/tracks/lv10build.png')},
        {play: loadImage('images/tracks/lv11.png'), build: loadImage('images/tracks/lv11build.png')},
        
        {play: loadImage('images/tracks/lv6.png'), build: loadImage('images/tracks/lv6build.png')},
        {play: loadImage('images/tracks/lv3.png'),  build: loadImage('images/tracks/lv3build.png')},
        {play: loadImage('images/tracks/lv13.png'), build: loadImage('images/tracks/lv13build.png')},
        {play: loadImage('images/tracks/lv14.png'), build: loadImage('images/tracks/lv14build.png')},
        {play: loadImage('images/tracks/lv15.png'), build: loadImage('images/tracks/lv15build.png')}
    ]

    let starPositions = [
        [ // lv 1
            createVector(190, 190), 
            createVector(350, 160), 
            createVector(500, 200)
        ],
        [ // lv 2
            createVector(370, 150), 
            createVector(370, 200), 
            createVector(340, 230)
        ],
        [ // lv 3
            createVector(250, 130), 
            createVector(530, 190), 
            createVector(530, 240)
        ],
        [ // lv 4
            createVector(500, 120), 
            createVector(450, 290), 
            createVector(200, 260)
        ],
        [ // lv 5
            createVector(150, 150), 
            createVector(300, 150), 
            createVector(400, 150)
        ],
        [ // lv 6
            createVector(125, 145), 
            createVector(250, 250), 
            createVector(440, 140)
        ],
        [ // lv 7
            createVector(200, 50), 
            createVector(279, 120), 
            createVector(420, 150)
        ],
        [ // lv 8
            createVector(580, 21), 
            createVector(660, 50), 
            createVector(70, 50)
        ],
        [ // lv 9
            createVector(417, 13), 
            createVector(480, 70), 
            createVector(65, 180)
        ],
        [ // lv 10
            createVector(417, 13), 
            createVector(480, 70), 
            createVector(65, 180)
        ],
        [ // lv 11
            createVector(250, 55), 
            createVector(350, 56), 
            createVector(450, 125)
        ],
        [ // lv 12
            createVector(200, 50), 
            createVector(300, 50), 
            createVector(400, 50)
        ],
        [ // lv 13
            createVector(151, 151), 
            createVector(253, 68), 
            createVector(346, 152)
        ],
        [ // lv 14
            createVector(167, 92), 
            createVector(95, 27), 
            createVector(27, 98)
        ],
        [ // lv 15
            createVector(167, 92), 
            createVector(95, 27), 
            createVector(27, 98)
        ],
    ]



    trackImages.forEach((trackImage, i) => {

        let starObjects = []

        starPositions[i].forEach(starPosition => {
            starObjects.push(new Star({
                pos: starPosition
            }))
        })

        levels.push(new Level({
            playImage: trackImage.play,
            buildImage: trackImage.build,
            stars: starObjects
        }))
    });
    
}

function unlockLevels()
{
    levels[0].locked = false; 
    levels[1].locked = false; 
    levels[2].locked = false; 
    levels[3].locked = false; 

    levels.forEach(level => {
        let width = level.buildImage.width
        let height = level.buildImage.height
        level.size = new p5.Vector(width, height)
    })
}