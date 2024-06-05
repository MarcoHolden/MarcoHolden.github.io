const circle = document.getElementById('circle');
const buttons = document.getElementsByClassName('button');
const radius = Math.min(window.innerWidth, window.innerHeight) / 4; // Radius is one-quarter of the screen size
const center = [window.innerWidth/2, window.innerHeight/2]
const totalButtons = buttons.length;
const angleIncrement = (2 * Math.PI) / totalButtons;
let angle = -Math.PI / 2;
let rotationAngle = 0;

function rotateButtons() {
    rotationAngle += 1; // Adjust the rotation speed as needed
    circle.style.transform = `rotate(${rotationAngle}deg)`;
}

setInterval(rotateButtons, 50); // Adjust the interval as needed

function moveButtons() {    
    for (let i = 0; i < totalButtons; i++) {
        const x = Math.round(radius * Math.cos(angle));
        const y = Math.round(radius * Math.sin(angle));
        buttons[i].style.transform = `translate(${x}px, ${y}px)`;
        angle += angleIncrement;
    }
}
console.log(buttons.length);
moveButtons();
