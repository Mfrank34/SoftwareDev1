 // word gen cansin

 // user vailations cansin

 // learder board - mike 

 // goes and fetches the data from player data
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

let leaderboard = fetchJSONData();

 function Update_LeaderBoard() {
    try{
        
    }
    catch(err) {

    }
 };

 // main page interations - mikr

 // colour letters - both  


