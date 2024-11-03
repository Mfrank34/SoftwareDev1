
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


 // learder board - mike 
 const filePath = "PlayerData.json"
 const PlayerData = []
 
 function sort(a, b) {
     return b.score - a.score; // Sorts in descending order
 };
 
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
 };

 document.getElementById("WordSubmit").onclick = async function(){
    console.log(`Submit Clicked!`)
//validates the input
    const UserWord = Submit('InputWord').toLowerCase();
    const checkValid = await inputValidation(UserWord);
// cheeking if true
    if (checkValid){
    // UserWord same as result = true
        if (UserWord == result){
            document.getElementById("playerCounter").textContent = `Winner!!`
            // disables loop
            numAttempts = 0
        };
    //checks the user has guessed  5 times
        if (numAttempts >= 5){
            document.getElementById("error").textContent = `All guesses used. The word was: ${result}`;
            document.getElementById("WordSubmit").disabled = true;
            wordDefinition(result);
        };
    };
    numAttempts++; //adds one to numAttempts
    console.log(`Attempt ${numAttempts}: ${UserWord}`); //prints the users guess with the guess number

    // login on screen
    let id = findPosition(EnteredAttemps, numAttempts);
    console.log(`current list id: ${id}`);
    document.getElementById(id).textContent = UserWord;
 }



document.getElementById("WordSubmit").onclick = async function(){
    //console.log(`Submit Clicked!`) bug testing
    const UserWord = Submit('InputWord').toLowerCase();
    const checkValid = await inputValidation(UserWord);
    // stage 1
    if (checkValid){ // if valid is true continue
        if (numAttempts !== 0) { // if attemps is not equal to 0 
            if (UserWord == result) { // if Userword is equal to results!!
                document.getElementById("playerCounter").textContent = `Winner!!`;
                numAttempts = 0;
            } else if (numAttempts <= 5 ) { // 5 or lower then 5
                numAttempts-- // removes 
                let id = findPosition(EnteredAttemps, numAttempts);
                console.log(`current list id: ${id}`);
                document.getElementById(id).textContent = UserWord;
            } else if (numAttempts == 5) { // ran out of lives 
                document.getElementById("error").textContent = `All guesses used. The word was: ${result}`;
                document.getElementById("WordSubmit").disabled = true;
                wordDefinition(result)
            };
            
        };
    };
};


document.getElementById("WordSubmit").onclick = async function(){
    console.log(`Submit Clicked!`)
//validates the input
    const UserWord = Submit('InputWord').toLowerCase();
    const checkValid = await inputValidation(UserWord);
// cheeking if true
    if (checkValid){
    // UserWord same as result = true
        if (UserWord == result){
            document.getElementById("playerCounter").textContent = `Winner!!`
            // disables loop
            numAttempts = 0
        };
    //checks the user has guessed  5 times
        if (numAttempts >= 5){
            document.getElementById("error").textContent = `All guesses used. The word was: ${result}`;
            document.getElementById("WordSubmit").disabled = true;
            wordDefinition(result);
        };
    };
    numAttempts++; //adds one to numAttempts
    console.log(`Attempt ${numAttempts}: ${UserWord}`); //prints the users guess with the guess number

    // login on screen
    let id = findPosition(EnteredAttemps, numAttempts);
    console.log(`current list id: ${id}`);
    document.getElementById(id).textContent = UserWord;
    
};


else if (numAttempts == 0) { // ran out of lives
    document.getElementById("error").textContent = `All guesses used. The word was: ${result}`;
    document.getElementById("WordSubmit").disabled = true;
    wordDefinition(result)

    console.log(`no more attemps | ${numAttempts}`)
} else {
    console.log(`end of "if" statement! | ${numAttempts}`)
};