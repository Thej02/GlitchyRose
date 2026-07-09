const words = ['javascript', 'programming', 'hangman', 'computer', 'keyboard', 'developer', 'coding', 'algorithm', 'software', 'application', 'frontend', 'backend', 'database'];
        const hangmanParts = ['rope', 'head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];
        const keyboardContainer = document.getElementById('keyboard');
        const wordDisplay = document.getElementById('word-display');
        const guessesRemainingDisplay = document.getElementById('guesses-remaining');
        const guessedLettersDisplay = document.getElementById('guessed-letters');
        const gameMessage = document.getElementById('game-message');
        const resetButton = document.getElementById('reset-button');

        let wordToGuess;
        let guessedLetters;
        let incorrectGuesses;
        let gameWon;
        let gameLost;
        let animationTimeout;

        function initializeGame() {
            wordToGuess = words[Math.floor(Math.random() * words.length)].toUpperCase();
            guessedLetters = new Set();
            incorrectGuesses = 0;
            gameWon = false;
            gameLost = false;
            gameMessage.textContent = '';
            gameMessage.classList.remove('win-message', 'lose-message');


            hangmanParts.forEach(partId => {
                document.getElementById(partId).classList.add('hidden');
            });
             clearTimeout(animationTimeout);
            const rope = document.getElementById('rope');
            rope.classList.remove('animated-rope');
            const head = document.getElementById('head');
            head.classList.remove('animated-head');

            keyboardContainer.innerHTML = '';
            createKeyboard();

            updateDisplay();
        }


        function createKeyboard() {
            const keyboardRows = [
                ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
                ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
                ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
            ];

            keyboardRows.forEach(rowLetters => {
                const rowDiv = document.createElement('div');
                rowDiv.className = 'keyboard-row';
                rowLetters.forEach(letter => {
                    const button = document.createElement('button');
                    button.textContent = letter;
                    button.addEventListener('click', () => handleGuess(letter));
                    rowDiv.appendChild(button);
                })
                keyboardContainer.appendChild(rowDiv);
            })
        }

        function handleGuess(letter) {
            if (gameWon || gameLost || guessedLetters.has(letter)) {
                return;
            }

            guessedLetters.add(letter);

            if (wordToGuess.includes(letter)) {
                updateDisplay();
                if (checkWin()) {
                    gameWon = true;
                    gameMessage.textContent = 'You win!';
                    gameMessage.classList.add('win-message');
                    disableKeyboard();

                }
            } else {
                incorrectGuesses++;
                document.getElementById(hangmanParts[incorrectGuesses - 1]).classList.remove('hidden');
                updateDisplay();
                if (incorrectGuesses >= hangmanParts.length) {
                    gameLost = true;
                    gameMessage.textContent = `You lose! The word was ${wordToGuess}`;
                    gameMessage.classList.add('lose-message');
                    disableKeyboard();
                    animateHangman();
                }
            }
            disableButton(letter)
        }
        function disableButton(letter) {
            const buttons = keyboardContainer.querySelectorAll('button');
            buttons.forEach(button => {
                if (button.textContent === letter) {
                    button.disabled = true;
                }
            });
        }

        function disableKeyboard() {
            const buttons = keyboardContainer.querySelectorAll('button');
            buttons.forEach(button => {
                button.disabled = true;
            });
        }

        function updateDisplay() {
            let displayWord = '';
            for (const char of wordToGuess) {
                if (guessedLetters.has(char)) {
                    displayWord += char + ' ';
                } else {
                    displayWord += '_ ';
                }
            }
            wordDisplay.textContent = displayWord.trim();

            guessesRemainingDisplay.textContent = `Guesses remaining: ${hangmanParts.length - incorrectGuesses}`;

            guessedLettersDisplay.innerHTML = '';
            guessedLetters.forEach(letter => {
                const span = document.createElement('span');
                span.textContent = letter;
                guessedLettersDisplay.appendChild(span)
            })

        }

        function checkWin() {
            for (const char of wordToGuess) {
                if (!guessedLetters.has(char)){
                    return false;
                }
            }
            return true;
        }

        function animateHangman() {
            const rope = document.getElementById('rope');
            const head = document.getElementById('head');

            rope.classList.add('animated-rope');
            head.classList.add('animated-head');


            animationTimeout = setTimeout(() => {
                rope.classList.remove('animated-rope');
                head.classList.remove('animated-head');
            }, 2000);
        }

        resetButton.addEventListener('click', initializeGame);

        initializeGame();

