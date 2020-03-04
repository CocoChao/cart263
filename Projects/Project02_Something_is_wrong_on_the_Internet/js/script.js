"use strict";

/*****************

Something is wrong on the Internet
By: Carole Chao

DESCRIPTION
Player uses responsiveVoice and keys to open different game states.
Each game state shows different elements (images, videos and texts).
Instead of doing the action of turning Internet on and start the program,
the player says vocal commands and creates an illusion that the computer
is automatic. The user interacts less with the computer (audiobook) with the
intructions button in all the gameState to remind the player.

Uses:

ResponsiveVoice
https://responsivevoice.org/
Annyang
https://www.talater.com/annyang/
jQuery UI
https://jqueryui.com/
https://api.jquery.com/


******************/

// A variable to add the start screen and ending screen.
let gameState = 1; //game is active

// A variable to store each element
let $wifiLogo;
let $loading;
let $emptyPhone;

// An array of Videos that we use to create our random video generator
let videos = [
  "The coconut song",
  "Peanut butter jelly time",
  "Crab rave",
  "The duck song ",
  "The hamster song"
];

// We need to track the correct button for each round
let $correctButton;
// We also track the set of buttons
let buttons = [];
// How many possible answers there are per round
const NUM_OPTIONS = 2;

// Commands that annyang should listen to
let commands = {
  'Internet on': wifiOn,
  'Internet off': wifiOff,
  'Say it again': sayAgain
  // 'Play *name': handleVideo,
  // 'Read me *story': readStory
};


$(document).ready(setup);

// setup()
//
// Start page, make annyang follow the commands, make annyang start listening,
// and show the wifi signal animation and instructions button.
function setup() {
  $(".Youtube").hide();
  $("#loading").hide();
  if (annyang){
    annyang.addCommands(commands);
    annyang.start();
    // annyang.debug();
  }
  document.getElementById('wifiLogo').style.display = "block";
  // document.getElementById("dialog").style.display = "block";
}
// wifiOn()
//
// Player says "Internet on" and switch to gameState 2.
// Only show GIF Image of a loading page appears and instructions button.
function wifiOn(){
  if (gameState===1){
    gameState=2;
    // setup();
    $("#loading").show();
    $("#wifiLogo").hide();
    console.log("wifiOn");
    $("#loading").on("click", videosAppear);
    $("#dialog").show();
  }
}
// videosAppear()
//
// Player clicks on the loading image GIF and make the YouTube videos appear.
//
function videosAppear(){
  if (gameState===2){
    gameState=3;
    $(".Youtube").show();
    $("#loading").hide();
  }
}
// handleVideo()
//
// Checks whether this was the correct video (button) and
// if so starts a new round
// if not indicates it was incorrect
function handleVideo(name){
  if (gameState===3){
    gameState=4;
    $("#loading").hide();
    $("#wifiLogo").hide();
    
    // console.log("NAME:: "+name);
    // if (name.toLowerCase() == $correctButton.text().toLowerCase()){
    //   $(this).effect('shake');
    //   // Remove all the buttons
    //   $('.video').remove();
    // }
    // else {
    //   // Otherwise shake all the video buttons
    //   $('.video').effect('shake');
    //   // And say the correct animal again to "help" them
    //   sayBackwards($correctButton.text());
    // }
  }
}

// readStory()
//
//
function readStory(){
  if (gameState===4){
    gameState=5;
    $("#loading").hide();
    $("#wifiLogo").hide();

    /*var settings = {
    continuous:true, // Don't stop never because i have https connection
    onResult:function(text){
        console.log(text);
    },
    onStart:function(){
        console.log("Dictation started by the user");
    },
    onEnd:function(){
        alert("Dictation stopped by the user");
    }
};

var UserDictation = artyom.newDictation(settings);

// Start listening
UserDictation.start();

// To stop
//UserDictation.stop();
*/
  }
}
// wifiOff()
//
// When player is done interacting with the page, they say "Internet off"
// which returns to gameState 1 with the wifi signal animation.
function wifiOff(){
  if (gameState===5){
    setup()
  }
}

// Code from https://jqueryui.com/dialog/#animated:
 $(function() {
   $("#dialog").dialog({
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
   $("#opener").on( "click", function() {
     $( "#dialog" ).dialog( "open" );
   });
 } );

function sayAgain(){
    sayBackwards($correctButton.text());
}

// sayBackwards(text)
//
// Uses ResponsiveVoice to say the specified text backwards!
function sayBackwards(text) {
  // We create a reverse version of the name by:
  // 1. using .split('') to split the string into an array with each character
  // as a separate element.
  // e.g. "bat" -> ['b','a','t']
  // 2. using .reverse() on the resulting array to create a reverse version
  // e.g. ['b','a','t'] -> ['t','a','b']
  // 3. using .join('') on the resulting array to create a string version of the array
  // with each element forming the string (joined together with nothing in between)
  // e.g. ['t','a','b'] -> "tab"
  // (We do this all in one line using "chaining" because .split() returns an array for
  // for .reverse() to work on, and .reverse() returns an array for .join() to work on.)
  let backwardsText = text.split('').reverse().join('');
  // Set some random numbers for the voice's pitch and rate parameters for a bit of fun
  let options = {
    pitch: 1,
    rate: 0.75
  };
  // Use ResponsiveVoice to speak the string we generated, with UK English Male voice
  // and the options we just specified.
  responsiveVoice.speak(backwardsText, 'UK English Male', options);
}
/*
// addButton(label)
//
// Creates a button using jQuery UI on a div with the label specified
// and adds it to the page, returning the button as well
function addButton(label) {
  // Create a div with jQuery using HTML
  let $button = $('<div></div>');
  // Give it the video class
  $button.addClass("video");
  // Set the text in the div to our label
  $button.text(label);
  // Turn the div into a button using jQuery UI's .button() method
  $button.button();
  // Listen for a click on the button which means the user has guessed
  $button.on('click', clickVideo);
  // Finally, add the button to the page so we can see it
  $('body').append($button);
  // Return the button
  return $button;
}

function clickVideo() {
  if ($(this).text().toLowerCase() == $correctButton.text().toLowerCase()){
    $(this).effect('shake');
    // Remove all the buttons
    $('.video').remove();
  }
  else {
    // Otherwise shake all the guess buttons
    $('.video').effect('shake');
    // And say the correct animal again to "help" them
    sayBackwards($correctButton.text());
  }
}
*/
