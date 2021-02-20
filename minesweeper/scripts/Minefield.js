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

        //this.squareAt(col,row);
    }
    get SIZE() { return this.size }

    squareAt(row, col){
        // TODO: go find the square at row, col and return it
        //Look for square
        return this.field[row][col];
    }

    _init(){
        // create 2D array of squares
        for(let i=0; i<this.size; i++){
            this.field[i] = [];
            for(let j=0; j<this.size; j++){
                this.field[i][j] = new Square();
            }
        }
        //console.log(this.field)
    }

    _randomizeMines(mineCount){

        // TODO : for each mine, randomize row, col
        // TODO : place mine at row, column, unless mine already there

        let checkCount = 0;
        while(mineCount !== checkCount){
            let i = Math.floor(Math.random() * (this.size-1)) //randomize coordinates i
            let j = Math.floor(Math.random() * (this.size-1)) //randomize coordinates i
            //console.log(i)
            //console.log(j)
            if(this.field[i][j]._hasMine === false) { //if there is no mine, it changes to true and increase checkCount
                this.field[i][j]._hasMine = true
                this.field[i][j].mine = true
                checkCount++
                //console.log(this.field[i][j])
            }
        }
    }

    _countAdjacent(){
        // TODO : walk through field, for each square count adjacent
        // Left Top Corner
        let count = 0
        {
            count = 0
            if (this.field[0][1]._hasMine === true) count++
            if (this.field[1][0]._hasMine === true) count++
            if (this.field[1][1]._hasMine === true) count++
            this.field[0][0].adjacentMines = count
        }
        // center top Edge
        for(let j=1; j<this.size-1; j++) {
            count = 0
            if(this.field[0][j-1]._hasMine === true) count++
            if(this.field[0][j+1]._hasMine === true) count++
            if(this.field[1][j-1]._hasMine === true) count++
            if(this.field[1][j]._hasMine === true) count++
            if(this.field[1][j+1]._hasMine === true) count++
            this.field[0][j].adjacentMines = count
        }
        // Right Top Corner
        {
            count = 0
            if (this.field[0][this.size-2]._hasMine === true) count++
            if (this.field[1][this.size-2]._hasMine === true) count++
            if (this.field[1][this.size-1]._hasMine === true) count++
            this.field[0][this.size-1].adjacentMines = count
        }
        // Left Center Edge
        for(let i=1; i<this.size-1; i++) {
            count = 0
            if(this.field[i-1][0]._hasMine === true) count++
            if(this.field[i-1][1]._hasMine === true) count++
            if(this.field[i][1]._hasMine === true) count++
            if(this.field[i+1][0]._hasMine === true) count++
            if(this.field[i+1][1]._hasMine === true) count++
            this.field[i][0].adjacentMines = count
        }

        // Left Bottom Corner
        {
            count = 0
            if (this.field[this.size-2][0]._hasMine === true) count++
            if (this.field[this.size-2][1]._hasMine === true) count++
            if (this.field[this.size-1][1]._hasMine === true) count++
            this.field[this.size-1][0].adjacentMines = count
        }


        // Right Center Edge
        {
            for(let i=1; i<this.size-1; i++) {
                count = 0
                if(this.field[i-1][this.size-1]._hasMine === true) count++
                if(this.field[i-1][this.size-2]._hasMine === true) count++
                if(this.field[i][this.size-2]._hasMine === true) count++
                if(this.field[i+1][this.size-1]._hasMine === true) count++
                if(this.field[i+1][this.size-2]._hasMine === true) count++
                this.field[i][this.size-1].adjacentMines = count
            }
        }

        // Bottom Center Edge
        for(let j=1; j<this.size-1; j++) {
            count = 0
            if(this.field[this.size-2][j-1]._hasMine === true) count++
            if(this.field[this.size-2][j]._hasMine === true) count++
            if(this.field[this.size-2][j+1]._hasMine === true) count++
            if(this.field[this.size-1][j-1]._hasMine === true) count++
            if(this.field[this.size-1][j+1]._hasMine === true) count++
            this.field[this.size-1][j].adjacentMines = count
        }

        // Right Bottom Edge
        {
            count = 0
            if (this.field[this.size-2][this.size-1]._hasMine === true) count++
            if (this.field[this.size-2][this.size-2]._hasMine === true) count++
            if (this.field[this.size-1][this.size-2]._hasMine === true) count++
            this.field[this.size-1][this.size-1].adjacentMines = count
        }

        // inside
        for(let i=1; i<this.size-1; i++){
            for(let j=1; j<this.size-1; j++){
                count = 0;
                if(this.field[i-1][j-1]._hasMine === true) count++
                if(this.field[i-1][j]._hasMine === true) count++
                if(this.field[i-1][j+1]._hasMine === true) count++

                if(this.field[i][j-1]._hasMine === true) count++
                if(this.field[i][j+1]._hasMine === true) count++

                if(this.field[i+1][j-1]._hasMine === true) count++
                if(this.field[i+1][j]._hasMine === true) count++
                if(this.field[i+1][j+1]._hasMine === true) count++
                this.field[i][j].adjacentMines = count

            }
        }

        console.log(this.field)
    }
}