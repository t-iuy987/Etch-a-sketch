let gridLength = 16 // default length of the grid  
//height and width of grid 
let maxWidth = 500
let maxHeight = 400

let rowDiv, colDiv;
let mousedown = false;
let mousemove = false;
let colorMode = "normal";
let container = document.querySelector(".container");

container.style.width = "500px";
container.style.height = "400px";

container.style.border = "1px solid #D0C9C7";
container.style.boxShadow = "2px 2px 5px 2px #D0C9C7";
drawGrid(16);
container.addEventListener('mousedown', () => { mousedown = true; });
container.addEventListener('mouseup', () => { mousedown = false; });



const randColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
}



function changeColor(e) {
    if (e.type === 'mouseover' && !mousedown) return;
    if (colorMode === 'normal')
        e.target.style.backgroundColor = "black";
    else if (colorMode === 'rainbow')
        e.target.style.backgroundColor = randColor();
    else if (colorMode === "erase")
        e.target.style.backgroundColor = "white";
}
function divHover() {
    const divs = container.childNodes;
    for (let i = 0; i < divs.length; i++) {
        const divChild = divs[i].childNodes;
        divChild.forEach(childChange);
    }
}

function childChange(child) {
    child.addEventListener('mouseover', changeColor)
    child.addEventListener('mousedown', changeColor)

}

function drawGrid(gridLength) {
    container.textContent = '';
    for (let i = 0; i < gridLength; i++) {
        rowDiv = document.createElement("div");
        rowDiv.style.display = "flex";
        rowDiv.style.flexDirection = "row";

        for (let j = 0; j < gridLength; j++) {
            colDiv = document.createElement("div");
            colDiv.style.height = maxHeight / gridLength + "px";
            colDiv.style.width = maxWidth / gridLength + "px";
            colDiv.style.userSelect = "none";
            colDiv.style.userDrag = "none";
            rowDiv.appendChild(colDiv);
        }
        container.appendChild(rowDiv);
    }
    document.querySelector(".popup-bg").style.display = "none";
    divHover();
}





document.getElementById("size-btn").addEventListener('click',
    function () {
        document.querySelector(".popup-bg").style.display = "flex";
    });


document.querySelector(".close").addEventListener('click',
    function () {
        document.querySelector(".popup-bg").style.display = "none";
    });

document.getElementById("ok-btn").addEventListener('click',
    function () {
        gridLength = document.getElementById("grid-length-inp").value;
        if (gridLength < 0 || gridLength > 100) {
            alert("WARNING!!!\nMax grid length: 100\nMin grid length: 0");
            return;
        }
        drawGrid(gridLength);

        console.log(lenInput);
    });

const rainbowBtn = document.querySelector(".rainbow-btn");
rainbowBtn.addEventListener("click",
    function () {
        if (colorMode === "normal") { colorMode = "rainbow"; rainbowBtn.style.backgroundColor = "red"; }
        else if (colorMode === "rainbow") { colorMode = "normal"; rainbowBtn.style.backgroundColor = "#a52a2a"; }

    });

const eraseBtn = document.querySelector('.erase-btn');
eraseBtn.addEventListener('click',
    function () {
        if (colorMode === "normal" || colorMode === "rainbow") { colorMode = "erase"; eraseBtn.style.backgroundColor = "red" }

        else if (colorMode === "erase") {
            if (rainbowBtn.style.backgroundColor === "red") { colorMode = "rainbow"; }
            else {
                colorMode = "normal";
            }
            eraseBtn.style.backgroundColor = "#a52a2a"
        }
    });


