/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

const masterDeck = buildMasterDeck();
// const shuffledHand = getShuffeledDeck();

/*----- app's state (variables) -----*/
let pDeck, cDeck, pHand, cHand;






/*----- cached element references -----*/

init();
let pHandEl = document.querySelector('#pHand');
let cHandEl = document.querySelector('#cHand');



/*----- event listeners -----*/

document.querySelector('button').addEventListener('click', handlePlay);


/*----- functions -----*/
//on starting game cards will be split in two shuffled 
function init() {
  let shuffeldDeck = getNewShuffledDeck();
  pDeck = shuffeldDeck.splice(0, 26);
  cDeck = shuffeldDeck;
  pHand = [];
  cHand = [];
  render();
    // newShuffeledDeck();

}

function render() {
  if (pHand.length > 0 && cHand.length > 0) {
    let pHandTemplate = `<div class="card ${pHand[0].face}"></div>`;
    let cHandTemplate = `<div class="card ${cHand[0].face}"></div>`; 
    pHandEl.innerHTML = pHandTemplate;
    cHandEl.innerHTML = cHandTemplate; 
  }
}


function winningHand(){
  if (pHand[0].value === cHand[0].value){
    winner = 't';
  } else if (pHand[0].value > cHand[0].value) {
    winner = pHand; 
    pHand = pHand[0].value.push() + cHand[0].value.push(); 
    console.log(pHand);
  } else {
    winner = cHand;
  }
}

function handlePlay() {
  let pCard = pDeck.shift();
  pHand.unshift(pCard);
  let cCard = cDeck.shift();
  cHand.unshift(cCard);
  render();
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
        value: Number(rank) || (rank === 'A' ? 14 : 10) || (rank === 'J' ? 11 : 10) || (rank === 'Q' ? 12 : 10) || (rank === 'K' ? 13 : 10)
      });
    });
  });
  return deck;
}


function getNewShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  const tempDeck = [...masterDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return newShuffledDeck;
}