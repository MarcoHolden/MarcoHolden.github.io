// animations.js
document.addEventListener("DOMContentLoaded", function() {
    const target = document.getElementById('animated-text');
    const text = target.innerText;
    const characters = Array.from(text).map(char => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        return span;
    });

    // Clear the current text and prepare to re-add with animation
    target.innerText = '';
    characters.forEach((span, i) => {
        target.appendChild(span); // Initially add without animation
        // Apply animation with delay
        setTimeout(() => {
            span.className = 'character';
            span.style.animationDelay = '0s'; // Override any CSS delays

            setTimeout(() => {
                span.className = '';
            }, 600*3);
        }, 1000 + i * 100); // Start animation 1 second after page load, each letter 100ms apart
    });
});
