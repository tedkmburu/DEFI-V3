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
                new Star({pos: new p5.Vector(600, 500)}), 
                new Star({pos: new p5.Vector(900, 463)}), 
                new Star({pos: new p5.Vector(1200, 500)}), 
            ],
            testCharges: [
                new TestCharge({pos: new p5.Vector(500, 530)})
            ],
            finishLine: {
                pos: new p5.Vector(1314, 394),
                size: new p5.Vector(200, 300)
            },
            border: [
                new p5.Vector(400, 427),
                new p5.Vector(1424, 427),
                new p5.Vector(1424, 643),
                new p5.Vector(400, 643)
            ]
        },
        {   // lv 2
            stars: [
                new Star({pos: new p5.Vector(1050, 400)}), 
                new Star({pos: new p5.Vector(1030, 530)}), 
                new Star({pos: new p5.Vector(930, 600)}), 
            ],
            testCharges: [
                new TestCharge({pos: new p5.Vector(885, 332)})
            ],
            finishLine: {
                pos: new p5.Vector(713, 501),
                size: new p5.Vector(185, 350)
            },
            border: [
                new p5.Vector(777, 202),
                new p5.Vector(949, 199),
                new p5.Vector(1072, 241),
                new p5.Vector(1157, 315),
                new p5.Vector(1200, 436),
                new p5.Vector(1200, 546),
                new p5.Vector(1131, 678),
                new p5.Vector(1057, 740),
                new p5.Vector(963, 780),
                new p5.Vector(770, 777),
                new p5.Vector(773, 543),
                new p5.Vector(897, 541),
                new p5.Vector(939, 525),
                new p5.Vector(963, 481),
                new p5.Vector(912, 441),
                new p5.Vector(777, 430),
                new p5.Vector(777, 198)
            ]
        },
        {   // lv 3
            stars: [
                new Star({pos: new p5.Vector(1014, 383)}), 
                new Star({pos: new p5.Vector(1250, 453)}), 
                new Star({pos: new p5.Vector(1315, 605)}), 
            ],
            testCharges: [
                new TestCharge({pos: new p5.Vector(500, 350)})
            ],
            finishLine: {
                pos: new p5.Vector(1200, 640),
                size: new p5.Vector(250, 150)
            },
            border: [
                new p5.Vector(406, 257),
                new p5.Vector(1248, 257),
                new p5.Vector(1290, 264),
                new p5.Vector(1354, 299),
                new p5.Vector(1404, 349),
                new p5.Vector(1427, 440),
                new p5.Vector(1427, 744),
                new p5.Vector(1226, 741),
                new p5.Vector(1225, 472),
                new p5.Vector(1205, 456),
                new p5.Vector(400, 447),
                new p5.Vector(407, 263)
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
                new p5.Vector(439, 78),
                new p5.Vector(510, 79),
                new p5.Vector(548, 91),
                new p5.Vector(590, 129),
                new p5.Vector(610, 178),
                new p5.Vector(606, 223),
                new p5.Vector(585, 263),
                new p5.Vector(557, 293),
                new p5.Vector(518, 306),
                new p5.Vector(482, 307),
                new p5.Vector(119, 307),
                new p5.Vector(118, 219),
                new p5.Vector(499, 214),
                new p5.Vector(512, 206),
                new p5.Vector(516, 185),
                new p5.Vector(505, 174),
                new p5.Vector(492, 170),
                new p5.Vector(442, 170),
                new p5.Vector(439, 78)
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
                new p5.Vector(114, 96),
                new p5.Vector(613, 95),
                new p5.Vector(617, 296),
                new p5.Vector(115, 292)
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
                new p5.Vector(230, 76),
                new p5.Vector(363, 210),
                new p5.Vector(494, 81),
                new p5.Vector(562, 149),
                new p5.Vector(422, 290),
                new p5.Vector(398, 303),
                new p5.Vector(366, 310),
                new p5.Vector(338, 308),
                new p5.Vector(306, 292),
                new p5.Vector(162, 150),
                new p5.Vector(230, 76)
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
    // levels[1].locked = false; 
    // levels[2].locked = false; 
    // levels[3].locked = false; 
    // levels[4].locked = false; 
    // levels[5].locked = false; 
    // levels[6].locked = false; 
    // levels[7].locked = false; 
    // levels[8].locked = false; 

    levels.forEach((level, i) => {
        let width = level.buildImage.width
        let height = level.buildImage.height
        level.size = new p5.Vector(width, height)

        if (userData[i].highScore != null && i < levels.length - 1)
        {
            levels[i + 1].locked = false
            // currentLevel = i + 1;
        }
        
    })
}