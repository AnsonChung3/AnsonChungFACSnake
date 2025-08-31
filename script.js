const GRID_SIZE = 20;
const GRID_COUNT = 20;

const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');
gameCanvas.width = GRID_SIZE * GRID_COUNT;
gameCanvas.height = GRID_SIZE * GRID_COUNT;

// food generation
let food = []

function generateFood() {
    let mockX = Math.floor(Math.random() * GRID_COUNT);
    let mockY = Math.floor(Math.random() * GRID_COUNT);
    
    while (snake.some(segment => segment.x === mockX && segment.y === mockY )) {
        mockX = Math.floor(Math.random() * GRID_COUNT);
        mockY = Math.floor(Math.random() * GRID_COUNT);
    }
    return food.push({ x: mockX, y: mockY });
    
}

function testAutoFood() {
    setInterval(() => {
        generateFood();
        drawOnCanvas(1, food);
    }, 2000);
}

let snake = undefined;

function drawOnCanvas(o14n, c9s) {
    // o14n => abbreviation for "object being drawn"; it should be a number; 1 for food, 2 for snake
    // c9s => coordinates, it should be an array of {x: , y: }
    fillColour = o14n === 1 ? '#DB826E' : '#da5151ff';
    c9s.forEach(coord => {
        ctx.fillStyle = fillColour;
        ctx.fillRect(coord.x * GRID_SIZE, coord.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    });
}

let direction = 'right';

document.addEventListener('keydown', (event) => {
    switch(event.key.toLowerCase()) {
        case 'w':
            if (direction !== 'down') { direction = 'up'; }
            break;
        case 's':
            if (direction !== 'up') { direction = 'down';}
            break;
        case 'a':
            if (direction !== 'right') { direction = 'left'; }
            break;
        case 'd':
            if (direction !== 'left') { direction = 'right'; }
            break;
        case ' ':
            isPause = !isPause;
            break;
        case 'r':
            if (isGameOver) {
                resetGame();
                initGame();
            }
            break;
    }
});

function isCollide(newHead) {
    // wall collide
    if (newHead.x < 0 || newHead.x >= GRID_COUNT || newHead.y < 0 || newHead.y >= GRID_COUNT) {
        return true;
    }
    // self collide
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === newHead.x && snake[i].y === newHead.y) {
            return true;
        }
    }
    return false;
}

// pause is default to true so that the snake won't move until user presses a key
let isPause = true;
isGameOver = false;

function moveSnake() {
    if (isPause) {
        return;
    }

    const mockNewHead = {...snake[0]};
    switch(direction) {
        case 'up': mockNewHead.y--; break;
        case 'down': mockNewHead.y++; break;
        case 'left': mockNewHead.x--; break;
        case 'right': mockNewHead.x++; break;
    }

    // if collide, game over
    if (isCollide(mockNewHead)) {
        alert('Game Over! Press R to restart.');
        isGameOver = true;
        isPause = true;
        return;
    }
    // else, draw and add new head
    drawOnCanvas(2, [mockNewHead]);
    snake.unshift(mockNewHead);

    // if snake gets to eat the food, remove food and return
    // since the block food previously occupied is now occupied by the snake's new head
    if (food[0].x === mockNewHead.x && food[0].y === mockNewHead.y) {
        food = [];
        generateFood();
        drawOnCanvas(1, food);
        return
    }
    // else, remove tail
    const oldTail = snake[snake.length - 1];
    ctx.clearRect(oldTail.x * GRID_SIZE, oldTail.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    snake.pop();
}

function resetGame() {
    ctx.clearRect(0, 0, GRID_SIZE * GRID_COUNT, GRID_SIZE * GRID_COUNT);
    const initSnake = [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 }
    ];
    snake = initSnake;
    drawOnCanvas(2, snake);
    food = [];
    isGameOver = false;
    direction = 'right';
}

let gameLoop;
let GAME_SPEED = 300;

function initGame() {
    generateFood();
    drawOnCanvas(1, food);
    
    isPause = false;

    if (gameLoop) {
        clearInterval(gameLoop);
    }
    gameLoop = setInterval(() => {
        moveSnake();
    }, GAME_SPEED);
}

const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', () => {
    initGame();
});

document.addEventListener('DOMContentLoaded', () => {
    resetGame();
});