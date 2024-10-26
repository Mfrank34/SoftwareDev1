
// i did not write this LOLs
(function() {
    function handleKey(event) {
        console.log(event.key)
    }

    document.addEventListener("keydown", event => {handleKey(event)})
})(); 

function fetchJSONData() {
    fetch("./PlayerData.json")
        .then((res)=> {
            if(!res.ok){
                throw new Error
                (`HTTP error! Status: ${res.status}`);
            }
            return res.json()
        })
        .then((data) =>
            console.log(data))
        .catch((error) =>
            console.error("Unable to fetch data:", error))
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
    console.log(FetchPlayerData([], filePath))
}
