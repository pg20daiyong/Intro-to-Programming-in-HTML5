//// Copyright (c) 2021 Daiyong Kim
'use strict';

import Game from './Game.js';

// MAIN Application
$(document).ready(event=> {
    let game = new Game();
//let game = new Game.DEFAULT_SIZE;
    const size = Game.MAP_SIZE;
    game.run();
});