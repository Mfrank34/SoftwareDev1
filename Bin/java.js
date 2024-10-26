
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
