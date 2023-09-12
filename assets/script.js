const container = document.querySelector(".sketch")
//container.style.height = `${container.clientWidth}px`;

let div;
let SIZE = 16;


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
initializeSketch(SIZE);
const squares = document.querySelectorAll(".square");

function drawBlack(e){
    e.target.style.backgroundColor = "black";
}

squares.forEach((square)=>{
    square.addEventListener("mousedown",(e)=>{
        e.target.style.backgroundColor = "black";
        squares.forEach((square)=>{
            square.addEventListener("mouseover",drawBlack);
        })
    })
    square.addEventListener("mouseup",()=>{
        squares.forEach((square)=>{
            square.removeEventListener("mouseover",drawBlack)
        })
    })
})

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
//     resizeGrid();
// });