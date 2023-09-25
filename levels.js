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

    let levelData = [
        {   // lv 1
            stars: [
                new Star({pos: new p5.Vector(190, 190)}), 
                new Star({pos: new p5.Vector(350, 160)}), 
                new Star({pos: new p5.Vector(500, 200)}), 
            ],
            testCharges: [
                new TestCharge({pos: new p5.Vector(190, 190)})
            ],
            finishLine: {
                pos: new p5.Vector(560, 100),
                size: new p5.Vector(100, 200)
            },
            border: [
                new p5.Vector(112, 141),
                new p5.Vector(615, 142),
                new p5.Vector(615, 247),
                new p5.Vector(110, 248)
            ]
        },
        {   // lv 2
            stars: [
                new Star({pos: new p5.Vector(370, 150)}), 
                new Star({pos: new p5.Vector(370, 200)}), 
                new Star({pos: new p5.Vector(340, 230)}), 
            ],
            testCharges: [
                new TestCharge({pos: new p5.Vector(370, 150)})
            ],
            finishLine: {
                pos: new p5.Vector(250, 210),
                size: new p5.Vector(78, 110)
            },
            border: [
                new p5.Vector(278, 80),
                new p5.Vector(344, 81),
                new p5.Vector(383, 89),
                new p5.Vector(405, 104),
                new p5.Vector(424, 123),
                new p5.Vector(439, 147),
                new p5.Vector(447, 172),
                new p5.Vector(449, 195),
                new p5.Vector(446, 221),
                new p5.Vector(435, 251),
                new p5.Vector(419, 270),
                new p5.Vector(397, 290),
                new p5.Vector(364, 304),
                new p5.Vector(336, 308),
                new p5.Vector(277, 310),
                new p5.Vector(278, 219),
                new p5.Vector(336, 217),
                new p5.Vector(348, 211),
                new p5.Vector(355, 196),
                new p5.Vector(349, 182),
                new p5.Vector(335, 172),
                new p5.Vector(279, 170),
                new p5.Vector(279, 80)
            ]
        },
        {   // lv 3
            stars: [
                new Star({pos: new p5.Vector(250, 130)}), 
                new Star({pos: new p5.Vector(530, 190)}), 
                new Star({pos: new p5.Vector(530, 240)}), 
            ],
            testCharges: [
                new TestCharge({pos: new p5.Vector(250, 130)})
            ],
            finishLine: {
                pos: new p5.Vector(500, 263),
                size: new p5.Vector(110, 60)
            },
            border: [
                new p5.Vector(100, 100),
                new p5.Vector(100, 100),
                new p5.Vector(100, 100),
                new p5.Vector(100, 100)
            ]
        },
        {   // lv 4
            stars: [
                new Star({pos: new p5.Vector(500, 120)}), 
                new Star({pos: new p5.Vector(450, 290)}), 
                new Star({pos: new p5.Vector(200, 260)}), 
            ],
            testCharges: [
                new TestCharge({pos: new p5.Vector(500, 120)})
            ],
            finishLine: {
                pos: new p5.Vector(115, 210),
                size: new p5.Vector(50, 110)
            },
            border: [
                new p5.Vector(100, 100),
                new p5.Vector(100, 100),
                new p5.Vector(100, 100),
                new p5.Vector(100, 100)
            ]
        },
        {   // lv 5
            stars: [
                new Star({pos: new p5.Vector(150, 150)}), 
                new Star({pos: new p5.Vector(300, 150)}), 
                new Star({pos: new p5.Vector(400, 150)}), 
            ],
            testCharges: [
                new TestCharge({pos: new p5.Vector(150, 150)})
            ],
            finishLine: {
                pos: new p5.Vector(100, 253),
                size: new p5.Vector(520, 50)
            },
            border: [
                new p5.Vector(100, 100),
                new p5.Vector(100, 100),
                new p5.Vector(100, 100),
                new p5.Vector(100, 100)
            ]
        },
        {   // lv 6
            stars: [
                new Star({pos: new p5.Vector(125, 145)}), 
                new Star({pos: new p5.Vector(250, 250)}), 
                new Star({pos: new p5.Vector(440, 140)}), 
            ],
            testCharges: [
                new TestCharge({pos: new p5.Vector(125, 145)})
            ],
            finishLine: {
                pos: new p5.Vector(500, 100),
                size: new p5.Vector(50, 100),
                angle: 45,
            },
            border: [
                new p5.Vector(100, 100),
                new p5.Vector(100, 100),
                new p5.Vector(100, 100),
                new p5.Vector(100, 100)
            ]
        },
        {   // lv 7
            stars: [
                new Star({pos: new p5.Vector(200, 50)}), 
                new Star({pos: new p5.Vector(279, 120)}), 
                new Star({pos: new p5.Vector(420, 150)}), 
            ],
            testCharges: [
                new TestCharge({pos: new p5.Vector(200, 50)})
            ],
            finishLine: {
                pos: new p5.Vector(573, 190),
                size: new p5.Vector(50, 90)
            },
            border: [
                new p5.Vector(100, 100),
                new p5.Vector(100, 100),
                new p5.Vector(100, 100),
                new p5.Vector(100, 100)
            ]
        },
        {   // lv 8
            stars: [
                new Star({pos: new p5.Vector(580, 21)}), 
                new Star({pos: new p5.Vector(660, 50)}), 
                new Star({pos: new p5.Vector(70, 50)}), 
            ],
            testCharges: [
                new TestCharge({pos: new p5.Vector(580, 21)})
            ],
            finishLine: {
                pos: new p5.Vector(100, 100),
                size: new p5.Vector(50, 100)
            },
            border: [
                new p5.Vector(100, 100),
                new p5.Vector(100, 100),
                new p5.Vector(100, 100),
                new p5.Vector(100, 100)
            ]
        },
        {   // lv 9
            stars: [
                new Star({pos: new p5.Vector(417, 13)}), 
                new Star({pos: new p5.Vector(480, 70)}), 
                new Star({pos: new p5.Vector(65, 180)}), 
            ],
            testCharges: [
                new TestCharge({pos: new p5.Vector(417, 13)})
            ],
            finishLine: {
                pos: new p5.Vector(100, 100),
                size: new p5.Vector(50, 100)
            },
            border: [
                new p5.Vector(100, 100),
                new p5.Vector(100, 100),
                new p5.Vector(100, 100),
                new p5.Vector(100, 100)
            ]
        },
        {   // lv 10
            stars: [
                new Star({pos: new p5.Vector(417, 13)}), 
                new Star({pos: new p5.Vector(480, 70)}), 
                new Star({pos: new p5.Vector(65, 180)}), 
            ],
            testCharges: [
                new TestCharge({pos: new p5.Vector(417, 13)})
            ],
            finishLine: {
                pos: new p5.Vector(100, 100),
                size: new p5.Vector(50, 100)
            },
            border: [
                new p5.Vector(100, 100),
                new p5.Vector(100, 100),
                new p5.Vector(100, 100),
                new p5.Vector(100, 100)
            ]
        },
        {   // lv 11
            stars: [
                new Star({pos: new p5.Vector(250, 55)}), 
                new Star({pos: new p5.Vector(350, 56)}), 
                new Star({pos: new p5.Vector(450, 125)}), 
            ],
            testCharges: [
                new TestCharge({pos: new p5.Vector(250, 55)})
            ],
            finishLine: {
                pos: new p5.Vector(110, 207),
                size: new p5.Vector(57, 110)
            },
            border: [
                new p5.Vector(100, 100),
                new p5.Vector(100, 100),
                new p5.Vector(100, 100),
                new p5.Vector(100, 100)
            ]
        },
        {   // lv 12
            stars: [
                new Star({pos: new p5.Vector(200, 50)}), 
                new Star({pos: new p5.Vector(300, 50)}), 
                new Star({pos: new p5.Vector(400, 50)}), 
            ],
            testCharges: [
                new TestCharge({pos: new p5.Vector(200, 50)})
            ],
            finishLine: {
                pos: new p5.Vector(500, 262),
                size: new p5.Vector(110, 60)
            },
            border: [
                new p5.Vector(100, 100),
                new p5.Vector(100, 100),
                new p5.Vector(100, 100),
                new p5.Vector(100, 100)
            ]
        },
        {   // lv 13
            stars: [
                new Star({pos: new p5.Vector(151, 151)}), 
                new Star({pos: new p5.Vector(253, 68)}), 
                new Star({pos: new p5.Vector(346, 152)}), 
            ],
            testCharges: [
                new TestCharge({pos: new p5.Vector(151, 151)})
            ],
            finishLine: {
                pos: new p5.Vector(100, 100),
                size: new p5.Vector(50, 100)
            },
            border: [
                new p5.Vector(100, 100),
                new p5.Vector(100, 100),
                new p5.Vector(100, 100),
                new p5.Vector(100, 100)
            ]
        },
        {   // lv 14
            stars: [
                new Star({pos: new p5.Vector(167, 92)}), 
                new Star({pos: new p5.Vector(95, 27)}), 
                new Star({pos: new p5.Vector(27, 98)}), 
            ],
            testCharges: [
                new TestCharge({pos: new p5.Vector(167, 92)})
            ],
            finishLine: {
                pos: new p5.Vector(100, 100),
                size: new p5.Vector(50, 100)
            },
            border: [
                new p5.Vector(100, 100),
                new p5.Vector(100, 100),
                new p5.Vector(100, 100),
                new p5.Vector(100, 100)
            ]
        },
        {   // lv 15
            stars: [
                new Star({pos: new p5.Vector(167, 92)}), 
                new Star({pos: new p5.Vector(95, 27)}), 
                new Star({pos: new p5.Vector(27, 98)}), 
            ],
            testCharges: [
                new TestCharge({pos: new p5.Vector(167, 92)})
            ],
            finishLine: {
                pos: new p5.Vector(100, 100),
                size: new p5.Vector(50, 100)
            },
            border: [
                new p5.Vector(100, 100),
                new p5.Vector(100, 100),
                new p5.Vector(100, 100),
                new p5.Vector(100, 100)
            ]
        },
    ]

    trackImages.forEach((trackImage, i) => {

        levels.push(new Level({
            playImage: trackImage.play,
            buildImage: trackImage.build,
            stars: levelData[i].stars,
            testCharges: levelData[i].testCharges,
            border: levelData[i].border,
            finishLine: levelData[i].finishLine
        }))
    });
    
}

function unlockLevels()
{
    levels[0].locked = false; 
    levels.forEach((level, i) => {
        let width = level.buildImage.width
        let height = level.buildImage.height
        level.size = new p5.Vector(width, height)

        if (userData[i].highScore != null)
        {
            level.locked = false
        }
    })
}