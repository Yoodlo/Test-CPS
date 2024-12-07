// script aimtrain.htm

let targetButton = document.getElementById("targetButton");
let modeSwitch = document.getElementById("modeSwitch");
let navigationBar = document.getElementById("navigationBar");
let navigationBarArrow = document.getElementById("navigationBarArrow");
let popUpTextBox = document.getElementById("popUpTextBox");
let gameMode = "time";
let navState = "close";

navigationBar.addEventListener("mouseover", function(){
  navigationBarArrow.classList.add("arrowHovered");
});

navigationBar.addEventListener("mouseout", function(){
  navigationBarArrow.classList.remove("arrowHovered");
});

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