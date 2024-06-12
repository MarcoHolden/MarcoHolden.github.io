const track = document.getElementById("image-track");
const reviewContainer = document.getElementById("review-container");
const reviewText = document.getElementById("review-text");
const reviewImage = document.querySelector("#review-image img");
let isDragging = false;

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
    isDragging = true;
}

window.onmousemove = e => {
    if (!isDragging || track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
            prevPercentage = parseFloat(track.dataset.prevPercentage),
            nextPercentage = Math.max(Math.min(prevPercentage + percentage, 0), -82.5);

    track.style.transform = `translate(${nextPercentage}%, -50%)`;

    for (const image of track.getElementsByClassName("image")) {
        image.style.objectPosition = `${100 + nextPercentage}% center`;
    }
}

window.onmouseup = () => {
    isDragging = false;
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.style.transform.match(/-?\d+\.?\d*/)[0];
}

window.onresize = () => {
    track.style.paddingLeft = `calc(50vw - 20vmin)`; // Adjust padding to keep images centered
    track.dataset.prevPercentage = 0;
    track.style.transform = `translate(0%, -50%)`;
}

function toggleAudio() {
    const myAudio = document.getElementById("my-audio");
    if (myAudio.paused) {
        myAudio.play();  // If the audio is paused, play it
        document.getElementById("toggle-audio").textContent = 'Mute'; // Change button text to Mute
    } else {
        myAudio.pause(); // If the audio is playing, pause it
        document.getElementById("toggle-audio").textContent = 'Play'; // Change button text to Play
    }
}

document.body.onclick = () => {
    if (isAudioPlayed) return;
    playAudio();
}

for (const image of track.getElementsByClassName("image")) {
    image.onclick = (e) => {
        if (isDragging) return;
        e.stopPropagation();
        showReview(image);
    }
}

function showReview(image) {
    const reviewContent = image.dataset.review
        .split('\n')
        .map(line => line.trim())
        .join('<br>');

    reviewText.innerHTML = reviewContent;
    reviewImage.src = image.src;
    reviewContainer.style.display = 'flex';
}

function closeReview() {
    reviewContainer.style.display = 'none';
}

reviewContainer.onclick = closeReview;