import React, { Component } from 'react';
import '../App.css';


class Square extends Component {
    constructor(props) {
        super(props);
        this.state = {
            greyedOutSquare: false
        }
    }

    // Determines if the square is in a box on the board that should be greyed out and adjusts state accordingly
    componentDidMount() {
        const box = [Math.floor(this.props.index[1] / 3), Math.floor(this.props.index[0] / 3)];
        const greyedOutBoxes = [[0, 1], [1, 0], [1, 2], [2, 1]]

        greyedOutBoxes.forEach(i => {
            if (box[0] === i[0] && box[1] === i[1]) {
                this.setState({ greyedOutSquare: true });
            }
        })
    }


    render() {
        return (
            <div
                className="square"
                style={{
                    backgroundColor: this.props.selected ? '#368736' : this.state.greyedOutSquare ? '#e1e3e1' : '',
                }}
                onClick={this.props.onClick}
            >
                {/*zero represents empty space on sudoku board, so if value props is 0, we swap to show empty string*/}
                {this.props.value === 0 ? '' : this.props.value}
            </div>
        );
    }
}


export default Square;


