 // word gen cansin

 // user vailations cansin

 // learder board - mike 
const filePath = "PlayerData.json"
const PlayerData = []

function sort(a, b) {
    return b.score - a.score; // Sorts in descending order
}

function FetchPlayerData(PlayerData, filePath) {
    /**
     * Reads data from a JSON file, appends it to PlayerData, and returns the modified array.
     */
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileContent);
        
        // Merge and sort data by score in descending order
        const updatedData = [...PlayerData, ...data];
        updatedData.sort(sort); // Assuming each player has a 'score' property

        return updatedData;
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.log('No valid PlayerData within file');
        } else {
            console.error(error);
        }
        return PlayerData; // Return original data if there's an error
    }
}

function UpdatesPlaterData(PlayerData, filePath) {
    // Updates the user data
    FetchPlayerData(PlayerData, filePath);
    // Write updated PlayerData to JSON file
    fs.writeFileSync(filePath, JSON.stringify(PlayerData, null, 2));
}
function Update() {
    var filePath = "PlayerData.json"
     return FetchPlayerData(PlayerData, filePath)
}
function Update_LeaderBoard() {
    
 };

 // main page interations - mikr

 // colour letters - both  


