const strongTickSound = new Audio('audio/meow.mp3');
const midTickSound = new Audio('audio/midhit.mp3');
const weakTickSound = new Audio('audio/weakhit.mp3');
const startButton = document.getElementById('startButton');
let tempo = document.getElementById('tempo');
let metronomeOn = 0;
let metronomeWAIT = null;
let beat = 1;
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
                    break;
                case 3:
                    midTick();
                    break;
                case 2:
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

