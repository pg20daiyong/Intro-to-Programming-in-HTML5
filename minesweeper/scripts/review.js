
// Copyright (c) 2021 Daiyong Kim
'use strict';

let theAnswer = 42;
let duck={
    name: "Steve",
    legs: 2,
    car: "Audi",
    features: "Lots"
}
const myThing = {};
myThing.name = "John";
myThing.newThing = "Someting extra";
//console.log(myThing);
//myThing = duck; // error

let myList = [1, 2, 4, 5];
let temp = myList[2];

for(let i=0; i<myList.length; i++){
    temp = myList[i];
}

let AnotherLIst = ["Scott", "Shawn", 2, 3, "Nacho"];
temp = AnotherLIst[5]; //temp = undefined

for(let index in AnotherLIst){
    temp = AnotherLIst[index];
    console.log(temp);
}

let duckList = [duck, duck, duck, duck];
temp = duckList[3];

for(let duckie of duckList){
    duckie += 1;    
}

let done = false;
while(!done){
    // do show work
    // update the state of the game
    // done = true some time later...
}

do{
    // do some work;
    // update the state of the game

    // done = true some time later...
}while(!done);