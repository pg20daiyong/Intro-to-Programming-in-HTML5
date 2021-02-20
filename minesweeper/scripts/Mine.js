// copyright (c) 2021 Daiyong Kim
'use strict'

export default class Mine {
    constructor(mine = false) {
        this.hasMine = false;
        this.adjacentMines = 0;
        //this.location
        this.mine = mine; //new Mine
    }

    get hasMine() {
        return this._hasMine;
    }

    addMine() {
        this.hasMine = true;
    }

    hasAdjacent() {
        if (this.adjacentMines > 0) {
            return true;
        }
        return false;
    }
}