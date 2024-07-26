const numbersDisplay = document.getElementById('numbers-display');
    const timerDisplay = document.getElementById('timer');
    const guessSection = document.getElementById('guess-section');
    const guessInput = document.getElementById('guess-input');
    const submitGuess = document.getElementById('submit-guess');
    const resultDisplay = document.getElementById('result');

    let numbers = [];
    let timeLeft = 3;
    let guesses = [];
    let timerInterval;
// numeri random
    function generateNumbers() {
        numbers = Array.from({length: 5}, () => Math.floor(Math.random() * 100));
        numbersDisplay.textContent = numbers.join(' ');
    }
// tempo
    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Tempo rimasto: ${timeLeft} secondi`;
            if (timeLeft === 0) {
                clearInterval(timerInterval);
                startGuessing();
            }
        }, 1000);
    }
// inizio input
    function startGuessing() {
        numbersDisplay.style.display = 'none';
        timerDisplay.style.display = 'none';
        guessSection.style.display = 'block';
        guessInput.focus();
    }
// check numeri
    function checkGuess() {
        const guess = parseInt(guessInput.value);
        if (!isNaN(guess)) {
            guesses.push(guess);
            guessInput.value = '';
            if (guesses.length === 5) {
                showResult();
            } else {
                guessInput.placeholder = `Inserisci il numero ${guesses.length + 1}`;
            }
        }
    }
// mostra risultati
    function showResult() {
        guessSection.style.display = 'none';
        const correctGuesses = guesses.filter(guess => numbers.includes(guess));
        resultDisplay.textContent = `Hai indovinato ${correctGuesses.length} numeri su 5. 
                                        Numeri indovinati: ${correctGuesses.join(', ')}`;
    }

    generateNumbers();
    startTimer();

    submitGuess.addEventListener('click', checkGuess);