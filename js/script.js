let canvas = document.querySelector("#myCanvas");
let ctx = canvas.getContext("2d");
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let colors = ["#00e1ff", "#6003f5", "#ff0202", "#eeff00", "#000", "#1cf84c"];
let currentColor = colors[0];
let lastColor = currentColor;
let raquetteHeight = 10;
let raquetteWidth = 75;
let raquetteX = (canvas.width - raquetteWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
const gameOverNotif = document.querySelector(".game-over_notify");
let interval;
let score = 0;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1};
    }
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
gameOverNotif.addEventListener("click", () => {
    document.location.reload();
});

function mouseMoveHandler(event) {
    //gestion de la raquette avec la souris ici
}

function keyDownHandler(event) {
    if (event.key === "Right" || event.key === "ArrowRight") {
        rightPressed = true;
    } else if (event.key === "Left" || event.key === "ArrowLeft") {
        leftPressed = true;
    }
}
function keyUpHandler(event) {
    if (event.key === "Right" || event.key === "ArrowRight") {
        rightPressed = false;
    } else if (event.key === "Left" || event.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function getRandomColor() {
    let newColor;
    for (let color of colors) {
        if (color !== currentColor && color !== lastColor) {
            newColor = color;
            break;
        }
    }
    lastColor = currentColor;
    return newColor;
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    currentColor = getRandomColor();
                    if (score === brickRowCount * brickColumnCount) {
                        alert(`SCORE FINAL = ${score}. VICTOIRE, BRAVO !!!`);
                        document.location.reload();
                        clearInterval(interval);

                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "1rem Arial";
    ctx.fillStyle = "#000";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = currentColor;
    // ctx.fillStyle = "#2cff02";
    ctx.fill();
    ctx.closePath();
}

function drawRaquette() {
    ctx.beginPath();
    ctx.rect(raquetteX, canvas.height - raquetteHeight, raquetteWidth, raquetteHeight);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                // let brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                // let brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#7e7e7e";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawRaquette();
    drawScore();
    collisionDetection();
    //gestion du rebond
    // si la balle touche le bord gauche ou droit
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        // currentColor = getRandomColor();
    }
    // si la balle touche le bord supérieur ou inférieur
    if (y + dy < ballRadius) {
        dy = -dy;
        // currentColor = getRandomColor();
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > raquetteX && x < raquetteX + raquetteWidth) {
            if (y = y - raquetteHeight) {
                dy = -dy;
                // currentColor = getRandomColor();
            }
        } else {
            gameOverNotif.style.display = "flex";
            clearInterval(interval);
            return;
        }
    }

    if (rightPressed && raquetteX < canvas.width - raquetteWidth) {
        raquetteX += 7;
    } else if (leftPressed &&  raquetteX > 0) {
        raquetteX -= 7;
    }
    x += dx;
    y += dy;
}

interval = setInterval(draw, 10);
// setInterval(draw, 10);