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
        this.minefield = new Minefield( size , MINECOUNT );
        this.gameOver = false;
    }

    run() {

        while (!this.gameOver) {

            this.update();
            this.render();
        }
    }

    update() {
        // get user input and update the game simulation
        this.gameOver = true;
    }

    render() {
        // change the DOM and the screen to show the player what's going on

        // generate the playfield
        this.generateBoard();
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
                markup += "<td><div id=\"${id}\" class=\"unknown\"></div></td>";
            }
            markup += "</tr>";
        }

        markup += "</table>";

        // find the game area, attach this table
        document.querySelector("#game-screen").innerHTML = markup;
    }
}