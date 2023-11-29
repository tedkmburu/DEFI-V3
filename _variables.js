"use strict";

let sounds;

let gameDevMode = false;
let currentFPS = 0;

let screens = []
let popUps = []
let currentScreen = 7;
let currentPopUp = 5;
let popUpVisible = false;

let userNameInputBox;
let classCodeInputBox;

let loadScreenTestChargeIndex = 0

let levels = []
let currentLevel = 0;

let scale;
let scrollOffset = 0;
let trueScrollOffset = 0;
let screenOpacity = 1
let buttonTextOffset = 0

let buildMode = true;
let elapsedTime = 0;
let coinsCollected = 0;

const k = 899000; // k = 8.99 * Math.pow(10, -9) adjusted because all charges are in micro coulombs;

let charges = []; // all charges on screen are stored here

let voltage = []
let equiLines = []
let testCharges = [];
let fieldLines = [];
let fieldLineArrows = [];
let noPositiveCharges = true;
let failedTestChargePos;
let levelFailed = false;


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
const commonButtonSize = 150
const commonButtonSpace = 200

const gameWidth = 1920
const gameHeight = 1080

let spaceImage, blueprintImage, homeTrack, banner, bigBanner, stamp, ribbon;
let trackImages;
let icons;
let coinImages;
let carImages;
let tutorialImages;

let mousePosition;

let dataToPrint = ""

const GAME_DATA_KEY = 'v3.1';
const USER_DATA_KEY = 'v3';
let userScoresData;
let userData;

let levelCompleteData = {coinsCollected: [], timeToComplete: 9999999999999999999999999999999999}

let animations = []

const silverCoinTime = 10000 // 10 s
const bronzeCoinTime = silverCoinTime * 2 // 30 s
const goldValue = 3;
const silverValue = 2;
const bronzeValue = 1;


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