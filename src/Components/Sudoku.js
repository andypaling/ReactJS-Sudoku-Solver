import React, { Component, Fragment } from 'react';
import Board from './Board';
import SubmitBoard from "./SubmitBoard";
import '../App.css';


class Sudoku extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Zeros represent a empty space on the board
            board: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]
        }
    }


    // Will solve the board and edit the board state in place.
    solveBoard() {
        const first_empty_position = this.findFirstEmptyPosition();
        if (!first_empty_position) return true; // All positions are full, board is solved

        for (let i = 1; i < 10; i++) {
            if (this.positionIsValid(i, first_empty_position)) {
                const row = first_empty_position[0];
                const col = first_empty_position[1];

                this.changeValueOnBoard(i, [row, col]);

                if (this.solveBoard()) return true;

                this.changeValueOnBoard(0, [row, col]);
            }
        }
    }


    // Returns the position of the first 0 in the board (represents empty position)
    // If there are no empty positions we will return false
    findFirstEmptyPosition() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.state.board[i][j] === 0) return [i, j]
            }
        }
        return false;
    }


    // Returns true if the currents values on the board are valid for sudoku,
    // this is checked before we solve the whole board as otherwise the incorrect
    // board will break the algorithm
    boardIsValid() {
        const currentBoard = this.state.board;

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
               if (currentBoard[i][j] !== 0 && !this.positionIsValid(currentBoard[i][j], [i, j])) return false;
            }
        }

        return true;
    }


    positionIsValid(num, position) {
        return this.rowIsValid(num, position) &&
            this.columnIsValid(num, position) &&
            this.boxIsValid(num, position);
    }


    // Checks to see if the number occurs in its row more than once
    rowIsValid(num, position) {
        for (let i = 0; i < 9; i++) {
            if (this.state.board[position[0]][i] === num && position[1] !== i) return false;
        }
        return true;
    }


    // Checks to see if the number occurs in its column more than once
    columnIsValid(num, position) {
        for (let i = 0; i < 9; i++) {
            if (this.state.board[i][position[1]] === num && position[0] !== i) return false;
        }
        return true;
    }


    // Checks to see if the number occurs in the 3x3 box more than once
    boxIsValid(num, position) {
        const box_x = Math.floor(position[1] / 3);
        const box_y = Math.floor(position[0] / 3);


        for (let i = box_y * 3; i < box_y * 3 + 3; i++) {
            for (let j = box_x * 3; j < box_x * 3 + 3; j++) {
                if (this.state.board[i][j] === num && (position[0] !== i || position[1] !== j)) return false;
            }
        }
        return true;
    }


    changeValueOnBoard(new_value, index) {
        let new_board = this.state.board;
        new_board[index[0]][index[1]]= parseInt(new_value);

        this.setState({board: new_board});
    }


    // Resets board back to initial state of all zeros
    clearBoard() {
        let newBoard = this.state.board;

        for (let i = 0; i < newBoard.length; i++) {
            for (let j = 0; j < newBoard.length; j++) {
                newBoard[i][j] = 0;
            }
        }

        this.setState({ board: newBoard })
    }


    render() {
        return (
            <Fragment>
                <div className="board">
                    <Board
                        board={this.state.board}
                        changeBoardValue={(new_value, index) => this.changeValueOnBoard(new_value, index)}
                    />
                </div>
                <SubmitBoard
                    checkBoardIsValid={() => this.boardIsValid()}
                    solveBoard={() => this.solveBoard()}
                    clearBoard={() => this.clearBoard()}
                />
            </Fragment>
        );
    }
}


export default Sudoku;
