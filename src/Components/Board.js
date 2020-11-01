import React, { Component } from 'react';
import Square from './Square';
import '../App.css';


class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_square_row: undefined,
            selected_square_col_index: undefined
        }
    }


    // Sets the component state to the index of the clicked square
    onClick = (index) => {
        this.setState({
            selected_square_row: index[0],
            selected_square_col_index: index[1]
        })
    }


    handleKeyPress = e => {
        const keyPress = e.key;

        // If the key entered is valid, we change the value of the square in the boards state.
        if (this.keyIsValidForBoard(keyPress)) {
            this.props.changeBoardValue(keyPress, [this.state.selected_square_row, this.state.selected_square_col_index])
        }
    }


    keyIsValidForBoard(keyPress) {
        return RegExp(/[1-9]+/, 'g').test(keyPress); // keyPress is within 1-9
    }


    render() {
        const { board } = this.props;

        return (
            <div onKeyPress={this.handleKeyPress} tabIndex="0">
                {board.map((row, row_index) => (
                    <div className="board-row">
                        {row.map((square, col_index) => (
                            <Square
                                value={square}
                                index={[row_index, col_index]}
                                onClick={() => this.onClick([row_index, col_index])}
                                selected={row_index === this.state.selected_square_row && col_index === this.state.selected_square_col_index}
                            />
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}


export default Board;
