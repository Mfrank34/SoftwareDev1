 // word gen cansin

 // user vailations cansin

 // learder board - mike 
const filePath = "PlayerData.json"
const PlayerData = []

function sort(a, b) {
    return b.score - a.score; // Sorts in descending order
}

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



 // main page interations - mike

function Submit(id) {
    return document.getElementById(id).value;
}

// below are is an event listerner is looks for inteaction within the page
document.addEventListener("DOMContentLoaded", function() {
    // button for user names
    document.getElementById("NameSubmit").onclick = function(){
        const UserName = Submit('Name');
        document.getElementById("currentUser").textContent = UserName // updates heading 3 on leaderboards
        console.log(UserName)
    };

    // get word for the cansin to user and save
    document.getElementById("WordSubmit").onclick = function(){
        const UserWord = Submit('InputWord');
        console.log(UserWord);
    };

    // update leaderboard
    document.getElementById("leaderboardUpdate").onclick = function(){

    };

    // more if needed idk 

    
});


 // colour letters - both  


