const musicSound = new Audio('musicsp/tarata-6264.mp3');
const arr = ["Paper", "Rock", "Scissors"]
let userhand;
let comphand;
let score = 0;


function pickcomphand() {

    let v = Math.floor(Math.random(0, 1) * 3)
    comphand = arr[v];
    document.getElementById("comppick").src = "assets/" + comphand + ".png";
}

function pickhand(hand) {
    userhand = hand;
    let hands = document.querySelector(".hands");
    hands.style.display = "none";
    let contests = document.querySelector(".contest");
    contests.style.display = "flex";
    document.getElementById("user").src = "assets/" + hand + ".png";
    pickcomphand();
    document.getElementById("resh1").textContent = result();
}

function result() {
    if (userhand == comphand) {
        return "MATCH TIED !!";
    } else if ((userhand == "Rock" && comphand == "Paper") || (userhand == "Scissors" && comphand == "Rock") || (userhand == "Paper" && comphand == "Scissors")) {
        return "YOU LOST";
    } else {
        score = score + 1;
        document.getElementById("Score").textContent = score;
        return "YOU WIN";
    }
}

function playagain() {
    document.querySelector(".hands").style.display = "flex";
    document.querySelector(".contest").style.display = "none";
}