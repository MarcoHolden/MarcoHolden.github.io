document.addEventListener("DOMContentLoaded", function() {
    const target = document.getElementById('animated-text');
    const text = target.innerText;
    const borderFrame = document.getElementById('border-frame');

    target.innerText = ''; // Clear initial text
    const characters = Array.from(text).map(char => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        return span;
    });

    characters.forEach((span, i) => {
        target.appendChild(span);
        setTimeout(() => {
            span.className = 'character';
            span.style.animationDelay = '0s'; // Override any CSS delays

            setTimeout(() => {
                span.className = '';
            }, 600*3);
        }, 1000 + i * 100);
    });

    setTimeout(() => {
        const textRect = target.getBoundingClientRect();
        borderFrame.style.setProperty('--top', `${textRect.top}px`);
        borderFrame.style.setProperty('--left', `${textRect.left}px`);
        borderFrame.style.setProperty('--right', `${window.innerWidth - textRect.right}px`);
        borderFrame.style.setProperty('--bottom', `${window.innerHeight - textRect.bottom}px`);
        
        borderFrame.style.display = 'block'; // Make border visible
        borderFrame.style.animation = 'shrinkBorder 2s ease forwards';
    }, 3000); // Delay to sync with text animation

    
    window.addEventListener('resize', () => {
    
        const textRect = target.getBoundingClientRect();
        borderFrame.style.setProperty('--top', `${textRect.top}px`);
        borderFrame.style.setProperty('--left', `${textRect.left-15}px`);
        borderFrame.style.setProperty('--right', `${window.innerWidth - textRect.right-15}px`);
        borderFrame.style.setProperty('--bottom', `${window.innerHeight - textRect.bottom}px`);
            
        borderFrame.style.display = 'block'; // Make border visible

    });
});
