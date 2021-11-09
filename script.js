const easBody = document.getElementById('eas-body')
const resetBtn = document.getElementById('reset-btn')
const radioBtn = document.getElementsByName('fill-type')
let pixelArea = document.createElement('div')
let mouseDown = false
const defaultGridSize = 60;
const maxGridSize = 100;
let gridSize = maxGridSize

// nodelist of all pixels
let grid

// set the initial fill mode for a pixel
let fillMode = 'standard-fill'

// setup listeners
resetBtn.addEventListener('click', resetPixelArea)

// sets the status of the mouse button as up or down (used to fill pixels)
pixelArea.addEventListener('mousedown', () => {
    mouseDown = true
    // console.log(mouseDown)
    });
pixelArea.addEventListener('mouseup', () => {
    mouseDown = false
    // console.log(mouseDown)
    });

// updates the desired fill mode
radioBtn.forEach(option => 
    option.addEventListener('click', () => {
        fillMode = option.value
        // console.log(fillMode)
        })
    )

function setupPage() {

    // get desired grid size
    // gridSize = determineGridSize()
    
    // inserts the pixel area into the Etch-a-Sketch frame
    pixelArea.id = 'pixel-area'
    easBody.appendChild(pixelArea)

    // creates a grid of pixels & attachs it to the pixel area
    grid = createGrid(gridSize)   

    // set grid filling functionality
    grid.forEach(pixel => pixel.addEventListener('mouseover', fillSelected))
}

function determineGridSize() {
    // validate the requested gridsize
    let adjustedGridSize
    
    requestedGridSize = prompt('Gridsize (2 - 100):', gridSize || defaultGridSize)
    if (requestedGridSize < 2) {
        adjustedGridSize = 2
    } else if (requestedGridSize > maxGridSize) {
        adjustedGridSize = gridSize
    }
    return adjustedGridSize || requestedGridSize
}

function createGrid (size) {
    // create a grid of pixels

    // create rows
    for (i = 1; i <= size; i++) {
        let row = document.createElement('div');
        row.classList.add('row')
        pixelArea.appendChild(row)

        // add pixels to row
        for (j = 1; j <= size; j++) { 
            let pixel = document.createElement('div');
            pixel.classList.add('pixel')
            row.appendChild(pixel)
        }   
    }
    return document.querySelectorAll('.pixel')
}

function fillSelected() { 
    if (mouseDown) {
        this.classList.add(fillMode)}
}

function resetPixelArea() {

    pixelArea.textContent = ''
    
    setupPage()   
}


setupPage()



/*
if QWSA pressed in order move one pixel to the left

if QASW pressed in order move one pixel to the right



register any letter in group QWSA being pressed,
    map values to letter (e.g. if letter is Q: Q = 0, W = 1, A = -1)    
    let letter = 0


register the next letter pressed
    if next letter = 
    
    if next letter is clockwise letter move one pixel left
*/