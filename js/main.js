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
const sound = new Audio('sounds/ds.mp3');

/*----- app's state (variables) -----*/
let pDeck, cDeck, pHand, cHand, war;

/*----- cached element references -----*/

let pHandEl = document.querySelector('#pHand');
let cHandEl = document.querySelector('#cHand');

let warButtonEl = document.querySelector("#war");
let playBtnEl = document.querySelector("#play");
let replayBtnEl = document.querySelector("#replay");

let pCountEl = document.querySelector("#pCardCount")
let cCountEl = document.querySelector("#cCardCount")
/*----- event listeners -----*/

playBtnEl.addEventListener('click', handlePlay);
warButtonEl.addEventListener('click', warStarts);
replayBtnEl.addEventListener('click', playAgain);

/*----- functions -----*/
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
  sound.play();
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
    msgEl.innerHTML = "Your Hand wins";
    pDeck.push(...cHand, ...pHand);
    cHand = [];
    pHand = [];
  } else {
    msgEl.innerHTML = "Computer Hand wins";
    cDeck.push(...pHand.splice(0), ...cHand.splice(0));
  }
}

function renderWarButton() {
  warButtonEl.style.visibility = "visible";
  playBtnEl.style.visibility = "hidden";
  msgEl.innerHTML = "War! 3 cards at risk!";
  document.querySelector("body").style.backgroundColor = "DarkOliveGreen";

}

function warStarts() {
  sound.play();
  pHand.unshift(pDeck.pop(), pDeck.pop(), pDeck.pop());
  cHand.unshift(cDeck.pop(), cDeck.pop(), cDeck.pop());
  render();
  if (pHand[0].value !== cHand[0].value) {
    winningHand();
    unrenderWarButton();
  }
}

function unrenderWarButton() {
  if (pHand !== cHand) {
    warButtonEl.style.visibility = "hidden";
    playBtnEl.style.visibility = "visible";
    document.querySelector("body").style.backgroundColor = "rgb(4, 107, 47)";
  }
}

function render() {
  if (pHand.length > 0 && cHand.length > 0) {
    let pHandTemplate = `<div class="card ${pHand[0].face}"></div>`;
    let cHandTemplate = `<div class="card ${cHand[0].face}"></div>`;
    pHandEl.innerHTML = pHandTemplate;
    cHandEl.innerHTML = cHandTemplate;
  } else {
    pHandEl.innerHTML = '';
    cHandEl.innerHTML = '';
  }
  pCountEl.innerText = pDeck.length + pHand.length;
  cCountEl.innerText = cDeck.length + cHand.length;
}

function buildMasterDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function (suit) {
    ranks.forEach(function (rank) {
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
  if (pDeck.length + pHand.length >= 50) {
    playBtnEl.style.visibility = "hidden";
    msgEl.innerHTML = "You Win!";
    replayBtnEl.style.visibility = "visible";
  } else if (cDeck.length + cHand.length >= 50) {
    playBtnEl.style.visibility = "hidden";
    msgEl.innerHTML = "Computer Wins :(";
    replayBtnEl.style.visibility = "visible";
  }
}

function playAgain() {
  msgEl.innerHTML = "Do you want war?"
  playBtnEl.style.visibility = "visible";
  warButtonEl.style.visibility = "hidden";
  replayBtnEl.style.visibility = "hidden";
  init();
}