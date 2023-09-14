
// ----/!\ order of declaration is important ----

const container = document.querySelector(".sketch")
const slider = document.querySelector(".slider")
const colorPicker = document.getElementById("colorpicker");
const rainbowButton = document.getElementById("rainbow")
const ERASER = document.getElementById("eraser")
const h1 = document.querySelector("h1");

container.style.height = `${container.clientWidth}px`;  // for dynamic resizing of the grid

let div;
let SIZE = 16;
let squares;
let drawingMode = drawColor;

initializeSketch();

slider.addEventListener("input",(e)=>{
    SIZE = e.target.value;
    h1.textContent=`${SIZE}x${SIZE}`
    initializeSketch();
    setDrawingMode(drawingMode);
})
initializeRainbowButton()
//Initializing drawing mode to black color

setDrawingMode();
//functions ----------------------
function screenshot() {
    html2canvas(container).then(canvas => {
        dataURL = canvas.toDataURL("image/png");  
        a = document.createElement("a");
        a.href = dataURL;
        a.download = "Sketch";
        a.click();
    });
};

function clearClass(){
    let choice = document.querySelectorAll(".choice")
    choice.forEach((c)=>{
        c.classList.remove("choice");
    })
}

function changeDrawingMode(mode){
    clearClass();
    if(drawingMode!== drawRainbow && mode===drawRainbow){
        rainbowButton.parentElement.classList.add("choice")
        rainbowButton.src="./assets/rainbow.gif"
        rainbowButton.removeEventListener("mouseenter",triggerGifAnimation)
        rainbowButton.removeEventListener("mouseleave",stopGifANimation)
        
    }
    else if(drawingMode === drawRainbow){
        rainbowButton.src="./assets/rainbow.png"
        initializeRainbowButton();
    }
    if(mode===drawColor){
        colorPicker.parentElement.classList.add("choice");
    }
    if(mode===eraser){
        ERASER.classList.add("choice");
    }
    drawingMode = mode;
}
function setDrawingMode(){
    squares.forEach((square)=>{
        square.addEventListener("mousedown",(e)=>{
            drawingMode(e)
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
    function enterWindow(){
        squares.forEach((square)=>{
            square.addEventListener("mouseover",drawingMode)
        })
        container.removeEventListener("mouseenter",enterWindow);
    };
    window.addEventListener("mousedown",()=>{
        squares.forEach((square)=>{
            square.addEventListener("mouseover",drawingMode);
        })
    })
    window.addEventListener("mouseup",()=>{
        squares.forEach((square)=>{
            square.removeEventListener("mouseover",drawingMode);
        })
        container.removeEventListener("mouseenter",enterWindow);
    })
}

function triggerGifAnimation(){
    rainbowButton.src="./assets/rainbow.gif"
}
function stopGifANimation(){
    rainbowButton.src="./assets/rainbow.png"
}
function initializeRainbowButton(){
    rainbowButton.addEventListener("mouseenter",triggerGifAnimation)
    rainbowButton.addEventListener("mouseleave",stopGifANimation)
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
    resizeGrid();
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
window.addEventListener("resize",()=>{
    resizeGrid();                                             //for dynamic resizing of the grid
});




//---------------------mobile devices support------------------------

container.addEventListener("touchmove", function(e) {
    e.preventDefault();
    let touch = e.touches[0];
    let checkbox = document.elementFromPoint(touch.clientX, touch.clientY);
    if (checkbox) {
        if(checkbox.parentElement===container){
            switch (drawingMode) {
                case drawColor:
                    checkbox.style.backgroundColor = colorPicker.value;
                    break;
                case drawRainbow:
                    checkbox.style.backgroundColor = `rgb(${parseInt((Math.random()*1000))%255+1},${parseInt((Math.random()*1000))%255+1},${parseInt((Math.random()*1000))%255+1})`;
                    break;
                case eraser:
                    checkbox.style.backgroundColor = "";
                    break;
                default:
                    console.log("abnormality???");
                    break;
            }
        }
    }
});