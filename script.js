const cells = document.querySelectorAll('.cell');
const finalResult = document.getElementById("finalResult");
let noughtTurn;

const cross = 'Cross';
const nought = 'Nought';
const highlight = 'highlight'
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

boardData = ['', '', '', '', '', '', '', '', '']

const turn = cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        updateBoard(index);
        // console.log(index)
    });
});

function updateBoard(index) {
    function update(array, index, newValue) {
        array[index] = newValue;
    }
    let newVal = index;
    update(boardData, index, newVal);
    // console.log(boardData, index);
}

gameBegin();

function gameBegin() {
    boardData = ['', '', '', '', '', '', '', '', '']
    noughtTurn = true;
    finalResult.innerText = '';
    cells.forEach(cell => {
        cell.classList.remove(highlight);
        cell.classList.remove(cross);
        cell.classList.remove(nought);
        cell.addEventListener('click', clickSelect, { once: true });
    })
};

function clickSelect(element) {
    const cell = element.target;
    const currentMove = noughtTurn ? nought : cross;
    placeMarker(cell, currentMove);
    if (checkWin(currentMove)) {
        finalResult.innerText = `The ${currentMove} player wins!`;
        isGameOver();
    } else if (!boardData.includes('')) {
        finalResult.innerText = `It's a Tie!!`;
        highlightCells();
    } else changeTurn();
};

function placeMarker(cell, currentMove) {
    cell.classList.add(currentMove);
};

function checkWin(currentMove) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentMove);
        })
    })
}

function highlightCells() {
    cells.forEach(cell => {
        cell.classList.add("highlight")
    })
}

function isGameOver() {
    cells.forEach(cell => {
        cell.removeEventListener('click', clickSelect);
    })
};

function changeTurn() {
    noughtTurn = !noughtTurn;
};

const resetButton = document.getElementById("reset");
resetButton.addEventListener('click', gameBegin);






// function clickSelect(e) {
//     const cell = e.target;
//     const currentMove = noughtTurn ? nought : cross;
//     placeMarker(cell, currentMove);
//     checkWin();
//     changeTurn();
// };


// function checkWin() {
//     let hasAllElems = true;

//     for (let i = 0; i < winningCombinations.length; i++) {
//         if (boardData.indexOf(winningCombinations[i]) === -1) {
//             hasAllElems = false;
//             break;
//         }
//     }

//     console.log(hasAllElems);
// }
