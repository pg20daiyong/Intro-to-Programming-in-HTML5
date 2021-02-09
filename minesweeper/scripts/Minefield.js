// copyright (c) 2021 Daiyong Kim
'use strict'
import Square from "./Square.js";

export default class Minefield{
    constructor(size = 10, mineCount = 10) {
        this.size = size;
        this.field = []; // turn this into & 2D array of squares

        // initialize the minefield with empty square
        this._init();

        // init minefield with a mines (randomize)
        this._randomizeMines(mineCount);

        // tell all the squares to compute adjacent mines
        this._countAdjacent();
    }

    _init(){
        // create 2D array of squares
        for(let i=0; i<this.size; i++){
            this.field[i] = [];
            for(let j=0; j<this.size; j++){
                this.field[i][j] = new Square();
            }
        }
    }

    squareAt(row, col){
        // TODO: go find the square at row, col and return it
    }

    _randomizeMines(){
        // TODO : for each mine, randomize row, col

        // TODO : place mine at row, column, unless mine already there
    }

    _countAdjacent(){
        // TODO : walk through field, for each square count adjacent
    }
}