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
// ===============================================
// UPDATE DISPLAY
// ===============================================

function updateDisplay() {

    // Category
    categoryElement.textContent = currentCategory;

    // Display Word
    let displayWord = "";

    for (const letter of wordToGuess) {

        if (guessedLetters.has(letter)) {

            displayWord += letter + " ";

        } else {

            displayWord += "_ ";

        }

    }

    wordDisplay.textContent = displayWord.trim();

    // Lives
    livesDisplay.textContent =
        "❤️".repeat(maxLives - incorrectGuesses);

    // Score
    scoreDisplay.textContent = score;

    // Streak
    streakDisplay.textContent = streak;

    // Guessed Letters

    guessedLettersDisplay.innerHTML = "";

    guessedLetters.forEach(letter => {

        const span = document.createElement("span");

        span.textContent = letter;

        guessedLettersDisplay.appendChild(span);

    });

}


// ===============================================
// HANDLE GUESS
// ===============================================

function handleGuess(letter) {

    if (gameWon || gameLost) return;

    if (guessedLetters.has(letter)) return;

    guessedLetters.add(letter);


    // Disable Button

    disableButton(letter);


    // Correct Guess

    if (wordToGuess.includes(letter)) {

        updateDisplay();

        if (checkWin()) {

            winGame();

        }

    }

    // Wrong Guess

    else {

        incorrectGuesses++;

        revealHangmanPart();

        updateDisplay();

        if (incorrectGuesses >= maxLives) {

            loseGame();

        }

    }

}


// ===============================================
// REVEAL HANGMAN
// ===============================================

function revealHangmanPart() {

    const part =
        hangmanParts[incorrectGuesses - 1];

    document
        .getElementById(part)
        .classList
        .remove("hidden");

}


// ===============================================
// CHECK WIN
// ===============================================

function checkWin() {

    for (const letter of wordToGuess) {

        if (!guessedLetters.has(letter)) {

            return false;

        }

    }

    return true;

}


// ===============================================
// WIN GAME
// ===============================================

function winGame() {

    gameWon = true;

    score += 10;

    streak++;

    updateDisplay();

    message.classList.add("win-message");

    message.innerHTML = `
        🌸 Congratulations!<br>
        The Digital Rose Bloomed Again!
    `;

    disableKeyboard();

}


// ===============================================
// LOSE GAME
// ===============================================

function loseGame() {

    gameLost = true;

    streak = 0;

    updateDisplay();

    message.classList.add("lose-message");

    message.innerHTML = `
        🥀 Oh No!<br>
        The Rose was Corrupted.<br><br>

        Word :
        <b>${wordToGuess}</b>
    `;

    disableKeyboard();

    animateHangman();

}


// ===============================================
// DISABLE BUTTON
// ===============================================

function disableButton(letter) {

    const buttons =
        keyboard.querySelectorAll("button");

    buttons.forEach(button => {

        if (button.textContent === letter) {

            button.disabled = true;

        }

    });

}


// ===============================================
// DISABLE KEYBOARD
// ===============================================

function disableKeyboard() {

    const buttons =
        keyboard.querySelectorAll("button");

    buttons.forEach(button => {

        button.disabled = true;

    });

}


// ===============================================
// HINT BUTTON
// ===============================================

hintButton.addEventListener("click", () => {

    if (gameWon || gameLost) return;

    const remainingLetters =
        wordToGuess
            .split("")
            .filter(letter =>
                !guessedLetters.has(letter)
            );

    if (remainingLetters.length === 0) return;

    const randomLetter =
        remainingLetters[
            Math.floor(Math.random() * remainingLetters.length)
        ];

    handleGuess(randomLetter);

});


// ===============================================
// RESET BUTTON
// ===============================================

resetButton.addEventListener("click", () => {

    initializeGame();

});
// ===============================================
// PHYSICAL KEYBOARD SUPPORT
// ===============================================

document.addEventListener("keydown", (event) => {

    if (gameWon || gameLost) return;

    const key = event.key.toUpperCase();

    if (/^[A-Z]$/.test(key)) {

        handleGuess(key);

    }

});


// ===============================================
// HANGMAN ANIMATION
// ===============================================

function animateHangman() {

    const rope = document.getElementById("rope");

    const head = document.getElementById("head");

    rope.classList.add("animated-rope");

    head.classList.add("animated-head");

}


// ===============================================
// LOCAL STORAGE
// ===============================================

let highScore =
    Number(localStorage.getItem("glitchyRoseHighScore")) || 0;

function saveHighScore() {

    if (score > highScore) {

        highScore = score;

        localStorage.setItem(
            "glitchyRoseHighScore",
            highScore
        );

    }

}

function loadHighScore() {

    let board =
        document.getElementById("high-score");

    if (!board) {

        board = document.createElement("h3");

        board.id = "high-score";

        board.style.marginTop = "20px";

        board.style.color = "#ec4899";

        document.querySelector(".container").appendChild(board);

    }

    board.textContent =
        "🏆 High Score : " + highScore;

}

loadHighScore();


// ===============================================
// UPDATE HIGH SCORE AFTER WIN
// ===============================================

const originalWinGame = winGame;

winGame = function () {

    originalWinGame();

    saveHighScore();

    loadHighScore();

    launchConfetti();

};


// ===============================================
// RANDOM RESET ANIMATION
// ===============================================

function playResetAnimation() {

    const container =
        document.querySelector(".container");

    container.animate(

        [

            {
                transform: "scale(.95)"
            },

            {
                transform: "scale(1.02)"
            },

            {
                transform: "scale(1)"
            }

        ],

        {

            duration: 500

        }

    );

}

resetButton.addEventListener("click", playResetAnimation);


// ===============================================
// CONFETTI
// ===============================================

function launchConfetti() {

    for (let i = 0; i < 80; i++) {

        const piece =
            document.createElement("div");

        piece.className = "confetti";

        piece.style.left =
            Math.random() * window.innerWidth + "px";

        piece.style.animationDelay =
            Math.random() * 2 + "s";

        piece.style.background =
            [
                "#ff4d94",
                "#ec4899",
                "#f9a8d4",
                "#fbbf24",
                "#ffffff"
            ][Math.floor(Math.random() * 5)];

        document.body.appendChild(piece);

        setTimeout(() => {

            piece.remove();

        }, 4000);

    }

}


// ===============================================
// EXTRA POLISH
// ===============================================

window.addEventListener("load", () => {

    document.querySelector(".container").animate(

        [

            {

                opacity: 0,

                transform: "translateY(40px)"

            },

            {

                opacity: 1,

                transform: "translateY(0px)"

            }

        ],

        {

            duration: 900,

            easing: "ease"

        }

    );

});