let canvas = document.querySelector("#myCanvas");
let ctx = canvas.getContext("2d");
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let ballRadius = 10;
let colors = ["#00e1ff", "#6003f5", "#ff0202", "#eeff00", "#000", "#1cf84c"];
let currentColor = colors[0];
let lastColor = currentColor;

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

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
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
    x += dx;
    y += dy;
}
setInterval(draw, 10);