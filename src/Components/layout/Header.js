import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';


function Header() {
    return (
        <MuiThemeProvider>
            <AppBar
                position='relative'
                showMenuIconButton={false}
                style={{fontSize: "32px", marginBottom: "25px"}}
            >
                Sudoku Solver
            </AppBar>
        </MuiThemeProvider>
    )
}


export default Header;