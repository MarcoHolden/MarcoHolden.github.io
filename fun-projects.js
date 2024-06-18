const player = document.getElementById('player');
const gameContainer = document.getElementById('game-container');
let playerVelocity = 0;
let isJumping = false;
let platforms = Array.from(document.querySelectorAll('.platform'));
const platformSpeed = 0.5;  // Slower speed for falling platforms
let isPaused = true;
let animationFrameId;
const moveSpeed = 5;  // Reduced speed for smoother movement
let keysPressed = { left: false, right: false };
let gameWon = false;  // Track if the game is won

document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowLeft') {
        keysPressed.left = true;
    } else if (event.code === 'ArrowRight') {
        keysPressed.right = true;
    } else if (event.code === 'Space' && !isJumping) {
        jump();
    } else if (event.code === 'KeyP') {
        pauseGame();
    } else if (event.code === 'KeyS') {
        startGame();
    } else if (event.code === 'KeyR') {
        resetGame();
    }
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowLeft') {
        keysPressed.left = false;
    } else if (event.code === 'ArrowRight') {
        keysPressed.right = false;
    }
});

function movePlayer() {
    if (isPaused || gameWon) return;
    const playerRect = player.getBoundingClientRect();
    const gameRect = gameContainer.getBoundingClientRect();
    let newLeft = player.offsetLeft;

    if (keysPressed.left) newLeft -= moveSpeed;
    if (keysPressed.right) newLeft += moveSpeed;

    if (newLeft < 10) newLeft = 10;
    if (newLeft + playerRect.width-10 > gameRect.width) newLeft = gameRect.width - playerRect.width + 8;

    player.style.left = `${newLeft}px`;
}

function jump() {
    if (isPaused || gameWon) return;
    isJumping = true;
    playerVelocity = -10;
}

function createPlatform(top, left) {
    const platform = document.createElement('div');
    platform.classList.add('platform');
    platform.style.top = `${top}px`;
    platform.style.left = `${left}px`;
    gameContainer.appendChild(platform);
    platforms.push(platform);
}

function gameLoop() {
    if (isPaused || gameWon) return;
    const gravity = 0.5;
    const gameRect = gameContainer.getBoundingClientRect();

    playerVelocity += gravity;
    player.style.top = `${player.offsetTop + playerVelocity}px`;

    if (player.offsetTop + player.clientHeight >= gameRect.height) {
        player.style.top = `${gameRect.height - player.clientHeight}px`;
        playerVelocity = 0;
        isJumping = false;
    }

    movePlayer();

    platforms.forEach((platform, index) => {
        platform.style.top = `${platform.offsetTop + platformSpeed}px`;

        const platformRect = platform.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();

        if (
            playerRect.bottom >= platformRect.top &&
            playerRect.top <= platformRect.bottom &&
            playerRect.right >= platformRect.left &&
            playerRect.left <= platformRect.right &&
            playerVelocity > 0
        ) {
            playerVelocity = -10;
        }

        if (platform.offsetTop > gameRect.height) {
            gameContainer.removeChild(platform);
            platforms.splice(index, 1);
            createPlatform(-10, Math.random() * (gameRect.width - 100));
        }
    });

    // More frequent platform creation
    if (Math.random() < 0.01) {
        createPlatform(-10, Math.random() * (gameRect.width - 100));
    }

    // Check if player reaches the top of the game container
    if (player.offsetTop <= 0) {
        displayWinMessage();
        gameWon = true;
        return;
    }

    animationFrameId = requestAnimationFrame(gameLoop);
}

function pauseGame() {
    if (!isPaused) {
        isPaused = true;
        cancelAnimationFrame(animationFrameId);
    }
}

function startGame() {
    if (isPaused) {
        isPaused = false;
        gameLoop();
    }
}

function resetGame() {
    // Reset player position and velocity
    player.style.top = '450px';
    player.style.left = '200px';
    playerVelocity = 0;
    isJumping = false;

    // Remove existing platforms and create new ones
    platforms.forEach(platform => gameContainer.removeChild(platform));
    platforms = [];
    // createPlatform(300, 100);
    // createxPlatform(200, 200);
    // createPlatform(100, 300);

    // Remove win message if it exists
    const winMessage = document.getElementById('win-message');
    if (winMessage) {
        gameContainer.removeChild(winMessage);
    }

    // Reset game state
    gameWon = false;
    isPaused = true;
    cancelAnimationFrame(animationFrameId);

    // Start the game again
    startGame();
}

function displayWinMessage() {
    const winMessage = document.createElement('div');
    winMessage.id = 'win-message';
    winMessage.innerText = 'You Win!';
    winMessage.style.position = 'absolute';
    winMessage.style.top = '50%';
    winMessage.style.left = '50%';
    winMessage.style.transform = 'translate(-50%, -50%)';
    winMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    winMessage.style.color = 'white';
    winMessage.style.padding = '20px';
    winMessage.style.borderRadius = '10px';
    winMessage.style.fontSize = '24px';
    winMessage.style.textAlign = 'center';
    gameContainer.appendChild(winMessage);
}

// createPlatform(300, 100);
// createPlatform(200, 200);
// createPlatform(100, 300);
