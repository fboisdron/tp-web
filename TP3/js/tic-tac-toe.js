'use strict' ;

/* CONSTANTE */
let MESSAGES = {
    'message1': 'Bienvenue sur notre jeu.',
    'message2': ' vous avez gagné !'
};
const PLAYER1 = "✔";
const PLAYER2 = "✗";

let start;

function main() {
    //console.log(MESSAGES['message1']);
    //alert(MESSAGES['message1']);

    for (let i = 0; i < 9; i++) {
        let element = document.getElementById('cell' + i);
        element.addEventListener('click', fill);
    }

    // Gestionnaire pour le bouton Vérifier
    document.getElementById('play').addEventListener('click', verify);

    // Timer
    start = new Date();
    setInterval(updateTimer, 1000);
}

function fill(event)
{
    if (event.target.innerHTML === "" || event.target.innerHTML === PLAYER2) {
        event.target.innerHTML = PLAYER1;
        event.target.style.color = "green";
    } else {
        event.target.innerHTML = PLAYER2;
        event.target.style.color = "red";
    }
}

// Vérification du plateau de jeu
function verifyPlayer(playerMark) {
    // Combinaisons gagnantes : lignes, colonnes, diagonales
    const winningCombinations = [
        [0, 1, 2], // ligne 1
        [3, 4, 5], // ligne 2
        [6, 7, 8], // ligne 3
        [0, 3, 6], // colonne 1
        [1, 4, 7], // colonne 2
        [2, 5, 8], // colonne 3
        [0, 4, 8], // diagonale 1
        [2, 4, 6]  // diagonale 2
    ];

    for (let combination of winningCombinations) {
        let cell0 = document.getElementById('cell' + combination[0]).innerHTML;
        let cell1 = document.getElementById('cell' + combination[1]).innerHTML;
        let cell2 = document.getElementById('cell' + combination[2]).innerHTML;

        if (cell0 === playerMark && cell1 === playerMark && cell2 === playerMark) {
            return true;
        }
    }
    return false;
}

// Vérification de fin de partie
function verify() {
    let player1Name = document.getElementsByName('player1')[0].value;
    let player2Name = document.getElementsByName('player2')[0].value;

    if (verifyPlayer(PLAYER1)) {
        alert("Bravo " + player1Name + MESSAGES['message2']);
        addScore(player1Name);
        resetBoard();
    } else if (verifyPlayer(PLAYER2)) {
        alert("Bravo " + player2Name + MESSAGES['message2']);
        addScore(player2Name);
        resetBoard();
    }
}

// Réinitialisation du plateau
function resetBoard() {
    for (let i = 0; i < 9; i++) {
        let cell = document.getElementById('cell' + i);
        cell.innerHTML = "";
        cell.style.color = "";
    }
    start = new Date();
}

// Gestion des scores
function addScore(name) {
    let table = document.getElementById('scores');
    let row = table.insertRow(-1);
    let cellName = row.insertCell(0);
    let cellDate = row.insertCell(1);

    cellName.innerHTML = name;
    cellDate.innerHTML = new Date().toLocaleString();
}

// Gestion du timer
function updateTimer() {
    let now = new Date();
    let elapsed = Math.floor((now - start) / 1000);
    let minutes = Math.floor(elapsed / 60);
    let seconds = elapsed % 60;

    // Format mm:ss
    let formattedTime = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    document.getElementById('timer').innerHTML = formattedTime;
}

document.addEventListener('DOMContentLoaded', main);
