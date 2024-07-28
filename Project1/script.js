let currentScale = 1;
const scaleStep = 0.1;
const maxCanvasWidth = window.innerWidth * 0.35;
const maxCanvasHeight = window.innerHeight * 0.7;
let originalImage;
let currentFont = 'Arial';
let textObjects = []; // Array to store text objects
let selectedTextIndex = null; // To keep track of selected text object for dragging

document.getElementById('upload').addEventListener('change', loadImage);
document.getElementById('font').addEventListener('change', function(event) {
    currentFont = event.target.value;
});

function loadImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        originalImage = new Image();
        originalImage.onload = function() {
            const canvas = document.getElementById('originalCanvas');
            const ctx = canvas.getContext('2d');

            const scale = Math.min(maxCanvasWidth / originalImage.width, maxCanvasHeight / originalImage.height);
            canvas.width = originalImage.width * scale;
            canvas.height = originalImage.height * scale;
            ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
            
            const editedCanvas = document.getElementById('canvas');
            const editedCtx = editedCanvas.getContext('2d');
            editedCanvas.width = originalImage.width * scale;
            editedCanvas.height = originalImage.height * scale;
            editedCtx.drawImage(originalImage, 0, 0, editedCanvas.width, editedCanvas.height);
            
            currentScale = scale;
            drawText(); // Redraw text after image load
        }
        originalImage.src = e.target.result;
    }
    
    reader.readAsDataURL(file);
}

function applyFilter() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    const filter = document.getElementById('filter').value;
    const scaleValue = document.getElementById('scale').value / 100;
    document.getElementById('scaleValue').innerText = document.getElementById('scale').value;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        if (filter === 'grayscale') {
            const avg = (r + g + b) / 3;
            const scaledAvg = avg * scaleValue + r * (1 - scaleValue);
            data[i] = data[i + 1] = data[i + 2] = scaledAvg;
        } else if (filter === 'invert') {
            data[i] = 255 - r * scaleValue;
            data[i + 1] = 255 - g * scaleValue;
            data[i + 2] = 255 - b * scaleValue;
        } else if (filter === 'sepia') {
            data[i] = (r * 0.393 + g * 0.769 + b * 0.189) * scaleValue + r * (1 - scaleValue);
            data[i + 1] = (r * 0.349 + g * 0.686 + b * 0.168) * scaleValue + g * (1 - scaleValue);
            data[i + 2] = (r * 0.272 + g * 0.534 + b * 0.131) * scaleValue + b * (1 - scaleValue);
        } else if (filter === 'brightness') {
            const factor = 1 + scaleValue; // Scale brightness
            data[i] = Math.min(255, r * factor);
            data[i + 1] = Math.min(255, g * factor);
            data[i + 2] = Math.min(255, b * factor);
        } else if (filter === 'contrast') {
            const factor = scaleValue * 2; // Scale contrast
            const avg = 128;
            data[i] = Math.min(255, avg + factor * (r - avg));
            data[i + 1] = Math.min(255, avg + factor * (g - avg));
            data[i + 2] = Math.min(255, avg + factor * (b - avg));
        } else if (filter === 'saturate') {
            const factor = scaleValue * 2; // Scale saturation
            const max = Math.max(r, g, b);
            if (max > 0) {
                data[i] = Math.min(255, r + (max - r) * factor);
                data[i + 1] = Math.min(255, g + (max - g) * factor);
                data[i + 2] = Math.min(255, b + (max - b) * factor);
            }
        } else if (filter === 'hue-rotate') {
            const angle = Math.PI * scaleValue; // Rotate hue based on scale
            const sinA = Math.sin(angle);
            const cosA = Math.cos(angle);
            data[i] = r * cosA + g * sinA;
            data[i + 1] = g * cosA - r * sinA;
            data[i + 2] = b;
        }
    }

    ctx.putImageData(imgData, 0, 0);
}

function updateFilter() {
    applyFilter();
}

function zoomIn() {
    currentScale += scaleStep;
    zoom();
}

function zoomOut() {
    if (currentScale - scaleStep > 0) {
        currentScale -= scaleStep;
        zoom();
    }
}

function zoom() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = originalImage.width * currentScale;
    canvas.height = originalImage.height * currentScale;
    ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
    applyFilter();
    drawText(); // Redraw text after zoom
}

function addText() {
    const text = prompt("Enter the text:");
    const font = document.getElementById('font').value;
    if (text && font) {
        const x = 50; // Default x position
        const y = 50; // Default y position
        textObjects.push({ text, font, x, y });
        drawText();
    }
}

function drawText() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
    applyFilter();

    textObjects.forEach((textObj, index) => {
        ctx.font = `20px ${textObj.font}`;
        ctx.fillStyle = "black";
        ctx.fillText(textObj.text, textObj.x, textObj.y);
    });
}

function clearText() {
    if (textObjects.length > 0) {
        textObjects.pop(); // Remove the last text object
        drawText(); // Redraw canvas
    }
}

// Handle text dragging
document.getElementById('canvas').addEventListener('mousedown', startDragging);
document.getElementById('canvas').addEventListener('mouseup', stopDragging);
document.getElementById('canvas').addEventListener('mousemove', dragText);

let isDragging = false;
let offsetX, offsetY;

function startDragging(e) {
    const canvas = document.getElementById('canvas');
    const x = e.offsetX;
    const y = e.offsetY;

    selectedTextIndex = textObjects.findIndex(textObj => {
        const textWidth = getTextWidth(textObj.text, textObj.font);
        return x >= textObj.x - textWidth / 2 && x <= textObj.x + textWidth / 2 &&
               y >= textObj.y - 20 && y <= textObj.y; // Approximate text height
    });

    if (selectedTextIndex !== -1) {
        isDragging = true;
        offsetX = x - textObjects[selectedTextIndex].x;
        offsetY = y - textObjects[selectedTextIndex].y;
    }
}

function stopDragging() {
    isDragging = false;
    selectedTextIndex = null;
}

function dragText(e) {
    if (isDragging && selectedTextIndex !== null) {
        const canvas = document.getElementById('canvas');
        const x = e.offsetX;
        const y = e.offsetY;
        textObjects[selectedTextIndex].x = x - offsetX;
        textObjects[selectedTextIndex].y = y - offsetY;
        drawText();
    }
}

function getTextWidth(text, font) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = `20px ${font}`;
    return context.measureText(text).width;
}

// Function to download the edited image
function downloadImage() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}
