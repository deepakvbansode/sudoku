var Logic = (function() {
  function getBasicGrid(){
    return [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [4, 5, 6, 7, 8, 9, 1, 2, 3],
      [7, 8, 9, 1, 2, 3, 4, 5, 6],
  
      [2, 3, 4, 5, 6, 7, 8, 9, 1],
      [5, 6, 7, 8, 9, 1, 2, 3, 4],
      [8, 9, 1, 2, 3, 4, 5, 6, 7],
  
      [3, 4, 5, 6, 7, 8, 9, 1, 2],
      [6, 7, 8, 9, 1, 2, 3, 4, 5],
      [9, 1, 2, 3, 4, 5, 6, 7, 8]
    ];
  }

  function isValidGrid(grid) {
    return (
      isValidAllrows(grid) && isValidAllColumns(grid) && isValidAllRegion(grid)
    );
  }

  function isValidAllrows(grid) {
    let isValid = true;
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      let sum = 0;
      for (let columnIndex = 0; columnIndex < 9; columnIndex++) {
        sum += grid[rowIndex][columnIndex];
      }
      if (sum != 45) {
        isValid = false;
        break;
      }
    }

    return isValid;
  }

  function isValidAllColumns(grid) {
    let isValid = true;
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      let sum = 0;
      for (let columnIndex = 0; columnIndex < 9; columnIndex++) {
        sum += grid[columnIndex][rowIndex];
      }
      if (sum != 45) {
        isValid = false;
        break;
      }
    }

    return isValid;
  }

  function isValidRegion(
    grid,
    topLeftBond,
    topRightBond,
    bottomLeftBond,
    bottomRightBond
  ) {
    let sum = 0;
    for (let rowIndex = topLeftBond; rowIndex <= topRightBond; rowIndex++) {
      for (
        let columnIndex = bottomLeftBond;
        columnIndex <= bottomRightBond;
        columnIndex++
      ) {
        sum += grid[rowIndex][columnIndex];
      }
    }
    if (sum != 45) {
      return false;
    }
    return true;
  }

  function isValidAllRegion(grid) {
    return (
      isValidRegion(grid, 0, 2, 0, 2) &&
      isValidRegion(grid, 0, 2, 3, 5) &&
      isValidRegion(grid, 0, 2, 6, 8) &&
      isValidRegion(grid, 3, 5, 0, 2) &&
      isValidRegion(grid, 3, 5, 3, 5) &&
      isValidRegion(grid, 3, 5, 6, 8) &&
      isValidRegion(grid, 6, 8, 0, 2) &&
      isValidRegion(grid, 6, 8, 3, 5) &&
      isValidRegion(grid, 6, 8, 6, 8)
    );
  }

  function createGrid() {
    let newGrid = getBasicGrid();

    newGrid = shuffleGridRow(newGrid, 0, 2);
    newGrid = shuffleGridRow(newGrid, 3, 5);
    newGrid = shuffleGridRow(newGrid, 6, 8);

    let randomNumber = getRandomInt(1, 2);
    newGrid = shuffleGridColumn(newGrid, 0, randomNumber);

    randomNumber = getRandomInt(4, 5);
    newGrid = shuffleGridColumn(newGrid, 3, randomNumber);

    randomNumber = getRandomInt(6, 7);
    newGrid = shuffleGridColumn(newGrid, 8, randomNumber);

    let sudoku = createEasySodoku(newGrid);
    console.log(sudoku);
    return newGrid;
  }

  function shuffleGridRow(grid, min, max) {
    for (let i = min; i <= max; i++) {
      let shuffleWith = getRandomInt(min, max);
      let tempRow = grid[i];
      grid[i] = grid[shuffleWith];
      grid[shuffleWith] = tempRow;
    }

    return grid;
  }

  function shuffleGridColumn(grid, column1, column2) {
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      let temp = grid[rowIndex][column1];
      grid[rowIndex][column1] = grid[rowIndex][column2];
      grid[rowIndex][column2] = temp;
    }
    return grid;
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function Cell(actualValue, isEditable) {
    this.actualValue = actualValue;
    this.isEditable = isEditable;
    this.displayValue = isEditable ? "" : actualValue;
  }

  function createEasySodoku(grid) {
    const MAX_HIDE_CELL = 1;
    let easySodoku = [...grid];
    for (let i = 0; i < 9; i++) {
      let hiddenElements = createHiddenCells(MAX_HIDE_CELL);
      for (let j = 0; j < 9; j++) {
        let actualValue = grid[i][j];
        let isEditable = !!hiddenElements[j];
        easySodoku[i][j] = new Cell(actualValue, isEditable);
      }
    }
    return easySodoku;
  }

  function createHiddenCells(noOfCells) {
    let hiddenElements = {};
    for (let i = 0; i < noOfCells; i++) {
      let hiddenCellNumber = getRandomInt(0, noOfCells);
      hiddenElements[hiddenCellNumber] = true;
    }
    return hiddenElements;
  }

  function isSudokuComplete(sudoku) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (sudoku[i][j].actualValue != sudoku[i][j].displayValue) {
          return false;
        }
      }
    }
    return true;
  }
  return {
    createGrid: createGrid,
    isValidGrid: isValidGrid,
    isSudokuComplete: isSudokuComplete
  };
})();
