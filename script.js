function myGlobalScope() {

    const bod = document.getElementsByTagName('body')[0];
    const resetBtn = document.getElementById('reset-btn');
    let mouseDown = 0
    const defaultGridSize = 60;
    const maxGridSize = 150;
    let gridSize = defaultGridSize
    let drawType = standardFill
    
    
    function setupPage() {

        // get desired grid size
        gridSize = determineGridSize()
    
        // create a container div and attach if below the control area
        let container = document.createElement('div');
        container.id = 'container'

        // insert the container element below the control area
        const controlArea = document.getElementById('control-area')
        controlArea.parentNode.insertBefore(container, controlArea.nextSibling);
        
        // create grid & attach it to the container
        let grid = createGrid(container, gridSize)   
    
        // grid filling functionality
        grid.forEach(box => standardFill(box))
    
    }
    
    function determineGridSize() {
        // validate the requested gridsize
        let adjustedGridSize
        
        requestedGridSize = prompt('Gridsize (2 - 150):', gridSize || defaultGridSize)
        if (requestedGridSize < 2) {
            adjustedGridSize = 2
        } else if (requestedGridSize > maxGridSize) {
            adjustedGridSize = gridSize
        }
        return adjustedGridSize || requestedGridSize
    }

    function createGrid (container, size) {
        // create a grid layout of 16 boxes

        // create four rows
        for (i = 1; i <= size; i++) {
            let row = document.createElement('div');
            row.className = 'row'
            container.appendChild(row)

            // create four boxes for the row
            for (j = 1; j <= size; j++) { 
                let box = document.createElement('div');
                box.className = 'box'
                row.appendChild(box)
            }   
        }
        return document.querySelectorAll('.box')
    }

    function standardFill(box) {
        box.addEventListener('mouseover', () => {
            if (mouseDown) {
                box.classList.add('selected')
            }
        })
    }

    function psychedelicFill() {
        if (mouseDown) {
            // box.classList.add('selected')
        }
    }

    function reset(drawType) {

        const oldContainer = document.getElementById('container')

        // remove the old container
        bod.removeChild(oldContainer)
        
        setupPage(drawType)   
    }
    
    // setup listeners
    resetBtn.addEventListener('click', reset)

    
    // identify if mouse button is up or down    
    window.addEventListener('mousedown', () => {
        ++mouseDown
        });
    window.addEventListener('mouseup', () => {
        --mouseDown
        });

    
    setupPage(drawType)

}

myGlobalScope()

