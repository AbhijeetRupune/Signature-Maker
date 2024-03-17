const canvas = document.getElementById('whiteboard');
const context = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.width = window.innerWidth - 50;
canvas.height = 400;
context.strokeStyle = '#000000';
context.lineJoin = 'round';
context.lineCap = 'round';
context.lineWidth = 5;

function draw(e) {
    if (!isDrawing) return;
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(e.offsetX, e.offsetY);
    context.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function handleMouseEvent(e) {
    if (e.type === 'mousedown') {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    } else if (e.type === 'mouseup' || e.type === 'mouseout') {
        isDrawing = false;
    }
}

function handleTouchEvent(e) {
    if (e.type === 'touchstart') {
        e.preventDefault(); // Prevent scrolling or zooming
        isDrawing = true;
        [lastX, lastY] = [e.touches[0].offsetX, e.touches[0].offsetY];
    } else if (e.type === 'touchend' || e.type === 'touchcancel') {
        isDrawing = false;
    }
}

canvas.addEventListener('mousedown', handleMouseEvent);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', handleMouseEvent);
canvas.addEventListener('mouseout', handleMouseEvent);

canvas.addEventListener('touchstart', handleTouchEvent);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', handleTouchEvent);
canvas.addEventListener('touchcancel', handleTouchEvent);

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function downloadCanvas() {
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = 'signature.png';
    link.click();
}

const thicknessRange = document.getElementById('thicknessRange');
thicknessRange.addEventListener('input', () => {
    context.lineWidth = thicknessRange.value;
});

const colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('input', () => {
    context.strokeStyle = colorPicker.value;
});