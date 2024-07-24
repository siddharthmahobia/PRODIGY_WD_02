const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapTimesList = document.getElementById('lapTimes');

let startTime;
let elapsedTime = 0;
let isRunning = false;
let lapCount = 0;

// Function to format time in minutes:seconds.milliseconds format
function formatTime(ms) {
  const minutes = Math.floor(ms / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  const milliseconds = Math.floor(ms % 1000);

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

// Function to start the stopwatch
function start() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    isRunning = true;
    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = true;
    interval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      display.textContent = formatTime(elapsedTime);
    }, 10);
  }
}

// Function to pause the stopwatch
function pause() {
  if (isRunning) {
    clearTimeout(interval);
    isRunning = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = false;
  }
}

// Function to reset the stopwatch
function reset() {
  clearTimeout(interval);
  elapsedTime = 0;
  isRunning = false;
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
  display.textContent = formatTime(elapsedTime);
  lapTimesList.innerHTML = "";
  lapCount = 0;
}

// Function to handle lap button press (optional)
function addLap() {
  if (isRunning) {
    const newLap = document.createElement('li');
    newLap.textContent = `Lap ${lapCount + 1}: ${formatTime(elapsedTime)}`;
    lapTimesList.appendChild(newLap);
    lapCount++;
  }
}

// Add event listeners to buttons
startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);

// Add optional lap functionality (replace with your desired implementation)
// lapButton.addEventListener('click', addLap);