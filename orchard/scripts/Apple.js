// copyright (c) 2021 Daiyong Kim
'use strict'
import Fruit from "./Fruit.js";

export default class Apple extends Fruit{
    constructor(theSize = 4, seedCount = 0) {

        super( theSize, seedCount, "Red");
    }
}