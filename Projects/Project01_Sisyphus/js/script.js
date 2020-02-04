"use strict";

//A variable to store each elements
let $lumberjack;
let $rain;
let $tree;

// Constants to store Sound Effects
const chopSFX = new Audio ("assets/sounds/chop.wav");
const rainSFX = new Audio("assets/sounds/rain.wav");


$(document).ready(setup);

// This code will run when the document is ready
function setup() {
  $lumberjack.one('keydown',startchopSFX);

//
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

function startchopSFX(e){
  if (e.keyCode === 32 ){ // Spacebar is pressed
  chopSFX.play();
  }
}
  else if (){
function startrainSFX(){
  rainSFX.play();
  }
}

function onDrop(event,ui){
  console.log("!");
  ui.draggable.remove();
  $(this).attr('src', 'assets/images/chewing.gif');

}
