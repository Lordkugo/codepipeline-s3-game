document.addEventListener('DOMContentLoaded', () => {
    // Constants
    const CARD_BACK_IMAGE = 'images/blank.png';
    const LOADING_SCREEN_TIMEOUT = 1000;

    // Variables
    const grid = document.querySelector('#game-board');
    const startButton = document.getElementById('start-game');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    // Card array and other constants...
    const cardArray = [
        { name: 'card1', img: 'images/distracted.png' },
        { name: 'card1', img: 'images/distracted.png' },
        { name: 'card2', img: 'images/drake.png' },
        { name: 'card2', img: 'images/drake.png' },
        { name: 'card3', img: 'images/fine.png' },
        { name: 'card3', img: 'images/fine.png' },
        { name: 'card4', img: 'images/rollsafe.png' },
        { name: 'card4', img: 'images/rollsafe.png' },
        { name: 'card5', img: 'images/success.png' },
        { name: 'card5', img: 'images/success.png' },
        // ...add more pairs as needed
    ];


    // Function to shuffle array
    function shuffle(array) {
        array.sort(() => 0.5 - Math.random());
    }

    // Function to create the board
    function createBoard() {
        showLoadingScreen();
        shuffle(cardArray);
        grid.innerHTML = '';
        cardsWon = [];

        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', CARD_BACK_IMAGE);
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }

        hideLoadingScreen();
    }

    // Function to flip a card
    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if (!cardsChosenId.includes(cardId)) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.setAttribute('src', cardArray[cardId].img);
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 700);
            }
        }
    }

    // Function to check for card match
    function checkForMatch() {
        const cards = document.querySelectorAll('#game-board img');
        const firstCardId = cardsChosenId[0];
        const secondCardId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1] && firstCardId !== secondCardId) {
            cards[firstCardId].style.visibility = 'hidden';
            cards[secondCardId].style.visibility = 'hidden';
            cards[firstCardId].removeEventListener('click', flipCard);
            cards[secondCardId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            cards[firstCardId].setAttribute('src', CARD_BACK_IMAGE);
            cards[secondCardId].setAttribute('src', CARD_BACK_IMAGE);
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardArray.length / 2) {
            showGameCompletionMessage();
        }
    }

    // Function to show a loading screen
    function showLoadingScreen() {
        // ... Logic to show loading screen ...
    }

    // Function to hide the loading screen
    function hideLoadingScreen() {
        // ... Logic to hide loading screen ...
    }

    // Function to show game completion message
    function showGameCompletionMessage() {
        alert('Congratulations! You found them all!');
    }

    // Event listener for card clicks using event delegation
    grid.addEventListener('click', (event) => {
        const card = event.target.closest('img');
        if (card && !cardsChosenId.includes(card.getAttribute('data-id'))) {
            flipCard.call(card);
        }
    });

    // Event listener for the start button
    startButton.addEventListener('click', createBoard);
});
