import React from 'react';
import { Square } from './App';
import { SquareComponent } from './Square';

type BoardProps = {
  field: Square[][];
  onSquareClick: (row: number, column: number, isRightClick: boolean) => void;
};

export const Board: React.FC<BoardProps> = ({ field, onSquareClick }) => {
  return (
    <div className="board" style={{ gridTemplateColumns: `repeat(${field[0].length}, 50px)` }}>
      {field.map((row, i) =>
        row.map((square, j) => (
          <SquareComponent
            key={`${i}-${j}`}
            square={square}
            onClick={(isRightClick: boolean) => onSquareClick(i, j, isRightClick)}
          />
        ))
      )}
    </div>
  );
};