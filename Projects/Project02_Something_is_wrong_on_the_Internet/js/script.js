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


// Commands that annyang should listen to
let commands = {
  'Internet on': wifiOn,
  'Say it again': sayAgain,
  'Play the coconut song': function() {
    handleVideo("coconut")
  },
  'Play peanut butter jelly time': function() {
    handleVideo("peanut")
  },
  'Play crab rave': function() {
    handleVideo("crab")
  },
  'Play the duck song': function() {
    handleVideo("duck")
  },
  'Play the hamster song': function() {
    handleVideo("hamster")
  },
  'Internet off': wifiOff,
};


$(document).ready(setup);

// setup()
//
// Start page, make annyang follow the commands, make annyang start listening,
// and show the wifi signal animation and instructions button.
function setup() {
  $(".Youtube").hide();
  $("#loading").hide();
  $("#bookShelf").hide();
  $(".books").hide();
  if (annyang) {
    annyang.addCommands(commands);
    annyang.start();
    // annyang.debug();
  }
  document.getElementById('wifiLogo').style.display = "block";
  responsiveVoice.speak("Say 'Internet On' to make window load. Say 'Say it again' to repeat instructions. Say 'Play [Insert video title]' to play the video. Say 'Internet Off' to make everything stop.", 'UK English Male', {
  pitch: 1, rate:1.5 });

}
// wifiOn()
//
// Player says "Internet on" and switch to gameState 2.
// Only show GIF Image of a loading page appears and instructions button.
function wifiOn() {
  if (gameState === 1) {
    gameState = 2;
    // setup();
    $("#loading").show();
    $("#wifiLogo").hide();
    $("#bookShelf").hide();
    $(".books").hide();
    $("#loading").on("click", videosAppear);
    $("#dialog").show();
  }
}
// videosAppear()
//
// Player clicks on the loading image GIF and make the YouTube videos appear.
//
function videosAppear() {
  if (gameState === 2) {
    gameState = 3;
    $(".Youtube").show();
    $("#loading").hide();
    $("#bookShelf").hide();
    $(".books").hide();
    $("#bookShelf").show();
    $("#bookShelf").on("click", bookShelf);
  }
}
// handleVideo()
//
// Checks whether this was the correct video (button) and
// if so starts a new round
// if not indicates it was incorrect
function handleVideo(name) {
  if (gameState === 3) {
    gameState = 4;
    $("#bookShelf").show();
    $("#loading").hide();
    $("#wifiLogo").hide();
    // $("#bookShelf").on("click", bookShelf);
  }
  if (name === "coconut") {
    document.getElementById("coconut").play();
  }
  if (name === "peanut") {
    document.getElementById("peanut").play();
  }
  if (name === "crab") {
    document.getElementById("crab").play();
  }
  if (name === "duck") {
    document.getElementById("duck").play();
  }
  if (name === "hamster") {
    document.getElementById("hamster").play();
  }
}
// bookShelf()
//
//
function bookShelf(){
  if(gameState===4){
    gameState = 5;
    $("#loading").hide();
    $("#wifiLogo").hide();
    $("#bookShelf").show();
    $(".books").show();
  }
  $( function() {
    $( "#accordion" ).accordion();
  } );
}

function handleBooks(name){
  $( function() {
    $( "#accordion" ).accordion();
  } );
}
// wifiOff()
//
// When player is done interacting with the page, they say "Internet off"
// which returns to gameState 1 with the wifi signal animation.
function wifiOff() {
  if (gameState === 5) {
    gameState=1;
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
  $("#opener").on("click", function() {
    $("#dialog").dialog("open");
  });
});

function sayAgain() {
  sayBackwards("Say 'Turn Wifi On' to make window load. Say 'Say it again' to repeat instructions. Say 'Play [Insert video title]' to play the Youtube video. Say 'Read me [Insert story title]' to make the ResponsiveVoice read a story. Say 'Turn Wifi Off' to make everything stop.", 'UK English Male');
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
