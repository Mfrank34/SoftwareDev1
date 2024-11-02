// write JavaScript here

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

async function main() {
    let result = await wordGenAPI("https://random-word-api.herokuapp.com/word?length=5")
    console.log(result);

    //Uses this word gen api if the first api fails
    if (!result){
        result = await wordGenAPI("https://random-word.ryanrk.com/api/en/word/random/?length=5")
        console.log(result)
    }


//prints out the definition of word using a dictionary api
    let dicResult = await dictionary("https://api.dictionaryapi.dev/api/v2/entries/en/" + result[0])
    let def1 = dicResult[0].meanings[0].definitions[0].definition
    console.log(def1)

    // Checks if there's a second deffinition for a word and then prints that out if there is
    if (dicResult[0].meanings[0].definitions[1]){
        let def2 = dicResult[0].meanings[0].definitions[1].definition
        console.log(` def2`)
    }
    
    
}

main()