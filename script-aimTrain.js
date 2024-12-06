// script aimtrain.htm

let targetButton = document.getElementById("targetButton");
let modeSwitch = document.getElementById("modeSwitch");
let gameMode = "time";

function randX(min, max) {
	return Math.floor(Math.random() * (max - min) + min);;
}

function randY(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function start() {
	console.log("start");
	targetButton.style.marginLeft = randX(8, 89) + "%";
	targetButton.style.marginTop = randY(11, 31) + "%";
}

function pressed() {
	targetButton.style.marginLeft = randX(8, 89) + "%";
	targetButton.style.marginTop = randY(11, 31) + "%";
}

function switchMode() {
	console.log("switching mode");
	if (gameMode == "time") {
		modeSwitch.value = "click";
		gameMode = "click";
	} else if (gameMode == "click") {
		modeSwitch.value = "time";
		gameMode = "time";
	} else {
		modeSwitch.value = "time"
		gameMode = "time";
	}
}