let strongTickSound = new Audio('audio/meow.mp3');
const midTickSound = new Audio('audio/midhit.mp3');
const superMid = new Audio('audio/stronghit.mp3')
const weakTickSound = new Audio('audio/weakhit.mp3');
const startButton = document.getElementById('startButton');
const timeSignature = document.getElementById('ts');
const hoverSound = new Audio('audio/hover.wav');
const blip = new Audio('audio/blip.mp3');
const keys = new Audio('audio/keyclick.mp3');
const catImage = document.getElementById('randomcat');
const minecraft = document.getElementById('minecraft');
const chadmeow = document.getElementById('chadmeow');
const doorboy = document.getElementById('doorboy');
const scratch = document.getElementById('scratch');
const nosound = document.getElementById('nosound');
const hoverable = document.querySelectorAll('.interactive');
const meowVolumeSlider = document.getElementById('volumeSlider');
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
})
timeSignature.addEventListener('change', () => {
    timeSignature.blur();
    blip.play();
    if(metronomeOn === 1) {
        beat = 1;
        pulseLength();
    }
})
minecraft.addEventListener('click', () => {
    blip.play();
    strongTickSound = new Audio('audio/minecraftcat.mp3');
})
chadmeow.addEventListener('click', () => {
    blip.play();
    strongTickSound = new Audio('audio/meow.mp3');
})
nosound.addEventListener('click', () => {
    blip.play();
    strongTickSound = new Audio('audio/stronghit.mp3');
})
doorboy.addEventListener('click', () => {
    blip.play();
    strongTickSound = new Audio('audio/doorboy.mp3');
})
scratch.addEventListener('click', () => {
    blip.play();
    strongTickSound = new Audio('audio/scratch.mp3');
})
hoverable.forEach(el => {
    el.addEventListener('mouseenter', () => {
        hoverSound.cloneNode(true).play();
    })
})
catImage.addEventListener('click', () => {
    strongTickSound.cloneNode(true).play();
})
tempo.addEventListener('change', () => {
    if(metronomeOn == 1) {
        if(tempo.value > 400) {
            tempo.value = 400;
        }
        if(tempo.value < 30) {
            tempo.value = 30;
        }
    }
    blip.play();
        if(metronomeOn === 1) {
        beat = 1;
        pulseLength();
    }
})
tempo.addEventListener('keydown', () => {
    keys.cloneNode(true).play();
})
async function preloadCatImage() {
    const res = await fetch ('https://api.thecatapi.com/v1/images/search');
    const data = await res.json();
    const img = new Image();
    img.src = data[0].url;

    await img.decode();
    preloadedCat = img
}
function strongTick() {
    const strongTickClone = strongTickSound.cloneNode(true);
    strongTickClone.volume = meowVolumeSlider.value / 100;
    strongTickClone.play();
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
function pulseLength() {
    clearInterval(metronomeWAIT);
    if(timeSignature.value == ("6/8")) {metronomeWAIT = setInterval(playTick, 30000 / tempo.value)}
    else {metronomeWAIT = setInterval(playTick, 60000 / tempo.value);}
}
    function playTick() {
        if(timeSignature.value === ("1/4") || timeSignature.value === ("4/4")) {
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
            }
        else if(timeSignature.value == ("6/8")) {
                        switch (beat) {
                case 1:
                    strongTick();
                    break;
                case 4:
                    midTick();
                    break;
                case 2:
                    weakTick();
                    break;
                case 3:
                    weakTick();
                    break;
                case 5:
                    weakTick();
                    break;
                case 6:
                    weakTick();
                    break;
                        }
        }
            else{
            switch (beat) {
                case 1:
                    strongTick();
                    break;
                case 3:
                    weakTick();
                    break;
                case 2:
                    weakTick();
                    break;
                case 4:
                    weakTick();
                break;
                case 5:
                    weakTick();
                break;
            }
            }
                if(timeSignature.value !== ("1/4")) {beat++;}
                if(timeSignature.value == ("4/4")) {if(beat > 4) beat = 1;}
                else if(timeSignature.value == ("3/4")) {if(beat > 3) beat = 1;}
                else if(timeSignature.value == ("5/4")) {if(beat > 5) beat = 1;}
                else if(timeSignature.value == ("6/8")) {if(beat > 6) beat = 1;}

        }
startButton.addEventListener('click', function() {
    blip.play();
    metronomeOn = (metronomeOn === 1) ? 0 : 1;
    console.log("TOGGLED " + metronomeOn);
        if(metronomeOn == 1) {
        if(tempo.value > 400) {
            tempo.value = 400;
        }
        if(tempo.value < 30) {
            tempo.value = 30;
        }
    playTick();
    console.log(beat);
    pulseLength();
} else {
    clearInterval(metronomeWAIT);
    metronomeWAIT = null;
    beat = 1;
}
});

