"use strict";

let $animal;
let $fly;

const buzzSFX = new Audio ("assets/sounds/buzz.mp3");
const crunchSFX = new Audio("assets/sounds/crunch.wav");

$(document).ready(setup);

// This code will run when the document is ready
function setup() {
  buzzSFX.loop = true;

  $animal=$("#animal");
  $fly=$("#fly");

  $fly.draggable({
    start: function(){
    buzzSFX.play();
  },
    stop: function(){
    buzzSFX.pause();
  }
  });
  $animal.droppable({
  drop: onDrop
  });
}

function onDrop(event,ui){
  console.log("!");
  ui.draggable.remove();
  $(this).attr('src', 'assets/images/chewing.gif');

}
