var grid = null;
var noOfErrors = 0;
var isPencileOn = false;
function createGridUI(grid) {
  let gridUI = ``;
  for (let i = 0; i < 9; i++) {
    gridUI += `<div class="row row-${i}"> `;

    for (let j = 0; j < 9; j++) {
      if (grid[i][j].isEditable) {
        gridUI += `<input type="number" value="" name="userInput" class="column column-${j}" id="${i}-${j}" min="1" max="1" onchange="responseUserInput(event)" />`;
      } else {
        //gridUI += `<span class="column column-${j}" id="${i}-${j}">${grid[i][j].displayValue}</span>`;
        gridUI += `<input type="number" value="${grid[i][j].displayValue}" name="userInput" class="column column-${j}" id="${i}-${j}" disabled/>`;
      }
    }
    gridUI += `</div>`;
  }
  document.getElementById("grid").innerHTML = gridUI;
}

function createGridUI2() {
  grid = Logic.createGrid()
  let gridUI = `<div id="grid2">`;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j].isEditable) {
        gridUI += `<div class="cell inputCell" id="cell-${i}-${j}"><input type="number" value="" name="userInput" class="cellInput" id="${i}-${j}" min="1" max="1" onkeypress="return onUserType(event)"/></div>`;
      } else {
        gridUI += `<div class="cell" id="cell-${i}-${j}"><span class="displayValue">${grid[i][j].displayValue}</span></div>`;
      }
    }
  }
  gridUI += `</div>`;
  
  document.getElementById("placeHolder").innerHTML = gridUI;
}

function responseUserInput(event) {
  let value = event.target.value;
  let position = event.target.id.split("-");
  grid[position[0]][position[1]].displayValue = value;

  if (value == "" || !value) {
    document.getElementById(event.target.id).classList.remove("inValid");
  }
  if (value == grid[position[0]][position[1]].actualValue) {
    document.getElementById(event.target.id).classList.remove("inValid");
    if (Logic.isSudokuComplete(grid)) {
      alert("Good Job");
    }
  } else {
    document.getElementById(event.target.id).classList.add("inValid");
    noOfErrors++;
  }
}

function addDisplayValue(cellId, value){
  let id = `cell-${cellId}`;
  let mainTag = document.createElement("div");
  let textNode = document.createTextNode(value);
  let prevSpans = document.querySelector(`#${id} > div`);
  if (prevSpans) document.getElementById(id).removeChild(prevSpans);
  mainTag.classList.add("displayValue");
  mainTag.appendChild(textNode);
  document.getElementById(id).appendChild(mainTag);
  let rufDiv = document.querySelector(`#${id} div.ruf`);
  if(rufDiv){
    document.getElementById(id).removeChild(rufDiv);
  }
  updateGridValue(cellId, value);
}

function updateGridValue(id, value){
  let position = id.split("-");
  let cellElement = document.getElementById(`cell-${id}`)
  grid[position[0]][position[1]].displayValue = value;

  if (value == "" || !value) {
    cellElement.classList.remove("inValid");
  }
  if (value == grid[position[0]][position[1]].actualValue) {
    cellElement.classList.remove("inValid");
    if (Logic.isSudokuComplete(grid)) {
      setTimeout(function(){
        alert("Good Job");
      },0);
    }
  } else {
    cellElement.classList.add("inValid");
    noOfErrors++;
  }
}
function addRufValue(cellId, value){
  let id = `cell-${cellId}`;
  let rufDiv = document.querySelector(`#${id} div.ruf`);
  if(!rufDiv){
    rufDiv = document.createElement("div");
    rufDiv.classList.add("ruf");
  } 
  
  let prevSpan = document.querySelector(`#${id} > div.ruf > span.ruf-${value}`);
  if (!prevSpan) {
    let spanTag = document.createElement("span");
    spanTag.classList.add(`ruf-${value}`);

    let textNode = document.createTextNode(value);
    spanTag.appendChild(textNode);
    rufDiv.appendChild(spanTag);
  } else {
    rufDiv.removeChild(prevSpan);
  }
  document.getElementById(id).appendChild(rufDiv);

  let displayDiv = document.querySelector(`#${id} div.displayValue`);
  if(displayDiv){
    document.getElementById(id).removeChild(displayDiv);
  }
  
}

function onUserType(event) {
  event.preventDefault();  
  if (isPencileOn) {
    addRufValue(event.target.id, event.key);
  } else {
    addDisplayValue(event.target.id, event.key);
  }
}


//createGridUI(grid);

// document.getElementById("grid").addEventListener("mouseover", function(e) {
//   console.log("mouce", e.target.id);
// });
document.getElementById("pencil").addEventListener("click", function() {
  isPencileOn = !isPencileOn;
  if(isPencileOn)
    document.getElementById("pencil").classList.add("active");
  else 
    document.getElementById("pencil").classList.remove("active");
});
document.getElementById("start").addEventListener("click", function() {
  createGridUI2();
  isPencileOn = false;
  document.getElementById("pencil").classList.remove("active");
});
