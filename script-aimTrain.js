// script aimtrain.htm

let targetButton = document.getElementById("targetButton");
let modeSwitch = document.getElementById("modeSwitch");
let navigationBar = document.getElementById("navigationBar");
let navigationBarArrow = document.getElementById("navigationBarArrow");
let popUpTextBox = document.getElementById("popUpTextBox");
let timerOut = document.getElementById("timerOut");
let scoreOut = document.getElementById("scoreOut");
let gameMode = "time";
let navState = "close";
let gameRunning = false;
let score = 0;
let timerSpan = 10;

navigationBar.addEventListener("mouseover", function(){
  navigationBarArrow.classList.add("arrowHovered");
});

navigationBar.addEventListener("mouseout", function(){
  navigationBarArrow.classList.remove("arrowHovered");
});

timerIn.addEventListener("change", function(){
	if (gameRunning == false)
		timerOut.textContent = timerIn.value;
});

function randX(min, max) {
	return Math.floor(Math.random() * (max - min) + min);;
}

function randY(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function start() {
	console.log("start");
	timerSpan = timerIn.value;
	gameRunning = true;
	score = 0;
	scoreOut.value = score;
	targetButton.style.marginLeft = randX(0, 95) + "%";
	targetButton.style.marginTop = randY(0, 20) + "%";
	chronometer = createChronometer(timerSpan);
	chronometer.start();
}

function pressed() {
	if (gameRunning == true) {
		targetButton.style.marginLeft = randX(0, 95) + "%";
		targetButton.style.marginTop = randY(0, 20) + "%";
		score++;
		scoreOut.value = score;
	} else {
		start();
	}
}

function switchMode() {
	console.log("switching mode");
	if (gameMode == "time") {
		modeSwitch.value = "GameMode : Click";
		gameMode = "click";
	} else if (gameMode == "click") {
		modeSwitch.value = "GameMode : Time";
		gameMode = "time";
	} else {
		modeSwitch.value = "GameMode : Time"
		gameMode = "time";
	}
}

function openNavBox() {
	console.log("showing the navigation");
	if (navState == "close") {
		navigationBar.style.height = "100px";
		popUpTextBox.hidden = false;
		navState = "open";
	} else if (navState == "open") {
		navigationBar.style.height = "29px";
		popUpTextBox.hidden = true;
		navState = "close";
	} else {
		navigationBar.style.height = "29px";
		popUpTextBox.hidden = false;
		navState = "close";
	}
}

function createChronometer(timerSpan) {
    let currentTime = 0;
    let intervalId = null;

    function start() {
        if (intervalId) return;

        intervalId = setInterval(() => {
            currentTime += 0.1;
            timerOut.innerText = (timerSpan - currentTime).toFixed(1);
            if (currentTime >= timerSpan) {
                stop();
            }
        }, 100);
    }

    function stop() {
        clearInterval(intervalId);
		timerOut.innerText = 0.0;
        intervalId = null;
        gameRunning = false;
        alert("Your score is : " + score + " in " + timerSpan + " seconds");
		timerOut.innerText = timerIn.value;
    }

    return { start, stop };
}