import React from 'react';
import { Square as SquareType } from './App';

interface SquareProps {
  square: SquareType;
  onClick: (isRightClick: boolean) => void;
}

export const SquareComponent: React.FC<SquareProps> = ({ square, onClick }) => {
  let content = '';

  if (square.state === 'open') {
    content = square.hasMine ? '💣' : square.nearMines.toString();
  } else if (square.marked) {
    content = '🚩';
  }

  return (
    <div
      className={`cell ${square.state}`}
      onClick={() => onClick(false)}
      onContextMenu={(e) => {
        e.preventDefault();
        onClick(true);
      }}
    >
      {content}
    </div>
  );
};