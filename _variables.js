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

const k = 89900; // k = 8.99 * Math.pow(10, -9) adjusted because all charges are in micro coulombs;

let charges = []; // all charges on screen are stored here
let equiLines = []
let testCharges = [];
let fieldLines = [];
let fieldLineArrows = [];
const trailLength = 800;
const chargeDiameter = 150; // diameter of a point charge
const chargeRadius = chargeDiameter / 2;
const testChargeDiameter = 30;
const testChargeRadius = testChargeDiameter / 2;
const starOmega = 0.025
const testChargeCharge = 0.000005; //q = 5 micro coulombs;
const fieldLinesPerCoulomb = 4;

const gameWidth = 1920
const gameHeight = 1080

let spaceImage, blueprintImage, homeTrack, banner;
let trackImages;
let icons;

let mousePosition;

let dataToPrint = ""

const GAME_DATA_KEY = 'gameData';
let userData;

let levelCompleteData = {score: 0, starsCollected: 0, timeToComplete: 9999999999999999999999999999999999}

let animations = []

const firstStarTime = 30000 // 30 s
const secondStarTtime = 10000 // 10 s


const positiveChargeColor = "rgb(201, 72, 59)";
const negativeChargeColor = "rgb(24, 116, 152)";
const neutralChargeColor = "rgba(85, 85, 85, 0.75)";
const purpleColor = [
    "rgba(64, 39, 99 , 1)",
    "rgba(81, 49, 127, 1)",
    "rgba(100,64, 141, 1)",
    "rgba(109,57, 147, 1)",
    "rgba(122, 87, 153,1)",
]