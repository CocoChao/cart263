"use strict";

// Project 1
// Previous codes from activity 1-2 and assignment 1-2.
// by Carole Chao
//
//
// Creates a game that reflexts on the story of Sisyphus. A lumberjack cuts a tree,
// but whenever it reaches the roots, it starts raining and the tree grows back up.
// It includes sound effects, music and images from giphy.com
// Reference html/script/css codes are from jqueryui.com, jquery.com
// and https://gist.github.com/mmontolli/3512014

// number of drops created.
let nbDrop = 500;

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
  // Set a mouseclick event handler on the document to make lumberjack stop working
  // and stop sound
  $("#treetrunk").on('mousedown', lumberjackStop);

  // Set an event handler on the document to
}

// lumberjackKeydown()
//
// When key is down, chopSFX plays and the image is replaced by the gif.
// "jQuery - Change height of Div on button click" code reference:
// https://stackoverflow.com/questions/5616823/jquery-change-height-of-div-on-button-click
function lumberjackKeydown(e){
  if (e.keyCode === 32 ){ // Spacebar is pressed
  chopSFX.play();
  $("#lumberjack").attr('src', 'assets/images/lumberjack.gif');
  $("#treetrunk").animate({height: '-=10', top: '+=10'} , 100);
  }
}

// lumberjackStop()
//
// When mousse is clicked, lumberjack takes a break (stop moving), chopSFX stops playing
// and tree starts growing (+update score if the tree fully regrows)
function lumberjackStop(e){
  chopSFX.pause();
  $("#lumberjack").attr('src', 'assets/images/lumberjack.png');
  console.log("!");
  if ({height: '20px' === true }){
    $("#treetrunk").animate({height: '300px'},5000);
    growth++;
    $("#$treeGrowths").text($growth);
  }
}
function treetrunkGrowth(e){

}

function startrainSFX(){
  rainSFX.play();
 }

// Code from https://jqueryui.com/dialog/#animated:
 $(function() {
   $( "#dialog" ).dialog({
     autoOpen: false,
     show: {
       effect: "blind",
       duration: 1000
     },
     hide: {
       effect: "explode",
       duration: 1000
     }
   });

   $( "#opener" ).on( "click", function() {
     $( "#dialog" ).dialog( "open" );
   });
 } );

 // function to generate a random drop number range.
function randRange( minNum, maxNum) {
  return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}

// function to generate drops
function createRain() {
console.log("rain");
	for(i=1;i<nbDrop;i++) {
    console.log(i);
	var dropLeft = randRange(0,1600);
	var dropTop = randRange(-1000,1400);

	$('.rain').append('<div class="drop" id="drop'+i+'"></div>');
	//$('#drop'+i).css('left',dropLeft);
//	$('#drop'+i).css('top',dropTop);
$( '#drop' + i ).css( 'left', dropLeft + 'px' ).css( 'top', dropTop + 'px' );
	}

}
// Make it rain
createRain();
