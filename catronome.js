const strongTickSound = new Audio('audio/meow.mp3');
const midTickSound = new Audio('audio/midhit.mp3');
const weakTickSound = new Audio('audio/weakhit.mp3');
const startButton = document.getElementById('startButton');
let tempo = document.getElementById('tempo');
let metronomeOn = 0;
let metronomeWAIT = null;
let beat = 1;
document.addEventListener('DOMContentLoaded', setRandomCatImage)
async function setRandomCatImage() {
    const catapi_call = await fetch ('https://api.thecatapi.com/v1/images/search')
    const catapi_json = await catapi_call.json()
    const img_url = catapi_json[0].url
    const img_width = 312
    const img_height = 256
    const image_elem = document.getElementById('randomcat')
    image_elem.src = img_url
    image_elem.width = img_width
    image_elem.height = img_height
}
function strongTick() {
    strongTickSound.cloneNode(true).play();
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
                    setRandomCatImage();
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

