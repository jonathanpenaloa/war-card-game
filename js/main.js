/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

const masterDeck = buildMasterDeck();
const shuffledHand = showShuffeledDeck();

/*----- app's state (variables) -----*/
let scores = '' // numbers of cards 
let results = ''
let winner = ''

pHandCard = showShuffledDeck.splice(0, 26);
// cHandCard = showShuffledDeck.splice(27, 52);




/*----- cached element references -----*/

init();



/*----- event listeners -----*/

document.querySelector('button').addEventListener('click', init);


/*----- functions -----*/

function init() {
    renderBoard();
    showShuffeledDeck();

}

function buildMasterDeck() {
    const deck = [];
    // Use nested forEach to generate card objects
    suits.forEach(function(suit) {
      ranks.forEach(function(rank) {
        deck.push({
          // The 'face' property maps to the library's CSS classes for cards
          face: `${suit}${rank}`,
          // Setting the 'value' property for game of blackjack, not war
          value: Number(rank) || (rank === 'A' ? 11 : 10)
        });
      });
    });
    return deck;
  }

function showShuffeledDeck() {
    // splice deck into two 
}

function renderBoard() {
    //render the cards in div
    //render war deck
    //msg

}