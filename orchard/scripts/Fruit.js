// copyright (c) 2021 Daiyong Kim
'use strict'

export default class Fruit {
    constructor(theSize = 4, seeds = 0, colour = "Black") {
        this.__private__ = {
            size: theSize,
            seedCount: seeds
        }
        this.sizeToo = 5;
        this.colour = colour;
    }

    get size() { return this.__private__.size }
    set size(value) {this.__private__.size = value}

    hasSeed(){
        const my = this.__private__;
        return (my.seedCount = 0)
    }

    seedCount( updatedCount ) {
        const my = this.__private__;
        if(updatedCount == undefined)
            return my.seedCount;

        my.seedCount = updatedCount;
        return my.seedCount;
    }

}