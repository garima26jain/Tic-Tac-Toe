//HTML elements

const statusDiv = document.querySelector(".status");
const resetDiv = document.querySelector(".reset");
const cellDivs = document.querySelectorAll(".game-cell");

//game constant
const xSymbol = "×";
const oSymbol = "○";

//game variables

let gameAlive = true;
let x_IsNext = true;
let winner = null;

//functions

const letterToSymbol = letter => (letter === "x" ? xSymbol : oSymbol);

//winning code --modular
//no duplicacy
const handleWin = letter => {
  //console.log(letter);
  gameAlive = false;
  winner = letter;

  if (winner === "x") {
    statusDiv.innerHTML = `${letterToSymbol(winner)} WON!`;
    console.log(statusDiv);
  } else {
    statusDiv.innerHTML = `<span>${letterToSymbol(winner)} WON!</span>`;
    console.log(statusDiv);
  }
};

//to check game status--find if x or o
const checkGameStatus = () => {
  const topLeft = cellDivs[0].classList[1];
  const topMiddle = cellDivs[1].classList[1];
  const topRight = cellDivs[2].classList[1];
  const middleLeft = cellDivs[3].classList[1];
  const middleMiddle = cellDivs[4].classList[1];
  const middleRight = cellDivs[5].classList[1];
  const bottomLeft = cellDivs[6].classList[1];
  const bottomMiddle = cellDivs[7].classList[1];
  const bottomRight = cellDivs[8].classList[1];

  //check for winner
  //1. Game will end.
  //--manually check for all possible winning combination

  // y we are including topLeft in if condition is
  //bcoz we don't want that if all 3 are undefined--that shouldn't be a winning condition
  //mind --we are checking the alphabet not the symbol

  /**HORIZONTAL WINS */
  if (topLeft && topLeft === topMiddle && topLeft === topRight) {
    //Now we should know who is actually there
    // x or o
    console.log(topLeft); //--this will give x or o
    handleWin(topLeft);

    //to mark which combination provides a winner
    cellDivs[0].classList.add("won");
    cellDivs[1].classList.add("won");
    cellDivs[2].classList.add("won");
  } else if (
    middleLeft &&
    middleLeft === middleMiddle &&
    middleLeft === middleRight
  ) {
    handleWin(middleLeft);

    cellDivs[3].classList.add("won");
    cellDivs[4].classList.add("won");
    cellDivs[5].classList.add("won");
  } else if (
    bottomLeft &&
    bottomLeft === bottomMiddle &&
    bottomLeft === bottomRight
  ) {
    handleWin(bottomLeft);

    cellDivs[6].classList.add("won");
    cellDivs[7].classList.add("won");
    cellDivs[8].classList.add("won");
  } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
    /**VERTICAL WINS */
    handleWin(topLeft);

    cellDivs[0].classList.add("won");
    cellDivs[3].classList.add("won");
    cellDivs[6].classList.add("won");
  } else if (
    topMiddle &&
    topMiddle === middleMiddle &&
    topMiddle === bottomMiddle
  ) {
    handleWin(topMiddle);

    cellDivs[1].classList.add("won");
    cellDivs[4].classList.add("won");
    cellDivs[7].classList.add("won");
  } else if (topRight && topRight === middleRight && topRight === bottomRight) {
    handleWin(topRight);

    cellDivs[2].classList.add("won");
    cellDivs[5].classList.add("won");
    cellDivs[8].classList.add("won");
  } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
    /**DIAGONAL WINS */
    handleWin(topLeft);

    cellDivs[0].classList.add("won");
    cellDivs[4].classList.add("won");
    cellDivs[8].classList.add("won");
  } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
    handleWin(topRight);

    cellDivs[2].classList.add("won");
    cellDivs[4].classList.add("won");
    cellDivs[6].classList.add("won");
  }

  //if all are defined but no winning condition
  else if (
    topLeft &&
    topMiddle &&
    topRight &&
    middleLeft &&
    middleMiddle &&
    middleRight &&
    bottomLeft &&
    bottomMiddle &&
    bottomRight
  ) {
    gameAlive = false;
    statusDiv.innerHTML = " GAME TIE!";
  } else {
    /**if neither wins nor tie ---GAME CONTINUES */
    x_IsNext = !x_IsNext;
    if (x_IsNext) {
      statusDiv.innerHTML = `${xSymbol} is next`;
    } else {
      statusDiv.innerHTML = `<span>${oSymbol} is next</span>`;
    }
  }
};

//event handlers
const handleReset = e => {
  //many attributes are associated with this event.
  console.log(e);
  for (const cellDiv of cellDivs) {
    cellDiv.classList.remove("x");
    cellDiv.classList.remove("o");
    cellDiv.classList.remove("won");
  }
  winner = null;
  x_IsNext = true;
  statusDiv.innerHTML = `Start`;
  //loop thru each of the cell divs
};
const handleCellClick = e => {
  /*to know which cell has been clicked --
by ---target attribute
that has classList--same as {classname} 
classList is actually a object but it looks like array
so we can make use of it 
*/
  console.log(e.target.classList);
  const classList = e.target.classList;
  //so now we know which cell have we clicked on--above

  //***check if we element has already x or o--then we don't add any className
  if (!gameAlive || classList[1] === "x" || classList[1] === "o") {
    return;
    //so now we don't add both x an o as classname
    // either one is added
  }

  //***otherwise add className
  //now decide whose turn
  if (x_IsNext) {
    classList.add("x"); //-always x will start the game
    checkGameStatus();
    //here handling turn manually
    //x_IsNext = !x_IsNext;
  } else {
    classList.add("o");
    checkGameStatus();
    // x_IsNext = !x_IsNext;
  }
};

//event listener
//add event listner to reset button
resetDiv.addEventListener("click", handleReset);

/**for of loop */
/**will loop thru each element and store in the variable  */

//add event listner to each of the 9 game-cell
for (const cellDiv of cellDivs) {
  cellDiv.addEventListener("click", handleCellClick);
}
