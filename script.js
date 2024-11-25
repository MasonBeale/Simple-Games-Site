function startGame() {
    const squares = [];
    const boardLen = parseInt(document.getElementById("boardSize").value);
    const Size = boardLen ** 2;
    const squareSize = 30;
    gameBoard.innerHTML = ""
    gameBoard.style.visibility = "visable";
    gameBoard.style.backgroundColor = document.getElementById("boardColor").value;
    gameBoard.style.width = `${boardLen * squareSize}px`;
    gameBoard.style.height = `${boardLen * squareSize}px`;
    gameBoard.style.display = "grid";
    gameBoard.style.gridTemplateColumns = `repeat(${boardLen}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${boardLen}, 1fr)`;

    squares.forEach(square => gameBoard.appendChild(square));

    for (let i = 0; i < Size; i++){
        const square = document.createElement("div");
        square.classList.add("square");
        square.textContent = i;
        squares.push(square)
    }

    squares.forEach(square => gameBoard.appendChild(square));
}

/*
start of actual snake stuff
need to make a form or just options switch
get from user: board color, snake color, board size, og speed, speedup per apple if any 
*/
const gameBoard = document.getElementById("board");
const squares = [];
document.getElementById("startGame").addEventListener("click", startGame)




