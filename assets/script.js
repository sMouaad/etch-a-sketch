
// ----/!\ order of declaration is important ----

const container = document.querySelector(".sketch")
const slider = document.querySelector(".slider")
//container.style.height = `${container.clientWidth}px`;  // for dynamic resizing of the grid

let div;
let SIZE = 16;

initializeSketch(SIZE);
const squares = document.querySelectorAll(".square");

//Initializing drawing mode to black color
setDrawingMode(drawBlack);

//functions ----------------------
function setDrawingMode(drawingMode){
    squares.forEach((square)=>{
        square.addEventListener("mousedown",(e)=>{
            e.target.style.backgroundColor = "black";
            squares.forEach((square)=>{
                square.addEventListener("mouseover",drawingMode);
            })
        })
        square.addEventListener("mouseup",()=>{
            squares.forEach((square)=>{
                square.removeEventListener("mouseover",drawingMode)
            })
        })
    })
}

function initializeSketch(SIZE){
    let squareLength = container.clientWidth/SIZE;
    console.log(squareLength);
    for (let i = 0; i < SIZE*SIZE; i++) {
        div = document.createElement("div");
        div.classList.add("square")
        div.style.width = `${squareLength}px`;
        div.style.height = `${squareLength}px`;
        container.append(div);
    }
}
function drawBlack(e){
    e.target.style.backgroundColor = "black";
}

function resizeGrid(){
    container.style.height = `${container.clientWidth}px`;
    let squares = document.querySelectorAll(".square")
    let squareLength = container.clientWidth/SIZE;
    squares.forEach((square)=>{
        square.style.width = `${squareLength}px`;
        square.style.height = `${squareLength}px`;
    })
    console.log(squareLength);
}



// window.addEventListener("resize",()=>{
//     resizeGrid();                                             //for dynamic resizing of the grid
// });