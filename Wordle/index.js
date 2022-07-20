//import data from './dict';

document.addEventListener("DOMContentLoaded", () => {
    let word;
    let guessarray = ["happy", "dairy", "hairy", "notty", "carry", "fight", "right", "earth", "ergot", "adieu", "pizza", "death"];
    const gameOverSound = new Audio('music/gameover.mp3');
    const moveSound = new Audio('music/move.mp3');
    const musicSound = new Audio('music/music.mp3');

    createSquares();
    getNewWord();
    let guessedWords = [
        []
    ];
    let availableSpace = 1;

    let guessedWordCount = 0;

    const key = document.querySelectorAll(".keyboard-row button");


    function getNewWord() { // taking new word from dict.
        //musicSound.play();
        let a = 0;
        let b = 12;
        let p = Math.round(a + (b - a) * Math.random());
        word = guessarray[p];
        console.log(word);
    }







    function getCureentWordArr() { // returns last word
        const numberofGuessedWords = guessedWords.length
        return guessedWords[numberofGuessedWords - 1]
    }

    function updateGuessedWords(letter) { // store word in a array & reduce size
        const currentWordArr = getCureentWordArr()

        if (currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter)
            const availableSpaceel = document.getElementById(String(availableSpace));
            availableSpace = availableSpace + 1;
            availableSpaceel.textContent = letter;
        }

    }


    function getTileColor(letter, index) { // coloring gueesed words
        const isCorrectLetter = word.includes(letter);
        if (!isCorrectLetter) {
            return "rgb(58,58,60)";
        }
        const letterInThatPos = word.charAt(index);
        const isCorrectPos = letter === letterInThatPos;
        if (isCorrectPos) {
            return "rgb(83,141,78)";
        }
        return "rgb(181,159,59)";
    }



    function handleSubmitWord() { // enter button 

        const currentWordArr = getCureentWordArr();
        if (currentWordArr.length !== 5) {
            window.alert("WORD MUST BE OF 5 LETTER !!!");
            currentWord = "";
        }
        const currentWord = currentWordArr.join("");


        const firstLetterId = guessedWordCount * 5 + 1;
        const interval = 200;
        currentWordArr.forEach((letter, index) => {
            setTimeout(() => {
                const tileColor = getTileColor(letter, index);

                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);
                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;


            }, interval * index);
        });

        guessedWordCount += 1;



        if (currentWord === word) {
            gameOverSound.play();
            window.alert("   CONGRATULATIONS !! ")

        }
        if (guessedWords.length === 6) {
            gameOverSound.play();
            window.alert(`Sorry, you have no more guesses! The word is ${word}.`);
        }
        guessedWords.push([])



    }

    function createSquares() { // for creating 6*5 grid
        const gameBoard = document.getElementById("board")

        for (let index = 0; index < 30; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated")
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);
            // const element = array[i];
        }
    }

    function handleDeleteLetter() { // delete button

        const currentWordArr = getCureentWordArr();
        const removeLetter = currentWordArr.pop();

        guessedWords[guessedWords.length - 1] = currentWordArr;
        const lastLetterEl = document.getElementById(String(availableSpace - 1));
        lastLetterEl.textContent = "";
        availableSpace = availableSpace - 1;


    }


    for (let i = 0; i < key.length; i++) {
        key[i].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");

            if (letter === "enter") {
                moveSound.play();
                handleSubmitWord();
                return;
            }
            if (letter === "del") {
                moveSound.play();
                handleDeleteLetter();
                return;
            }

            updateGuessedWords(letter);
        };
    }
});