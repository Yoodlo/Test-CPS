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
            if (currentTime >= timerSpan) {
                stop();
            }
        }, 100);
	}

    function stop() {
        clearInterval(intervalId);
        intervalId = null;
		clickBoxPrinting();
		gameRunning = false;
		timeout = true;
		alert("You clicked " + ttclick + " in " + timerSpan + " s. That's egal to " + clickPerSec.toFixed(1) + " clicks/sec.")
		setTimeout(restart, 3000)
    }

    return { start, stop };
}

function clickBoxPrinting() {
	clickHerelabelBox.hidden = true;
	actionCountainer.hidden = false;
}	

function addScoreBtnPressed() {
	addLocalUsernameBox.hidden = !addLocalUsernameBox.hidden
}

function submitScore(username, score) {
  fetch("https://script.google.com/macros/s/AKfycbxdUgVPyzFCEQPuPg4M-vql7F0omglNFIrNAa7HvPSZgg_gUhn82LTSKOcz1ucTz4JKtA/exec", {
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
	submitScore(usernameIn, ScoreIn);
}

function getTopScores() {
  fetch("https://script.google.com/macros/s/AKfycbxdUgVPyzFCEQPuPg4M-vql7F0omglNFIrNAa7HvPSZgg_gUhn82LTSKOcz1ucTz4JKtA/exec")
    .then(response => response.json())
    .then(data => {
      // Log both usernames and scores for the top 5
      data.slice(0, 5).forEach((entry, index) => {
        console.log(`Rank ${index + 1}: ${entry.username} with ${entry.score} points`);
      });
    })
    .catch(error => console.error("Error fetching leaderboard:", error));
}

function writeTopScores() {
  fetch("https://script.google.com/macros/s/AKfycbxdUgVPyzFCEQPuPg4M-vql7F0omglNFIrNAa7HvPSZgg_gUhn82LTSKOcz1ucTz4JKtA/exec")
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
	if (timerSpan == 10) {
		sendScore();
		alert("Your score has been submitted.");
	} else {
	alert("You can only submit scores for a 10 secondes timer.");
	}
}