const timer = {
  pomodoroShort: 25,
  pomodoroMedium: 35,
  pomodoroLong: 45,
  shortBreak: 5,
  longBreak: 10,
  intervals: 4,
};

const phrases = ["Remember to stretch", "Get some water"];

const shortTimer = document.getElementById("pomodoro-short");
const mediumTimer = document.getElementById("pomodoro-medium");
const longTimer = document.getElementById("pomodoro-long");
const startTimer = document.getElementById("start-timer");
const pauseTimer = document.getElementById("pause-timer");
const timerContainer = document.getElementById("timer-container");
const breakContainer = document.getElementById("break-container");
const breakTitle = document.getElementById("break-paragraph");

let selectedTime = timer.pomodoroShort;
let intervalCount = 0;
let countdownInterval;
let timeRemaining = 0;
let sec;
let min;
let isPaused = false;

shortTimer.addEventListener("click", function () {
  document.getElementById("minutes").innerHTML = timer.pomodoroShort;
  clearInterval(countdownInterval);
  selectedTime = timer.pomodoroShort;
});

mediumTimer.addEventListener("click", function () {
  document.getElementById("minutes").innerHTML = timer.pomodoroMedium;
  clearInterval(countdownInterval);
  selectedTime = timer.pomodoroMedium;
});

longTimer.addEventListener("click", function () {
  document.getElementById("minutes").innerHTML = timer.pomodoroLong;
  clearInterval(countdownInterval);
  selectedTime = timer.pomodoroLong;
});

// start countdown:
function countdown() {
  if (sec === 0) {
    if (min === 0) {
      // toglie l'intervallo
      clearInterval(countdownInterval);
      // timer nascosto:
      timerContainer.classList.add("hidden");
      // break timer visibile:
      breakContainer.classList.remove("hidden");
      // chiama funzione del countdown break
      breakCountdown();
      // funzione display frasi:
      displayPhrases();
      // effetto frase:
      setTimeout(() => {
        breakTitle.style.opacity = 1;
        breakTitle.style.transition = "450ms ease-in-out";
      }, 50);
    } else {
      min--;
      sec = 59;
    }
  } else {
    sec--;
  }

  document.getElementById("minutes").innerHTML = min;
  // formatta secondi da 9 a 1 con : 09, 08 ecc. :
  document.getElementById("seconds").innerHTML = sec < 10 ? "0" + sec : sec;
}

// funzione per inizializzare il timer:
function startCountdown() {
  timerContainer.classList.remove("hidden");
  breakContainer.classList.add("hidden");
  if (!isPaused) {
    min = selectedTime;
    sec = 0;
    timeRemaining = min * 60 + sec;
    countdown();
    countdownInterval = setInterval(countdown, 1000);
    isPaused = false;
  }
}

// funzione del countdown 5 minuti:
function breakCountdown() {
  min = timer.shortBreak;
  sec = 0;
  let intervalBreak;

  function breakCountdownStart() {
    if (sec === 0) {
      if (min === 0) {
        clearInterval(intervalBreak);
        intervalCount++;
        if (intervalCount < timer.intervals) {
          alert(`Good Job, let's start again`);
          startCountdown();
        } else {
          alert("You completed all the intervals! Good job!");
          restart();
        }
      } else {
        min--;
        sec = 59;
      }
    } else {
      sec--;
    }

    document.getElementById("break-minutes").innerHTML = min;
    // formatta secondi da 9 a 1 con : 09, 08 ecc. :
    document.getElementById("break-seconds").innerHTML =
      sec < 10 ? "0" + sec : sec;
  }
  intervalBreak = setInterval(breakCountdownStart, 1000);
}

// funzione mostra frasi:
function displayPhrases() {
  let phrasesIndex = 0;
  let breakParagraph = setInterval(() => {
    if (phrasesIndex < phrases.length) {
      breakTitle.innerHTML = "";
      let newSpan = document.createElement("span");
      newSpan.classList.add("new-span");
      newSpan.innerText = phrases[phrasesIndex];
      breakTitle.append(newSpan);
      phrasesIndex++;
      setTimeout(() => {
        newSpan.style.opacity = 1;
        newSpan.style.transition = "450ms ease-in-out";
      }, 100);
    } else {
      // start over again
      phrasesIndex = 0;
      if (min === 0) {
        clearInterval(breakParagraph);
      }
    }
  }, 1000);
}

// funzione pausa:
function pause() {
  clearInterval(countdownInterval);
  timeRemaining = min * 60 + sec;
  isPaused = true;
}
// funzione resume:
function resume() {
  min = Math.floor(timeRemaining / 60);
  sec = timeRemaining % 60;
  countdownInterval = setInterval(countdown, 1000);
}

startTimer.addEventListener("click", function () {
  if (isPaused) {
    resume();
  } else {
    startCountdown();
  }
});
pauseTimer.addEventListener("click", pause);

//funzione restart:
function restart() {
  clearInterval(countdownInterval);
  intervalCount = 0;
  min = selectedTime;
  sec = 0;
  isPaused = false;
}
