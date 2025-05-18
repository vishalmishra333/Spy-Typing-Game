const encryptedTextEl = document.getElementById("encryptedText");
const userInput = document.getElementById("userInput");
const timeEl = document.getElementById("time");
const levelEl = document.getElementById("level");
const scoreEl = document.getElementById("score");
const startBtn = document.getElementById("startBtn");

let timer;
let timeLeft = 30;
let score = 0;
let level = 1;
let originalText = "";

const spyTexts = [
  "The password is shadowfox",
  "Meet at midnight behind the library",
  "The eagle has landed",
  "Coordinates are 51.5074 N 0.1278 W",
  "Trust no one but the raven"
];

// Simple character shifting encryption (Caesar Cipher)
function encryptText(text) {
  return text
    .split("")
    .map(char => {
      if (/[a-zA-Z]/.test(char)) {
        let base = char === char.toUpperCase() ? 65 : 97;
        return String.fromCharCode(((char.charCodeAt(0) - base + 3) % 26) + base);
      }
      return char;
    })
    .join("");
}

function startMission() {
  resetGame();

  originalText = spyTexts[Math.floor(Math.random() * spyTexts.length)];
  const encrypted = encryptText(originalText);
  encryptedTextEl.textContent = encrypted;

  userInput.disabled = false;
  userInput.focus();
  startBtn.disabled = true;

  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endMission(false);
    }
  }, 1000);
}

function endMission(success) {
  userInput.disabled = true;
  startBtn.disabled = false;

  if (success) {
    score += 10;
    level++;
    alert("Mission Passed! Next Level...");
  } else {
    alert("Mission Failed! Try Again.");
    score = 0;
    level = 1;
  }

  updateStats();
}

function updateStats() {
  scoreEl.textContent = score;
  levelEl.textContent = level;
}

function resetGame() {
  timeLeft = 30;
  timeEl.textContent = timeLeft;
  userInput.value = "";
  encryptedTextEl.textContent = "";
}

userInput.addEventListener("input", () => {
  if (userInput.value.trim() === originalText) {
    clearInterval(timer);
    endMission(true);
  }
});

startBtn.addEventListener("click", startMission);