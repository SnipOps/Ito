
const themes = [
    "Taille d’un animal", "Dangerosité d’un objet", "Force d’un super-héros",
    "Quantité de chocolat que j’aime", "Niveau de douleur", "Rapidité d’un véhicule",
    "Mon intérêt pour ce sujet", "Degré de stress", "Propreté", "Originalité d'une idée"
];

let players = [];
let hints = [];
let currentPlayer = 0;
let theme = "";

function startGame() {
    const playerCount = parseInt(document.getElementById('playerCount').value);
    players = [];
    hints = [];
    currentPlayer = 0;
    theme = themes[Math.floor(Math.random() * themes.length)];
    document.getElementById('theme').innerText = theme;

    const numbers = shuffle(Array.from({length: 100}, (_, i) => i + 1)).slice(0, playerCount);
    for (let i = 0; i < playerCount; i++) {
        players.push({number: numbers[i], hint: ""});
    }

    document.getElementById('setup').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    document.getElementById('playerTurn').style.display = 'block';
    showPlayerTurn();
}

function showPlayerTurn() {
    document.getElementById('playerPrompt').innerText = `Joueur ${currentPlayer + 1}, c’est ton tour !`;
    document.getElementById('playerNumber').innerText = players[currentPlayer].number;
    document.getElementById('playerHint').value = '';
}

function submitHint() {
    const hint = document.getElementById('playerHint').value.trim();
    if (!hint) return alert("Merci de donner un indice !");
    players[currentPlayer].hint = hint;
    currentPlayer++;
    if (currentPlayer < players.length) {
        showPlayerTurn();
    } else {
        document.getElementById('playerTurn').style.display = 'none';
        document.getElementById('allHints').style.display = 'block';
        displayHints();
    }
}

function displayHints() {
    const list = document.getElementById('hintList');
    list.innerHTML = '';
    players.forEach((p, i) => {
        const li = document.createElement('li');
        li.innerText = `Joueur ${i + 1} : ${p.hint}`;
        list.appendChild(li);
    });
}

function revealAnswers() {
    document.getElementById('allHints').style.display = 'none';
    document.getElementById('reveal').style.display = 'block';
    const list = document.getElementById('revealList');
    list.innerHTML = '';
    players.forEach((p, i) => {
        const li = document.createElement('li');
        li.innerText = `Joueur ${i + 1} : ${p.hint} (Nombre : ${p.number})`;
        list.appendChild(li);
    });
}

function restartGame() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('reveal').style.display = 'none';
    document.getElementById('setup').style.display = 'block';
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
