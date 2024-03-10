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

// Function called to update the stats based on given upgrade levels.
function updateStatBlock(shipName, upgradeLevel){
    if(shipName == "Flagship");
    
}