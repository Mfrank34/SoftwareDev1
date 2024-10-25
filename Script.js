 // word gen cansin

 // user vailations cansin

 // learder board - mike 

let filePath = "PlayerData.json"
let PlayerData = {}

 function sort(a, b) {
    return b.score - a.score; // Sorts in descending order
}

function FetchPlayerData(PlayerData, filePath) {
    /**
     * Reads data from a JSON file and appends it to PlayerData
     */
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileContent);
        
        // Merge and sort data by score in descending order
        PlayerData.push(...data);
        PlayerData.sort(sort);
    // error checking just incase it breaks you know
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.log('No valid PlayerData within file');
        } else {
            console.error(error);
        }
    }
};

function UpdatesPlaterData(PlayerData, filePath) {
    // Updates the user data
    FetchPlayerData(PlayerData, filePath);
    // Write updated PlayerData to JSON file
    fs.writeFileSync(filePath, JSON.stringify(PlayerData, null, 2));
}

function Update_LeaderBoard() {
    
 };

 // main page interations - mikr

 // colour letters - both  


