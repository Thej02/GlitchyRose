// ===============================================
// GLITCHY ROSE
// Save the Digital Rose
// ===============================================


// ================================
// WORD DATABASE
// ================================

const wordCategories = {

    Flowers: [
        "ROSE",
        "LOTUS",
        "LILY",
        "ORCHID",
        "JASMINE",
        "TULIP",
        "DAISY",
        "LAVENDER",
        "HIBISCUS",
        "SUNFLOWER"
    ],

    Programming: [
        "JAVASCRIPT",
        "PYTHON",
        "JAVA",
        "REACT",
        "NODEJS",
        "GITHUB",
        "DOCKER",
        "DATABASE",
        "ALGORITHM",
        "CODING"
    ],

    Fantasy: [
        "DRAGON",
        "UNICORN",
        "SPELL",
        "CASTLE",
        "WIZARD",
        "FAIRY",
        "CRYSTAL",
        "PHOENIX",
        "MAGICAL",
        "KINGDOM"
    ]

};


// ================================
// GAME SETTINGS
// ================================

const maxLives = 7;


// ================================
// GAME VARIABLES
// ================================

let wordToGuess = "";

let currentCategory = "";

let guessedLetters = new Set();

let incorrectGuesses = 0;

let score = 0;

let streak = 0;

let gameWon = false;

let gameLost = false;


// ================================
// DOM ELEMENTS
// ================================

const categoryElement =
document.getElementById("category");

const wordDisplay =
document.getElementById("word-display");

const guessedLettersDisplay =
document.getElementById("guessed-letters");

const livesDisplay =
document.getElementById("lives");

const scoreDisplay =
document.getElementById("score");

const streakDisplay =
document.getElementById("streak");

const keyboard =
document.getElementById("keyboard");

const message =
document.getElementById("game-message");

const resetButton =
document.getElementById("reset-button");

const hintButton =
document.getElementById("hint-button");


// ================================
// HANGMAN PARTS
// ================================

const hangmanParts = [

    "rope",

    "head",

    "body",

    "left-arm",

    "right-arm",

    "left-leg",

    "right-leg"

];


// ================================
// CHOOSE RANDOM WORD
// ================================

function chooseRandomWord() {

    const categories =
        Object.keys(wordCategories);

    currentCategory =
        categories[
            Math.floor(Math.random() * categories.length)
        ];

    const words =
        wordCategories[currentCategory];

    wordToGuess =
        words[
            Math.floor(Math.random() * words.length)
        ];

}


// ================================
// CREATE KEYBOARD
// ================================

function createKeyboard() {

    keyboard.innerHTML = "";

    const keyboardRows = [

        ["Q","W","E","R","T","Y","U","I","O","P"],

        ["A","S","D","F","G","H","J","K","L"],

        ["Z","X","C","V","B","N","M"]

    ];


    keyboardRows.forEach(row => {

        const rowDiv =
            document.createElement("div");

        rowDiv.className = "keyboard-row";


        row.forEach(letter => {

            const button =
                document.createElement("button");

            button.textContent = letter;

            button.addEventListener("click", () => {

                handleGuess(letter);

            });

            rowDiv.appendChild(button);

        });

        keyboard.appendChild(rowDiv);

    });

}


// ================================
// RESET SVG
// ================================

function hideHangman() {

    hangmanParts.forEach(part => {

        document
            .getElementById(part)
            .classList
            .add("hidden");

    });

}


// ================================
// START NEW GAME
// ================================

function initializeGame() {

    chooseRandomWord();

    guessedLetters =
        new Set();

    incorrectGuesses = 0;

    gameWon = false;

    gameLost = false;

    message.textContent = "";

    message.className =
        "game-message";

    hideHangman();

    createKeyboard();

    updateDisplay();

}


// ================================
// START GAME
// ================================

initializeGame();