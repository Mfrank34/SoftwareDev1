 // word gen cansin

 // user vailations cansin

 // learder board - mike 

 // goes and fetches the data from player data

 function sort(a, b) {
    return b.score - a.score; // Sorts in descending order
}

function GetUserData(UserData, filePath) {
    /**
     * Reads data from a JSON file and appends it to UserData
     */
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileContent);
        
        // Merge and sort data by score in descending order
        UserData.push(...data);
        UserData.sort(sort);
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.log('No valid UserData within file');
        } else {
            console.error(error);
        }
    }
};




s
 function Update_LeaderBoard() {
    try{
        
    }
    catch(err) {

    }
 };

 // main page interations - mikr

 // colour letters - both  


