"use strict";

// Project 1
// Previous codes from activity 1-2 and assignment 1-2.
// It includes sound effects, music and images from giphy.com and freesound.org
// Reference html/script/css codes are from jqueryui.com jquery.com
// and https://gist.github.com/mmontolli/3512014 for the raindrop effect
// by Carole Chao
//
//
//
// A game that reflects on the story of Sisyphus. A lumberjack cuts a tree,
// but whenever it reaches the roots, it starts raining and the tree grows back up.


// The number of drops created.
let nbDrop = 500;

//A variable to store each elements
let $lumberjack;
let $rain;
let $tree;
let $umbrella;

// A variable to track the number of times the tree grows
let $growth = 0;

// Constants to store Sound Effects
const chopSFX = new Audio ("assets/sounds/chop.wav");
const rainSFX = new Audio("assets/sounds/rain.wav");


// This code will run when the document is ready
$(document).ready(setup);

// setup()
//
// Sets the event handlers
function setup() {
  // Set a keydown event handler on the document to change lumberjack image
  $(document).on('keydown', lumberjackKeydown);
  // Set a mouseclick event handler on the document to make lumberjack stop working
  // and stop sound
  $("#treetrunk").on('mousedown', lumberjackStop);
  // Make it rain and play the sound on loop
  createRain();
  rainSFX.loop = true;
  rainSFX.play();
  // Set a draggable event handler on the document to drag the umbrella image on top of lumberjack
  $("#umbrella").draggable();
}

// lumberjackKeydown()
//
// When key is down, chopSFX plays, the image is replaced by the gif and treetrunk
// decreases by 10px.
// "jQuery - Change height of Div on button click" code reference:
// https://stackoverflow.com/questions/5616823/jquery-change-height-of-div-on-button-click
function lumberjackKeydown(e){
  if (e.keyCode === 32 ){ // Spacebar is pressed
      if ($("#treetrunk").css("height") ==="30px"){
        // console.log($growth);
        // Add 1 to score every time the tree grows back
        $growth++;
        $(".growth").text($growth);
        // Tree trunk grows back to its original height once everytime
        // lumberjack chops trunk height to 30px
        $("#treetrunk").animate({height: '300', top: '25'},2000);
      }
      else{
      chopSFX.play();
    $("#lumberjack").attr('src', 'assets/images/lumberjack.gif');
    $("#treetrunk").animate({height: '-=10', top: '+=10'} , 100);
    }
  }
}


// lumberjackStop()
//
// When mouse clicks on the treetrunk, lumberjack takes a break (stop moving)
// Click 2 seconds after pressing spacebar because it takes two second (delay) for the GIF to stop
function lumberjackStop(e){
    chopSFX.pause();
    $("#lumberjack").attr('src', 'assets/images/lumberjack.png');
    // console.log("#treetrunk");
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
// console.log("rain");
	for(let i=1;i<nbDrop;i++) {
    //console.log(i);
	let dropLeft = randRange(20,480);
	let dropTop = randRange(-1000,900);

	$('.rain').append('<div class="drop" id="drop'+i+'"></div>');
  $( '#drop' + i ).css( 'left', dropLeft + 'px' ).css( 'top', dropTop + 'px' );
	}
}
