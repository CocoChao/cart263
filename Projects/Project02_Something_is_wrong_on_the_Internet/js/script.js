"use strict";

/*****************

Something is wrong on the Internet
By: Carole Chao

DESCRIPTION
Player uses responsiveVoice and click buttons to open different game states.
Each game state shows different elements (images, videos and texts).
Instead of doing the action of turning Internet on and start the program manually,
the player says vocal commands and it creates an illusion that the computer
is automatic. The user is able to play puzzle, listen to music and read stories.

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
// make responsiveVoice read the instructions, and show the wifi signal animation and instructions button.
function setup() {
  $(".Youtube").hide();
  $("#loading").hide();
  $("#bookShelf").hide();
  $(".books").hide();
  $(".puzzleContainer").hide();
  $(".pieces").hide();
  $("#next").hide();
  if (annyang) {
    annyang.addCommands(commands);
    annyang.start();
    // annyang.debug();
  }
  document.getElementById('wifiLogo').style.display = "block";
  responsiveVoice.speak("Instructions: Say 'Internet On' to make window load. Say 'Say it again' to repeat instructions. Say 'Play [Insert video title]' to play the video. Say 'Internet Off' to make everything stop.", 'UK English Male', {
  pitch: 1.75, rate:1 });

}
// wifiOn()
//
// Player says "Internet on" and GIF Image of a loading page and instructions button appears .
function wifiOn() {
  if (gameState === 1) {
    gameState = 2;
    $("#loading").show();
    $("#wifiLogo").hide();
    $("#bookShelf").hide();
    $(".books").hide();
    $("#loading").on("click", videosAppear);
    $("#dialog").show();
    $(".puzzleContainer").hide();
    $(".pieces").hide();
    $("#next").hide();
  }
}
// videosAppear()
//
// Player clicks on the loading image GIF and make the YouTube videos, puzzle, instruction button
// and "next page" button appear.
// Player drags and drops puzzle pieces in random boxes to complete the mix&matched incorrect puzzle.
// Player also has the possibility to click on "next page" without completing the puzzle.
function videosAppear() {
  if (gameState === 2) {
    gameState = 3;
    $(".Youtube").show();
    $("#loading").hide();
    $(".books").hide();
    $("#bookShelf").show().resizable({
      aspectRatio: 4 / 5
    })
    $(".puzzleContainer").show();
    $(".pieces").show();
    $("#pieceOne").draggable();
    $("#pieceTwo").draggable();
    $("#pieceThree").draggable();
    $("#pieceFour").draggable();
    $("#pieceFive").draggable();
    $("#pieceSix").draggable();
    $("#next").show().on("click", bookShelf);

    $("#boxOne").droppable({accept: "#pieceTwo", drop: function(event, ui) {
    var $this = $(this);
    ui.draggable.position({ my: "center", at: "center", of: $this, using: function(pos) {
        $(this).animate(pos, 200, "linear");
      }
    });
    $("#pieceTwo").droppable("disable");
  }
  });
    $("#boxTwo").droppable({accept: "#pieceThree", drop: function(event, ui) {
    var $this = $(this);
    ui.draggable.position({my: "center", at: "center", of: $this, using: function(pos) {
        $(this).animate(pos, 200, "linear");
      }
    });
    $("#pieceThree").droppable("disable");
    }
    });
    $("#boxThree").droppable({ accept: "#pieceFour", drop: function(event, ui) {
    var $this = $(this);
    ui.draggable.position({ my: "center", at: "center", of: $this, using: function(pos) {
        $(this).animate(pos, 200, "linear");
      }
    });
    $("#pieceFour").droppable("disable");
    }
    });
    $("#boxFour").droppable({ accept: "#pieceFive", drop: function(event, ui) {
    var $this = $(this);
    ui.draggable.position({ my: "center", at: "center", of: $this, using: function(pos) {
        $(this).animate(pos, 200, "linear");
      }
    });
    $("#pieceFive").droppable("disable");
    }
    });
    $("#boxFive").droppable({ accept: "#pieceSix", drop: function(event, ui) {
    var $this = $(this);
    ui.draggable.position({ my: "center", at: "center", of: $this, using: function(pos) {
        $(this).animate(pos, 200, "linear");
      }
    });
    $("#pieceSix").droppable("disable");
    }
    });
    $("#boxSix").droppable({ accept: "#pieceOne", drop: function(event, ui) {
    var $this = $(this);
    ui.draggable.position({ my: "center", at: "center", of: $this, using: function(pos) {
        $(this).animate(pos, 200, "linear");
      }
    });
    $( "#pieceOne" ).droppable("disable");
    }
    });
  }
}
// handleVideo()
//
// When player use annyang to say: "PLay [insert video name]", that specific video plays.
// The player can use commands on the video player to pause the video.
function handleVideo(name) {
  if (gameState === 3) {
    gameState = 4;
    $("#bookShelf").show();
    $("#loading").hide();
    $("#wifiLogo").hide();
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
// When "Next..." button is clicked, book covers appears and they are linked
// with the wrong story.
function bookShelf(){
  if(gameState===3){
    gameState = 5;
    $("#loading").hide();
    $("#wifiLogo").hide();
    $("#bookShelf").show();
    $(".books").show();
    $(".Youtube").hide();
    $(".puzzleContainer").hide();
    $(".pieces").hide();
    $("#dialog").show();
    $("#next").hide();
    $("#accordionOne").accordion();
    $("#accordionTwo").accordion();
  }
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
      effect: "fade",
      duration: 1000
    }
  });
  $("#opener").on("click", function() {
    $("#dialog").dialog("open");
  });
});

function sayAgain() {
  sayBackwards("Instructions: Say 'Turn Wifi On' to make window load. Say 'Say it again' to repeat instructions. Say 'Play [Insert video title]' to play the Youtube video. Say 'Turn Wifi Off' to make everything stop.", 'UK English Male');
}

// sayBackwards(text)
//
// Uses ResponsiveVoice to say the specified text backwards!
function sayBackwards(text) {

  let backwardsText = text.split('').reverse().join('');
  let options = {
    pitch: 2,
    rate: 0.75
  };
  // Use ResponsiveVoice to speak the string we generated, with UK English Male voice
  // and the options we just specified.
  responsiveVoice.speak(backwardsText, 'UK English Male', options);
}
