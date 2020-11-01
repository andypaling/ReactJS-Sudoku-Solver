import React from 'react';
import Header from './Components/layout/Header';
import Tutorial from "./Components/layout/Tutorial";
import Sudoku from './Components/Sudoku';
import './App.css';


function App() {
    return (
        <div className="App">
            <Header />
            <Tutorial />
            <Sudoku />
        </div>
    );
}

export default App;
