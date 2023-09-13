
// ----/!\ order of declaration is important ----

const container = document.querySelector(".sketch")
const slider = document.querySelector(".slider")
const colorPicker = document.querySelector("#colorpicker");
//container.style.height = `${container.clientWidth}px`;  // for dynamic resizing of the grid

let div;
let SIZE = 16;
let squares;
let drawingMode = drawColor;

initializeSketch();
slider.addEventListener("input",(e)=>{
    SIZE = e.target.value;
    initializeSketch();
    setDrawingMode(drawingMode);
})

function screenshot() {
    html2canvas(container).then(canvas => {
        dataURL = canvas.toDataURL("image/png");  
        a = document.createElement("a");
        a.href = dataURL;
        a.download = "Sketch";
        a.click();
    });
};


//Initializing drawing mode to black color

setDrawingMode();
//functions ----------------------
function changeDrawingMode(mode){
    drawingMode = mode;
}
function setDrawingMode(){
    window.addEventListener("mousedown",()=>{
        squares.forEach((square)=>{
            square.addEventListener("mouseover",drawingMode);
        })
    })
    window.addEventListener("mouseup",()=>{
        squares.forEach((square)=>{
            square.removeEventListener("mouseover",drawingMode);
        })
    })
    squares.forEach((square)=>{
        square.addEventListener("mousedown",(e)=>{
            drawingMode(e)
            squares.forEach((square)=>{
                square.addEventListener("mouseover",drawingMode);
            })
            container.addEventListener("mouseleave",leaveWindow)
        })
        square.addEventListener("mouseup",()=>{
            squares.forEach((square)=>{
                square.removeEventListener("mouseover",drawingMode)
            })
            container.removeEventListener("mouseleave",leaveWindow);
        })
    })
    function leaveWindow(){
        squares.forEach((square)=>{
            square.removeEventListener("mouseover",drawingMode)
        })
        container.addEventListener("mouseenter",enterWindow);
    }
    function enterWindow(){
        squares.forEach((square)=>{
            square.addEventListener("mouseover",drawingMode)
        })
        container.removeEventListener("mouseenter",enterWindow);
    };
    //stops drawing when mouse outside sketch
}


function initializeSketch(){
    container.innerHTML="";
    let squareLength = container.clientWidth/SIZE;
    for (let i = 0; i < SIZE*SIZE; i++) {
        div = document.createElement("div");
        div.classList.add("square")
        div.style.width = `${squareLength}px`;
        div.style.height = `${squareLength}px`;
        container.append(div);
    }
    squares = document.querySelectorAll(".square");
}
function drawColor(e){
    e.target.style.backgroundColor = colorPicker.value;
}
function drawRainbow(e){
    e.target.style.backgroundColor = `rgb(${parseInt((Math.random()*1000))%255+1},${parseInt((Math.random()*1000))%255+1},${parseInt((Math.random()*1000))%255+1})`;
}
function eraser(e){
    e.target.style.backgroundColor = "";
}
function resizeGrid(){
    container.style.height = `${container.clientWidth}px`;
    let squares = document.querySelectorAll(".square")
    let squareLength = container.clientWidth/SIZE;
    squares.forEach((square)=>{
        square.style.width = `${squareLength}px`;
        square.style.height = `${squareLength}px`;
    })
}

function clearSketch(){
    initializeSketch();
    setDrawingMode(drawingMode);
}
// window.addEventListener("resize",()=>{
//     resizeGrid();                                             //for dynamic resizing of the grid
// });