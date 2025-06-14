import { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'X';
const PLAYER_2 = 'O';

const generateSquares = () => {
  const squares = [];

  let currentId = 0;

  for (let row = 0; row < 3; row += 1) {
    squares.push([]);
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '',
      });
      currentId += 1;
    }
  }

  return squares;
};

const getPlayerTurn = (squares) => {
  const piecesCount = countPlayedPieces(squares);
  return piecesCount % 2;
};


const countPlayedPieces =(squares) => {
  let playedPieces = 0;
  for (const row of squares) {
    for (const item of row) {
      if (item.value) {
        playedPieces += 1;
      }
    }
  }

  return playedPieces;
};

const getPlayerToken =(playerTurn) => {
  return playerTurn === 0? PLAYER_1: PLAYER_2;
};

const updateSquare =(id, squares,playerTurn) => {
  // setSquares(squares => {
  const newSquares =[];
  for (const row of squares) {
    const newRow = [];
    for (const item of row) {
      if(item.id === id) {
        if(item.value) {
          return squares;
        };

        const newItem = {...item, value: getPlayerToken(playerTurn)};
        newRow.push(newItem);
      } else {
        newRow.push(item);
      }
    }
    newSquares.push(newRow);
  }
  return newSquares;
};

const checkForWinner = (squares) => {
  // Complete in Wave 3
  // You will need to:
  // 1. Go accross each row to see if
  //    3 squares in the same row match
  //    i.e. same value
  // 2. Go down each column to see if
  //    3 squares in each column match
  // 3. Go across each diagonal to see if
  //    all three squares have the same value.
  for (let i = 0; i < 3; i += 1) {
    // check row i
    if (squares[i][0].value && squares[i][0].value === squares[i][1].value
      && squares[i][1].value === squares[i][2].value) {
      return squares[i][0].value;
    }

    // check col i
    if (squares[0][i].value && squares[0][i].value === squares[1][i].value
      && squares[1][i].value === squares[2][i].value) {
      return squares[0][i].value;
    }
  }

  if (squares[0][0].value && squares[0][0].value === squares[1][1].value
    && squares[1][1].value === squares[2][2].value) {
    return squares[1][1].value;
  }

  if (squares[0][2].value && squares[0][2].value === squares[1][1].value
    && squares[1][1].value === squares[2][0].value) {
    return squares[1][1].value;
  }

  return null;
};

const getIsBoardFull = (squares) => {
  const playedPieces = countPlayedPieces(squares);
  return playedPieces === 9;
};

const App = () => {
  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.
  const [squares, setSquares] = useState(generateSquares());
  const playerTurn = getPlayerTurn(squares);
  const playerToken = getPlayerToken(playerTurn);
  const winner = checkForWinner(squares);
  const isBoardFull = getIsBoardFull(squares);

  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback
  const clickSquare =(id, squares) => {
    if (winner) {
      return;
    }
    setSquares(squares => {
      return updateSquare(id, squares, playerTurn);
    });
  };



  const resetGame = () => {
    // Complete in Wave 4
    setSquares(generateSquares());
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        {/* The expression inside {} is JavaScript evaluated in JSX.
        (!winner && !isBoardFull) is a logical AND condition.
        If there is no winner (winner is falsy)
        AND the board is not full (isBoardFull is falsy)
        Then React will render:
        <h2>It's {playerToken}'s turn</h2> */}
        {(!winner && !isBoardFull) && <h2>It's {playerToken}'s turn</h2>}
        {(!winner && isBoardFull) && <h2>Tie Game</h2>}
        {winner && <h2>The winner is {winner}</h2>}
        {/* <h2>The winner is ... -- Fill in for wave 3 </h2> */}
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={clickSquare}/>
      </main>
    </div>
  );
};

export default App;
