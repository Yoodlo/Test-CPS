// script of TestCPS.html

window.onload = function() {
    getTopScores();
	writeTopScores();
};

let ttClickOut = document.getElementById("ttClickOut");
let clickPerSecOut = document.getElementById("clickPerSecOut");
let clickBoxLabel = document.getElementById("clickBoxLabel");
let timerSpanIn = document.getElementById("timerSpanIn");
let clickHerelabelBox = document.getElementById("clickHerelabelBox");
let actionCountainer = document.getElementById("actionCountainer");
let addLocalUsernameBox = document.getElementById("addLocalUsernameBox");
let gameRunning = new Boolean(false)
let ttclick = 0;
let chronometer = 0;
let timeout = new Boolean(false);
let clickPerSec = 0;
let usernameIn = "";
let ScoreIn = "";
let addLocalUsernameLabel = document.getElementById("addLocalUsernameLabel");
let localUsernameIn = document.getElementById("localUsernameIn");
let oneGamePlayed = false;

let userT1 = document.getElementById("userT1");
let userT2 = document.getElementById("userT2");
let userT3 = document.getElementById("userT3");
let userT4 = document.getElementById("userT4");
let userT5 = document.getElementById("userT5");
let scoreT1 = document.getElementById("scoreT1");
let scoreT2 = document.getElementById("scoreT2");
let scoreT3 = document.getElementById("scoreT3");
let scoreT4 = document.getElementById("scoreT4");
let scoreT5 = document.getElementById("scoreT5");

function newClick() {
    console.log("*click*");
    if (timeout == false) {
		if (gameRunning == true) {
			ttclick++;
			ttClickOut.value = ttclick;
		} else {
			ttclick = 0;
			ttClickOut.value = ttclick;
			startGame();
			if (oneGamePlayed == false) {
				oneGamePlayed = true;
			}
		}
	} else {
		return;
	}
}

function restart() {
	timeout = false;
	clickBoxLabel.innerText = "Restart";
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
            if (currentTime >= timerSpan) {
                stop();
            }
        }, 100);
    }

    function stop() {
        clearInterval(intervalId);
        intervalId = null;
        gameRunning = false;
        timeout = true;
        alert("You clicked " + ttclick + " in " + timerSpan + " s. That's equal to " + clickPerSec.toFixed(1) + " clicks/sec.");
        restart();
    }

    return { start, stop };
}

function submitScore(username, score) {
  fetch("https://flossy-leaf-curiosity.glitch.me", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      score: score
    })
  })
  .then(response => response.text())
  .then(data => {
    console.log("Score added:", data);
  })
  .catch(error => {
    console.error("Error submitting score:", error);
  });
}

function sendScore() {
	submitScore(username, Score);
}

function getTopScores() {
  fetch('https://flossy-leaf-curiosity.glitch.me/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      // If the response is not OK (e.g., 500 error), parse the error JSON and throw
      return response.json().then(errorData => {
        throw new Error(errorData.error || 'An error occurred');
      });
    }
    return response.json();  // If the response is OK, return the JSON
  })
  .then(data => {
    // Check if the data is in the correct format (an array of scores)
    if (Array.isArray(data)) {
      // Successfully received the leaderboard data (array)
      console.log("Leaderboard:", data);
      writeTopScores(data);  // Handle the data, for example, display it in the UI
    } else {
      throw new Error("Invalid data format received from the server");
    }
  })
  .catch(error => {
    // Handle any errors, including network issues or invalid JSON
    console.error("Error fetching leaderboard:", error);
  });
}


function writeTopScores() {
  fetch("https://flossy-leaf-curiosity.glitch.me")
  
    .then(response => response.json())
    .then(data => {
      let top5 = data.slice(0, 5);
      
      document.getElementById("userT1").innerText = top5[0]?.username || "N/A";
      document.getElementById("userT2").innerText = top5[1]?.username || "N/A";
      document.getElementById("userT3").innerText = top5[2]?.username || "N/A";
      document.getElementById("userT4").innerText = top5[3]?.username || "N/A";
      document.getElementById("userT5").innerText = top5[4]?.username || "N/A";
      
      document.getElementById("scoreT1").innerText = top5[0]?.score || 0;
      document.getElementById("scoreT2").innerText = top5[1]?.score || 0;
      document.getElementById("scoreT3").innerText = top5[2]?.score || 0;
      document.getElementById("scoreT4").innerText = top5[3]?.score || 0;
      document.getElementById("scoreT5").innerText = top5[4]?.score || 0;
    })
    .catch(error => console.error("Error fetching leaderboard:", error));
}

function addLocalScore() {
	addLocalUsernameLabel.classList.remove("shake")
	username = localUsernameIn.value;
	Score = ttclick;
	if (gameRunning == false) {
		if (oneGamePlayed != false) {
			if (localUsernameIn.value != "") {
				if (timerSpan == 10) {
					addLocalUsernameLabel.innerText = "Add you score to the leaderboard";
					addLocalUsernameLabel.style.color = "#ffffff";
					sendScore();
					alert("Your score has been submitted.");
				} else {
					addLocalUsernameLabel.innerText = "You can only upload scores for 10 secondes timer";
					addLocalUsernameLabel.style.color = "#ff0000";
					addLocalUsernameLabel.classList.add("shake");
				}
			} else {
				addLocalUsernameLabel.innerText = "Please enter a username";
				addLocalUsernameLabel.style.color = "#ff0000";
				addLocalUsernameLabel.classList.add("shake");
			}
		} else {
			addLocalUsernameLabel.innerText = "No score registered yet";
			addLocalUsernameLabel.style.color = "#ff0000";
			addLocalUsernameLabel.classList.add("shake");
		}
	} else {
		addLocalUsernameLabel.innerText = "Wait for the current game to end";
		addLocalUsernameLabel.style.color = "#ff0000";
		addLocalUsernameLabel.classList.add("shake");
	}
}
