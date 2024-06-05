const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letters2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

document.querySelector("h1").addEventListener("mouseover", function(event) {
    let iterations = 0;

    // Disable further hover events during animation
    this.style.pointerEvents = "none";

    const interval = setInterval(() => {
        event.target.innerText = event.target.dataset.value
            .split("")
            .map((letter, index) => {
                if (index < iterations) {
                    return event.target.dataset.value[index];
                } else {
                    return letters[Math.floor(Math.random() * 26)];
                }
            })
            .join("");

        iterations += 1/3;

        // Check if animation is complete
        if (iterations >= event.target.dataset.value.length) {
            clearInterval(interval);
            // Re-enable hover events after animation completes
            this.style.pointerEvents = "auto";
        }
    }, 40);
});

document.querySelector("h2").addEventListener("mouseover", function(event) {
    let iterations = 0;

    // Disable further hover events during animation
    this.style.pointerEvents = "none";

    const interval = setInterval(() => {
        event.target.innerText = event.target.dataset.value
            .split("")
            .map((letter, index) => {
                if (index < iterations) {
                    return event.target.dataset.value[index];
                } else {
                    return letters2[Math.floor(Math.random() * 26)];
                }
            })
            .join("");

        iterations += 1/3;

        // Check if animation is complete
        if (iterations >= event.target.dataset.value.length) {
            clearInterval(interval);
            // Re-enable hover events after animation completes
            this.style.pointerEvents = "auto";
        }
    }, 30);
});
