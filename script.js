let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const restButton = document.getElementById('rest');
const modeText = document.getElementById('mode-text');
const warningBeep = new Audio('sounds/Clear-Announce-Tones-2861.wav');
const finalBeep = new Audio('sounds/Clear-Announce-Tones-2861.wav');

// Add this to test the sound path
console.log('Loading sound from:', warningBeep.src);

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update the display elements
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update the page title
    document.title = `${timeString} - ${isWorkTime ? 'Work' : 'Rest'} Timer`;
}

function startTimer() {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            
            // Warning beep at 1 minute remaining
            if (timeLeft === 60) {
                warningBeep.play();
            }
            
            // Final countdown beeps
            if (timeLeft <= 5 && timeLeft > 0) {
                finalBeep.play();
            }
            
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                switchMode();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    if (confirm('Are you sure you want to reset the timer?')) {
        clearInterval(timerId);
        timerId = null;
        timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
        updateDisplay();
    }
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
    modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    updateDisplay();
}

function setRestMode() {
    clearInterval(timerId);
    timerId = null;
    
    if (isWorkTime) {
        // Switch to rest mode
        timeLeft = 5 * 60;  // Changed from 75 to 5 minutes (300 seconds)
        modeText.textContent = 'Time for a 5-minute break. Stretch and hydrate!';
        restButton.textContent = 'Work Mode';
        isWorkTime = false;
    } else {
        // Switch to work mode
        timeLeft = 25 * 60;
        modeText.textContent = 'Anyone can focus for 1 minute. Just do that 25 times.';
        restButton.textContent = 'Rest Mode';
        isWorkTime = true;
    }
    
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
restButton.addEventListener('click', setRestMode);

// Initialize display
updateDisplay(); 

// Uncomment this line to test sounds
// setTimeout(testSounds, 2000); 