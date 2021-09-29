/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

const cardLookUp = {
  "J": 11,
  "Q": 12,
  "K": 13,
  "A": 14
}
const masterDeck = buildMasterDeck();
const msgEl = document.querySelector('h1');

// const shuffledHand = getShuffeledDeck();

/*----- app's state (variables) -----*/
let pDeck, cDeck, pHand, cHand, war;



/*----- cached element references -----*/

let pHandEl = document.querySelector('#pHand');
let cHandEl = document.querySelector('#cHand');
let warButtonEl = document.querySelector("#war");
let playBtnEl = document.querySelector("#play");
let replayBtnEl = document.querySelector("#replay");
/*----- event listeners -----*/

playBtnEl.addEventListener('click', handlePlay);
warButtonEl.addEventListener('click', warStarts);
replayBtnEl.addEventListener('click', init);

/*----- functions -----*/
//on starting game cards will be split in two shuffled 
init();

function init() {
  let shuffeldDeck = getNewShuffledDeck();
  pDeck = shuffeldDeck.splice(0, 26);
  cDeck = shuffeldDeck;
  pHand = [];
  cHand = [];
  render();
}

function handlePlay() {
  let pCard = pDeck.shift();
  pHand.unshift(pCard);
  let cCard = cDeck.shift();
  cHand.unshift(cCard);
  render();
  winningHand();
  winner();
}

function winningHand() {
  if (pHand[0].value === cHand[0].value) return renderWarButton();
  if (pHand[0].value > cHand[0].value) {
    pDeck.push(...cHand, ...pHand);
    cHand = [];
    pHand = [];
  }   else {
    cDeck.push(...pHand.splice(0), ...cHand.splice(0));
  }
  render();
}

function renderWarButton() {
  warButtonEl.style.visibility = "visible";
  playBtnEl.style.visibility = "hidden";
  msgEl.innerHTML = "Its War";
}

function warStarts() {
  pHand.unshift(pDeck.pop(), pDeck.pop(), pDeck.pop());
  cHand.unshift(cDeck.pop(), cDeck.pop(), cDeck.pop());
  render();
  winningHand();
  unrenderWarButton();
};

function unrenderWarButton() {
  if(pHand !== cHand) {
    warButtonEl.style.visibility = "hidden";
    playBtnEl.style.visibility = "visible";
    msgEl.innerHTML = "Keep playing";
  }
}

function render() {
  if (pHand.length > 0 && cHand.length > 0) {
    let pHandTemplate = `<div class="card ${pHand[0].face}"></div>`;
    let cHandTemplate = `<div class="card ${cHand[0].face}"></div>`; 
    pHandEl.innerHTML = pHandTemplate;
    cHandEl.innerHTML = cHandTemplate; 
  } else {
    pHand.innerHTML = 
    cHand.innerHTML = 
  }
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
        value: Number(rank) || cardLookUp[rank]
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

function winner() {
  if (pDeck.length >= '35'){
    winner = pHand;
    playBtnEl.style.visibility = "hidden";
    msgEl.innerHTML = "Player Wins!";
    replayBtnEl.style.visibility = "visible";
  } else if (cDeck.length >= '35'){
    winner = cHand; 
    
    playBtnEl.style.visibility = "hidden";
    msgEl.innerHTML = "Computer Wins!";
    replayBtnEl.style.visibility = "visible";
  }
} 

function playAgain() {
  playBtnEl.style.visibility = "visible";
  warBtnEl.style.visibility = "hidden";
  replayBtnEl.style.visibility = "hidden";
  init();
}