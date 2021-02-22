//// Copyright (c) 2021 Daiyong Kim
'use strict';

import Minefield from "./Minefield.js";
import AudioManager from "./AudioManager.js";


const MAP_SIZE = 12;
const MINE_COUNT = 10;
const TIMER = 100;

export default class Game {

    constructor( size = MAP_SIZE) {
        // Create a game
        this.board = {
            size: size,
        };
        this.minefield = new Minefield(MINE_COUNT, MAP_SIZE);
        this.mineCount = MINE_COUNT;
        this.score = 0;
        this.revealedCount = 0;
        this.maxRevelaedCount = MAP_SIZE * MAP_SIZE - MINE_COUNT;
        this.finishFlag = false;

        this.setTime = TIMER;
        this.gameOver = false;
        this.audioManager = new AudioManager();


        //this.message = "Welcome to Minesweeper";
        let self = this;
        //$("#restart-button").on('click', event => this.someLonghandler(event));
        document.querySelector("#restart-button")
            .addEventListener('click', event => this.someLonghandler(event));
        this._generateBoard();
        this._updateCellHandlers();

    }

    get MAP_SIZE() { return MAP_SIZE }
    get MINE_COUNT() {return MINE_COUNT}

    _updateCellHandlers() {

        // TODO:  handle the user clicking one of the game map squares
        // TODO: find the thing 1 clicked, so something to it
        $(".square").on('click', event => {
            const $theEl = $(event.target);
            const id = $theEl.attr("id");

            //$theEl.addClass("show-indicator")

            // TODO: check if there is a mine here
            //  const row = $theEl.data("row");
            //  const col = $theEl.data("col");
            // TODO: If mine BOOM!! Game Over

            // TODO : If no mine are there adjacent mines? if so show the count
            // TODO: ELSE clear all non adjacent mine squares (0 adjcent)
            if (!(this.CheckFlag($theEl))) {

                const row = $theEl.data("row");
                const col = $theEl.data("col");
                //console.log('Clicked cell at ' + row + ", " + col);
                const selectedSquare = this.minefield.squareAt(row, col);

                //if isn't revealed
                if (!(selectedSquare.isRevealed)) {
                    //console.log(selectedSquare)
                    this._reveal(selectedSquare, $theEl);
                }
            }


            //this.MissionComplete();
        });
        //right Click
        $(".square").on("contextmenu", event => {
            event.preventDefault();
            // TODO : what happens on the right click...
            const $theEl = $(event.target);
            const id = $theEl.attr("id");

            //this.MissionComplete();
            if (this.CheckFlag($theEl)) {
                //Check the size to remove and add the right classes
                $theEl.addClass("unknown");
                $theEl.removeClass("flag");
                //this.MissionComplete()
                return;
            } else {
                $theEl.removeClass("unknown");
                $theEl.addClass("flag");
                //this.MissionComplete()
                return;
            }
            //this.MissionComplete()

        });
    }

    // if flag or not
    CheckFlag($theEl) {
        if ($theEl.hasClass("flag")) {
            return true;
        }
    }


    // someLongHandler(event) {
    //         document.querySelector('#demo')
    //                  .innerHTML = this.message;
    // }
    someLonghandler(event){
        //$("demo").html(this.message)
        // document.querySelector('#demo')
        //     .innerHTML = this.message;
        //Flag for restart or new game
        //console.log("someLonghandler")

        this.reset();
        this.run();
    }
    reset() {
        this.gameOver = false;
        this.score = 0;
        this.setTime = TIMER;
        //generateTime(timerCount);
        $("#score").html(`${this.score}`);
    }
    run() {

        // while (!this.gameOver) {
        //
        //     this.update();
        //     this.render();
        // }

        this.render();
        this.startTimer();
    }

    startTimer() {
        let secondCount = this.setTime;

        let timer = window.setInterval(() => {

            if(this.setTime === 0){
                alert("TimeOver, You have to restart, now");
                this.newgame = false;
                this.reset();
                this.run();
            }
            //what do we do each second
            //console.log(this.minefield.checkFlaggedCount())
            $("#timer").html (this.setTime);
            this.setTime--;

        }, 1000);
    }


    update() {
        //this.MissionComplete();
        //this.gameOver = true;
    }

    render() {
        // change the DOM and the screen to show the player what's going on

        this.minefield = new Minefield(this.board.size, this.minecount);
        this._generateBoard();
        this._updateCellHandlers();
        //Discriminate between a new game or a restart

    }

    _generateBoard() {
        /*
        <table>
            <tr><td></td>...</tr>...
        </table>
        */
        let markup = "<table>";
        for (let row = 0; row < MAP_SIZE; row++) {

            markup += "<tr>";
            for (let col = 0; col < MAP_SIZE; col++ ) {

                 //const id = square-${row}-${col};
                 //markup += '<td><div id="${id}" class="unknown"></div></td>';
                const id = `square-${row}-${col}` ; // "square-4-5"
                const dataAttributes = `data-row="${row}" data-col="${col}"`
                markup += `<td id="${id}" class="square" ${dataAttributes} ><div class="unknown"></div></td>`;
                //markup += `<td class= "square" ><button class="unknown" ${dataAttributes} id=${id}><!--c1r1--></button></td>`;
            }
            markup += "</tr>";
        }

        markup += "</table>";

        // find the game area, attach this table
        // document.querySelector("#game-screen").innerHTML = markup;
        $("#game-screen").html(markup);
    }

    _reveal(selectedSquare, $theEl) {

        //Reveal the contents of the cell
        //Get the square corresponding to this element
        // TODO : If no mine are there adjacent mines? is so show the count
        // TODO : Else clear all
        console.log(selectedSquare)
        if (selectedSquare.hasMine) {
            //Check the size to remove the right classes
            $theEl.removeClass("unknown");
            $theEl.addClass("mine"); // why it does not work?

            //sound effect: Explosion
            this.MineExplosion();
            this.gameOver = true;
            //this.reset();
            return;
        }
        //ADD hasAdjacent method

        const row = $theEl.data("row");
        const col = $theEl.data("col");
        if(row > MAP_SIZE || col > MAP_SIZE || row < 0 || col < 0)
            return;

        if (selectedSquare.hasAdjacent()) {
            //Are there adjacent mines? if so, show count
            const count = selectedSquare.adjacentMines;
            console.log(count);
            const $innerDiv = $("<div" + selectedSquare.adjacentMines + "</div>");

            selectedSquare.Revealed();
            this.revealedCount++
            this._SquareReveal(selectedSquare);
            $theEl.removeClass("unknown");
            $theEl.addClass(this._SquareReveal(selectedSquare));
            $theEl.append(`${selectedSquare.adjacentMines}`);

            this.score++;
            $("#score").html(`${this.score}`);
            this.MissionComplete()
            return;
        } else {

            //TODO: Search 8 Directions

            this._revealAllZeros(row, col);
            console.log(this.minefield.checkFlaggedCount())
            this.MissionComplete()
        }

    }

    _revealAllZeros(row, col)
    {
        //Flood fill algorithm
        if (row > MAP_SIZE || row > MAP_SIZE) {
            return;
        }

        //check all directions
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (row + i <= -1 || row + i >= MAP_SIZE || col + j <= -1 || col + j >= MAP_SIZE) {
                    // boundary check
                    continue;
                }

                //Select neighbour squares
                const selectedSquare = this.minefield.squareAt(row + i, col + j);
                const $theSquare = $(`#square-${row+i}-${col+j}`);

                //Check if cell has not been revealed
                //console.log(selectedSquare);
                if (!(selectedSquare.isRevealed)) {
                    selectedSquare.Revealed();
                    this.revealedCount++;
                    //Remove unknown classes, add revealed
                    this._RemoveUnknown($theSquare, selectedSquare);

                    if (selectedSquare.numOfAdjacentMines == 0 && !selectedSquare.hasMine) {
                        this._revealAllZeros(row + i, col + j);
                    }
                    //this.MissionComplete()
                }
            }
        }
        this.MissionComplete()
    }

    _RemoveUnknown($theSquare, selectedSquare) {
        if(!selectedSquare.Revealed()) {
            $theSquare.removeClass("unknown");
            $theSquare.addClass(this._SquareReveal(selectedSquare));
            $theSquare.append(`${selectedSquare.adjacentMines}`);
            return;
        }
    }

    MissionComplete() {
        console.log("checkFlaggedCount ", this.minefield.checkFlaggedCount())

        if (this.minefield.checkFlaggedCount() === MINE_COUNT) {
            this.finishFlag = true;
            console.log("Mission Complete");
        }
    }

    MineExplosion(){
        this.audioManager.explosion.play();
        alert("You clicked Bomb! Restart, now!");
        this.newgame = false;
        this.run();
    }

    _SquareReveal(theSquare) {
        let classes = "revealed";
        //Square revealed?
        if (theSquare.isRevealed) {
            //Ternary operator value = (Condition ? result_iftrue : result_ifnot);
            classes += (theSquare.hasMine ? "" : ` color-${theSquare.adj}`);
        }

        return classes;
    }
    // TODO: This method really should live in the Square class as style();
    _styleSquare( theSquare ) {

        let classes = "square";
        let inner = "";

        // Is the square flagged?
        if (theSquare.isFlagged) {

            classes += " flag";
        }
        // Is the square revealed?
        else if ((theSquare.isRevealed) || DEBUG) {

            // Is there a mine or some count.
            if (DEBUG) {
                classes += " debug";
            }

            // value = ( condition ? result_if_true : result_if_false );
            classes += ( theSquare.hasMine ? " mine" : ` revealed color-${theSquare.adjacent}`);
            inner = `${theSquare.adjacent}`;
        }

        /**
         Methods can return intrinsic objects, these can be made at any time
         let myReturnThing = {}

         and we can add name:value pairs.
         let myReturnThing = {
            classes: classes,
            inner: inner
        }

         As a shortcut whenever we create an object where the attribute name is the same as
         the variable that contains the value, we can shorten the name:value pair to just the name
         */
        return {
            classes,
            inner
        }
    }

}