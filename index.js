const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const timer = document.getElementById("timer");
const historyBtn = document.getElementById("history");
const historyContainer = document.getElementById("history-container");

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let formattedTime;
let history = [];

function startTimer() {
  historyContainer.innerHTML = "";
  startTime = Date.now() - elapsedTime;

  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    formattedTime = formatTime(elapsedTime);
    timer.innerText = formattedTime;
  }, 10);

  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function stopTimer() {
  historyContainer.innerHTML = "";
  history.push(formattedTime);
  clearInterval(timerInterval);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function resetTimer() {
  historyContainer.innerHTML = "";
  clearInterval(timerInterval);
  elapsedTime = 0;
  timer.innerText = "00:00:00";
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function formatTime(elapsedTime) {
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  return (
    (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
    ":" +
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
    ":" +
    (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") +
    "." +
    (milliseconds > 9 ? milliseconds : "0" + milliseconds)
  );
}

function getHistoryOfTimeLapse() {
  historyContainer.innerHTML = "";
  history.forEach((element) => {
    const pEle = document.createElement("p");
    pEle.innerText = `Stopped at: ${element}`;
    historyContainer.appendChild(pEle);
  });
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
historyBtn.addEventListener("click", getHistoryOfTimeLapse);
