function startGame() {
    const boardLen = parseInt(document.getElementById("boardSize").value);
    const gameSpeed = parseFloat(document.getElementById("speed").value);
    const speedup = parseFloat(document.getElementById("speedup").value) / 100;
    const boardColor = document.getElementById("boardColor").value;
    const snakeColor = document.getElementById("snakeColor").value;

    gameBoard.innerHTML = ""
    settingsPanel.style.visibility = "hidden";
    gameOverPanel.style.visibility = "hidden";
    gameBoard.style.visibility = "visible";
    gameBoard.style.backgroundColor = boardColor;
    let squareSize = 50;
    let w = Math.floor(window.innerWidth / (boardLen + 1));
    let h = Math.floor(window.innerHeight / (boardLen + 1));
    if (w > h){
        squareSize = h;
    }else{
        squareSize = w;
    }
    gameBoard.style.width = `${boardLen * squareSize}px`;
    gameBoard.style.height = `${boardLen * squareSize}px`;
    gameBoard.style.display = "grid";
    gameBoard.style.gridTemplateColumns = `repeat(${boardLen}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${boardLen}, 1fr)`;

    let squares = [];
    for (let i = 0; i < boardLen ** 2; i++){
        const square = document.createElement("div");
        square.classList.add("square");
        squares.push(square);
        gameBoard.appendChild(square);
    }


    let snake = [2, 1, 0];
    let direction = 1;
    let speed = 1000 /gameSpeed;
    let timerId = null;
    let foodLocation = 0;
    let score = 0;
    let canControl = true;

    function drawSnake() {
        snake.forEach(index => {
            squares[index].style.backgroundColor = snakeColor;
        });
    }
    function control(e) {
        if (canControl == false) return;
        switch (e.key) {
            case 'ArrowUp':
                if (direction !== boardLen) direction = -boardLen;
                break;
            case 'ArrowDown':
                if (direction !== -boardLen) direction = boardLen;
                break;
            case 'ArrowLeft':
                if (direction !== 1) direction = -1;
                break;
            case 'ArrowRight':
                if (direction !== -1) direction = 1;
                break;
        }
        canControl = false;
    }

    function moveSnake() {
        const head = snake[0] + direction;
        if (
            (direction === -1 && head % boardLen === boardLen - 1) ||
            (direction === 1 && head % boardLen === 0) ||
            (direction === -boardLen && head < 0) ||
            (direction === boardLen && head >= boardLen ** 2) ||
            snake.includes(head)
        ) {
            clearInterval(timerId);
            document.getElementById("finalScore").textContent = score;
            gameBoard.style.visibility = "hidden";
            gameOverPanel.style.visibility = "visible";
            return;
        }

        const tail = snake.pop();
        squares[tail].style.backgroundColor = '';
        snake.unshift(head);

        if (head === foodLocation) {
            squares[tail].style.backgroundColor = snakeColor;
            snake.push(tail);
            score += 10;
            if (score % 5 == 0)
            speed *= (1 - speedup);
            clearInterval(timerId);
            timerId = setInterval(moveSnake, speed);
            generateFood();
        }
        score++;
        drawSnake();
        canControl = true;
    }

    function generateFood() {
        let location = Math.floor(Math.random() * squares.length);
        while (snake.includes(location)){
            location = Math.floor(Math.random() * squares.length);
        }
        foodLocation = location;
        squares[foodLocation].style.backgroundColor = 'red';
    }


    document.addEventListener('keydown', control);
    drawSnake();
    generateFood();
    timerId = setInterval(moveSnake, speed);
}
function returnSettings() {
    gameOverPanel.style.visibility = "hidden";
    gameBoard.style.visibility = "hidden";
    settingsPanel.style.visibility = "visible";
}

const gameBoard = document.getElementById("board");
const settingsPanel = document.getElementById("settings");
const gameOverPanel = document.getElementById("gameOver");
document.getElementById("startGame").addEventListener("click", startGame)
document.getElementById("restart").addEventListener("click", startGame)
document.getElementById("changeSettings").addEventListener("click", returnSettings)
