// script of TestCPS.html

let ttClickOut = document.getElementById("ttClickOut");
let clickPerSecOut = document.getElementById("clickPerSecOut");
let clickBoxLabel = document.getElementById("clickBoxLabel");
let timerSpanIn = document.getElementById("timerSpanIn");
let gameRunning = new Boolean(false)
let ttclick = 0;
let chronometer = 0;
let timeout = new Boolean(false);
let clickPerSec = 0;

function newClick() {
	console.log("*click*")
	if (timeout == false) {
		if (gameRunning == true) {
			ttclick ++;
			ttClickOut.value = ttclick;
		} else {
			ttclick = 0;
			startGame();
		}
	} else {
		return;
	}
}

function restart() {
	timeout = false;
}
function startGame() {
	console.log("game started")
	gameRunning = true;
	timerSpan = timerSpanIn.value
	chronometer = createChronometer(timerSpan);
	chronometer.start();
}

function createChronometer(timerSpan) {
    let currentTime = 0;
    let intervalId = null;
    
    function start() {
        if (intervalId) return;
        
        intervalId = setInterval(() => {
            currentTime += 0.1;
			clickBoxLabel.innerText = currentTime.toFixed(1);
			clickPerSec = ttclick / currentTime.toFixed(1);
            clickPerSecOut.value = clickPerSec.toFixed(1);
            console.log(currentTime.toFixed(1) + "s");
            
            if (currentTime >= timerSpan) {
                stop();
            }
        }, 100);
	}

    function stop() {
        clearInterval(intervalId);
        intervalId = null;
		clickBoxLabel.innerText = "Restart";
		gameRunning = false;
		timeout = true;
		alert("You clicked " + ttclick + " in " + timerSpan + " s. That's egal to " + clickPerSec.toFixed(1) + " clicks/sec.")
		setTimeout(restart, 3000)
    }

    return { start, stop };
}
