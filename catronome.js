document.addEventListener('DOMContentLoaded', (event) => {
const tickSound = new Audio('audio/ding.mp3');

function tick() {
    tickSound.play();
}
window.onload = function() {
    console.log("SUCCESS");
    tick();
}
}); 