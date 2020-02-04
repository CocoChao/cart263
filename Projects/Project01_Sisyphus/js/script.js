"use strict";

// Project 1
// Previous codes from activity 1-2 and assignment 1-2.
// by Carole Chao
//
//
// Creates a game that reflexts on the story of Sisyphus. A lumberjack cuts a tree,
// but whenever it reaches the roots, it starts raining and the tree grows back up.
// It includes sound effects, music and images from giphy.com.



//A variable to store each elements
let $lumberjack;
let $rain;
let $tree;

// A variable to track the number of times the tree grows
let $treeGrowth;
let $growth = 0;

// Constants to store Sound Effects
const chopSFX = new Audio ("assets/sounds/chop.wav");
const rainSFX = new Audio("assets/sounds/rain.wav");

// This code will run when the document is ready
$(document).ready(setup);

// setup()
//
// Sets the event handlers and starts the time loop
// This code will run when the document is ready
function setup() {
  // Set a keydown event handler on the document to change lumberjack image
  $(document).on('keydown', lumberjackKeydown);

  // Set an event handler on the document to
}

// lumberjackKeydown()
//
// When key is down, chopSFX plays and the image is replaced by the gif.
function lumberjackKeydown(e){
  if (e.keyCode === 32 ){ // Spacebar is pressed
  chopSFX.play();
  console.log("!");
  $("#lumberjack").attr('src', 'assets/images/lumberjack.gif');
  }
}

function startrainSFX(){
  rainSFX.play();
 }
