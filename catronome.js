const strongTickSound = new Audio('audio/meow.mp3');
const midTickSound = new Audio('audio/midhit.mp3');
const weakTickSound = new Audio('audio/weakhit.mp3');
const startButton = document.getElementById('startButton');
let tempo = document.getElementById('tempo');
let metronomeOn = 0;
let metronomeWAIT = null;
let beat = 1;
let preloadedCat = null;
document.addEventListener('DOMContentLoaded', setRandomCatImage)
async function setRandomCatImage() {
    const catapi_call = await fetch ('https://api.thecatapi.com/v1/images/search')
    const catapi_json = await catapi_call.json()
    const img_url = catapi_json[0].url
    const image_elem = document.getElementById('randomcat')
    image_elem.src = img_url
    image_elem.height = 256
    image_elem.width = 312
}
// might use that later, will override for now since it lowkey pmo
document.addEventListener('DOMContentLoaded', () => {
    setRandomCatImage();
    preloadCatImage();
});
async function preloadCatImage() {
    const res = await fetch ('https://api.thecatapi.com/v1/images/search');
    const data = await res.json();
    const img = new Image();
    img.src = data[0].url;

    await img.decode();
    preloadedCat = img
}
function strongTick() {
    strongTickSound.cloneNode(true).play();
    if(preloadedCat) {
        const image_elem = document.getElementById('randomcat')
    image_elem.src = preloadedCat.src;
    image_elem.width = 312;
    image_elem.height = 256;

    preloadCatImage();
    }
}
function weakTick() {
    weakTickSound.cloneNode(true).play();
    
}
function midTick() {
    midTickSound.cloneNode(true).play();
}
startButton.addEventListener('click', function() {
    metronomeOn = (metronomeOn === 1) ? 0 : 1;
    console.log("TOGGLED " + metronomeOn);
    function playTick() {
            switch (beat) {
                case 1:
                    strongTick();
                    break;
                case 3:
                    midTick();
                    break;
                case 2:
                    weakTick();
                    break;
                case 4:
                    weakTick();
                break;
            }
                beat++;
                if(beat > 4) beat = 1;
        }
        if(metronomeOn == 1) {
        if(tempo.value > 400) {
            tempo.value = 400;
        }
        if(tempo.value < 30) {
            tempo.value = 30;
        }
    playTick();
    console.log(beat);
    metronomeWAIT = setInterval(playTick, 60000 / tempo.value);
} else {
    clearInterval(metronomeWAIT);
    metronomeWAIT = null;
    beat = 1;
}
});

