import { useState, useEffect } from 'react';
import './style.css';
import { Board } from './Board';

export type Square = {
  row: number;
  column: number;
  state: string;
  hasMine: boolean;
  nearMines: number;
  marked: boolean;
};

const createField = (rows: number, columns: number): Square[][] => {
  const field: Square[][] = [];
  for (let i = 0; i < rows; i++) {
    const rowArray: Square[] = [];
    for (let j = 0; j < columns; j++) {
      rowArray.push({
        row: i,
        column: j,
        state: "closed",
        hasMine: false,
        nearMines: 0,
        marked: false,
      });
    }
    field.push(rowArray);
  }
  return field;
};

const placeMines = (field: Square[][], mineCount: number): void => {
  const rows = field.length;
  const columns = field[0].length;
  let minesPlaced = 0;

  while (minesPlaced < mineCount) {
    const row = Math.floor(Math.random() * rows);
    const column = Math.floor(Math.random() * columns);

    if (!field[row][column].hasMine) {
      field[row][column].hasMine = true;
      minesPlaced++;
    }
  }
};

const countNearbyMines = (field: Square[][], row: number, column: number): number => {
  const rows = field.length;
  const columns = field[0].length;
  let mineCount = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;

      const newRow = row + i;
      const newColumn = column + j;

      if (newRow >= 0 && newRow < rows && newColumn >= 0 && newColumn < columns) {
        if (field[newRow][newColumn].hasMine) {
          mineCount++;
        }
      }
    }
  }

  return mineCount;
};

const App = () => {
  const [field, setField] = useState<Square[][]>(() => createField(10, 10));

  const initializeGame = () => {
    const newField = createField(10, 10);
    placeMines(newField, 10);
    const updatedField = newField.map((row, i) =>
      row.map((square, j) => ({
        ...square,
        nearMines: countNearbyMines(newField, i, j),
      }))
    );
    setField(updatedField);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleSquareClick = (row: number, column: number, isRightClick: boolean) => {
    const newField = [...field];
  
    if (isRightClick) {
      newField[row][column].marked = !newField[row][column].marked;
    } else {
      if (!newField[row][column].marked) {
        newField[row][column].state = "open";
        if (newField[row][column].hasMine) {
          alert('You lost');
        }
      }
    }
    setField(newField);
  };

  return (
    <div className="App">
      <h1>Campo minado</h1>
      <Board field={field} onSquareClick={(row, column, isRightClick) => handleSquareClick(row, column, isRightClick)} />
    </div>
  );
};

export default App;