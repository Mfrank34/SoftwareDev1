 // this coding interations in html 

(function() {
    function handleKey(event) {
        console.log(event.key)
    }

    document.addEventListener("keydown", event => {handleKey(event)})
})(); 
