// script of TestCPS.html

let ttClickOut = document.getElementById("ttClickOut");
let clickPerSecOut = document.getElementById("clickPerSecOut");
let clickBoxLabel = document.getElementById("clickBoxLabel");
let timerSpanIn = document.getElementById("timerSpanIn");
let gameRunning = new Boolean(false)
let ttclick = 0;
let chronometer = 0;

function newClick() {
	if (gameRunning == true) {
		ttclick ++;
	} else {
		startGame();
	}
}

function startGame() {
	gameRunning = true;
	timerSpan = timerSpanIn.value
	createChronometer(timerSpan);
}

function createChronometer(timerSpan) {
    let currentTime = 0;
    let intervalId = null;
}

function start() {
        if (intervalId) return;
        
        intervalId = setInterval(() => {
            currentTime += 0.1;
            
            console.log(currentTime.toFixed(1) + "s");
            
            if (currentTime >= timerSpan) {
                stop();
            }
        }, 100);
    }

