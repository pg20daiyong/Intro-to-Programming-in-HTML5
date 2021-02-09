// copyright (c) 2021 Daiyong Kim
'use strict'

export default class Square {
    constructor() {
        this._hasMine = false;
        this.adjacentMines = 0;
        //this.location
        this.mine = null; //new Mine();
    }

    get hasMine() {
        return this._hasMine
    }
}