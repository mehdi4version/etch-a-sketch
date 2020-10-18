// DOM Selectors
const container = document.getElementById("container");
const body = document.querySelector("body");
const clearBtn = document.querySelector("#clear-btn");
const randomBtn = document.querySelector("#random-btn");
const colorPicker = document.querySelector("#color-picker");
const gridSize = document.querySelector("#grid-slider");
const gridValue = document.querySelector("#grid-value");
const randomColorBtn = document.querySelector("#random-color");
const rainbowBtn = document.querySelector("#rainbow-btn");
const darkenBtn = document.querySelector("#darken-btn");
const resetBtn = document.querySelector("#reset-btn")


// Helper Functions
const makeGrid = (num=16) => {
    container.style.gridTemplateColumns = `repeat(${num}, minmax(0px, 1fr))`
}

const changePencilColor = (color) => {
    return function(e) {
        e.target.style.backgroundColor = color
    }
}

const darkenPencilColor = () => {
    let dark = '255'
    return function (e) {
        dark -= 25
        e.target.style.backgroundColor = `rgb(${dark},${dark},${dark})`
    }
}

const addMouseoverToGrids = (color)=>{
    const grids = document.querySelectorAll('.grid');
    grids.forEach(element=> element.addEventListener('mouseover', changePencilColor(color)))
}

const randomFill = (grids) =>{ grids.forEach(grid => grid.style.backgroundColor = `${randomColor()}`)
}

const randomInt = (max=256) =>{
    return Math.floor(Math.random()*(max+1))
}

const randomColor = () =>{
    return `rgb(${randomInt()},${randomInt()},${randomInt()})`
}

const removeEventListener = (list, event, func) =>{
    list.forEach(element => element.removeEventListener(event, func))
}

const onGridSizeChange = (e)=>{
    const newGridSize = e.target.value
    gridValue.textContent = newGridSize
    container.textContent = '';
    createDivs(newGridSize);
    addMouseoverToGrids(colorPicker.value)
    makeGrid(newGridSize)
}

const onReset = () =>{
    const newGridSize = gridValue.textContent 
    container.textContent = '';
    createDivs(newGridSize);
    addMouseoverToGrids(colorPicker.value)
    makeGrid(newGridSize)
}


// Main Functions
const createDivs = (num=16) => {
    let totalGrids = num * num
    for (let i = 1; i <= totalGrids; i++) {
        let div = document.createElement("div")
        div.setAttribute('style', 'border:black solid 1px')
        div.classList.add('grid')
        container.appendChild(div)
    }
}

const init = () => {
    createDivs() 
    addMouseoverToGrids('#000000')
    makeGrid() 
    gridValue.textContent = 16
}


// Event Listeners
randomBtn.addEventListener('click',()=>{
    const grids = document.querySelectorAll('.grid');
    randomFill(grids)
})

colorPicker.addEventListener('input', (e) => {
    addMouseoverToGrids(e.target.value)
})

colorPicker.addEventListener('change',(e)=>{
    addMouseoverToGrids(e.target.value)
})

gridSize.addEventListener('input', onGridSizeChange)

gridSize.addEventListener('change', onGridSizeChange)

randomColorBtn.addEventListener('click', ()=>{
    let newColor = randomColor()
    addMouseoverToGrids(newColor)
})


rainbowBtn.addEventListener('click',()=>{
    const grids = document.querySelectorAll('.grid');
    grids.forEach(grid => grid.addEventListener('mouseover', changePencilColor(randomColor())));
})

darkenBtn.addEventListener('click',()=>{
    const grids = document.querySelectorAll('.grid');
    grids.forEach(grid => grid.addEventListener('mouseover', darkenPencilColor()));
})

resetBtn.addEventListener('click', onReset)

window.addEventListener('load', init)


