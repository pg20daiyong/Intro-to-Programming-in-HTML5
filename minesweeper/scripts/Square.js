// copyright (c) 2021 Daiyong Kim
'use strict'

export default class Square {
    constructor(mine = false) {
        this._hasMine = false;
        this.adjacentMines = 0;
        //this.location
        this.mine = mine; //new Mine();
        this.isRevealed = false;
    }

    get hasMine() {
        return this._hasMine;
    }
    get numOfAdjacentMines() {
        return this.adjacentMines;
    }
    Revealed() {
        this.isRevealed = true;
    }

    isRevealed() {
        return this.isRevealed;
    }

    addMine() {
        this._hasMine = true;
    }

    hasAdjacent() {
        if (this.adjacentMines > 0) {
            return true;
        }
        return false;
    }
}