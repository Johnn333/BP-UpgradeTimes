// Upgrade times D/H/M
const upgradeTimes = {
    "U1": [0,19,22],
    "U2": [2,10,0],
    "U3": [4,20,0],
    "X1": [6,19,0]
}

// Flag upgrade times D/H/M
const upgradeTimesFlag = {
    "U1": [0,22,26],
    "U2": [2,19,0],
    "U3": [5,15,0],
    "X1": [10,4,0]
}

// Copy above values, to keep them around
const tempUpgradeTimes = JSON.parse(JSON.stringify(upgradeTimes));
const tempUpgradeTimesFlag = JSON.parse(JSON.stringify(upgradeTimesFlag));

function updateTable(){
    document.getElementById("U1TimeFlag").innerText = toTime("U1",1);
    document.getElementById("U2TimeFlag").innerText = toTime("U2",1); 
    document.getElementById("U3TimeFlag").innerText = toTime("U3",1); 
    document.getElementById("X1TimeFlag").innerText = toTime("X1",1);

    document.getElementById("U1Time").innerText = "| "+toTime("U1",0);
    document.getElementById("U2Time").innerText = "| "+toTime("U2",0); 
    document.getElementById("U3Time").innerText = "| "+toTime("U3",0); 
    document.getElementById("X1Time").innerText = "| "+toTime("X1",0);
}
updateTable();

function reduceTime(reduction){
    for(upgrade in upgradeTimes){
        let minutes = upgradeTimes[upgrade][0]*24*60+upgradeTimes[upgrade][1]*60+upgradeTimes[upgrade][2];

        minutes = minutes*(1-(reduction/100));

        let days = Math.floor(minutes / 1440);
        let remainingTime = parseInt(minutes - Math.floor((days *1440)));
        let hours = Math.floor((remainingTime / 60));
        let remainingMin = Math.floor(remainingTime - (hours*60));

        tempUpgradeTimes[upgrade][0] = days; // New Days
        tempUpgradeTimes[upgrade][1] = hours;
        tempUpgradeTimes[upgrade][2] = remainingMin;
    }

    for(upgrade in tempUpgradeTimesFlag){
        let minutes = upgradeTimesFlag[upgrade][0]*24*60+upgradeTimesFlag[upgrade][1]*60+upgradeTimesFlag[upgrade][2];

        minutes = minutes*(1-(reduction/100));

        let days = Math.floor(minutes / 1440);
        let remainingTime = parseInt(minutes - Math.floor((days *1440)));
        let hours = Math.floor((remainingTime / 60));
        let remainingMin = Math.floor(remainingTime - (hours*60));

        tempUpgradeTimesFlag[upgrade][0] = days; // New Days
        tempUpgradeTimesFlag[upgrade][1] = hours;
        tempUpgradeTimesFlag[upgrade][2] = remainingMin;
    }

    updateTable();
}

function toTime(upgradeLevel, flagFlag){
    if(flagFlag) return tempUpgradeTimesFlag[upgradeLevel][0]+"d "+tempUpgradeTimesFlag[upgradeLevel][1]+"h "+tempUpgradeTimesFlag[upgradeLevel][2]+"m";
    return upgradeTimes[upgradeLevel][0]+"d "+tempUpgradeTimes[upgradeLevel][1]+"h "+tempUpgradeTimes[upgradeLevel][2]+"m";
}

document.addEventListener("DOMContentLoaded", function() {
    const upgradesContainers = document.getElementsByClassName("upgrades");

    // Iterate over each upgrades container
    for (let i = 0; i < upgradesContainers.length; i++) {
        const upgrades = upgradesContainers[i].querySelectorAll(".upgrade");
        
        // Add event listeners to each upgrade checkbox
        upgrades.forEach(function (checkbox) {
            checkbox.addEventListener("change", function () {
                const shipName = this.closest('.ship').querySelector('h2').textContent.trim();
                const upgradeLevel = this.textContent[1]+=this.textContent[2];
                
                // Clear old state
                for (let j = 0; j < upgrades.length; j++) {
                    upgrades[j].querySelector("input").checked = false;
                }
                
                // Modify for loop boundaries based on upgrade level i.e X1 should do all below X1, U1 should only do itself
                const offsets = {
                    "U1": 3,
                    "U2": 2,
                    "U3": 1,
                    "X1": 0,
                }
                
                for (let j = 0; j < upgrades.length-offsets[upgradeLevel]; j++) {
                    upgrades[j].querySelector("input").checked = true;
                }

                updateStatBlock(shipName,upgradeLevel);
                
                console.log(`Upgrade ${upgradeLevel} toggled for ${shipName}`);
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const upgradesContainers = document.getElementsByClassName("upgrades");

    // Iterate over each upgrades container
    for (let i = 0; i < upgradesContainers.length; i++) {
        const upgrades = upgradesContainers[i].querySelectorAll(".upgrade");
        const clear = upgradesContainers[i].querySelectorAll(".clear")
        // Add event listeners to each upgrade checkbox
        clear.forEach(function (button) {
            button.addEventListener("click", function () {
                const shipName = this.closest('.ship').querySelector('h2').textContent.trim();
                
                // Clear old state
                for (let j = 0; j < upgrades.length; j++) {
                    upgrades[j].querySelector("input").checked = false;
                }
                
                updateStatBlock(shipName,"U0");

                console.log(`Upgrades cleared for ${shipName}`);
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("intelLevel").addEventListener("change", function(input){
        reduceTime(parseInt(input.target.value));
    })
});

// Function called to update the stats based on given upgrade levels.
function updateStatBlock(shipName, upgradeLevel){
    if(shipName == "Flagship");
    
}