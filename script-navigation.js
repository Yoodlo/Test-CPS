// script for the navigation menu

let navigationBar = document.getElementById("navigationBar");
let navigationBarArrow = document.getElementById("navigationBarArrow");
let popUpTextBox = document.getElementById("popUpTextBox");
let navState = "close";

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

function goIndex() {
	window.location.href = "index.html";
}

function goAim() {
	window.location.href = "aimTrain.htm";
}