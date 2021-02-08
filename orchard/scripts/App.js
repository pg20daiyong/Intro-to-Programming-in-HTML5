// copyright (c) 2021 Daiyong Kim
'use strict'

import Apple from "./Apple.js";
import Orchard from "./Orchard.js";

export default class App {
    constructor() {
        this.myApple = new Apple();
        this.orchard = new Orchard(5);
    }

    run(){
        const aSize = this.myApple.size;
        this.myApple.size = 3;
    }
}