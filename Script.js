 
 // word gen cansin
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
    };
    document.getElementById(`WordDef`).textContent = def1;
    document.getElementById(`WordDef_2`).textContent = def2;
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

// bug fix
async function wordChecker(Word) {
    const dicResult = await dictionary("https://api.dictionaryapi.dev/api/v2/entries/en/" + Word)
    if (!dicResult || dicResult.length === 0){
        return true;//same as before in the if statement before this one
    }
    return false; //if input it valid
};

    // main page interations - mike

function ColourText(Word, genWord) {
    let colouredLetters = ""; // Initialize variable to store colored letters
    for (let i = 0; i < Word.length; i++) {
        const userLetter = Word[i]; // Current letter from UserWord
        const targetLetter = genWord[i]; // Corresponding letter from result
        // console.log(`userLetter: ${userLetter} || TargetLetter ${targetLetter}`)
        if (userLetter === targetLetter) {
            // Correct position
            colouredLetters += `<div class="letter-box green">${userLetter}</div>`;
            //console.log(colouredLetters)
        } else if (genWord.includes(userLetter)) {
            // Correct letter, wrong position
            colouredLetters += `<div class="letter-box yellow">${userLetter}</div>`;
            //console.log(colouredLetters)
        } else {
            // Incorrect letter
            colouredLetters += `<div class="letter-box grey">${userLetter}</div>`;
            //console.log(colouredLetters)
        }
    }
    return colouredLetters; // Return the colored letters
}
    

function Submit(id) {
    return document.getElementById(id).value;
};

function findPosition(list, index) {
    return list.indexOf(index) // takes in a list and return the value in the index
};

// input 5 for keeping to positive numbers
function LivesUpdater(numAttempts){ 
    // differntBy is the starting health which is 5 lives
    document.getElementById(`playerCounter`).textContent = `Lives Left: ${numAttempts}`
};


// below are is an event listerner is looks for inteaction within the page
document.addEventListener("DOMContentLoaded", function() {
    // verables for game
    const outputContainer = document.getElementById("output");
    let numAttempts = 5;
    let result = "";
    const ListOfWords = [];
    
    // forces player to click start
    document.getElementById("WordSubmit").disabled = true
    
    // starts // 
    document.getElementById("GameButton").onclick = async function() {
        console.log(`Start Clicked!`)
        numAttempts = 5; // sets attemps to zero
        ListOfWords.length = 0; // clear the array for user inputs 
    // bug when generating word...
        let check = true;
        while (check) {
            result = await wordGen(); // generates words
            check = await wordChecker(result);
            console.log(`waiting for false: ${check}`)
        };
        // logs it!
        console.log(`lives: ${numAttempts} | Word: ${result}`);
        LivesUpdater(numAttempts); // updates player attemps
        // resets UI elements
        document.getElementById("WordSubmit").disabled = false; // re enables button after disablement!!
        document.getElementById(`GameButton`).textContent = `Restart!`;
        document.getElementById("error").textContent = ``;
        // reset game table 
        outputContainer.innerHTML = ""; // clears the box!! its really important that we clear it!
    };
    
    // get word for the cansin to user and save
    document.getElementById("WordSubmit").onclick = async function(){
        //console.log(`Submit Clicked!`) bug testing
        const UserWord = Submit('InputWord').toLowerCase();
        const checkValid = await inputValidation(UserWord);
    // checking if word is valid then proceeds
        // stage 1
        if (checkValid){ // if valid is true continue
            console.log(`LOGGING LIST OF WORDS || ${ListOfWords}`)
            ListOfWords.push(UserWord);

            // game play loop 
            if (numAttempts !== 0) { // if attemps is not equal to 0 
                // stage 1
                if (UserWord == result) { // if Userword is equal to results!!
                    document.getElementById("playerCounter").textContent = `Winner!!`;
                    document.getElementById("WordSubmit").disabled = true;
                    numAttempts = 0;
                    console.log(`User compared to Result | attemps: ${numAttempts}` ) // loging 
                    // word definition 
                    document.getElementById(`WordId`).textContent = result;
                    wordDefinition(result);
                // stage 2
                } else if (numAttempts > 0 && numAttempts <= 5 ) { // 5 or lower then 5
                    numAttempts-- // removes 
                    LivesUpdater(numAttempts);
                    // display for words
                    outputContainer.innerHTML = ""; // clears the box!! its really important that we clear it!!
                    // for loop userwords

                    console.log(result)
                    ListOfWords.forEach(word => {
                        // Wrap each word's output in a div with the class "word-container"
                        const wordHTML = `<div class="word-container">${ColourText(word, `${result}`)}</div>`;
                        outputContainer.innerHTML += wordHTML; // Append each word's output to the main container
                    });
                    // end of colored words
                    console.log(`lower then 5 | attemps: ${numAttempts}`)
                };
            // stage 3
            } else if (numAttempts == 0) { // attemps rain out 
                document.getElementById("error").textContent = `All guesses used. The word was: ${result}`;
                document.getElementById("WordSubmit").disabled = true;
                // update 
                document.getElementById(`WordId`).textContent = result;
                wordDefinition(result);
            };
        };
    };
}); // end of event listerner 

