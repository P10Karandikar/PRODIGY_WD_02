// Stopwatch logic
let timer = null;
let elapsedTime = 0;
let lapCount = 0;

// Display element
const display = document.getElementById('display');
const lapList = document.getElementById('lap-list');

// Buttons
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');

// Format time function
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

// Update display
function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

// Start timer
startBtn.addEventListener('click', () => {
  if (timer === null) {
    const startTime = Date.now() - elapsedTime;
    timer = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 1000);
  }
});

// Pause timer
pauseBtn.addEventListener('click', () => {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
});

// Reset timer and laps
resetBtn.addEventListener('click', () => {
  clearInterval(timer);
  timer = null;
  elapsedTime = 0;
  lapCount = 0;
  lapList.innerHTML = '';
  updateDisplay();
});

// Record a lap
lapBtn.addEventListener('click', () => {
  if (timer !== null) {
    lapCount++;
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapList.appendChild(lapItem);
  }
});

// Initial display update
updateDisplay();
