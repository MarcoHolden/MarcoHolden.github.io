document.addEventListener("DOMContentLoaded", function() {
    const target = document.getElementById('animated-text');
    const text = target.innerText;
    const borderFrame = document.getElementById('border-frame');
    const buttonsContainer = document.getElementById('button-container');

    // Check if the page has been visited before
    const hasVisited = localStorage.getItem('hasVisited');

    if (hasVisited) {
        // Skip animations and show the final state
        target.innerText = text;
        adjustAndShowBorder(borderFrame, target);
        showButtons(buttonsContainer);
    } else {
        // First visit: play animations
        prepareAndAnimateText(target, text);

        setTimeout(() => {
            adjustAndShowBorder(borderFrame, target);
            // Display buttons after the border is shown
            showButtons(buttonsContainer);
        }, 3000); // Delay to sync with text animation

        // Set the flag in local storage to indicate the page has been visited
        localStorage.setItem('hasVisited', 'true');
    }

    window.addEventListener('resize', () => adjustBorderOnResize(borderFrame, target));
    document.addEventListener('fullscreenchange', () => adjustBorder(borderFrame, target));
    document.addEventListener('mozfullscreenchange', () => adjustBorder(borderFrame, target)); // Firefox
    document.addEventListener('webkitfullscreenchange', () => adjustBorder(borderFrame, target)); // Chrome, Safari, Opera
    document.addEventListener('msfullscreenchange', () => adjustBorder(borderFrame, target)); // IE / Edge
});

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        var backgroundVideo = document.getElementById("background-video");
        backgroundVideo.play();  // Start playing the video after 10 seconds
    }, 7000);  // Delay in milliseconds (7000ms = 7 seconds)
});

var isAudioPlayed = false;

function toggleAudio() {
    const myAudio = document.getElementById("my-audio");
    if (myAudio.paused) {
        myAudio.play();  // If the audio is paused, play it
        document.getElementById("toggle-audio").textContent = '🔇 Mute'; // Change button text to Mute
    } else {
        myAudio.pause(); // If the audio is playing, pause it
        document.getElementById("toggle-audio").textContent = '🔊 Play'; // Change button text to Play
    }
}

document.body.onclick = () => {
    if (isAudioPlayed) return;
    playAudio();
};
