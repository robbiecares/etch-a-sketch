// set global variables
const easBody = document.getElementById('eas-body')
const resetBtn = document.getElementById('reset-btn')
const radioBtn = document.getElementsByName('fill-mode')
let pixelArea = document.createElement('div')
let mouseDown = false
const defaultGridSize = 60;
const maxGridSize = 10;
let gridSize = maxGridSize

// nodelist of all pixels
let grid

// set initial fill mode for a pixel
let fillMode = document.querySelector('input[name="fill-mode"]:checked')
fillMode = fillMode.value
 
const psychedelicColors = ['#ffb400', '#ff9500', '#5fbeff', '#ff1daa', '#6bd13e']
let psychedelicColor = getPsychedelicColor()

// setup listeners
resetBtn.addEventListener('click', resetPixelArea)

// updates variables to assist with the pixel 'dragFill()' behavoir
pixelArea.addEventListener('mousedown', () => {
    mouseDown = true
    // console.log(mouseDown)
    });
pixelArea.addEventListener('mouseup', () => {
    mouseDown = false
    psychedelicColor = getPsychedelicColor()
    // console.log(mouseDown)
    });

// sets a boundary to prevent the mouse from being held down outside of the pixel-area
pixelArea.addEventListener('mouseleave', () => {mouseDown = false})

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

    // set listeners for pixel fill behavoir
    grid.forEach(pixel => pixel.addEventListener('mousedown', downFill))
    grid.forEach(pixel => pixel.addEventListener('mouseenter', entryFill))
    // grid.forEach(pixel => pixel.addEventListener('click', clickFill))
    
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

function downFill() {
    // sets pixel fill behavoir when the mouse button is pushed down
    switch (fillMode) {
        case 'standard-fill':
            this.style.backgroundColor = 'grey'
            break;
        case 'psychedelic-fill':
            this.style.backgroundColor = psychedelicColor
            break;
        case 'greyscale-fill':
            this.style.backgroundColor = greyscaleFill(this)
            break;
    
    // if (mouseDown && fillMode == 'greyscale-fill') {
    //     this.style.backgroundColor = greyscaleFill(this)}
    }   
}

function entryFill() { 
    // sets pixel fill behavoir while holding down the mouse button and dragging the cursor into a new pixel
    if (mouseDown) {
        switch (fillMode) {
            case 'standard-fill':
                this.style.backgroundColor = 'grey'
                break;
            case 'psychedelic-fill':
                this.style.backgroundColor = psychedelicColor
                break;
            case 'greyscale-fill':
                this.style.backgroundColor = greyscaleFill(this)
        }
    }
}

function clickFill() {
    // sets pixel fill behavoir on mouse click
    switch (fillMode) {
        case 'standard-fill':
            this.style.backgroundColor = 'grey'
            break;
        case 'psychedelic-fill':
            this.style.backgroundColor = psychedelicFill()
            break;
        case 'greyscale-fill':
            this.style.backgroundColor = greyscaleFill(this)
            break;

    }
}

function getPsychedelicColor() {
    // return a random color from the psychedelic pallet
    return psychedelicColors[Math.floor(Math.random() * psychedelicColors.length)]

}

function greyscaleFill(pixel) {
    // sets a pixel's color on an ascending scale from white to black

    const currentBgColor = pixel.style.backgroundColor
    
    // extracts array of currentBgColor's rgb values
    let rgbComponenets = currentBgColor.substring(4, currentBgColor.length-1).replace(/ /g, '').split(',');
    for (i = 0; i < rgbComponenets.length; i++) {
        rgbComponenets[i] = Number(rgbComponenets[i])
    }

    // converts currentBgColor from rgb to hex
    const currentBgColorHex = ConvertRGBtoHex(rgbComponenets[0], rgbComponenets[1], rgbComponenets[2])
    
    // if pixel is already black, do not change the color
    if (currentBgColor == 'black')
        bgColor = 'black'

    // sets the pixel color to white if pixel is unfilled or has been filled by another fill method
    else if (!currentBgColor || psychedelicColors.includes(currentBgColorHex) || currentBgColor == 'grey') {
        bgColor = 'rgb(255, 255, 255)'
        
    // makes then pixel 10% darker than it's current shade (starting from white, ending with black)
    } else {
        // subtract 26 (i.e. 10%) from each RGB component in currentBgColor
        for (i = 0; i < rgbComponenets.length; i++) {
            rgbComponenets[i] -= 26
            }
        bgColor = `rgb(${rgbComponenets[0]}, ${rgbComponenets[1]}, ${rgbComponenets[2]})`
    }

    return bgColor
}

function ConvertRGBtoHex(red, green, blue) {
    return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
}

function ColorToHex(color) {
    var hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
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