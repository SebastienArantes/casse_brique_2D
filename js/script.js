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

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

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

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = currentColor;
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

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawRaquette();
    //gestion du rebond
    // si la balle touche le bord supérieur ou inférieur
    if (y + dy > canvas.height - ballRadius|| y + dy < ballRadius) {
        dy = -dy;
        currentColor = getRandomColor();
    }
    // si la balle touche le bord gauche ou droit
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        currentColor = getRandomColor();
    }

    if (rightPressed && raquetteX < canvas.width - raquetteWidth) {
        raquetteX += 7;
    } else if (leftPressed &&  raquetteX > 0) {
        raquetteX -= 7;
    }
    x += dx;
    y += dy;
}

setInterval(draw, 10);