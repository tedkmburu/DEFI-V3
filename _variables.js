let screens = []
let currentScreen;

let currentLevel = 3;

let levels = []

let scale;
let scrollOffset = 0;

let buildMode = true;
let helpMode = false;
let elapsedTime = 0;

const k = 89900; // k = 8.99 * Math.pow(10, -9) adjusted because all charges are in micro coulombs;

let charges = []; // all charges on screen are stored here
let equiLines = []
let testCharges = [];
let fieldLines = [];
let fieldLineArrows = [];
const chargeDiameter = 40; // diameter of a point charge
const chargeRadius = chargeDiameter / 2;
const testChargeDiameter = 10;
const testChargeRadius = testChargeDiameter / 2;
const positiveChargeColor = "rgb(210, 41, 45)";
const negativeChargeColor = "rgb(23, 97, 176)";
const neutralChargeColor = "rgba(85, 85, 85, 0.75)";
const testChargeCharge = 0.000005; //q = 5 micro coulombs;
const fieldLinesPerCoulomb = 4;

let spaceImage, blueprintImage, homeTrack;
let trackImages;
let icons;

let mousePosition;