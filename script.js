// Global to keep track of current upgrade levels, reading from the check boxes for each ship is tiresome. 
const currentShipLevels = {
    "Flagship": "U0",
    "Ship 1": "U0",
    "Ship 2": "U0",
    "Ship 3": "U0",
    "Ship 4": "U0",
}

// Modify for loop boundaries based on upgrade level i.e X1 should do all below X1, U1 should only do itself
const offsets = {
    "U1": 1,
    "U2": 2,
    "U3": 3,
    "X1": 4,
    "CAP": 5
}

// Flag upgrade times D/H/M
const baseUpgradeTimesFlag = {
    "U1": [0,22,28],
    "U2": [2,19,20],
    "U3": [5,14,39],
    "X1": [8,12,0],
    "CAP": [11,21,43],
}

// Upgrade times D/H/M
const baseUpgradeTimes = {
    "U1": [0,19,23],    // |
    "U2": [2,10,8],     // | These three will likely change
    "U3": [4,20,17],    // |
    "X1": [5,2,26],
    "CAP": [7,15,37],
}


// Deep copy of above values, so we can change them.
const upgradeTimes = JSON.parse(JSON.stringify(baseUpgradeTimes));
const upgradeTimesFlag = JSON.parse(JSON.stringify(baseUpgradeTimesFlag));

function updateElement(elementID, data){
    document.getElementById(elementID).innerText = data; 
}

function updateTable(){
    updateElement("U1TimeFlag", toTime("U1",1));
    updateElement("U2TimeFlag", toTime("U2",1));
    updateElement("U3TimeFlag", toTime("U3",1));
    updateElement("X1TimeFlag", toTime("X1",1));
    updateElement("CAPTimeFlag", toTime("CAP",1));

    updateElement("U1Time", toTime("U1",0));
    updateElement("U2Time", toTime("U2",0));
    updateElement("U3Time", toTime("U3",0));
    updateElement("X1Time", toTime("X1",0));
    updateElement("CAPTime", toTime("CAP",0));
}
updateTable();

function reduceTime(reduction){
    for(upgrade in upgradeTimesFlag){
        let minutes = arrayToMins(baseUpgradeTimesFlag[upgrade]);
        upgradeTimesFlag[upgrade] = minsToArray(minutes*(1-(reduction/100)));
    }

    for(upgrade in upgradeTimes){
        let minutes = arrayToMins(baseUpgradeTimes[upgrade]);
        upgradeTimes[upgrade] = minsToArray(minutes*(1-(reduction/100)));
    }

    updateTable();
}

// Go from minutes to array of [day, hours, minutes]
function minsToArray(minutes){
    let days = Math.floor(minutes/1440);
    let remainingTime = parseInt(minutes - Math.floor((days *1440)));
    let hours = Math.floor((remainingTime / 60));
    let remainingMin = Math.floor(remainingTime - (hours*60));

    return [days, hours, remainingMin];
}

// Go from array [day, hours, minutes] to minutes
function arrayToMins(array){
    return array[0]*24*60+array[1]*60+array[2];
}

// Get Time in string format XXd XXh XXm
function toTime(upgradeLevel, flagFlag){
    if(flagFlag) return `${upgradeTimesFlag[upgradeLevel][0]}d ${upgradeTimesFlag[upgradeLevel][1]}h ${upgradeTimesFlag[upgradeLevel][2]}m`
    return `${upgradeTimes[upgradeLevel][0]}d ${upgradeTimes[upgradeLevel][1]}h ${upgradeTimes[upgradeLevel][2]}m`
}

document.addEventListener("DOMContentLoaded", function() {
    const upgradesContainers = document.getElementsByClassName("upgrades");

    // Helper function to update upgrades
    function updateUpgrades(shipName, upgrades, upgradeLevel) {
        // Clear old state
        upgrades.forEach(checkbox => checkbox.querySelector("input").checked = false);
        
        if (upgradeLevel !== "U0") {
            for (let j = 0; j < offsets[upgradeLevel]; j++) {
                upgrades[j].querySelector("input").checked = true;
            }

            currentShipLevels[shipName] = upgradeLevel;
            console.log(`Upgrade ${upgradeLevel} toggled for ${shipName}`);
        } else {
            currentShipLevels[shipName] = "U0";
            console.log(`Upgrades cleared for ${shipName}`);
        }

        updateStatBlock();
    }

    // Iterate over each upgrades container
    for (let i = 0; i < upgradesContainers.length; i++) {
        const container = upgradesContainers[i];
        const upgrades = container.querySelectorAll(".upgrade");
        const clearButtons = container.querySelectorAll(".clear");

        // Add event listeners to each upgrade checkbox
        upgrades.forEach(function (checkbox) {
            checkbox.addEventListener("change", function () {
                const shipName = this.closest('.ship').querySelector('h2').textContent.trim();
                const upgradeLevel = this.textContent[1] + this.textContent[2] + (this.textContent[3] === "P" ? "P" : ""); // Fix concatenation error
                updateUpgrades(shipName, upgrades, upgradeLevel);
            });
        });

        // Add event listeners to each clear button
        clearButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                const shipName = this.closest('.ship').querySelector('h2').textContent.trim();
                updateUpgrades(shipName, upgrades, "U0");
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("intelLevel").addEventListener("change", function(input){
        reduceTime(parseInt(input.target.value));
        updateStatBlock();
    })
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("upgradeGoal").addEventListener("change", function(input){
        document.getElementById("levelGoal").innerText = "Time to "+input.target.value+": ";

        updateStatBlock();
    })
});

let totalTime = 0;
let totalNormalKits = 0
let totalFlagKits = 0;
let totalNormalCores = 0
let totalFlagCores = 0;
// Function called to update the stats based on given upgrade levels.
function updateStatBlock(){
    totalTime = 0; // Reset Totals
    
    updateElement("levelTimeFlag",fromCurrentToGoalTime(currentShipLevels["Flagship"],1));
    updateElement("levelTimeShip1",fromCurrentToGoalTime(currentShipLevels["Ship 1"],0));
    updateElement("levelTimeShip2",fromCurrentToGoalTime(currentShipLevels["Ship 2"],0));
    updateElement("levelTimeShip3",fromCurrentToGoalTime(currentShipLevels["Ship 3"],0));
    updateElement("levelTimeShip4",fromCurrentToGoalTime(currentShipLevels["Ship 4"],0));
    updateElement("totalTimeShips", timeTotal());
    
    totalNormalKits = 0;
    totalFlagKits = 0;
    updateElement("kitsNeededFlag",calcKits(currentShipLevels["Flagship"], 1));
    updateElement("kitsNeededShip1",calcKits(currentShipLevels["Ship 1"], 0));
    updateElement("kitsNeededShip2",calcKits(currentShipLevels["Ship 2"], 0));
    updateElement("kitsNeededShip3",calcKits(currentShipLevels["Ship 3"], 0));
    updateElement("kitsNeededShip4",calcKits(currentShipLevels["Ship 4"], 0));
    updateElement("totalNeededKits","F: "+totalFlagKits+"/N: "+totalNormalKits);

    totalNormalCores = 0;
    totalFlagCores = 0;
    updateElement("coresNeededFlag",calcCores(currentShipLevels["Flagship"], 1));
    updateElement("coresNeededShip1",calcCores(currentShipLevels["Ship 1"], 0));
    updateElement("coresNeededShip2",calcCores(currentShipLevels["Ship 2"], 0));
    updateElement("coresNeededShip3",calcCores(currentShipLevels["Ship 3"], 0));
    updateElement("coresNeededShip4",calcCores(currentShipLevels["Ship 4"], 0));
    updateElement("totalNeededCores","F: "+totalFlagCores+"/N: "+totalNormalCores);
}

function calcCores(current, flag){
    let goal = document.getElementById("upgradeGoal").value;

    if (goal !== "CAP") return 0;

    if (current !== "CAP") {
        if (flag) totalFlagCores += 10;
        else totalNormalCores += 10;
        return 10;
    }
    return 0
}

function calcKits(current, flag){
    let goal = document.getElementById("upgradeGoal").value;
    
    const flagKits = [10,40,80,80,0];   // CAP needs 0 `kits` but index errors if not included here 
    const normalKits = [10,30,60,60,0];

    let kitsUsed = 0;
    let kitsNeeded = 0;

    // Work out time spent upgrading so far.
    for (let j = 0; j < offsets[current]; j++) {
        if(flag) kitsUsed += flagKits[j];
        else kitsUsed += normalKits[j];
    }
    // Work out time needed still
    for (let j = 0; j < offsets[goal]; j++) {
        if(flag) kitsNeeded += flagKits[j];
        else kitsNeeded += normalKits[j];
    }

    if(flag) totalFlagKits = kitsNeeded-kitsUsed;
    else totalNormalKits += kitsNeeded-kitsUsed;

    return kitsNeeded-kitsUsed;
}

function timeTotal(){
    let out = minsToArray(totalTime);
    return out[0]+"d "+out[1]+"h "+out[2]+"m";
}

function fromCurrentToGoalTime(current, flag){
    let goal = document.getElementById("upgradeGoal").value;

    const upgradeArray = ["U1","U2","U3","X1","CAP"];

    let minsDone = 0;
    let minsLeft = 0;

    // Work out time spent upgrading so far.
    for (let j = 0; j < offsets[current]; j++) {
        if(flag) minsDone += arrayToMins(upgradeTimesFlag[upgradeArray[j]]);
        else minsDone += arrayToMins(upgradeTimes[upgradeArray[j]]);
    }
    // Work out time needed still
    for (let j = 0; j < offsets[goal]; j++) {
        if(flag) minsLeft += arrayToMins(upgradeTimesFlag[upgradeArray[j]]);
        else minsLeft += arrayToMins(upgradeTimes[upgradeArray[j]]);
    }

    totalTime += minsLeft-minsDone;

    let out = minsToArray(minsLeft-minsDone);
    return out[0]+"d "+out[1]+"h "+out[2]+"m";
}
updateStatBlock();
