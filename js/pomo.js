
// -------------------- STATE --------------------
let focusTime = 1500;     // 25 min
let breakTime = 300;      // 5 min
let longBreakTime = 900;  // 15 min

let time = focusTime;
let timerInterval = null;
let isRunning = false;
let isMuted = false;      // 🔊 sound state

// optional sound (keep a file named alarm.mp3)
let alarm = new Audio("../assets/sounds/alarm.mp3");

// -------------------- DISPLAY --------------------
function updateDisplay(){
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  document.getElementById("timer").innerHTML = minutes + ":" + seconds;
}

// -------------------- PLAY / PAUSE --------------------
function pp(){
  let icon = document.getElementById("playIcon");

  if(isRunning){
    clearInterval(timerInterval);
    icon.src = "../assets/icon/play.png";
    isRunning = false;
  } else {
    timerInterval = setInterval(() => {
      if(time > 0){
        time--;
        updateDisplay();
      } else {
        clearInterval(timerInterval);
        isRunning = false;
        icon.src = "../assets/icons/play.png";

        // 🔊 play sound if not muted
        if(!isMuted){
          alarm.play();
        }
      }
    }, 1000);

    icon.src = "../assets/icons/pause.png";
    isRunning = true;
  }
}

// -------------------- RESET --------------------
function reset(){
  clearInterval(timerInterval);
  time = focusTime;
  isRunning = false;
  document.getElementById("playIcon").src = "../assets/icons/play.png";
  updateDisplay();
}

// -------------------- MODES --------------------
function focus(){
  clearInterval(timerInterval);
  time = focusTime;
  isRunning = false;
  document.getElementById("playIcon").src = "../assets/icons/play.png";
  updateDisplay();
}

function br(){
  clearInterval(timerInterval);
  time = breakTime;
  isRunning = false;
  document.getElementById("playIcon").src = "../assets/icons/play.png";
  updateDisplay();
}

function Lbreak(){
  clearInterval(timerInterval);
  time = longBreakTime;
  isRunning = false;
  document.getElementById("playIcon").src = "../assets/icons/play.png";
  updateDisplay();
}

// -------------------- EDIT TIMES --------------------
function edit(){
  let f = prompt("Enter Focus time (in minutes):");
  let b = prompt("Enter Short Break time (in minutes):");
  let lb = prompt("Enter Long Break time (in minutes):");

  if(f && !isNaN(f) && f > 0) focusTime = parseInt(f) * 60;
  if(b && !isNaN(b) && b > 0) breakTime = parseInt(b) * 60;
  if(lb && !isNaN(lb) && lb > 0) longBreakTime = parseInt(lb) * 60;

  alert("Times updated!");
}

// -------------------- SOUND TOGGLE --------------------
function music(){
  let choice = confirm("Do you want to enable sound?");

  if(choice){
    isMuted = false;
    alert("Sound ON 🔊");
  } else {
    isMuted = true;
    alert("Sound OFF 🔇");
  }
}

// -------------------- INIT --------------------
updateDisplay();