"use strict";

//A variable to store each elements
let $lumberjack; // png file
let $movinglumberjack; // gif file
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
  // Set a keydown event handler on the lumberjack image
  $lumberjack.on('keydown',lumberjackKeydown);

  $
//   $animal=$("#animal");
//   $fly=$("#fly");
//
//   $fly.draggable({
//     start: function(){
//     buzzSFX.play();
//   },
//     stop: function(){
//     buzzSFX.pause();
//   }
//   });
//   $animal.droppable({
//   drop: onDrop
//   });
}

// lumberjackKeydown()
//
// When key is down, chopSFX plays and the image is replaced by the gif.
function lumberjackKeydown(e){
  if (e.keyCode === 32 ){ // Spacebar is pressed
  chopSFX.play();
  }
}
  else if (){
function startrainSFX(){
  rainSFX.play();
  }
}

function onKeydown(event,ui){
  console.log("!");
  ui.draggable.click();
  $(this).attr('src', 'assets/images/lumberjack.gif');

}
