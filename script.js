// set global variables
const easBody = document.getElementById('eas-body')
const pixelArea = document.createElement('div')
pixelArea.id = 'pixel-area'

// nodelist of all pixels
let grid

// set initial gridsize
const gridsizeSelector = document.getElementById('grid-size')
let gridsize = 64
gridsizeSelector.value = gridsize
const resetBtn = document.getElementById('reset-btn')

// const gridForm = document.getElementsByTagName('form');
gridsizeSelector.value

// set initial fill mode for a pixel
const fillModeSelector = document.getElementsByName('fill-mode')
let fillMode = document.querySelector('input[name="fill-mode"]:checked')
fillMode = fillMode.value

// setup listeners
resetBtn.addEventListener('click', validateGridsizeForm)

function validateGridsizeForm(event) {
    // prevents invalide updates to the gridsize
    event.preventDefault();
    if (gridsizeSelector.validity.valid) {
        gridsize = gridsizeSelector.value
        resetPixelArea()
    }
}

// variables to assist with a pixel's 'dragFill()' behavoir
let mouseDown = false 
const psychedelicColors = ['#ffb400', '#ff9500', '#5fbeff', '#ff1daa', '#6bd13e']
let psychedelicColor = getPsychedelicColor()

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
fillModeSelector.forEach(option => 
    option.addEventListener('click', () => {
        fillMode = option.value
        // console.log(fillMode)
        })
    )

function setupPage() {
    // inserts the pixel area into the Etch-a-Sketch frame
    
    easBody.appendChild(pixelArea)

    // creates a grid of pixels & attachs it to the pixel area
    grid = createGrid(gridsize)   

    // set listeners for pixel fill behavoir
    grid.forEach(pixel => pixel.addEventListener('mousedown', downFill))
    grid.forEach(pixel => pixel.addEventListener('mouseenter', entryFill))
    
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
            this.style.backgroundColor = '#808080'
            break;
        case 'psychedelic-fill':
            this.style.backgroundColor = psychedelicColor
            break;
        case 'greyscale-fill':
            this.style.backgroundColor = greyscaleFill(this)
            break;

    }   
}

function entryFill() { 
    // sets pixel fill behavoir while holding down the mouse button and dragging the cursor into a new pixel
    if (mouseDown) {
        switch (fillMode) {
            case 'standard-fill':
                this.style.backgroundColor = '#808080'
                break;
            case 'psychedelic-fill':
                this.style.backgroundColor = psychedelicColor
                break;
            case 'greyscale-fill':
                this.style.backgroundColor = greyscaleFill(this)
        }
    }
}

function getPsychedelicColor() {
    // return a random color from the psychedelic pallet
    return psychedelicColors[Math.floor(Math.random() * psychedelicColors.length)]

}

function greyscaleFill(pixel) {
    // sets a pixel's color on an ascending scale from white to black

    let currentBgColorRGB
    let currentBgColorHex
    let rgbValues
    let newBgColor

    // sets pixel to white if the pixel has not yet been filled
    if (!pixel.style.backgroundColor) {
        newBgColor = 'rgb(255, 255, 255)'
    // sets pixel to black if it's already black
    } else if (pixel.style.backgroundColor === 'rgb(0, 0, 0)') {
        newBgColor = pixel.style.backgroundColor
    // sets the Hex and RGB variables if the current BG color is in RGB format
    } else if (pixel.style.backgroundColor[0] != '#') {
        currentBgColorRGB = pixel.style.backgroundColor
        rgbValues = stripRGBValues(currentBgColorRGB)
        currentBgColorHex = convertRGBToHex(rgbValues)
    } else {
        currentBgColorHex = pixel.style.backgroundColor
    }

    if (!newBgColor) {
        // sets the pixel color to white if pixel has already been filled by another fill method
        if (psychedelicColors.includes(currentBgColorHex) || currentBgColorHex == '#808080') {
            newBgColor = 'rgb(255, 255, 255)'
        // makes then pixel 10% darker than it's current shade (starting from white, ending with black)
        } else {
            // subtract 26 (i.e. 10%) from each RGB component in currentBgColor
            for (i = 0; i < rgbValues.length; i++) {
                rgbValues[i] -= 26
                }
            newBgColor = `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`
        }
    }

    return newBgColor
}

function stripRGBValues(string) {
    // returns int values of an RGB string
    rgbValues = string.substring(4, string.length-1).replace(/ /g, '').split(',');
    for (i = 0; i < rgbValues.length; i++) {
        rgbValues[i] = Number(rgbValues[i])
    }
    return rgbValues
}

function convertRGBToHex(array) {
    return "#" + colorToHex(array[0]) + colorToHex(array[1]) + colorToHex(array[2]);
    
}

function colorToHex(color) {
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