 
 // word gen cansin
let result = " ";

async function wordGenAPI(link) {
    const response = await fetch(link)

    if (!response.ok) {
        return null;
    }

    const data = await response.json();

    //Checks if the api returns a result so that a backup api can be used in the case it fails
    if (!data || data.length===0) {
        return null;
    }

    //console.log(`Get API | ${data}`)
    return data;
}

async function dictionary(dicLink) {
    const response = await fetch(dicLink)

    if (!response.ok) {
        return null;
    }

    const data = await response.json();

    //Checks if the api returns a result so that a backup api can be used in the case it fails
    if (!data || data.length===0) {
        return null;
    }

    return data;
}

async function wordGen() {
    let word;

    word = await wordGenAPI("https://random-word-api.herokuapp.com/word?length=5")
    console.log(`first API ${word}`);

    //Uses this word gen api if the first api fails
    if (!word){
        word = await wordGenAPI("https://random-word.ryanrk.com/api/en/word/random/?length=5")
        console.log(`second Api ${word}`)
    }
    return word;
};

async function wordDefinition(word) {
    //prints out the definition of word using dictionary api
    console.log(word)
    let dicResult = await dictionary("https://api.dictionaryapi.dev/api/v2/entries/en/" + word )
    let def1 = dicResult[0].meanings[0].definitions[0].definition
    console.log(`first definitions: ${def1}`)
    
    // Checks if there's a second deffinition for a word and then prints that out if there is
    if (dicResult[0].meanings[0].definitions[1]){
        let def2 = dicResult[0].meanings[0].definitions[1].definition
        console.log(`second definitions: ${def2}`)
    }
};

//input vaidation - Cansin
async function inputValidation(UserWord) {
    //gets the error element element from the html file and clears the previous error message
    const errorElement = document.getElementById("error");
    errorElement.textContent = "";

    //checks if the user has entered 5 characters and only letters
    if (UserWord.length !== 5 || !/^[a-zA-Z]+$/.test(UserWord)){ //allows only lower and uppecase letters from the english alphabet to be entered
        errorElement.textContent = "Please submit a 5 letter word only containing letters from the English alphabet. No numbers or special characters."
        return false; //ensures an invalid input isn't counted as a guess
    }

    //checks if the user entered and actual word using the same dictionary api
    const dicResult = await dictionary("https://api.dictionaryapi.dev/api/v2/entries/en/" + UserWord)
    if (!dicResult || dicResult.length === 0){
        errorElement.textContent = "Please enter an actual valid word";
        return false;//same as before in the if statement before this one
    }

    return true; //if input it valid
};

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

    // main page interations - mike

function Submit(id) {
    return document.getElementById(id).value;
};

// input 5 for keeping to positive numbers
function LivesUpdater(differentsBy, numAttempts){ 
    // differntBy is the starting health which is 5 lives
    document.getElementById(`playerCounter`).textContent = `Lives Left: ${ differentsBy - numAttempts}`
};


// below are is an event listerner is looks for inteaction within the page
document.addEventListener("DOMContentLoaded", function() {
    // verables for game
    let numAttempts = 0;
    let result = "";
    let EnteredAttemps = [];

    // forces player to click start
    document.getElementById("WordSubmit").disabled = true
    
    // starts // 
    document.getElementById("GameButton").onclick = async function() {
        numAttempts = 0; // sets attemps to zero 
        result = await wordGen(); // generates words
        
        // logs it!
        console.log(` Start Button | lives: ${numAttempts} | Word: ${result}`);
        LivesUpdater(5, numAttempts);; // updates player attemps
        
        // resets UI elements
        document.getElementById("WordSubmit").disabled = false; // re enables button after disablement!!
        document.getElementById(`GameButton`).textContent = `Restart!`;
        document.getElementById("error").textContent = ``;
    };
        

    // get word for the cansin to user and save
    document.getElementById("WordSubmit").onclick = async function(){
        //console.log(result)

        if (numAttempts >=5){
            document.getElementById("error").textContent = `All guesses used. The word was: ${result}`;
            return;
        } 
        
        const UserWord = Submit('InputWord').toLowerCase();
        // console.log(UserWord); 
        
        //validates the input
        const checkValid = await inputValidation(UserWord);
        if (checkValid){
            if (UserWord == result){
                document.getElementById("playerCounter").textContent = `Winner!!`
                numAttempts = 5
            } else {
                LivesUpdater(5, numAttempts)
            };
            
            numAttempts++; //adds one to numAttempts
            console.log(`Attempt ${numAttempts}: ${UserWord}`); //prints the users guess with the guess number
            
            //checks the user has guessed  5 times
            if (numAttempts >= 5){
                document.getElementById("error").textContent = `All guesses used. The word was: ${result}`;
                document.getElementById("WordSubmit").disabled = true;
                wordDefinition(result);
            };
        }
        
    };

            // leaderboard interations here below
    // button for user names
    document.getElementById("NameSubmit").onclick = function(){
        const UserName = Submit('Name');
        document.getElementById("currentUser").textContent = UserName // updates heading 3 on leaderboards
        console.log(UserName)
    };

    // update leaderboard
    document.getElementById("leaderboardUpdate").onclick = function(){
        console.log(fetchJSONData())
    };

}); // end of event listerner 

 // colour letters - both  

