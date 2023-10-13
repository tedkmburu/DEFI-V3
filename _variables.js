let gameDevMode = true;

let screens = []
let currentScreen;

let currentLevel = 0;

let levels = []

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
const chargeDiameter = 40; // diameter of a point charge
const chargeRadius = chargeDiameter / 2;
const testChargeDiameter = 10;
const testChargeRadius = testChargeDiameter / 2;
const positiveChargeColor = "rgb(235, 83, 83)";
const negativeChargeColor = "rgb(24, 116, 152)";
const neutralChargeColor = "rgba(85, 85, 85, 0.75)";
const starOmega = 0.025
const testChargeCharge = 0.000005; //q = 5 micro coulombs;
const fieldLinesPerCoulomb = 4;

let spaceImage, blueprintImage, homeTrack;
let trackImages;
let icons;

let mousePosition;

let dataToPrint = ""

const GAME_DATA_KEY = 'gameData';
let userData;

let levelCompleteData = {score: 0, starsCollected: 0, timeToComplete: 9999999999999999999999999999999999}

let animations = []