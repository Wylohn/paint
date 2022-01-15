var isMouseDown = false
var canvas = document.createElement('canvas');
var body = document.getElementsByTagName("body")[0];
var CTX = canvas.getContext('2d');
var currentBg = "#ffffff"
var currentColor = "rgb(100,100,100)";
var currentSize = 5;


createCanvas()


document.getElementById('canvasUpdate').addEventListener('click', function() {
    createCanvas();
    redraw();
})
document.getElementById('colorpicker').addEventListener('change', function() {
    currentColor = this.value;
});
document.getElementById('bgcolorpicker').addEventListener('change', function() {
    CTX.fillStyle = this.value;
    CTX.fillRect(0, 0, canvas.width, canvas.height);
    redraw();
    currentBg = CTX.fillStyle;
});
document.getElementById('controlSize').addEventListener('change', function() {
    currentSize = this.value;
    document.getElementById("showSize").innerHTML = this.value;
});

function redraw() {
    for (var i = 1; i < linesArray.length; i++) {
        CTX.beginPath();
        CTX.moveTo(linesArray[i-1].x, linesArray[i-1].y);
        CTX.lineWidth  = linesArray[i].size;
        CTX.lineCap = "round";
        CTX.strokeStyle = linesArray[i].color;
        CTX.lineTo(linesArray[i].x, linesArray[i].y);
        CTX.stroke();
    }
}

canvas.addEventListener('mousedown', function() {mousedown(canvas, event);});
canvas.addEventListener('mousemove', function() {mousemove(canvas, event);});
canvas.addEventListener('mouseup', mouseup());

function createCanvas() {
    canvas.id = "canvas"
    canvas.width = parseInt(document.getElementById("sizeX").value);
    canvas.height = parseInt(document.getElementById("sizeY").value);
    canvas.style.zIndex = 8;
    canvas.style.position = "absolute";
    canvas.style.border = "1px solid";
    CTX.fillStyle = currentBg;
    CTX.fillRect(0, 0, canvas.width, canvas.height);
    body.appendChild(canvas);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function mousedown(canvas, evt) {
    isMouseDown = true
    var currentPosition = getMousePos(canvas, evt);
    CTX.moveTo(currentPosition.x, currentPosition.y)
    CTX.beginPath();
    CTX.lineWidth = currentSize;
    CTX.lineCap = "round";
    CTX.strokeStyle = currentColor;
}

function mousemove(canvas, evt) {

    if(isMouseDown){
        var currentPosition = getMousePos(canvas, evt);
        CTX.lineTo(currentPosition.x, currentPosition.y)
        CTX.stroke();
        store(currentPosition.x, currentPosition.y, currentSize, currentColor);
    }
}

function store(x, y, s, c) {
    var line = {
        "x": x,
        "y": y,
        "size": s,
        "color": c
    }
    linesArray.push(line);
}

function mouseup() {
    isMouseUp = false;
    store()
}