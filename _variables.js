let gameDevMode = false;

let screens = []
let currentScreen = 2;

let levels = []
let currentLevel = 0;

let scale;
let scrollOffset = 0;
let trueScrollOffset = 0;

let buildMode = true;
let helpMode = false;
let elapsedTime = 0;

const k = 899000; // k = 8.99 * Math.pow(10, -9) adjusted because all charges are in micro coulombs;

let charges = []; // all charges on screen are stored here

let voltage = []
let equiLines = []
let testCharges = [];
let fieldLines = [];
let fieldLineArrows = [];
let noPositiveCharges = true;
const trailLength = 800;
const chargeDiameter = 150; // diameter of a point charge
const chargeRadius = chargeDiameter / 2;
const testChargeDiameter = 30;
const testChargeRadius = testChargeDiameter / 2;
const coinOmega = 0.025
const coinRadius = 20;
const testChargeCharge = 0.000005; //q = 5 micro coulombs;
const fieldLinesPerCoulomb = 4;
const voltageDefinition = 50
const commonButtonRadius = 150

const gameWidth = 1920
const gameHeight = 1080

let spaceImage, blueprintImage, homeTrack, banner, stamp;
let trackImages;
let icons;
let coinImages;

let levelCompleteImage;

let mousePosition;

let dataToPrint = ""

const GAME_DATA_KEY = '10/23';
let userData;

let levelCompleteData = {score: 0, coinsCollected: [0, 0, 0], timeToComplete: 9999999999999999999999999999999999}

let animations = []

const silverCoinTime = 5000 // 10 s
const bronzeCoinTime = 10000 // 30 s
const goldValue = 1000;
const silverValue = 100;
const bronzeValue = 10;


const positiveChargeColor = "rgb(237, 32, 36)";
const negativeChargeColor = "rgb(46, 76, 160)";
const neutralChargeColor = "rgba(85, 85, 85, 0.75)";
const purpleColor = [
    "rgba(64, 39, 99 , 1)",
    "rgba(81, 49, 127, 1)",
    "rgba(100,64, 141, 1)",
    "rgba(109,57, 147, 1)",
    "rgba(122, 87, 153,1)",
]

const starPhrases = [
    "celestial roll!",
    "star-tling heights!",
    "earned your stars & stripes!",
    "star-spangled victory!",
    "there's a twinkle in your eye!",
    "a star constellation!",
    "shining bright!",
    "starry-eyed puzzle master!",
    "i'm Starstruck!",
    "star-quality performance!",
    "a shining example!",
    "star-Lord?!?",
    "star-studded sensation!",
    "a superstar!",
    "star-rific!",
    "no star unturned!",
    "dazzling performance!",
    "a place among the stars!",
    "north Star of perfection!",
    "you're the star now!",
    "star-studded victory!",
    "star power!",
    "star-stacked success!",
    "the zenith of star-dom!",
    "rewriting the star charts!",
    "pro astronomer?!?",
    "physicist?!?",
    "rocket science?!?",
    "Stars of victory!",
    "a constellation of achievements!",
    "star player!",
]

const timePhrases = [
    "speedster!",
    "barry allen?",
    "wally west?",
    "jay garrick?",
    "sonic the who?",
    "record time!",
    "in the blink of an eye!",
    "left this level in the dust!",
    "lightning-quick!",
    "clock's ticking, but not for you!",
    "quick thinking!",
    "swift action!",
    "cleared in a flash!",
    "fast and furious!",
    "you're the hare",
    "breaking (sound) barriers!",
    "time flies when you're...",
    "gold in the puzzle olympics",
    "zooooooooooooooooom!",
    "the need for speed!",
    "where is the tortoise?",
    "you're a runner… a track star",
    "warp speed!",
    "that was quick!",
    "zooming past!",
    "lightning-fast!",
    "speedster strikes again!",
    "rapid success!",
    "turbo mode!",
    "zero to hero!",
    "turbocharged?",
    "ace of pace!",
    "warp speed!",
    "",
    "",
]