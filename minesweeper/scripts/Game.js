//// Copyright (c) 2021 Daiyong Kim
'use strict';

import Minefield from "./Minefield.js";


const DEFAULT_SIZE = 12;
const MINECOUNT = 10;

export default class Game {

    constructor( size = DEFAULT_SIZE) {
        // Create a game
        this.board = {
            size: size,
        };
        this.minefield = new Minefield(size, MINECOUNT);
        this.gameOver = false;

        this.message = "Welcome to Minesweeper";
        let self = this;
        document.querySelector("#test-button")
            .addEventListener('click', event => {
                document.querySelector('#demo')
                    .innerHTML = self.message;
            });
        // document.querySelector("#test-button")
        //     .addEventListener('click', event => this.someLonghandler(event));
        this.generateBoard();
        this.updateCellHander();

    }
    updateCellHander() {
        document.querySelectorAll(".square")
            .forEach(element =>  {
            element.addEventListener('click', event => {
                // TODO:  handle the user clicking one of the game map squares
                // TODO: find the thing 1 clicked, so something to it
                const id = event.target.id;

                const classList = event.target.classList.add("hide");
                // TODO: check if there is a mine here
                // TODO: If mine BOOM!! Game Over

                // If no mine are there adjacent mines? if so show the count
                // ELSE clear all non adjacent mine squares (0 adjcent)
                let assert = true;
            })
        })
    }



    // someLongHandler(event) {
    //         document.querySelector('#demo')
    //                  .innerHTML = this.message;
    // }

    run() {

        while (!this.gameOver) {

            this.update();
            this.render();
        }
    }

    update() {
        //this.updateCellHander();
        // get user input and update the game simulation
        this.gameOver = true;
    }

    render() {
        // change the DOM and the screen to show the player what's going on

        // generate the playfield
        //this.generateBoard();

    }

    generateBoard() {
        /*
        <table>
            <tr><td></td>...</tr>...
        </table>
        */
        let markup = "<table>";
        for (let row = 0; row < DEFAULT_SIZE; row++) {

            markup += "<tr>";
            for (let col = 0; col < DEFAULT_SIZE; col++ ) {

                const id = 'square-${row}-${col}'; // "square-4-5"
                markup += '<td id="${id}" class="square"><div class="unknown"></div></td>';
            }
            markup += "</tr>";
        }

        markup += "</table>";

        // find the game area, attach this table
        document.querySelector("#game-screen").innerHTML = markup;
    }
}