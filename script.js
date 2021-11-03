function myGlobalScope() {
    let gridSize = 60;
    const bod = document.getElementsByTagName('body')[0];
    const resetBtn = document.getElementById('reset-btn');
    resetBtn.addEventListener('click', reset)
    drawType = fillBox

    function setupPage() {

        // get desired grid size
        gridSize = prompt('Gridsize:', gridSize || 30)
    
        // create a container div and attach if below the control area
        let container = document.createElement('div');
        container.id = 'container'
    
        // insert the container element below the control area
        const controlArea = document.getElementById('control-area')
        controlArea.parentNode.insertBefore(container, controlArea.nextSibling);
        
        // create grid & attach it to the container
        let grid = createGrid(container, gridSize)   
    
        // grid filling functionality
        grid.forEach(box => box.addEventListener('mousemove', drawType))
    
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

    function fillBox(e) {
        this.classList.add('selected')
    }

    function reset(drawType) {

        const oldContainer = document.getElementById('container')

        // remove the old container
        bod.removeChild(oldContainer)
        
        setupPage(drawType)   
    }

    setupPage(drawType)
    
}

myGlobalScope()

// if mouse button is down & mouse over
