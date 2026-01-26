const tickSound = new Audio('audio/meow.mp3');
function tick() {
    tickSound.cloneNode(true).play();
}
document.addEventListener('click', function() {
tick();
console.log("SUCCESS");
});
