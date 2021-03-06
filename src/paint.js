// VARIABLES

var isMouseDown = false
var canvas = document.createElement('canvas');
var body = document.getElementsByTagName("body")[0];
var CTX = canvas.getContext('2d');
var linesArray = [];
var currentBg = "#ffffff"
var currentColor = "rgb(34, 64, 214)";
var currentSize = 5;

// INIT CANVAS+

createCanvas()

// BUTTONS EVENT

document.getElementById('canvasUpdate').addEventListener('click', function() {
    createCanvas();
    redraw();
});
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
document.getElementById('saveToImage').addEventListener('click', function() {
    downloadCanvas(this, 'canvas', 'masterpiece.png');
}, false);
document.getElementById('eraser').addEventListener('click', eraser);
document.getElementById('clear').addEventListener('click', createCanvas);
document.getElementById('save').addEventListener('click', save);
document.getElementById('load').addEventListener('click', load);
document.getElementById('clearCache').addEventListener('click', function() {
    localStorage.removeItem("savedCanvas");
    linesArray = [];
    console.log("Cache cleared!");
});

//REDRAW

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

// DRAWING EVENT HANDLERS

canvas.addEventListener('mousedown', function() {mousedown(canvas, event);});
canvas.addEventListener('mousemove', function() {mousemove(canvas, event);});
canvas.addEventListener('mouseup', mouseup);

// CREATE CANVAS

function createCanvas() {
    canvas.id = "canvas"
    canvas.width = parseInt(document.getElementById("sizeX").value);
    canvas.height = parseInt(document.getElementById("sizeY").value);
    canvas.style.zIndex = 1;
    canvas.style.position = "absolute";
    canvas.style.border = "1px solid";
    CTX.fillStyle = currentBg;
    CTX.fillRect(0, 0, canvas.width, canvas.height);
    body.appendChild(canvas);
}

// DOWNLOAD CANVAS

function downloadCanvas(link, canvas, filename) {
    link.href = document.getElementById(canvas).toDataURL();
    link.download = filename;
}

// SAVE CANVAS

function save() {
    localStorage.removeItem("savedCanvas");
    localStorage.setItem("savedCanvas", JSON.stringify(linesArray));
    console.log("Saved canvas!");
}

// LOAD CANVAS

function load() {
    if (localStorage.getItem("savedCanvas") != null) {
        linesArray = JSON.parse(localStorage.savedCanvas);
        var lines = JSON.parse(localStorage.getItem("savedCanvas"));
        for (var i = 1; i < lines.length; i++) {
            CTX.beginPath();
            CTX.moveTo(linesArray[i-1].x, linesArray[i-1].y);
            CTX.lineWidth  = linesArray[i].size;
            CTX.lineCap = "round";
            CTX.strokeStyle = linesArray[i].color;
            CTX.lineTo(linesArray[i].x, linesArray[i].y);
            CTX.stroke();
        }
        console.log("Canvas loaded.");
    }
    else {
        console.log("No canvas in memory!");
    }
}

// ERASER

function eraser() {
    size = currentSize;
    currentColor = CTX.fillStyle
}

// GET MOUSE POSITION

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// MOUSE DOWN

function mousedown(canvas, evt) {
    var mousePos = getMousePos(canvas, evt);
    isMouseDown = true;
    var currentPosition = getMousePos(canvas, evt);
    CTX.moveTo(currentPosition.x, currentPosition.y)
    CTX.beginPath();
    CTX.lineWidth = currentSize;
    CTX.lineCap = "round";
    CTX.strokeStyle = currentColor;
}

// MOUSE MOVE

function mousemove(canvas, evt) {

    if(isMouseDown){
        var currentPosition = getMousePos(canvas, evt);
        CTX.lineTo(currentPosition.x, currentPosition.y)
        CTX.stroke();
        store(currentPosition.x, currentPosition.y, currentSize, currentColor);
    }
}

// MOUSE UP

function mouseup() {
    isMouseDown = false;
    store()
}

// DATA STORAGE

function store(x, y, s, c) {
    var line = {
        "x": x,
        "y": y,
        "size": s,
        "color": c
    }
    linesArray.push(line);
}
