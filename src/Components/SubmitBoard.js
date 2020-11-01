import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import SubmitBoardStatusMessage from "./SubmitBoardStatusMessage";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import '../App.css';


class SubmitBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusMessage: '',
            statusSuccessful: true,
        }
    }


    onSolveButtonClick = () => {
        if (this.props.checkBoardIsValid()) {
            // The board is in a valid state, we now solve the board...
            this.setState({ statusMessage: 'Solving...', statusSuccessful: true })

            this.props.solveBoard()

            this.setState({ statusMessage: 'The board has been solved' })
        } else {
            // The board is in an invalid state and will not be solved.
            this.setState({ statusMessage: 'The board is not valid', statusSuccessful: false })
        }
    }


    onResetButtonClick = () => {
       this.setState({ statusMessage: '' });
       this.props.clearBoard();
    }


    render() {
        return (
            <MuiThemeProvider>
                <SubmitBoardStatusMessage
                    statusMessage={this.state.statusMessage}
                    statusSuccessful={this.state.statusSuccessful}
                />
                <div className="submit-button-cont">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.onSolveButtonClick}
                    >
                        Solve
                    </Button>
                    <Button
                        style={{ marginLeft: '10px' }}
                        variant="contained"
                        color="primary"
                        onClick={this.onResetButtonClick}
                    >
                        Reset
                    </Button>
                </div>
            </MuiThemeProvider>
        )
    }
}


export default SubmitBoard;