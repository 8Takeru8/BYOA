let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;
let timerInterval;
let isRestMode = false;

const timerDisplay = document.querySelector('.timer');
const resetButton = document.querySelector('#reset');
const modeButtons = document.querySelectorAll('.mode-btn');
const modeText = document.querySelector('.mode');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
    } else {
        clearInterval(timerInterval);
        isRunning = false;
    }
}

timerDisplay.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    } else {
        timerInterval = setInterval(updateTimer, 1000);
        isRunning = true;
        timerDisplay.classList.add('started');
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = isRestMode ? 5 * 60 : 25 * 60;
    updateDisplay();
});

// New mode switch handling
modeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        modeButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        // Update mode based on button text
        isRestMode = button.textContent.toLowerCase() === 'rest';
        
        // Reset timer for new mode
        clearInterval(timerInterval);
        isRunning = false;
        timeLeft = isRestMode ? 5 * 60 : 25 * 60;
        updateDisplay();
    });
});

updateDisplay(); 